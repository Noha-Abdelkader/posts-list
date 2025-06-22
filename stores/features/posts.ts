// Type
import type { Post } from "~/types/features/posts";

export const usePostStore = defineStore("post", () => {
  const maxAge = 2592000000;

  const selectedPost = useCookie<Post | null>("selectedPost", {
    maxAge,
    default: () => null,
  });

  const selectedPostPostion = useCookie<number | null>("selectedPostPostion", {
    maxAge,
    default: () => null,
  });

  return {
    selectedPost,
    selectedPostPostion,
  };
});
