// src/content.config.ts
import { defineCollection, z } from 'astro:content';

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    category: z.enum(['sketch', 'calligraphy', 'appreciation', 'practice']),
    phase: z.number().min(1).max(5).optional(),
    level: z.enum(['入门', '进阶', '高级']).default('入门'),
    tags: z.array(z.string()).default([]),
    excerpt: z.string().default(''),
    date: z.string(),
    order: z.number().default(0),
  }),
});

export const collections = { articles };
