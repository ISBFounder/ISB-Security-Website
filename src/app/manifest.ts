import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ISB Security Solutions",
    short_name: "ISB",
    description:
      "ISB Security Platform — modular security operations software under active development.",
    start_url: "/",
    display: "standalone",
    background_color: "#070809",
    theme_color: "#070809",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
