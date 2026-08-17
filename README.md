# Millis Robotics — team website

Static website for the effort to launch a FIRST Tech Challenge team in Millis, Massachusetts.
Plain HTML, CSS, and JavaScript — no build step, no dependencies, no framework. Open a file and
it works.

## Pages

| File | What it is |
| --- | --- |
| `index.html` | Home — shuffling photo banner, quick facts, status, latest news, sponsors |
| `about.html` | The plan: mission, what FTC is, timeline, commitment, full year-one budget, FAQ |
| `news.html` | All updates, newest first |
| `calendar.html` | Embedded Google Calendar plus the fixed season milestones |
| `join.html` | Students / mentors / sponsors, and the embedded Google Form |

## Editing the things you'll actually change

### 1. Connect the Google Form and Google Calendar — `assets/js/config.js`

This is the only file you need to touch to wire up the embeds.

- **Form:** in Google Forms, click **Publish** (or **Send**) → the **embed `<>`** option → copy the
  `src="…"` URL → paste it as `interestForm.embedUrl`. Put the normal share link in
  `interestForm.shareUrl`.
- **Calendar:** in Google Calendar, **Settings → (your calendar) → Access permissions** → tick
  **Make available to public**, then scroll to **Integrate calendar** and copy the `src="…"` URL out
  of the embed code → paste it as `calendar.embedUrl`.
- **Contact email:** set `contactEmail`. Every "email us" link on the site picks it up automatically.

Anything left as `PASTE_…` shows a short setup panel on the page instead of a broken embed, so the
site never looks broken while you're still setting it up.

### 2. Post an update — `assets/js/news-data.js`

Copy one block, change the fields, done. Posts sort themselves newest-first, and the three most
recent also appear on the home page.

```js
{
  date: "2026-09-12",          // YYYY-MM-DD
  tag: "Milestone",            // short label pill
  title: "Kickoff",
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
`alt` text for each photo. Also delete the "photos are placeholders" caption in `index.html` once
the real pictures are in.

### 4. Swap in the real logo — `assets/img/logo.svg`

Replace the file, keeping the name `assets/img/logo.svg` (square artwork works best). Also update
`assets/img/favicon.svg` for the browser-tab icon.

### 5. Change the colours — top of `assets/css/styles.css`

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

1. Push this branch and merge it to `main`.
2. Repository **Settings → Pages**.
3. **Source:** Deploy from a branch → **Branch:** `main`, **Folder:** `/ (root)` → **Save**.

The site goes live at `https://<user>.github.io/<repo>/` in a minute or two. It's all static files,
so it works the same on Netlify, Cloudflare Pages, or any plain web host.

## Notes

- Sponsor slots on the home page are placeholders — swap them for real logos as sponsors sign on.
- The site states plainly that the team is in formation and not yet an official school program.
  Update `about.html` and the footer line when that changes.
- Nothing here collects data itself; the only inputs are the embedded Google Form and Calendar.
