import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

const allowPublic = {
  allow: "/",
  disallow: ["/api/"],
};

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", ...allowPublic },
      { userAgent: "Googlebot", ...allowPublic },
      { userAgent: "Bingbot", ...allowPublic },
      { userAgent: "Slurp", ...allowPublic },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
