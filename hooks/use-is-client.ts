"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * Returns true only after hydration. Server and the first client pass both
 * receive false — avoids SSR/client markup mismatches for browser-only APIs.
 */
export function useIsClient(): boolean {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}
