"use client";

import { useRef } from "react";

export function ThemeScript({ script }: { script: string }) {
  const rendered = useRef(false);
  if (rendered.current) return null;
  rendered.current = true;
  // biome-ignore lint/security/noDangerouslySetInnerHtml: pre-hydration theme init
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
