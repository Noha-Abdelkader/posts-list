<template>
  <div v-if="isLoading" class="flex items-center justify-center gap-2">
    <span v-if="message" class="text-custom-green-600">
      {{ message }}</span
    >
    <span
      :class="[
        'loader inline-block',
        message ? 'left-10 w-2 h-2' : 'left-0 w-4 h-4',
      ]"
    ></span>
  </div>
</template>

<script setup lang="ts">
// Props
withDefaults(
  defineProps<{
    isLoading?: boolean;
    message?: string;
  }>(),
  {
    isLoading: false,
  }
);
</script>
