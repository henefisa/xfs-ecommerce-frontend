export function debounce<T extends (...args: any[]) => any>(
  callback: T,
  ms: number
) {
  let timer: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timer) {
      clearTimeout(timer);
    }
    return new Promise((resolve) => {
      timer = setTimeout(() => resolve(callback(args)), ms);
    });
  };
}
