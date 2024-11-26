<script setup lang="ts">
import { ACCOUNT, OAUTH_PROVIDER } from "~/libs/appwrite";
import { useLoadingStore } from "~/store/loading.store";

definePageMeta({ layout: "auth" });
useHead({ title: "Auth | Jira Software" });

const router = useRouter();
const loadingStore = useLoadingStore();

onMounted(() => {
  ACCOUNT.get()
    .then(() => router.push("/"))
    .catch(() => loadingStore.set(false));
});

const isLogin = ref(true);

const toggleLogin = () => (isLogin.value = !isLogin.value);

const onGoogle = () =>
  ACCOUNT.createOAuth2Session(OAUTH_PROVIDER.Google, "http://localhost:3000");

const onGithub = () =>
  ACCOUNT.createOAuth2Session(OAUTH_PROVIDER.Github, "http://localhost:3000");
</script>

<template>
  <UiLoader v-if="loadingStore.isLoading" />
  <div class="flex items-center justify-center h-screen w-full relative">
    <NuxtImg
      src="/particle.jpg"
      class="absolute inset-0 w-full h-full object-cover z-10"
    />
    <div
      class="absolute inset-0 w-full h-full z-20 dark:bg-black/40 bg-white/20"
    ></div>

    <UCard
      class="z-50 w-1/2 relative border border-blue-700"
      :ui="{ body: { base: 'flex gap-4' } }"
    >
      <div class="space-y-4 flex-1">
        <h1 class="text-2xl font-bold">
          <template v-if="isLogin">Login</template>
          <template v-else>Register</template>
        </h1>

        <p class="opacity-70">
          <template v-if="isLogin">
            please use the following credentials to login
          </template>
          <template v-else>
            please use the following credentials to register
          </template>
        </p>

        <AuthLogin v-if="isLogin" :toggle-login="toggleLogin" />
        <AuthRegister v-else :toggle-login="toggleLogin" />
      </div>
      <UDivider
        label="OR"
        color="gray"
        orientation="vertical"
        class="w-fit"
        size="sm"
      />
      <div class="space-y-4 flex-1">
        <div class="flex justify-center top-0">
          <span> Login With </span>
        </div>
        <div class="">
          <UButton
            class="my-2 dark:bg-gray-600"
            color="gray"
            block
            @click="onGithub"
          >
            <Icon name="logos:github-icon" />
            <span>GitHub</span>
          </UButton>
          <UButton
            class="my-2 dark:bg-gray-600"
            color="gray"
            block
            @click="onGoogle"
          >
            <Icon name="logos:google-icon" />
            <span>GOOGLE</span>
          </UButton>
        </div>
      </div>
    </UCard>
  </div>
</template>
