# JC Pandi — Design & Code

A cinematic, responsive single-page portfolio inspired by the supplied visual reference. Built with Next.js App Router, TypeScript, Tailwind CSS, and Framer Motion.

## Run locally

Requires Node.js 20.9 or newer.

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:3000.

## Production build

```sh
npm run build
```

The complete static website is generated in `out/`. Upload the contents of `out/` to a static host, or import this project into Vercel as a Next.js project. Images and fonts are local; no API keys or runtime environment variables are needed.

To serve the exported site locally, use any static HTTP server. Opening `out/index.html` directly from disk will not correctly resolve its absolute asset paths.

## Personalize

- Page content, email, navigation, and interactions: `src/app/page.tsx`
- All 16 project links and descriptions: `src/app/projects.ts`
- Palette, typography, and responsive layouts: `src/app/globals.css`
- Page title and search description: `src/app/layout.tsx`
- Hero character: `public/images/designer-character-v2.png`
- Captured project previews: `public/projects/`

## Included

- Character-led hero with a warm ember glow and subtle pointer movement
- Scroll reveals and reading progress, respecting reduced-motion preferences
- Responsive navigation with Escape-key support
- Six featured project previews and ten additional project links
- All / WordPress / Landing pages filters
- About, expertise, process, and contact sections
- Direct email link and copy-email action with feedback
- Local fonts, page metadata, favicon, keyboard focus, and skip navigation

The contact buttons open the visitor's email app. No form submission service is configured. Project links open their original websites in a new tab. The character is an illustrative avatar, not a portrait of JC Pandi.

## Asset notes

The project previews were captured from the websites supplied by JC Pandi. The avatar was created using the built-in image generation tool, guided by the provided reference. Its brief: isolate a polished stylized 3D cartoon designer, tousled dark hair, white short sleeve polo, black trousers and watch, relaxed hands-in-pockets pose, warm orange edge lighting, transparent background, no text or interface elements.

Manrope is served locally under the SIL Open Font License. The font license is included in `public/fonts/OFL.txt`.

