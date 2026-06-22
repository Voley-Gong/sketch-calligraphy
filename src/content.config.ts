import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    category: z.enum(['sketch', 'calligraphy', 'appreciation', 'practice']),
    phase: z.number().optional(),
    level: z.enum(['入门', '进阶', '高级']).optional(),
    tags: z.array(z.string()).default([]),
    excerpt: z.string().optional(),
    date: z.string().optional(),
  }),
});

export const collections = { articles };
