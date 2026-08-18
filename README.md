# Millis Dynamics — team website

Static website for Millis Dynamics, the FIRST Tech Challenge team in Millis, Massachusetts.
Plain HTML, CSS, and JavaScript — no build step, no dependencies, no framework. Open a file and
it works.

## Pages

| File | What it is |
| --- | --- |
| `index.html` | Home — shuffling photo banner, what the team does, the season, news, sponsors |
| `about.html` | The team, how FTC works, the season, the roster, commitment, FAQ |
| `news.html` | All updates, newest first |
| `calendar.html` | Embedded Google Calendar plus the season milestones |
| `sponsors.html` | Sponsorship tiers, what support pays for, in-kind help, sponsor wall |
| `join.html` | Students / volunteers / sponsors, with both Google Forms in tabs |

## Editing the things you'll actually change

### 1. Connect the forms and the calendar — `assets/js/config.js`

This is the only file you need to touch to wire up the embeds.

- **Student form** (`studentForm`): in Google Forms, click **Publish** (or **Send**) → the
  **embed `<>`** option → copy the `src="…"` URL → paste it as `embedUrl`. Put the normal share
  link in `shareUrl`.
- **Volunteer form** (`volunteerForm`): make a second form for adults who want to help, then paste
  its URLs the same way.
- **Calendar** (`calendar`): in Google Calendar, **Settings → (your calendar) → Access permissions**
  → tick **Make available to public**, then scroll to **Integrate calendar** and copy the `src="…"`
  URL out of the embed code.
- **Contact email** (`contactEmail`): every "email us" link on the site picks it up automatically.
- **Social + support links** (`social`): `github`, `instagram`, and `gofundme`. Each has a reserved
  button on the site — fill one in and its button goes live; leave it as `PASTE_…` and the button
  shows a muted "coming soon" instead of a dead link.

Anything left as `PASTE_…` shows a short "coming soon" panel on the page instead of a broken embed,
so the site never looks broken while you're still setting it up.

### 2. Post an update — `assets/js/news-data.js`

Copy one block, change the fields, done. Posts sort themselves newest-first, and the three most
recent also appear on the home page.

```js
{
  date: "2026-09-12",          // YYYY-MM-DD
  tag: "Season",               // short label pill
  title: "First tournament of the year",
  summary: "One or two sentences — this is what shows on the home page.",
  body: [
    "First paragraph, shown on the News page.",
    "Second paragraph.",
  ],
},
```

### 3. Swap in real photos — `assets/img/banner/`

The hero banner shuffles its slides into a random order on every page load, then rotates through
them. The five files in `assets/img/banner/` are obvious placeholders — replace them with real
photos (roughly 1600 × 900, JPG or WebP is fine) and update the `<img>` tags near the top of
`index.html`:

```html
<img class="banner__slide" data-banner-slide src="assets/img/banner/your-photo.jpg"
     alt="Describe what's happening in the photo." width="1600" height="900">
```

Add or remove `<img>` tags freely — the dots, arrows, and timing adapt on their own. Write real
`alt` text for each photo.

### 4. Add a sponsor logo

Sponsor slots live on `index.html` and `sponsors.html`. Drop the logo in `assets/img/sponsors/` and
replace one placeholder slot:

```html
<div class="sponsor-slot"><img src="assets/img/sponsors/acme.svg" alt="Acme Manufacturing"></div>
```

Sponsorship tier amounts and benefits are plain HTML in `sponsors.html` — edit them there. The
season fundraising goal appears once in `sponsors.html`; the "$250 and up" line also appears on
`index.html` and `join.html`.

### 5. Add a team member — `about.html`

The roster lives in the `#team` section of `about.html`, above the FAQ. It currently shows the four
open lead roles. To add a real person, copy the commented-out card that sits right above the grid:

```html
<article class="member">
  <div class="member__avatar" aria-hidden="true">AB</div>
  <span class="member__name">Alex Brooks</span>
  <span class="member__role">Build lead</span>
  <div class="member__links">
    <a href="https://github.com/username" rel="noopener">GitHub</a>
  </div>
</article>
```

Swap the initials for a photo with `<div class="member__avatar"><img src="assets/img/team/alex.jpg" alt=""></div>`.
Add as many link chips inside `member__links` as you like.

### 6. The logo — `assets/img/logo.svg`

The robot-arm mark is drawn as SVG so it stays sharp at every size. **It is a recreation of the
Millis Dynamics logo, not the original artwork file.** To use the real file instead, save it as
`assets/img/logo.png` and change the three `<img src="assets/img/logo.svg">` references in each
page (header, footer, and the page-head watermark) — or just overwrite `logo.svg` with the real
SVG export, which needs no code changes at all. `assets/img/favicon.svg` is the browser-tab icon.

The "MILLIS / DYNAMICS" wordmark next to the mark is live HTML text, not an image, so it stays
crisp and readable in both light and dark mode.

### 7. Change the colours — top of `assets/css/styles.css`

```css
--brand: #c8102e;   /* main colour */
--accent: #ffc233;  /* highlight colour */
```

Everything else is derived from those. Dark mode follows the visitor's system setting automatically.

## Previewing locally

Open `index.html` directly in a browser, or run a local server (needed if you want the paths to
behave exactly like they will when hosted):

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Publishing on GitHub Pages

1. Repository **Settings → Pages**.
2. **Source:** Deploy from a branch → **Branch:** `main`, **Folder:** `/ (root)` → **Save**.

The site goes live at `https://<user>.github.io/<repo>/` in a minute or two. It's all static files,
so it works the same on Netlify, Cloudflare Pages, or any plain web host.

## Notes

- Season milestones on the calendar page come from the FTC schedule (kickoff September 12, 2026;
  qualifiers December–March; state championship late March). Confirm specific event dates as they
  are published and put them on the team's Google Calendar.
- The sponsorship goal ($5,500) and the tier amounts are plain HTML in `sponsors.html`.
- Nothing here collects data itself; the only inputs are the embedded Google Forms and Calendar.
