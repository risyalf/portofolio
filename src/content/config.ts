import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    category: z.string().default('Laravel'),
    author: z.string().default('Risyal Febrianto'),
    readTime: z.string().default('5 min read'),
    featured: z.boolean().default(false),
  }),
});

export const collections = { blog };
