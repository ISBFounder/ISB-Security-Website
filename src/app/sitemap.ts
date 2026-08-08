import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

const routes: { path: string; priority: number }[] = [
  { path: "/", priority: 1.0 },
  { path: "/platform", priority: 0.9 },
  { path: "/features", priority: 0.85 },
  { path: "/solutions", priority: 0.85 },
  { path: "/industries", priority: 0.8 },
  { path: "/technology", priority: 0.8 },
  { path: "/security", priority: 0.8 },
  { path: "/ai", priority: 0.8 },
  { path: "/about", priority: 0.7 },
  { path: "/freelance-security", priority: 0.7 },
  { path: "/roadmap", priority: 0.7 },
  { path: "/faq", priority: 0.65 },
  { path: "/contact", priority: 0.7 },
  { path: "/request-demo", priority: 0.75 },
  { path: "/privacy", priority: 0.35 },
  { path: "/terms", priority: 0.35 },
  { path: "/cookies", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, priority }) => ({
    url: path === "/" ? SITE.url : `${SITE.url}${path}`,
    priority,
  }));
}
