<script lang="ts" setup>
const { currentUser } = useAuthStore();
</script>
<template>
  <div class="w-full h-screen flex justify-center items-center">
    <UCard class="w-1/2">
      <h1>Profile.</h1>
      <UDivider class="my-2" />
      <div class="flex items-center space-x-3">
        <UAvatar :alt="currentUser.name" class="uppercase" size="xl" />

        <div class="flex flex-col space-y-1">
          <p class="text-gray-400">
            Name:
            <span class="text-gray-100 font-bold">{{ currentUser?.name }}</span>
          </p>
          <p class="text-gray-400">
            Email:
            <span class="text-gray-100 font-bold">{{ currentUser?.email }}</span>
          </p>
        </div>
      </div>
    </UCard>
  </div>
</template>
