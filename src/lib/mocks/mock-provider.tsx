"use client";

import { useEffect, useState } from "react";

let startPromise: Promise<void> | null = null;

function ensureWorkerStarted() {
  if (startPromise) return startPromise;
  startPromise = import("./browser").then(async ({ worker }) => {
    await worker.start({ onUnhandledRequest: "bypass" });
  });
  return startPromise;
}

export function MockProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(process.env.NODE_ENV !== "development");

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;
    let cancelled = false;
    ensureWorkerStarted().then(() => {
      if (!cancelled) setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!ready) return null;
  return <>{children}</>;
}
