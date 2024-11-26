<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "#ui/types";
import { ACCOUNT } from "~/libs/appwrite";
import { useAuthStore } from "~/store/auth.store";

defineProps({
  toggleLogin: {
    type: Function,
    required: true,
  },
});

const toast = useToast();
const authStore = useAuthStore();
const router = useRouter();

const isLoading = ref(false);
const error = ref("");

const state: { [key: string]: any } = reactive({
  email: undefined,
  password: undefined,
});

const fields = [
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
  const { email, password } = event.data;
  try {
    await ACCOUNT.createEmailPasswordSession(email, password);
    const response = await ACCOUNT.get();
    authStore.set({
      email: response.email,
      id: response.$id,
      name: response.name,
      status: response.status,
    });

    toast.add({
      color: "blue",
      icon: "i-heroicons-check-circle",
      title: "Signed in",
      description: "You are now logged in!",
    });
    await router.push("/");
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
      Not Registed yet?
      <span
        role="button"
        class="text-blue-500 hover:underline"
        @click="() => $props.toggleLogin()"
        >Sign Up</span
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
      <template v-else>Login</template>
    </UButton>
  </UForm>
</template>
