import { MetadataRoute } from "next";

const BASE_URL = "https://convertotools.com";

const tools = [
  { path: "", priority: 1.0, changeFreq: "daily" },
  { path: "/dashboard", priority: 0.9, changeFreq: "weekly" },
  { path: "/background-remover", priority: 0.9, changeFreq: "monthly" },
  { path: "/pdf-compress", priority: 0.9, changeFreq: "monthly" },
  { path: "/image-compressor", priority: 0.9, changeFreq: "monthly" },
  { path: "/pdf-split", priority: 0.9, changeFreq: "monthly" },
  { path: "/watermark", priority: 0.8, changeFreq: "monthly" },
  { path: "/crop-rotate", priority: 0.8, changeFreq: "monthly" },
  { path: "/color-picker", priority: 0.8, changeFreq: "monthly" },
  { path: "/signature", priority: 0.9, changeFreq: "monthly" },
  { path: "/upload", priority: 0.8, changeFreq: "monthly" },
  { path: "/convert", priority: 0.8, changeFreq: "monthly" },
  { path: "/pdf-to-word", priority: 0.8, changeFreq: "monthly" },
  { path: "/pdf-to-jpg", priority: 0.8, changeFreq: "monthly" },
  { path: "/pdf-to-text", priority: 0.8, changeFreq: "monthly" },
  { path: "/pdf-to-excel", priority: 0.7, changeFreq: "monthly" },
  { path: "/word-to-pdf", priority: 0.7, changeFreq: "monthly" },
  { path: "/word-to-jpg", priority: 0.7, changeFreq: "monthly" },
  { path: "/jpg-to-word", priority: 0.7, changeFreq: "monthly" },
  { path: "/jpg-to-excel", priority: 0.7, changeFreq: "monthly" },
  { path: "/excel-to-jpg", priority: 0.7, changeFreq: "monthly" },
  { path: "/image-to-pdf", priority: 0.7, changeFreq: "monthly" },
  { path: "/image-to-text", priority: 0.7, changeFreq: "monthly" },
  { path: "/image-translator", priority: 0.7, changeFreq: "monthly" },
  { path: "/html-to-pdf", priority: 0.7, changeFreq: "monthly" },
  { path: "/text-to-image", priority: 0.7, changeFreq: "monthly" },
  { path: "/text-to-word", priority: 0.7, changeFreq: "monthly" },
  { path: "/invert-image", priority: 0.6, changeFreq: "monthly" },
  { path: "/resize", priority: 0.6, changeFreq: "monthly" },
  { path: "/merge-pdf", priority: 0.7, changeFreq: "monthly" },
  { path: "/qr-generator", priority: 0.7, changeFreq: "monthly" },
  { path: "/qr-scanner", priority: 0.6, changeFreq: "monthly" },
  { path: "/barcode-scanner", priority: 0.6, changeFreq: "monthly" },
  { path: "/sign-image", priority: 0.7, changeFreq: "monthly" },
  { path: "/privacy-policy", priority: 0.5, changeFreq: "monthly" },
  { path: "/terms-of-service", priority: 0.5, changeFreq: "monthly" },
  { path: "/about-us", priority: 0.6, changeFreq: "monthly" },
  { path: "/contact-us", priority: 0.6, changeFreq: "monthly" },
];

import fs from "fs";
import path from "path";

export default function sitemap(): MetadataRoute.Sitemap {
  return tools.map(tool => {
    let lastModified = new Date();

    try {
      let filePath = "";
      if (tool.path === "") {
        // Root path
        filePath = path.join(process.cwd(), "src", "app", "page.tsx");
      } else {
        // App router routes under (main)
        filePath = path.join(process.cwd(), "src", "app", "(main)", tool.path, "page.tsx");
      }

      if (fs.existsSync(filePath)) {
        const stat = fs.statSync(filePath);
        lastModified = stat.mtime;
      }
    } catch (e) {
      // fallback to current date
    }

    return {
      url: `${BASE_URL}${tool.path}`,
      lastModified,
      changeFrequency: tool.changeFreq as MetadataRoute.Sitemap[0]["changeFrequency"],
      priority: tool.priority,
    };
  });
}
