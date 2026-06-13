import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articleSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  draft: z.boolean().default(false),
  /** Aviso educativo personalizado (sustituye al genérico de DisclaimerBox). */
  disclaimer: z.string().optional(),
  /** CTA final del artículo hacia la plantilla gratuita y/o una calculadora. */
  cta: z
    .object({
      title: z.string(),
      description: z.string(),
      buttonLabel: z.string(),
      buttonHref: z.string(),
      buttonDownload: z.boolean().optional(),
      secondaryLabel: z.string().optional(),
      secondaryHref: z.string().optional(),
      secondaryDownload: z.boolean().optional(),
      note: z.string().optional(),
    })
    .optional(),
});

const guias = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/guias' }),
  schema: articleSchema,
});

const analisis = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/analisis' }),
  schema: articleSchema,
});

export const collections = { guias, analisis };
