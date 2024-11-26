<script setup lang="ts">
import { ACCOUNT } from "~/libs/appwrite";
import { useAuthStore } from "~/store/auth.store";
import { useLoadingStore } from "~/store/loading.store";

const { currentUser, clear } = useAuthStore();
const loadingStore = useLoadingStore();
const router = useRouter();

const logout = async () => {
  loadingStore.set(true);
  await ACCOUNT.deleteSession("current");
  clear();
  loadingStore.set(false);
  router.push("/auth");
};
</script>
<template>
  <div
    class="h-[10vh] fixed inset-0 bg-gray-100 dark:bg-gray-900 z-50"
  >
    <div
      class="container mx-auto px-4 flex items-center h-full justify-between"
    >
      <NuxtLink to="/" class="flex items-center space-x-1">
        <NuxtImg src="/logo.svg" width="50" height="50" />
        <span class="text-2xl font-medium">Jira software</span>
      </NuxtLink>

      <div class="flex items-center space-x-2">
        <template v-if="currentUser.status">
          <NuxtLink to="/documents">
            <UButton color="blue" variant="outline">Documents</UButton>
          </NuxtLink>
          <SharedUserBox />
        </template>
        <template v-else>
          <div class="space-x-1">
            <NuxtLink to="/auth">
              <UButton color="blue"> Get it free </UButton>
            </NuxtLink>
            <NuxtLink to="/auth">
              <UButton color="blue" variant="soft"> Sign In </UButton>
            </NuxtLink>
          </div>
        </template>

        <SharedColorMode />
      </div>
    </div>
  </div>
</template>
