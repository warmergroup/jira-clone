<script lang="ts" setup>
import { useDeals } from "~/query/use-deals";
import { useDelete } from "~/query/use-delete";
import { EnumStatus } from "~/types";

definePageMeta({ layout: "documents" });
useHead({ title: "Produced | Jira Software" });

const { setDeal } = useCurrentDealStore();
const editDeal = useEditDealStore();
const { data, isLoading, refetch } = useDeals(EnumStatus.produced);
const { isDeleting, deleteDeal } = useDelete(refetch);

const handleDelete = (id: string) => {
  const confirm = window.confirm("Are you sure you want to delete this deal?");
  if (confirm) return deleteDeal(id);
};
</script>
<template>
  <div class="flex items-center justify-between">
    <h1 class="text-4xl font-bold">Produced</h1>
    <SharedCreateDeal :status="EnumStatus.produced" :refetch="refetch" />
  </div>
  <UDivider class="my-2" />

  <div v-if="isLoading" class="grid grid-cols-4 gap-2">
    <div
      v-for="index in 4"
      :key="index"
      class="my-3 dark:bg-gray-900 bg-gray-300 rounded-md p-2 card-animation"
    >
      <USkeleton class="w-10/12 h-4" />
      <USkeleton class="w-full h-1 my-3" />
      <USkeleton class="w-full h-8" />
      <USkeleton class="w-full h-6 mt-3" />
    </div>
  </div>
  <div v-else>
    <div v-if="data?.length" class="grid grid-cols-4 gap-2">
      <div
        class="card-animation my-3 dark:bg-gray-900 bg-gray-200 rounded-md p-2 h-[30vh] flex flex-col justify-between"
        v-for="(item, index) in data"
        :key="index"
        :style="{ '--i': index + 1 }"
        role="button"
      >
        <div class="flex items-center space-x-2">
          <span class="font-bold text-lg uppercase">
            {{ item.name }}
          </span>
        </div>
        <UDivider class="my-3" />

        <div class="opacity-50 text-sm line-clamp-2">
          {{ item.description }}
        </div>

        <UButton
          class="w-full mt-3 group"
          color="blue"
          variant="ghost"
          @click="setDeal(item)"
        >
          <span>See More</span>
          <Icon
            name="material-symbols:arrow-right-alt-rounded"
            class="group-hover:translate-x-2 transition"
          />
        </UButton>

        <div class="grid grid-cols-2 gap-2 mt-2">
          <UButton block color="blue" @click="editDeal.setDeal(item)"
            >Edit <Icon name="icon-park-outline:editor"
          /></UButton>
          <UButton block color="red" @click="() => handleDelete(item.$id)"
            >Delete <Icon name="lucide:trash-2"
          /></UButton>
        </div>
      </div>
      <Slideover />
      <SharedEditDeal :refetch="refetch" />
    </div>
    <div v-else>
      <div class="flex flex-col items-center justify-center mt-20">
        <NuxtImg src="/no-data.svg" width="300" height="300" />
      </div>
    </div>
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
