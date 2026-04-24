import { request } from "@/lib/api/client";
import { type Template, type TemplateKind, TemplateListSchema } from "./schemas";

export function getTemplates(kind?: TemplateKind): Promise<Template[]> {
  const query = kind && kind !== "all" ? `?kind=${kind}` : "";
  return request(`/templates${query}`, {
    schema: TemplateListSchema,
  });
}
