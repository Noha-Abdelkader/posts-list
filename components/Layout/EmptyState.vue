<template>
  <div
    :class="[
      ' w-full flex items-center justify-center ',
      border
        ? 'min-h-[20dvh] w-2/3 mx-auto border border-custom-green-600 rounded-md bg-zinc-200'
        : 'min-h-5 ',
    ]"
  >
    <div
      class="text-custom-green-600 text-lg font-semibold flex flex-col items-center justify-center gap-2"
    >
      <NuxtImg
        v-if="border"
        src="https://cdni.iconscout.com/illustration/premium/thumb/search-website-illustration-download-in-svg-png-gif-file-formats--records-content-searching-for-magnify-seo-optimization-pack-web-illustrations-4707094.png?f=webp"
        alt="not found"
        class="w-3/4 mx-auto"
      />
      <p class="first-letter:capitalize mb-7 flex items-center gap-2">
        <i class="mdi mdi-alert-circle-outline text-2xl"></i>

        {{ message ?? "Not found." }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
// Props
withDefaults(
  defineProps<{
    message?: string;
    border?: boolean;
  }>(),
  {
    border: false,
  }
);
</script>
