import { defineConfig } from 'astro/config';

import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://visamalog.com",
  i18n: {
    defaultLocale: "en",
    locales: ["en", "es", "de", "ja", "ga"],
    routing: {
      prefixDefaultLocale: false
    }
  },
  prefetch: true,
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [sitemap({
    filter: (page) => !page.endsWith('/components/')
  })]
});