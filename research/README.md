# research/ - project page convention

`research/index.html` is the research overview: grants, key projects, more
research and publications, affiliated labs.

Each grant or project that earns a page of its own gets one file next to it, at
`research/<slug>.html`. One file per project or grant, no subdirectories.

Slugs are lowercase, hyphen-separated, and match the project name rather than a
date. The planned set:

| Slug                              | Covers                                                      |
| --------------------------------- | ----------------------------------------------------------- |
| `microsam-llrd.html`              | MicroSAM-LLRD, layer-wise learning-rate decay fine-tuning     |
| `veminr.html`                     | vEMINR, implicit neural representation super-resolution       |
| `vemstitch.html`                  | vEMstitch, high-precision serial-section stitching            |
| `flowinpaint.html`                | FlowInpaint, flow-guided inpainting of damaged sections       |
| `vem-3d-reconstruction-grant.html`| The volume electron microscopy grant as a whole               |
| `dementia-markers-grant.html`     | The early dementia markers grant as a whole                   |

## Building a project page

1. Copy `../_shell.html` verbatim and replace every `ROOT` with `../` - project
   pages sit one level under `cima-website/`, the same depth as this
   `index.html`, so `../css/`, `../assets/`, `../js/site.js`, `../people.html`
   and `../news/index.html` all apply. The Research nav link becomes
   `../research/index.html` and keeps `aria-current="page"`.
2. Set `<title>`, the meta description, the `og:title` and `og:description`.
3. Load the shared page stylesheet after `site.css`:
   `<link rel="stylesheet" href="../css/pages/research.css">`. Page-only CSS
   goes in that same file, under a clearly labelled section - do not fork
   `site.css`, `theme.css` or `variables.css`.
4. Inside `<main>`, open with a `.page-head` (kicker "Research", the project
   name as the `h1`, a `.lede`, and a `.jump` nav if the page is long), then
   `section.sec` blocks. Copy the icon sprite `<svg class="icon-sprite">` from
   `index.html` if the page uses `<use href="#i-...">` icons.
5. End with a link back to the overview: `<a href="index.html">All research</a>`.

## Wiring a card to its page

Until a project page exists, each project card on `index.html` carries a scoped
placeholder rather than a dead link:

```html
<span class="btn scoped"><svg aria-hidden="true"><use href="#i-web"></use></svg> Project site · coming soon</span>
```

When the page ships, replace that `<span>` with a real button pointing at the
slug:

```html
<a class="btn" href="vemstitch.html"><svg aria-hidden="true"><use href="#i-web"></use></svg> Project page</a>
```

The card heading keeps pointing at the repository, so the "View on GitHub"
button and the new "Project page" button sit side by side in `.actions`.

Links are relative to `research/`, so no `../` prefix inside the directory.
Never leave a `.btn.scoped` pointing at a file that does not exist yet - the
scoped placeholder is the pattern for anything not live.
