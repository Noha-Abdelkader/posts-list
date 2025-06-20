// Type
import type { Post } from "~/types/features/posts";

export const usePostStore = defineStore("post", () => {
  const selectedPost = ref<Post | null>(null);
  const selectedPostPostion = ref<number | null>(null);

  function setPosition(y: number) {
    selectedPostPostion.value = y;
  }

  return {
    selectedPost,
    selectedPostPostion,
    setPosition,
  };
});
