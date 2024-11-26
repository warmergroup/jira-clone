<template>
  <div class="w-full flex flex-col">
    <div class="text-center">
      <Icon name="svg-spinners:3-dots-scale" class="w-5 h-5" />
    </div>
    <div class="my-3 dark:bg-gray-900 bg-gray-200 rounded-md p-2 animation">
      <USkeleton class="w-10/12 h-4" />
      <USkeleton class="w-10/12 h-1 my-3" />
      <USkeleton class="w-10/12 h-8" />
      <USkeleton class="w-10/12 h-6 mt-3" />
    </div>
  </div>
</template>
