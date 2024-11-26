<script lang="ts" setup>
import { useComments } from "~/query/use-comments";
import { useMutation } from "@tanstack/vue-query";
import { DATABASE, UNIQUE_ID } from "~/libs/appwrite";
import { COLLECTION_COMMENTS, DB_ID } from "~/constants";
import type { FormError, FormSubmitEvent } from "#ui/types";
import dayjs from "dayjs";

const { deal } = useCurrentDealStore();
const toast = useToast();

const { data, refetch, isLoading } = useComments();

const { mutate, isPending } = useMutation({
  mutationKey: ["create-comment"],
  mutationFn: ({ text }: { text: string }) =>
    DATABASE.createDocument(DB_ID, COLLECTION_COMMENTS, UNIQUE_ID(), {
      text,
      deal: deal?.$id,
    }),
  onSuccess: () => {
    refetch();
    state.text = undefined;
    toast.add({
      title: "Comment added",
      description: "your comment has been added successfully",
      color: "blue",
    });
  },
  onError: (error) => {
    toast.add({
      title: "Error",
      description: error.message,
      color: "rose",
    });
  },
});
const state = reactive({ text: undefined });

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.text) errors.push({ path: "text", message: "Write your comment" });
  return errors;
};

async function onSubmit(event: FormSubmitEvent<any>) {
  mutate({ text: event.data.text });
}
</script>

<template>
  <div class="space-y-6">
    <UForm
      :validate="validate"
      :state="state"
      @submit="onSubmit"
      class="relative h-12"
    >
      <UFormGroup name="text">
        <UInput
          v-model="state.text"
          size="lg"
          placeholder="Create a commit..."
          color="blue"
          autocomplete="off"
        />
      </UFormGroup>
      <div class="absolute top-0 right-0 bottom-0">
        <UButton
          type="submit"
          color="blue"
          size="lg"
          :disabled="validate(state).length > 0"
        >
          <Icon name="material-symbols:add" size="20" />
        </UButton>
      </div>
    </UForm>

    <div v-if="isLoading" class="flex items-center space-x-4">
      <USkeleton class="h-12 w-12" :ui="{ rounded: 'rounded-full' }" />
      <div class="space-y-2">
        <USkeleton class="h-4 w-[250px]" />
        <USkeleton class="h-4 w-[200px]" />
      </div>
    </div>
    <div v-else-if="data">
      <div
        v-for="(item, index) in data"
        :key="index"
        class="flex items-start mt-4"
      >
        <Icon name="ic:round-chat-bubble-outline" class="mr-3 mt-1" size="lg" />
        <div
          class="border-border rounded-md w-full dark:bg-gray-800 bg-gray-200 relative px-3 min-h-12"
        >
          <p class="pt-3 mb-5">
            {{ item.text }}
          </p>
          <span
            class="absolute right-2 bottom-1 text-blue-500 font-bold text-sm"
            >{{ dayjs(item.$createdAt).format("HH:mm") }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>
