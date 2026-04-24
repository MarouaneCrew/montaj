import { useQuery } from "@tanstack/react-query";
import { getTemplates } from "./api";
import type { TemplateKind } from "./schemas";

export function useTemplates(kind: TemplateKind = "all") {
  return useQuery({
    queryKey: ["templates", { kind }],
    queryFn: () => getTemplates(kind),
  });
}
