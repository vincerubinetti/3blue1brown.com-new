import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import { cjsInterop } from "vite-plugin-cjs-interop";

// https://astro.build/config
export default defineConfig({
  site: "https://example.com",
  integrations: [mdx(), sitemap(), react()],
  vite: {
    plugins: [
      /** https://github.com/withastro/astro/issues/8297 */
      /** https://github.com/antfu-collective/vite-ssg/issues/266 */
      cjsInterop({ dependencies: ["react-use", "lodash"] }),
    ],
  },
});
