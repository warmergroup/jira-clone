<script setup lang="ts">
import { useMutation } from "@tanstack/vue-query";
import { COLLECTION_DEALS, DB_ID } from "~/constants";
import { DATABASE } from "~/libs/appwrite";
import { useStatus } from "~/query/use-status";
import { useCurrentDealStore } from "~/store/current-deal.store";
import type { IColumn, IDeal } from "~/types";

definePageMeta({ layout: "documents" });
useHead({ title: "Documents | Jira Software" });

const { data, isLoading, refetch } = useStatus();
const { setDeal } = useCurrentDealStore();

const dragCardRef = ref<IDeal | null>(null);
const sourceColumnRef = ref<IColumn | null>(null);
const isMoving = ref(false);

const { mutate, isPending } = useMutation({
  mutationKey: ["moveCard"],
  mutationFn: ({ docId, status }: { docId: string; status: string }) =>
    DATABASE.updateDocument(DB_ID, COLLECTION_DEALS, docId, { status }),
  onSuccess: () => refetch(),
});

const handleDragStart = (card: IDeal, column: IColumn) => {
  isMoving.value = true;
  dragCardRef.value = card;
  sourceColumnRef.value = column;
};
const handleDragOver = (event: DragEvent) => {
  event.preventDefault();
};

const handleDrop = (column: IColumn) => {
  isMoving.value = false;
  if (dragCardRef.value && sourceColumnRef.value) {
    mutate({ docId: dragCardRef.value.$id, status: column.id });
  }
};
</script>

<template>
  <div class="grid grid-cols-4 gap-2" v-if="isLoading">
    <div v-for="index in 4" :key="index">
      <USkeleton class="w-72 h-12 dark:bg-gray-900 bg-gray-200 mb-2" />
      <UiDealsLoader />
    </div>
  </div>
  <div class="grid grid-cols-4 gap-2 mt-2" v-else>
    <div
      v-for="column in data"
      :key="column.id"
      @dragover="handleDragOver"
      @drop="() => handleDrop(column)"
      class="px-1"
      :class="isMoving && 'border-l-2 border-r-2 border-dashed border-blue-300'"
    >
      <UButton
        class="w-full h-12 flex items-center justify-between"
        color="blue"
        variant="outline"
      >
        <span class="text-xl font-bold">{{ column.name }}</span>
        <UBadge
          class="text-xl w-8 h-8 font-bold flex justify-center align-center"
          :ui="{ rounded: 'rounded-full' }"
          color="blue"
          >{{ column.items.length }}</UBadge
        >
      </UButton>

      <SharedCreateDeal :status="column.id" :refetch="refetch" />

      <div
        class="card-animation my-3 dark:bg-gray-900 bg-gray-200 rounded-md p-2 h-[30vh] flex flex-col justify-between"
        v-for="(deal, index) in column.items"
        :key="deal.$id"
        :style="{ '--i': index + 1 }"
        role="button"
        draggable="true"
        @dragstart="() => handleDragStart(deal, column)"
        :class="isPending && 'opacity-30 cursor-not-allowed'"
      >
        <div class="flex items-center space-x-2">
          <span class="font-bold text-lg uppercase">
            {{ deal.name }}
          </span>
        </div>
        <UDivider class="my-3" />

        <div class="opacity-50 text-sm line-clamp-2">
          {{ deal.description }}
        </div>

        <UButton
          class="w-full mt-3 group"
          color="blue"
          variant="ghost"
          @click="setDeal(deal)"
        >
          <span>More details</span>
          <Icon
            name="material-symbols:arrow-right-alt-rounded"
            class="group-hover:translate-x-2 transition"
          />
        </UButton>
      </div>
    </div>
    <Slideover />
  </div>
</template>

<style scoped>
.card-animation {
  opacity: 0;
  animation: fade-in 500ms forwards;
  animation-delay: calc(0.1s * var(--i));
}

@keyframes fade-in {
  to {
    opacity: 1;
  }
}
</style>
