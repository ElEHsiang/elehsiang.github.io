import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import rehypeSlug from 'rehype-slug';
import sitemap from "@astrojs/sitemap";
import mdx from '@astrojs/mdx';


// https://astro.build/config
export default defineConfig({
  site: "https://elehsiang-github-io.vercel.app/",
  // replace this with your deployed domain
  integrations: [tailwind({
      applyBaseStyles: false
    }),
    react(),
    sitemap({
      changefreq: 'daily',
    }),
    mdx()
  ],
  markdown: {
    remarkPlugins: [remarkToc, [remarkCollapse, {
      test: "Table of contents"
    }]],
    rehypePlugins: [rehypeSlug],
    shikiConfig: {
      theme: "one-dark-pro",
      wrap: true
    },
    extendDefaultPlugins: true
  },
  vite: {
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"]
    }
  },
  scopedStyleStrategy: "where",
  trailingSlash: 'always'
});
