"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

function serialize<T>(value: T) {
  return JSON.stringify(value);
}

function parseValue<T>(value: string | null, fallback: T) {
  if (!value) {
    return fallback;
  }

  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const fallbackSnapshot = serialize(initialValue);

  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      function handleStorage(event: StorageEvent) {
        if (event.key === key) {
          onStoreChange();
        }
      }

      window.addEventListener("storage", handleStorage);
      window.addEventListener(`newstart-storage:${key}`, onStoreChange);

      return () => {
        window.removeEventListener("storage", handleStorage);
        window.removeEventListener(`newstart-storage:${key}`, onStoreChange);
      };
    },
    [key]
  );

  const getSnapshot = useCallback(() => {
    if (typeof window === "undefined") {
      return fallbackSnapshot;
    }

    return window.localStorage.getItem(key) ?? fallbackSnapshot;
  }, [fallbackSnapshot, key]);

  const storedSnapshot = useSyncExternalStore(subscribe, getSnapshot, () => fallbackSnapshot);

  const value = useMemo(
    () => parseValue<T>(storedSnapshot, initialValue),
    [initialValue, storedSnapshot]
  );

  const setStoredValue = useCallback(
    (nextValue: T | ((current: T) => T)) => {
      if (typeof window === "undefined") {
        return;
      }

      const current = parseValue<T>(window.localStorage.getItem(key), initialValue);
      const resolved =
        typeof nextValue === "function" ? (nextValue as (currentValue: T) => T)(current) : nextValue;

      window.localStorage.setItem(key, serialize(resolved));
      window.dispatchEvent(new Event(`newstart-storage:${key}`));
    },
    [initialValue, key]
  );

  return [value, setStoredValue, true] as const;
}
