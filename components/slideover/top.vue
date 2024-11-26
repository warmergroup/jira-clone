<script setup lang="ts">
import dayjs from "dayjs";
import { useCurrentDealStore } from "~/store/current-deal.store";

const store = useCurrentDealStore();
const isExpanded = ref(false);

const description = store.deal?.description as string;

isExpanded.value = description.length > 200 ? true : false;

const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value;
};
</script>

<template>
  <div class="rounded p-3 dark:bg-gray-800 bg-gray-200">
    <div class="uppercase bold text-xl mb-4 font-medium">About deal</div>

    <SlideoverLabel label-text="Name">
      {{ store.deal?.name }}
    </SlideoverLabel>

    <SlideoverLabel label-text="Status">
      <UBadge color="blue" class="font-bold">
        {{ store.deal?.status }}
      </UBadge>
    </SlideoverLabel>

    <SlideoverLabel label-text="Created at">
      {{ dayjs(store.deal?.$createdAt).format("DD MMM YYYY") }}
    </SlideoverLabel>

    <SlideoverLabel label-text="Description">
      <div class="relative group">
        <div
          v-if="isExpanded"
          class="absolute bg-gradient-to-b from-transparent dark:to-gray-800 to-gray-200 inset-0"
        ></div>

        <p>
          {{
            isExpanded
              ? store.deal?.description.slice(0, 200) + "..."
              : store.deal?.description
          }}
        </p>

        <div
          v-if="description.length > 200"
          class="relative mt-4 flex justify-center group-hover:opacity-70 transition opacity-35"
          role="button"
          @click="toggleExpanded"
        >
          <Icon
            class="w-6 h-6 color-gray-500"
            :name="
              isExpanded
                ? 'ic:baseline-arrow-downward'
                : 'ic:baseline-arrow-upward'
            "
          />
        </div>
      </div>
    </SlideoverLabel>
  </div>
</template>

<style scoped></style>
