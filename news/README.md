# news/ - post convention

Future news posts live at `news/<slug>.html`, one file per post, sitting next
to this `index.html`. Slugs are lowercase, hyphen-separated, no dates
(`news/vemstitch-v1-release.html`, not `news/2026-09-vemstitch.html`).

Each post is a standalone page:

- Copy `../_shell.html` verbatim, same as any other page. `ROOT` is `../`
  (posts live one level under `cima-website/`, same depth as `index.html`
  here).
- Set `aria-current="page"` on the News nav link, same as `index.html`.
- Inside `<main>`, use a `.page-head` (kicker "News", the post title as the
  `h1`, and a `.lede` dek if useful) followed by a single `.panel` article
  for the post body, then a "back to news" link.
- Load `../css/pages/news.css` for the shared post styles (`.news-pinned`
  rules apply to any full post body, not just the homepage's pinned card).

## Card markup to copy onto news/index.html

When a post ships, replace one `.soon-card` in the "Coming soon" grid with a
real card, and once there are three or more real posts, promote the pinned
slot to the newest one. Real card markup:

```html
<article class="soon-card" style="border-style:solid">
  <div class="skeleton block" aria-hidden="true"></div> <!-- swap for a real 16:9 image -->
  <span class="pill red">Sep 2026</span>
  <h3><a href="vemstitch-v1-release.html">Post title</a></h3>
  <p>One or two sentences summarizing the post.</p>
</article>
```

Remove the `.badge-soon` element and both `sr-only` "Coming soon" spans - those
only belong on placeholder cards. Keep using `.grid.g3` as the container so
the layout still collapses to 2 then 1 column on small screens.
