import type { Template, TemplateKind } from "@/features/templates/schemas";

const kinds: TemplateKind[] = [
  "template",
  "style",
  "tutorial",
  "template",
  "style",
  "tutorial",
  "template",
  "style",
  "tutorial",
  "template",
  "style",
  "tutorial",
  "template",
  "style",
  "tutorial",
  "template",
];

export const mockTemplates: Template[] = kinds.map((kind, i) => ({
  id: `template_${i + 1}`,
  slug: `inspiration-${i + 1}`,
  kind,
  imageUrl: `/main/dashboard/get_inspired/get_inspired_${i + 1}.png`,
}));
