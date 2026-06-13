export const SITE = {
  name: 'Analiza Tu Dinero',
  url: 'https://analizatudinero.com',
  description:
    'Calculadoras, plantillas y guías para entender tus gastos, comparar escenarios y organizar tu economía personal sin complicarte.',
  locale: 'es_ES',
  email: 'contacto@analizatudinero.com',
} as const;

/** Construye un título completo con el nombre del sitio. */
export function buildTitle(title?: string): string {
  if (!title) return `${SITE.name} — Educación financiera práctica`;
  return `${title} | ${SITE.name}`;
}

/** Devuelve la URL canónica absoluta a partir de una ruta. */
export function canonicalUrl(pathname: string): string {
  const path = pathname.endsWith('/') && pathname !== '/' ? pathname.slice(0, -1) : pathname;
  return new URL(path, SITE.url).href;
}

/** JSON-LD de la organización/marca. */
export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    url: SITE.url,
    email: SITE.email,
    description: SITE.description,
    logo: `${SITE.url}/favicon.svg`,
  };
}

/** JSON-LD del sitio web (solo para la home). */
export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    inLanguage: 'es-ES',
  };
}

/** JSON-LD de artículo (guías y análisis). */
export function articleJsonLd(opts: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.title,
    description: opts.description,
    url: opts.url,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    inLanguage: 'es-ES',
    author: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url,
    },
  };
}

/** JSON-LD de migas de pan. */
export function breadcrumbsJsonLd(items: { label: string; href: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      item: canonicalUrl(item.href),
    })),
  };
}
