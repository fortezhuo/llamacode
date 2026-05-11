// useInterval.ts
// A custom React hook that abstracts setInterval behavior.
// It ensures the latest callback is used without needing to reset the interval.
// If delay is null, the interval is paused.

import { useEffect, useRef } from "react";

/**
 * useInterval
 * @param callback Function to be executed on each tick.
 * @param delay   Interval delay in milliseconds. Pass `null` to pause.
 */
export function useInterval(
  callback: () => void,
  delay: number | null
): void {
  const savedCallback = useRef<() => void>(() => {});

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    if (delay === null) {
      return; // Do not create interval when paused.
    }

    function tick() {
      savedCallback.current();
    }

    const id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
}
