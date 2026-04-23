export const routes = {
  dashboard: "/dashboard",
  library: "/library",
  history: "/history",
  templates: "/templates",
  tools: "/tools",
  tool: (slug: string) => `/tools/${slug}`,
  imageGenerator: "/image-generator",
  videoGenerator: "/video-generator",

  signUp: "/sign-up",
  logIn: "/log-in",
} as const;
