# Ashwani Goyal: online portfolio

Personal portfolio and resume site built with [Astro](https://astro.build/) and the [AstroPaper](https://github.com/satnaing/astro-paper) theme (MIT licensed, see `LICENSE`).

## Where things live

| What                                         | Where                             |
| -------------------------------------------- | --------------------------------- |
| Site title, URL, social links, timezone      | `astro-paper.config.ts`           |
| Home page intro                              | `src/pages/index.astro`           |
| Experience, Projects, Skills and About pages | `src/content/pages/*.md`          |
| Blog posts                                   | `src/content/posts/*.md`          |
| Downloadable resume PDF                      | `public/Ashwani-Goyal-Resume.pdf` |

The "Download full resume (PDF)" link on the Experience page appears only when the PDF file exists.

## Commands

Requires Node.js 22.23.4 or newer and [pnpm](https://pnpm.io/).

```bash
pnpm install        # install dependencies
pnpm dev            # start the dev server at http://localhost:4321
pnpm build          # type-check, build to ./dist and build the search index
pnpm preview        # preview the production build
pnpm lint           # ESLint
pnpm format         # Prettier
```

## Before deploying

Set `site.url` in `astro-paper.config.ts` to the final public URL. It is used for canonical links, the sitemap and the RSS feed.
