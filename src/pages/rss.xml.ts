import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { SITE } from '@utils/seo';

export async function GET(context: APIContext) {
  const guias = await getCollection('guias', ({ data }) => !data.draft);
  const analisis = await getCollection('analisis', ({ data }) => !data.draft);

  const items = [
    ...guias.map((entry) => ({ entry, base: '/guias' })),
    ...analisis.map((entry) => ({ entry, base: '/analisis' })),
  ].sort((a, b) => b.entry.data.pubDate.valueOf() - a.entry.data.pubDate.valueOf());

  return rss({
    title: SITE.name,
    description: SITE.description,
    site: context.site ?? SITE.url,
    items: items.map(({ entry, base }) => ({
      title: entry.data.title,
      description: entry.data.description,
      pubDate: entry.data.pubDate,
      link: `${base}/${entry.id}`,
    })),
    customData: '<language>es-es</language>',
  });
}
