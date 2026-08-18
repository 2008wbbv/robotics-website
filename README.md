# Millis Robotics — team website

Static website for the Millis Robotics VEX V5 Robotics Competition team.
Plain HTML, CSS, and JavaScript — no build step, no dependencies, no framework. Open a file and
it works.

## Pages

| File | What it is |
| --- | --- |
| `index.html` | Home — shuffling photo banner, what the team does, the season, news, sponsors |
| `about.html` | The team, how VEX works, what a season looks like, commitment, FAQ |
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

### 5. Swap in the real logo — `assets/img/logo.svg`

Replace the file, keeping the name `assets/img/logo.svg` (square artwork works best). Also update
`assets/img/favicon.svg` for the browser-tab icon.

### 6. Change the colours — top of `assets/css/styles.css`

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

- Event dates on the calendar page are generic season milestones. Confirm real tournament dates on
  [RobotEvents](https://www.robotevents.com/) and put them on the team's Google Calendar.
- Nothing here collects data itself; the only inputs are the embedded Google Forms and Calendar.
