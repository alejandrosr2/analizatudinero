# Analiza Tu Dinero

Web de **educación financiera práctica** para [analizatudinero.com](https://analizatudinero.com): calculadoras, plantillas y guías para entender gastos, ingresos y decisiones económicas cotidianas. Proyecto editorial independiente, en español de España, orientado a jóvenes de 18 a 35 años.

> Contenido educativo. No asesoramiento financiero, fiscal, legal ni de inversión. No hay recomendaciones de productos financieros, inversión, trading ni criptomonedas.

## Stack

- [Astro 5](https://astro.build) — generación de sitio 100 % estático.
- TypeScript (modo `strict`).
- [Tailwind CSS 4](https://tailwindcss.com) vía `@tailwindcss/vite`.
- Markdown + Astro Content Collections para guías y análisis.
- JavaScript/TypeScript vanilla para las calculadoras (todo se calcula en el navegador, sin guardar ni enviar datos).
- Sin backend, sin base de datos, sin login.

## Scripts

| Comando | Descripción |
| --- | --- |
| `npm install` | Instala las dependencias |
| `npm run dev` | Servidor de desarrollo en `http://localhost:4321` |
| `npm run build` | Build estático en `./dist/` (incluye sitemap y RSS) |
| `npm run preview` | Previsualiza el build localmente |

## Estructura del proyecto

```
src/
├── components/
│   ├── Header.astro          # Navegación principal + menú móvil
│   ├── Footer.astro          # Enlaces, legales y aviso editorial
│   ├── SEO.astro             # Title, description, canonical, OG, Twitter, JSON-LD
│   ├── Hero.astro            # Hero de la home
│   ├── Card.astro            # Tarjeta genérica (calculadoras, guías…)
│   ├── CalculatorLayout.astro# Envoltorio de calculadoras (breadcrumbs, aviso, CTA)
│   ├── ArticleLayout.astro   # → ver layouts/ArticleLayout.astro
│   ├── DisclaimerBox.astro   # Caja de aviso "contenido educativo"
│   ├── CTABox.astro          # Bloque CTA reutilizable
│   ├── Breadcrumbs.astro     # Migas de pan visuales
│   ├── NewsletterBox.astro   # Formulario de newsletter (visual, sin conectar)
│   └── TemplateMockup.astro  # Mockup HTML/CSS del dashboard de plantillas
├── content/
│   ├── guias/                # Guías en Markdown
│   └── analisis/             # Análisis en Markdown
├── content.config.ts         # Content Collections (schema con Zod)
├── layouts/
│   ├── BaseLayout.astro      # HTML base: head, header, main, footer
│   └── ArticleLayout.astro   # Layout de artículos (guías y análisis)
├── pages/
│   ├── index.astro           # Home
│   ├── calculadoras/         # Índice + 5 calculadoras
│   ├── plantillas/           # Índice + landing "Controla tu dinero"
│   ├── guias/                # Índice + [slug] dinámico
│   ├── analisis/             # Índice + [slug] dinámico
│   ├── sobre-analiza-tu-dinero.astro
│   ├── contacto.astro
│   ├── aviso-legal.astro
│   ├── privacidad.astro
│   ├── cookies.astro
│   ├── 404.astro
│   └── rss.xml.ts            # Feed RSS de guías + análisis
├── styles/
│   └── global.css            # Tailwind + tokens de marca + clases de formularios/prosa
└── utils/
    ├── seo.ts                # Constantes del sitio y generadores de JSON-LD
    └── formatters.ts         # Formateo de euros, porcentajes y fechas (es-ES)
```

## Cómo crear una nueva guía

1. Crea un archivo Markdown en `src/content/guias/`, por ejemplo `mi-nueva-guia.md`. El nombre del archivo será la URL: `/guias/mi-nueva-guia`.
2. Añade el frontmatter obligatorio:

```markdown
---
title: "Título SEO de la guía"
description: "Meta description única de 140-160 caracteres."
pubDate: 2026-07-01
# Opcional: CTA final hacia una calculadora o plantilla
cta:
  title: "Título del CTA"
  description: "Texto del CTA."
  buttonLabel: "Texto del botón"
  buttonHref: "/calculadoras/presupuesto-mensual"
---

Introducción de la guía…

## Primer apartado (H2)

Contenido. Usa H2/H3, ejemplos prácticos y enlaces internos a calculadoras.
```

3. Listo. La guía aparece automáticamente en `/guias`, en el sitemap y en el RSS. El layout añade solo el H1, la fecha, la caja de aviso legal y el CTA (no escribas un `# H1` en el Markdown).
4. Reglas editoriales: español de España, sin datos estadísticos inventados (usa ejemplos hipotéticos y dilo), sin recomendar productos financieros concretos, sin promesas económicas.

## Cómo crear un nuevo análisis

Igual que las guías, pero en `src/content/analisis/`. Deja claro en el texto que se trata de metodologías y ejemplos orientativos, no de datos oficiales actualizados.

## Cómo añadir una nueva calculadora

1. Crea `src/pages/calculadoras/nombre-calculadora.astro`.
2. Usa el componente `CalculatorLayout` (mira cualquiera de las existentes como referencia, p. ej. `alquiler-maximo.astro`):
   - Props: `title`, `description`, `heading`, `intro`, `breadcrumbLabel` y `cta` opcional.
   - Slot por defecto: el formulario y la sección de resultados.
   - Slot `explicacion`: el texto SEO con H2/H3 y enlaces internos.
3. Escribe la lógica en un `<script>` al final de la página (TypeScript vanilla). Importa `formatEuros`/`formatPercent` desde `@utils/formatters`. Valida los inputs (`parseFloat` + `Number.isFinite`) y no guardes ni envíes datos.
4. Añade la tarjeta de la nueva calculadora en `src/pages/calculadoras/index.astro` (array `calculadoras`) y, si quieres destacarla, en la home.

## Cómo modificar los textos legales

Los textos de `/aviso-legal`, `/privacidad` y `/cookies` están directamente en sus páginas: `src/pages/aviso-legal.astro`, `src/pages/privacidad.astro` y `src/pages/cookies.astro`. Son bases orientativas marcadas como **pendientes de revisión profesional**: hazlas revisar por un profesional legal antes del lanzamiento definitivo, y actualízalas cuando actives newsletter, analítica o publicidad.

El email de contacto y la URL del sitio están centralizados en `src/utils/seo.ts` (constante `SITE`).

## Cómo desplegar

El build es 100 % estático (`dist/`), así que sirve cualquier hosting estático.

### Vercel

1. Sube el repositorio a GitHub/GitLab.
2. En Vercel: **New Project** → importa el repo. Vercel detecta Astro automáticamente (build: `npm run build`, output: `dist`).
3. Añade el dominio `analizatudinero.com` en **Settings → Domains**.

### Netlify

1. **Add new site → Import an existing project** → conecta el repo.
2. Build command: `npm run build` · Publish directory: `dist` (autodetectado para Astro).
3. Configura el dominio en **Domain management**.

### Cloudflare Pages

1. **Workers & Pages → Create → Pages** → conecta el repo.
2. Framework preset: Astro (build `npm run build`, output `dist`).
3. Añade el dominio personalizado.

> Si algún día cambias el dominio, actualiza `site` en `astro.config.mjs`, `SITE.url` en `src/utils/seo.ts` y la URL del sitemap en `public/robots.txt`.

## SEO incluido

- Title y meta description únicos por página, canonical, Open Graph y Twitter Cards (`src/components/SEO.astro`).
- JSON-LD: `WebSite` y `Organization` en la home, `Article` en guías/análisis, `BreadcrumbList` en páginas interiores.
- Sitemap automático (`@astrojs/sitemap`) referenciado desde `public/robots.txt`.
- RSS en `/rss.xml`.
- Página 404 personalizada, HTML semántico, breadcrumbs visuales y estructurados.

## Estado actual y pendientes

- Los formularios de **newsletter y contacto son visuales**: no envían ni guardan datos. Conectarlos a un proveedor externo (email marketing / formularios) cuando toque, y actualizar `/privacidad`.
- **Estrategia de plantillas**: hay un único producto premium, **"Controla tu dinero en 30 días"** (9,90 € precio de lanzamiento, en acceso anticipado). Existe una **demo gratuita descargable** en `public/descargas/analiza-tu-dinero-demo-no-editable.xlsx` (no editable, datos ficticios, sin fórmulas utilizables; constante `DEMO` en `src/utils/modulos.ts`): sirve para ver el producto, no para usarlo. El archivo premium editable NO está en `public/`. Además, la web muestra una **preview no editable** (`src/components/TemplateMockup.astro`, HTML/CSS con pestañas y datos de ejemplo). Las antiguas plantillas sueltas son ahora **módulos del pack** (fuente única en `src/utils/modulos.ts`, anchors en `/plantillas/controla-tu-dinero#<id>`), con páginas SEO en `/plantillas/presupuesto-mensual`, `/plantillas/fondo-emergencia`, `/plantillas/mudanza`, `/plantillas/independizarse` y `/plantillas/vivir-solo-compartir` que venden el pack, no productos separados. El archivo editable real del producto se gestiona fuera del repo web; `scripts/build_plantilla_presupuesto.py` genera un borrador de módulo en `scripts/output/` (ignorado por git) y se verifica con `scripts/recalc-verify.ps1` (requiere Excel).
- Los **textos legales** necesitan revisión profesional antes del lanzamiento.
- `public/og-default.svg` es la imagen Open Graph por defecto; algunos servicios de previsualización no rasterizan SVG, así que conviene sustituirla por un PNG/JPG de 1200×630 antes del lanzamiento.
