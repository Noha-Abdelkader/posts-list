<template>
  <section>
    <!-- Search bar -->
    <header class="flex flex-col items-center gap-3 mb-3">
      <h3 class="text-2xl font-semibold text-gray-700">
        Latest posts from our blog.
      </h3>
      <v-text-field
        v-if="posts.length"
        type="text"
        prepend-inner-icon="mdi mdi-file-find-outline"
        icon-color="green-lighten-3"
        label="Search by post title or description"
        base-color="white"
        bg-color="white"
        color="green-lighten-3"
        density="compact"
        variant="filled"
        max-width="400"
        min-width="320"
        clearable
        :rules="rules"
        v-model="searchTerm"
        @update:modelValue="searchPosts"
        @click:clear="clearSearch"
      ></v-text-field>
    </header>

    <!-- Content -->
    <article class="mx-5">
      <!-- Error -->
      <LayoutError v-if="error" :error="error" />

      <!-- Initial loading  -->
      <div v-else>
        <div v-if="initialLoad">
          <LayoutLoading class="min-h-[70dvh]" :is-loading="initialLoad" />
        </div>

        <!-- Posts -->
        <div v-else-if="haveData && !error">
          <div class="grid gap-4 md:grid-cols-2 *:h-full">
            <!-- Posts grid -->
            <div
              v-for="post in isSearching ? searchedPosts : posts"
              :key="post.id"
            >
              <v-hover
                v-slot="{ isHovering, props }"
                open-delay="200"
                close-delay="200"
              >
                <v-card
                  :class="['h-full relative', { 'on-hover': isHovering }]"
                  :elevation="isHovering ? 16 : 2"
                  v-bind="props"
                  @click="(event) => selectCard(post, event)"
                >
                  <v-card-item>
                    <v-card-title>
                      <h3 class="text-sm flex items-center gap-2">
                        <span class="text-red-500">
                          <i class="mdi mdi-menu-right-outline"></i>
                          {{ post.id }}
                        </span>
                        <span class="text-custom-green-600">
                          {{ post.title }}
                        </span>
                      </h3>
                    </v-card-title>
                  </v-card-item>

                  <v-card-text>
                    <p class="text-xs text-gray-500 mb-4">
                      {{ post.description }}
                    </p>

                    <p class="text-xs absolute bottom-2 inset-x-4">
                      <span class="font-semibold">Created at: {{ " " }}</span>
                      <span class="text-red-700">
                        {{ formatDate(post.created_at) }}
                      </span>
                    </p>
                  </v-card-text>
                </v-card>
              </v-hover>
            </div>
          </div>

          <!-- Load more trigger incase no search apply -->
          <div
            v-if="!isSearching"
            ref="loadMoreTrigger"
            class="flex justify-center py-8"
          >
            <LayoutLoading
              v-if="isLoading"
              :is-loading="isLoading"
              message="loading more posts "
            />

            <div v-else-if="hasMore" class="w-full">
              <p class="text-center text-custom-green-600">
                Show more posts ...
              </p>
            </div>

            <LayoutEmptyState v-else message="no more posts to load." />
          </div>
          <!-- Incase search and no posts found -->
          <LayoutEmptyState v-else message="no posts found." />
        </div>

        <!-- Empty State -->
        <LayoutEmptyState v-else border message="no posts found." />
      </div>
    </article>
  </section>
</template>

<script setup lang="ts">
// Layout
definePageMeta({
  layout: "default",
});

// Types
import type { Post } from "~/types/features/posts";

// Utils
import { useUtils } from "~/composables/utils";
const { formatDate } = useUtils();

// SEO
useHead({
  title: "Infinite Scroll Posts",
});

// Variables
const isSearching = ref(false);
const searchTerm = ref("");
const initialPosts = computed(() => posts.value);
const searchedPosts = computed(() => {
  if (searchTerm.value && searchTerm.value.length > 3) {
    return initialPosts.value.filter(
      (post: Post) =>
        post.description.toLowerCase().includes(searchTerm.value) ||
        post.title.toLowerCase().includes(searchTerm.value)
    );
  } else {
    return [];
  }
});

// Fetch posts
async function fetchPosts(page: number) {
  const response = await $fetch<{
    current_page: number;
    data: Post[];
    total: number;
    last_page: number;
  }>(`http://13.60.56.112/api/posts?page=${page}`);

  return response;
}

// Composable
const {
  isLoading,
  error,
  payload: posts,
  hasMore,
  initialize,
  initialLoad,
  haveData,
} = useInfiniteScroll<Post>(fetchPosts);

// Search rule
const rules: Array<(value: string | null | undefined) => true | string> = [
  (value) => {
    if (!value) return true;
    return (value && value.length >= 3) || "Min 3 characters";
  },
];

// Search func
function searchPosts(value: string | null) {
  if (value && value.length >= 3) {
    isSearching.value = true;
  } else {
    isSearching.value = false;
  }
}

// Clear search
function clearSearch() {
  isSearching.value = false;
}

// Store
import { usePostStore } from "~/stores/features/posts";
const { selectedPost, selectedPostPostion } = storeToRefs(usePostStore());
const { setPosition } = usePostStore();

function selectCard(post: Post, event: MouseEvent) {
  // Set details
  selectedPost.value = post;
  navigateTo(`/${selectedPost.value.id}`);
  // Set postion
  const target = event.currentTarget as HTMLElement;
  const rect = target.getBoundingClientRect();
  setPosition(window.scrollY + rect.top + 200);
  // setPosition( event.clientY);
}

// Initialize on mount
onMounted(async () => {
  // Fetch
  await initialize();
  // Reset variables
  clearSearch();

  if (selectedPostPostion.value) {
    window.scrollTo({
      top: selectedPostPostion.value,
      behavior: "smooth",
    });
  }
});
</script>

<style lang="scss" scoped>
.v-card.on-hover {
  &:hover {
    @apply bg-custom-green-500/10;
  }
}
</style>
