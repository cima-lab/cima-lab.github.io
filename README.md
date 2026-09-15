# CIMA Lab website

Public website for **CIMA Lab: Computational Imaging and Medical AI**, a research lab of the
School of Engineering, Applied Science and Technology at Canadian University Dubai.

The site is a plain static site: no build step, no framework, no server-side code. It can be
served from GitHub Pages, any static host, or the university web server as-is.

## Structure

```
cima-website/
  index.html            Home
  research/index.html   Grants, key projects, more research, affiliated labs
  people.html           Members by category
  publications.html     Publications (selected entries + coming soon)
  resources.html        Equipment and computing (lab hardware)
  news/index.html       News and blog index (one file per post later, see news/README.md)
  join.html             Opportunities, how to apply, contact form, key contacts
  css/variables.css     Design tokens (copied from ../design-system, do not fork values)
  css/theme.css         Design-system component classes (copied from ../design-system)
  css/site.css          Site chrome: ribbon, header, nav, cards, social icons, forms, footer
  css/pages/*.css       Page-specific styles, tokens only
  js/site.js            Progressive enhancement: mobile nav, reveal, contact form
  assets/               Logo and banner SVGs (from ../assets)
  _shell.html           Reference page skeleton every page copies (not linked from the site)
  _icons.html           Shared inline SVG icons (not linked from the site)
```

## Design system

Every page uses the Helix design system documented in `../design-system/DESIGN.md`.
Rules of thumb when editing:

- Colors only from `variables.css`. CUD red is the single saturated accent, navy carries
  headings and structure, violet is a rare tertiary.
- Source Serif 4 for headings and stat numbers, Inter for body and UI, JetBrains Mono for
  kickers, pills and metadata.
- One shadow token, 10px card radius, 14px panel radius, 999px pills.
- Links that are not live yet are rendered as scoped placeholders (`<span class="off">`,
  `.btn.scoped`, `.badge-soon`, `.skeleton`), never as dead anchors.

## Adding a page

1. Copy `_shell.html`, replace every `ROOT` with `` (top level) or `../` (one directory down).
2. Set `<title>`, the meta description, and `aria-current="page"` on the matching nav link.
3. Fill `<main>`. Put page-only CSS in `css/pages/<page>.css`.

## Contact form

The form on `join.html` works in two modes, handled by `js/site.js`:

- `data-endpoint="https://..."` set: the form POSTs to that endpoint (for example a Formspree
  or Basin form URL) and shows a success or error status inline.
- `data-endpoint` empty: the form opens the visitor's email client with the message prefilled,
  addressed to `data-mailto`.

Set one of the two before launch. A honeypot field (`_gotcha`) is included for spam filtering.

## Local preview

```
cd cima-website
python -m http.server 8080
```

Then open <http://localhost:8080/>. Fonts load from Google Fonts, everything else is local.

## Deploying to GitHub Pages

Push this directory to the `cima-lab.github.io` repository (or configure Pages to serve the
`cima-website` folder). No build step is required. Point the university subdomain at Pages
with a CNAME record when the domain is approved.
