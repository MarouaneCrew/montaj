import z from "zod";

export const TemplateSchema = z.object({
  id: z.string(),
  slug: z.string(),
  kind: z.enum(["all", "template", "style", "tutorial"]),
  imageUrl: z.string(),
});

export const TemplateListSchema = z.array(TemplateSchema);

export type Template = z.infer<typeof TemplateSchema>;
export type TemplateKind = Template["kind"];
