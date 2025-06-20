<template>
  <div
    v-if="error"
    class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 min-h-52 text-sm"
  >
    {{ error.message??error }}
  </div>
</template>

<script setup lang="ts">
// Props
defineProps<{
  error: Error | null;
}>();
</script>
