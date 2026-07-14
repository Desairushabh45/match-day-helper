import { useState, useEffect } from "react";

/**
 * Debounces a value by the specified delay.
 * Useful for preventing rapid re-renders or API calls during fast user input.
 *
 * @template T - The type of the value to debounce
 * @param {T} value - The value to debounce
 * @param {number} [delay=300] - Delay in milliseconds before updating the debounced value
 * @returns {T} The debounced value, updated only after the delay has passed
 *
 * @example
 * const debouncedSearch = useDebounce(searchInput, 400);
 * // debouncedSearch only updates 400ms after the user stops typing
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
