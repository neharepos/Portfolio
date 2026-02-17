import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  css: [
    // KaTeX styles (needed to display math correctly)
    'katex/dist/katex.min.css',
    './app/assets/css/main.css'
  ],
  modules: ['@nuxt/content', '@nuxtjs/color-mode'],
  content: {
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