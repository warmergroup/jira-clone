<template>
  <div
    class="container mx-auto fixed top-0 left-0 right-0 w-full flex items-center justify-between h-[10vh] dark:bg-gray-900 bg-gray-200 border-b dark:border-b-gray-800 border-b-gray-200 z-40 "
  >
    <NuxtLink to="/" class=" pl-4 flex items-center space-x-1">
      <NuxtImg src="/logo.svg" width="50" height="50" />
      <span class="text-2xl font-medium">Jira software</span>
    </NuxtLink>
    <div class="flex items-center space-x-2 pr-4">
      <SharedUserBox />
      <SharedColorMode />
    </div>
  </div>
</template>
