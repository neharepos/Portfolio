import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-12-16',
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  nitro: {
    prerender: {
      autoSubfolderIndex: true,
      crawlLinks: true
    },
    externals: {
      inline: ['@nuxt/nitro-server', 'better-sqlite3']
    }
  },

  css: [
    // KaTeX styles (needed to display math correctly)
    'katex/dist/katex.min.css',
    './app/assets/css/main.css'
  ],
  modules: ['@nuxt/content', '@nuxtjs/color-mode'],
  content: {
    database: {
      type: 'sqlite'
    },
    build: {

      markdown: {
        // Add remark plugin to parse $...$ and $$...$$ math syntax
        remarkPlugins: {
          'remark-math': {}
        },
        // rehype plugin to render math to HTML using KaTeX
        rehypePlugins: {
          'rehype-katex': {
            // optional options; output: 'html' is common (default)
            output: 'html'
          }
        }
      }
    }
  }
})
