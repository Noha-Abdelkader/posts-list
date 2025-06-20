<template>
  <section>
    <header class="flex lg:items-center gap-3 mb-4 flex-col  lg:flex-row ms-3 lg:ms-0">
      <NuxtLink href="/" class="text-red-500 text-sm font-semibold">
        <i class="mdi mdi-arrow-left-circle"></i>
        Back to posts</NuxtLink
      >
      <h3 class=" text-lg sm:text-2xl font-semibold text-gray-700  lg:ms-8 underline">
        Post details
        <span v-if="selectedPost">
          for post id
          <span class="text-red-600"> # {{ selectedPost.id }} </span>
        </span>
      </h3>
    </header>
    <article v-if="selectedPost" class="flex items-center flex-col justify-center lg:flex-row ">
      <div
        class="[&_p]:flex [&_p]:items-center [&_p]:gap-3 [&_p>i]:text-xl space-y-5  w-full mx-auto px-2"
      >
        <p class="md:text-xl text-custom-green-600">
          <i class="text-red-700 mdi mdi-menu-right-outline"> </i>
          {{ selectedPost.title }}
        </p>
        <p>
          <i class="text-sky-500 mdi mdi-script-text-outline"> </i>
          <span class=" text-xs md:text-sm text-gray-600">
            {{ selectedPost.description }}
          </span>
        </p>
        <p class="text-xs md:text-sm font-semibold">
          <i class="text-gray-500 mdi mdi-clock-check-outline"> </i>
          Created at :
          <span class="text-red-700 text-xs">
            {{ formatDate(selectedPost.created_at) }}
          </span>
        </p>
      </div>

      <img
        src="https://cdni.iconscout.com/illustration/premium/thumb/not-found-illustration-download-in-svg-png-gif-file-formats--error-search-result-state-page-empty-states-pack-design-development-illustrations-3363936.png?f=webp"
        alt="Not Found"
        class="w-full max-w-md mx-auto"
      />
    </article>
    <LayoutEmptyState v-else border message="no post found." />
  </section>
</template>

<script setup lang="ts">
// Layout
definePageMeta({
  layout: "default",
});

// Utils
import { useUtils } from "~/composables/utils";
const { formatDate } = useUtils();

// SEO
useHead({
  title: "Post details",
});

// Store
import { usePostStore } from "~/stores/features/posts";
const { selectedPost } = usePostStore();
</script>
