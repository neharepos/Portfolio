import { defineCollection, defineContentConfig } from "@nuxt/content";
import { z } from "zod";

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: "page",
      source: "blog/*.md",
      schema: z.object({
        title: z.string(),
        description: z.string(),
        tags: z.array(z.string()),
        date: z.string(),
      }),
    }),

    work: defineCollection({
      type: "page",
      source: "work/*.md",
      schema: z.object({
        company: z.string(),
        role: z.string(),
        location: z.string(),
        startDate: z.string(),
        endDate: z.string(),
        description: z.string(),
        skills: z.array(z.string()),
      }),
    }),

    project: defineCollection({
      type: "page",
      source: "project/*.md",
      schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.string(),
        tags: z.array(z.string()).default([]), 
        status: z.enum(["completed", "ongoing"]).default("completed"),
        role: z.string().optional(), 
        duration: z.string().optional(), 
        github: z.string().url().optional(), 
        live: z.string().url().optional(),
      }),
    }),
  },
});
