import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  i18n: {
    defaultLocale: "en",
    locales: ["en", "es", "de", "ja", "ga"],
    routing: {
      prefixDefaultLocale: false
    }
  },
  integrations: [tailwind()]
});