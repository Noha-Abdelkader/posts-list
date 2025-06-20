// Types
import type { PaginatedData } from "~/types/paginated-data";

// Composables
import { useMergeUniqueByKey } from "./useMergeUnique";

export function useInfiniteScroll<T>(
  callback: (page: number) => Promise<PaginatedData<T>>
) {
  // Variables
  const isLoading = ref(false);
  const error: Ref<Error | null> = ref(null);
  const payload = ref<T[]>([]);
  const current_page = ref(1);
  const last_page = ref(0);
  const hasMore = computed(() => current_page.value < last_page.value);
  const haveData = computed(() => payload.value.length > 0);
  const initialLoad = ref(true);

  let observer: IntersectionObserver | null = null;
  const loadMoreTrigger = ref<HTMLElement | null>(null);

  // Fetch
  async function fetchFunction(page: number) {
    if (isLoading.value) return;

    try {
      isLoading.value = true;

      const response = await callback(page);

      isLoading.value = false;

      // Set Pagination
      current_page.value = response.current_page;
      last_page.value = response.last_page;

      // Set data
      if (page == 1) {
        initialLoad.value = true;
        payload.value = response.data;
      } else {
        // initialLoad.value = false;
        // Check ids will not duplicated

        // first
        // const existPayloadIds = new Set(payload.value.map((item: any) => item.id));
        // const newPayload = response.data.filter((item: any) => !existPayloadIds.has(item.id));
        // payload.value = [...payload.value, ...newPayload];

        // second
        // payload.value = Array.from(
        //   new Set([...payload.value, ...response.data])
        // );
        // third
        let uniquePayload = useMergeUniqueByKey(
          payload.value,
          response.data as any[],
          "id"
        );
        payload.value = uniquePayload;
      }

      initialLoad.value = false;
    } catch (err) {
      isLoading.value = false;
      error.value =
        err instanceof Error ? err : new Error("Failed to load data");
    }
  }

  // Load next page
  async function LoadMoreFunc() {
    if (!hasMore.value || isLoading.value) return;
    await fetchFunction(current_page.value + 1);
  }

  // Setup observer
  function setupObserver() {
    if (!loadMoreTrigger.value || !window.IntersectionObserver) return;

    observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore.value && !isLoading.value) {
          LoadMoreFunc();
        }
      },
      {
        rootMargin: "0px",
        threshold: 0.1, //or 100
      }
    );
  }

  // Clean observer
  function cleanObserver() {
    if (observer) {
      observer.disconnect();
      // Reset it
      observer = null;
    }
  }

  // Handle scroll
  function handleScroll() {
    if (isLoading.value || !hasMore.value) return;
    const scrollPosition = window.innerHeight + window.scrollY;
    const documentHeight = document.documentElement.offsetHeight;
    if (scrollPosition >= documentHeight - 1) {
      LoadMoreFunc();
    }
  }

  // First Fetch
  async function initialize() {
    await fetchFunction(1);
    setupObserver();
  }

  // First load
  onMounted(() => {
    // Reset variables
    initialLoad.value = true;

    window.addEventListener("scroll", handleScroll, { passive: true });
  });

  // Reset
  onUnmounted(() => {
    cleanObserver();
    window.removeEventListener("scroll", handleScroll);
  });

  return {
    // Variables
    hasMore,
    payload,
    isLoading,
    error,
    initialLoad,
    haveData,

    // Functions
    initialize,
    LoadMoreFunc,

    // Element
    loadMoreTrigger,
  };
}
