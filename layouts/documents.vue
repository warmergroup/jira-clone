<script setup lang="ts">
import { ACCOUNT } from "~/libs/appwrite";
import { useAuthStore } from "~/store/auth.store";
import { useLoadingStore } from "~/store/loading.store";

const authStore = useAuthStore();
const loadingStore = useLoadingStore();

onMounted(() => {
  ACCOUNT.get()
    .then((response) => {
      loadingStore.set(false);
      authStore.set({
        email: response.email,
        id: response.$id,
        name: response.name,
        status: response.status,
      });
    })
    .finally(() => loadingStore.set(false));
});
</script>

<template>
  <div class="container mx-auto dark:bg-black bg-white relative">
    <UiLoader v-if="loadingStore.isLoading" />
    <main v-else>
      <LayoutsNavbar />
      <div class="flex justify-between">
        <LayoutsSidebar />
        <section class="pl-72 min-h-screen pt-[9vh]">
          <div class="p-4">
            <slot />
          </div>
        </section>
      </div>
    </main>
  </div>
</template>
