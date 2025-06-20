// Take 2 array & key to differiented between
//  Output new array without duplicated that key

export function useMergeUniqueByKey<T, K extends keyof T>(
  arr1: T[],
  arr2: T[],
  key: K
): T[] {
  const map = new Map<string, T>();

  for (const item of [...arr1, ...arr2]) {
    const keyValue = item[key];
    map.set(String(keyValue), item);
  }

  return Array.from(map.values());
}
