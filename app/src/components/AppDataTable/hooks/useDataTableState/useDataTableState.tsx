import _isEqual from "lodash/isEqual";

import { useCallback, useEffect, useState } from "react";
import { useEventListener, useIsMounted, useEventCallback } from "@/hooks";

import type { Dispatch, SetStateAction } from "react";

declare global {
  interface WindowEventMap {
    "session-storage": CustomEvent;
  }
}

/**
 * Represents the options for customizing the behavior of serialization and deserialization.
 * @template T - The type of the state to be stored in session storage.
 * @interface Options
 * @property {(value: T) => string} [serializer] - A function to serialize the value before storing it.
 * @property {(value: string) => T} [deserializer] - A function to deserialize the stored value.
 */
type UseSessionStorageOptions<T> = {
  serializer?: (value: T) => string;
  deserializer?: (value: string) => T;
  initializeWithValue?: boolean;
};

const IS_SERVER = typeof window === "undefined";

const useDataTableState = <T,>(
  name: string | null,
  initialValue: T | (() => T),
  options: UseSessionStorageOptions<T> = {}
): [T, Dispatch<SetStateAction<T>>] => {
  const { initializeWithValue = true } = options;

  const serializer = useCallback<(value: T) => string>(
    (value) => {
      if (options.serializer) {
        return options.serializer(value);
      }

      return JSON.stringify(value);
    },
    [options]
  );

  const deserializer = useCallback<(value: string) => T>(
    (value) => {
      if (options.deserializer) {
        return options.deserializer(value);
      }
      // Support 'undefined' as a value
      if (value === "undefined") {
        return undefined as unknown as T;
      }

      const defaultValue =
        initialValue instanceof Function ? initialValue() : initialValue;

      let parsed: unknown;
      try {
        parsed = JSON.parse(value);
      } catch (error) {
        console.error("Error parsing JSON:", error);
        return defaultValue; // Return initialValue if parsing fails
      }

      return parsed as T;
    },
    [options, initialValue]
  );

  // Get from session storage then
  // parse stored json or return initialValue
  const readValue = useCallback((): T => {
    const initialValueToUse =
      initialValue instanceof Function ? initialValue() : initialValue;

    // Prevent build error "window is undefined" but keep keep working
    if (IS_SERVER || !name) {
      return initialValueToUse;
    }

    try {
      const raw = window.sessionStorage.getItem(name);
      return raw ? deserializer(raw) : initialValueToUse;
    } catch (error) {
      console.warn(`Error reading sessionStorage key “${name}”:`, error);
      return initialValueToUse;
    }
  }, [initialValue, name, deserializer]);

  const [storedValue, setStoredValue] = useState(() => {
    if (initializeWithValue) {
      return readValue();
    }

    return initialValue instanceof Function ? initialValue() : initialValue;
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to sessionStorage.
  const setValue: Dispatch<SetStateAction<T>> = useEventCallback((value) => {
    // Prevent build error "window is undefined" but keeps working
    if (IS_SERVER) {
      console.warn(
        `Tried setting sessionStorage key “${name}” even though environment is not a client`
      );
    }

    try {
      // Allow value to be a function so we have the same API as useState
      const newValue = value instanceof Function ? value(readValue()) : value;

      // Save to session storage
      !!name && window.sessionStorage.setItem(name, serializer(newValue));

      // Save state
      setStoredValue(newValue);

      // We dispatch a custom event so every similar useDataTableState hook is notified
      !!name &&
        window.dispatchEvent(
          new StorageEvent("session-storage", { key: name })
        );
    } catch (error) {
      console.warn(`Error setting sessionStorage key “${name}”:`, error);
    }
  });

  useEffect(() => {
    if (!isMounted()) return;
    setStoredValue(readValue());
  }, [name]);

  const isMounted = useIsMounted();

  const handleStorageChange = useCallback(
    (event: StorageEvent | CustomEvent) => {
      if (
        (event as StorageEvent)?.key &&
        (event as StorageEvent).key !== name
      ) {
        return;
      }
      // setStoredValue((prevStoredValue) => {
      //   return _isEqual(prevStoredValue, readValue())
      //     ? prevStoredValue
      //     : readValue();
      // });
    },
    [name, readValue]
  );

  // this only works for other documents, not the current one
  useEventListener("storage", handleStorageChange);

  // this is a custom event, triggered in writeValueToSessionStorage
  // See: useDataTableState()
  useEventListener("session-storage", handleStorageChange);

  return [storedValue, setValue];
};

export default useDataTableState;
