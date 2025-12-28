import { defineCollection, defineContentConfig } from '@nuxt/content'
import { z } from 'zod'

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: 'blog/*.md',
      schema: z.object({
        date: z.string()
      })
    }),

    work: defineCollection({
      type: 'page',
      source: 'work/*.md',
      schema: z.object({
        date: z.string()
      })
    }),

    project: defineCollection({
      type: 'page',
      source: 'project/*.md',
      schema: z.object({
        date: z.string()
      })
    })
  }
})
