# Millis Dynamics — team website

Static website for Millis Dynamics, the FIRST Tech Challenge team in Millis, Massachusetts.
Plain HTML, CSS, and JavaScript — no build step, no dependencies, no framework. Open a file and
it works.

## Pages

| File | What it is |
| --- | --- |
| `index.html` | Home — shuffling photo banner, what the team does, the season, news, sponsors |
| `about.html` | The team, how FTC works, the season, commitment, FAQ |
| `roster.html` | Lead roles, mentors, and the team's links |
| `news.html` | All updates, newest first |
| `calendar.html` | Embedded Google Calendar plus the season milestones |
| `sponsors.html` | Sponsorship tiers, what support pays for, in-kind help, sponsor wall |
| `join.html` | Students / volunteers / sponsors, with both Google Forms in tabs |
| `portal.html` | Internal link hub (GitHub, HCB, …) — unlisted, not in the menu |

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
- **Portal links** (`portal`): `hcb`, plus optional `drive`, `budget`, and `formResponses`. These
  fill the cards on `portal.html` the same way — an unset link renders as "not set up yet".

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

### 3. The hero, and bringing back the photo banner

Right now the home page hero shows the team's own logo lockup on a white plate, because there are
no team photos yet.

When you have real photos, the shuffling photo banner is still fully supported — the CSS and the
JavaScript for it are untouched. To switch back, replace the `<section class="hero hero--brand">`
block at the top of `index.html` with:

```html
<section class="hero">
  <div class="banner" data-banner aria-roledescription="carousel" aria-label="Team photos">
    <div class="banner__slides" data-banner-slides>
      <img class="banner__slide" data-banner-slide src="assets/img/banner/photo-1.jpg"
           alt="Describe what's happening in the photo." width="1600" height="900">
      <!-- add as many as you like -->
    </div>
    <div class="wrap banner__body">
      <span class="banner__kicker">FIRST Tech Challenge &middot; Millis, MA</span>
      <h1>Design it. Build it. Drive it.</h1>
      <p>Millis Dynamics puts students behind a competition robot.</p>
      <div class="btn-row">
        <a class="btn btn--accent" href="join.html">Join the team</a>
        <a class="btn btn--ghost" href="sponsors.html">Sponsor the team</a>
      </div>
    </div>
    <div class="banner__ui">
      <div class="banner__dots" data-banner-dots role="group" aria-label="Choose a photo"></div>
      <div class="banner__arrows">
        <button class="banner__arrow" type="button" data-banner-prev aria-label="Previous photo">&lsaquo;</button>
        <button class="banner__arrow" type="button" data-banner-next aria-label="Next photo">&rsaquo;</button>
      </div>
    </div>
  </div>
</section>
```

Photos want to be roughly 1600 × 900. The order shuffles on every page load and then rotates; the
dots, arrows, and timing adapt to however many `<img>` tags you leave in. The old placeholder
images are still in `assets/img/banner/` if you want to see it working before you have real ones.

### 4. Add a sponsor logo

Sponsor slots live on `index.html` and `sponsors.html`. Drop the logo in `assets/img/sponsors/` and
replace one placeholder slot:

```html
<div class="sponsor-slot"><img src="assets/img/sponsors/acme.svg" alt="Acme Manufacturing"></div>
```

Sponsorship tier amounts and benefits are plain HTML in `sponsors.html` — edit them there. Two
promises are made in several places, so change them together if you change them at all: **every
sponsor at $100 or more goes on the back of the team shirt**, and **sponsors can pay at their own
pace**. Both appear on `sponsors.html`, `index.html`, and `join.html`. The season fundraising goal
($5,500) appears once, on `sponsors.html`.

### 5. Add a team member — `roster.html`

The roster lives on `roster.html` and currently shows the four open lead roles. To add a real
person, copy the commented-out card that sits right above the grid:

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

## The team portal

`portal.html` is a link hub for the team — GitHub, HCB, and whatever else you add to `config.portal`.
It is deliberately kept out of the main menu (it is linked from the footer only) and carries a
`noindex, nofollow` tag so search engines skip it.

**It is unlisted, not private.** This is a static site with no logins, so anyone who has the URL can
open the page. That is fine for a list of links — the tools behind them have their own logins — but
never put passwords, personal contact details, or anything sensitive on it.

## Notes

- Season milestones on the calendar page come from the FTC schedule (kickoff September 12, 2026;
  qualifiers December–March; state championship late March). Confirm specific event dates as they
  are published and put them on the team's Google Calendar.
- The sponsorship goal ($5,500) and the tier amounts are plain HTML in `sponsors.html`.
- Nothing here collects data itself; the only inputs are the embedded Google Forms and Calendar.
