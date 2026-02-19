import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({

  runtimeConfig: {
    googleScriptUrl: process.env.GOOGLE_SCRIPT_URL,
    googleScriptSecret: process.env.GOOGLE_SCRIPT_SECRET
  },

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  nitro: {
    preset: 'vercel', // Use Vercel preset (not 'static')
  },
  
  routeRules: {
    // Pre-render all content pages at build time (no SQLite at runtime)
    '/': { prerender: true },
    '/blog': { prerender: true },
    '/blog/**': { prerender: true },
    '/work': { prerender: true },
    '/work/**': { prerender: true },
    '/project': { prerender: true },
    '/project/**': { prerender: true },
    
    // Keep API routes as serverless functions
    '/api/**': { cors: true }, // Optional: enable CORS if needed
  },

  css: [
    // KaTeX styles (needed to display math correctly)
    'katex/dist/katex.min.css',
    './app/assets/css/main.css'
  ],
  modules: ['@nuxt/content', '@nuxtjs/color-mode', '@nuxtjs/seo'],
  site: {
    url: 'https://nehakeshri.in',
    name: 'Neha Keshri - Portfolio',
    description: 'Portfolio of Neha Keshri, a developer and blogger.',
    defaultLocale: 'en',
  },
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