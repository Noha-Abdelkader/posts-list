export type PaginatedData<T> = {
  current_page: number;
  last_page: number;
  // per_page: num;
  total: number;
  data : T[]
};