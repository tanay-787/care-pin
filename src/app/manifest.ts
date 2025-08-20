// app/manifest.ts
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CarePin - CareWorker Shift Tracking",
    short_name: "CarePin",
    start_url: "/",
    display: "standalone",
    theme_color: "#f2f0ef",
    background_color: "#f2f0ef",
    icons: [
      { src: "/logo.png", sizes: "192x192", type: "image/png" },
      { src: "/logo.png", sizes: "512x512", type: "image/png" }
    ]
  };
}
