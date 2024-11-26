<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "#ui/types";
import { ACCOUNT, UNIQUE_ID } from "~/libs/appwrite";

const props = defineProps({
  toggleLogin: {
    type: Function,
    required: true,
  },
});

const toast = useToast();

const router = useRouter();
const isLoading = ref(false);
const error = ref("");

const state: { [key: string]: any } = reactive({
  name: undefined,
  email: undefined,
  password: undefined,
});

const fields = [
  { label: "Name", name: "name", type: "text" },
  { label: "Email", name: "email", type: "email" },
  { label: "Password", name: "password", type: "password" },
];

const validate = (state: any): FormError[] => {
  const errors: FormError[] = [];
  fields.forEach((field) => {
    if (!state[field.name]) {
      errors.push({ path: field.name, message: `${field.label} is required` });
    }
  });
  return errors;
};

async function onSubmit(event: FormSubmitEvent<any>) {
  isLoading.value = true;
  const { name, email, password } = event.data;

  try {
    await ACCOUNT.create(UNIQUE_ID(), email, password, name);
    props.toggleLogin();
    toast.add({
      color: "blue",
      icon: "i-heroicons-check-circle",
      title: "Account created",
      description: "You have successfully created an account!",
    });
    await router.push("/");
    isLoading.value = false;
  } catch (err: any) {
    error.value = err.message;
    isLoading.value = false;
  }
}
</script>

<template>
  <UAlert
    icon="ic:baseline-error"
    :description="error"
    title="Error"
    color="red"
    variant="outline"
    v-if="error"
  />

  <UForm
    :validate="validate"
    :state="state"
    class="space-y-4"
    @submit="onSubmit"
  >
    <UFormGroup
      v-for="field in fields"
      :key="field.name"
      :label="field.label"
      :name="field.name"
    >
      <UInput :type="field.type" color="blue" v-model="state[field.name]" />
    </UFormGroup>
    <div class="text-sm text-neutral-500">
      Already have an account?
      <span
        class="text-blue-500 hover:underline"
        role="button"
        @click="() => $props.toggleLogin()"
        >Sign In</span
      >
    </div>
    <UButton
      class="w-1/3 flex justify-center items-center"
      type="submit"
      color="blue"
      :disabled="isLoading"
    >
      <template v-if="isLoading">
        <Icon name="svg-spinners:3-dots-scale" class="w-5 h-5" />
      </template>
      <template v-else>Next</template>
    </UButton>
  </UForm>
</template>
