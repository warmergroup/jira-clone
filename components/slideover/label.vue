<script setup lang="ts">
defineProps({
  labelText: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="mb-3">
    <label
      v-if="labelText"
      class="opacit-75 mb-0.5 block font-bold text-sm text-blue-400"
      >{{ labelText }}:</label
    >
    <div class="text-base"><slot /></div>
  </div>
</template>
