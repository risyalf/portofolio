import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { config } from '@/data/config';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('blog');
  const sorted = posts.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());

  return rss({
    title: `${config.author} — Catatan Arsitektur & Rekayasa Perangkat Lunak`,
    description: config.description,
    site: context.site?.toString() || config.siteUrl,
    items: sorted.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/blog/${post.slug}/`,
      categories: [post.data.category, ...(post.data.tags || [])],
      author: post.data.author,
    })),
    customData: `<language>id-ID</language>`,
  });
}
