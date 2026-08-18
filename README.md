# Millis Dynamics — team website

Static website for Millis Dynamics, the FIRST Tech Challenge team in Millis, Massachusetts.
Plain HTML, CSS, and JavaScript — no build step, no dependencies, no framework. Open a file and
it works.

## Pages

| File | What it is |
| --- | --- |
| `index.html` | Home: brand hero, what the team does, the season, news, sponsors |
| `about.html` | The team, how FTC works, the season, commitment, FAQ |
| `roster.html` | Leadership chart, the full roster table, advisors and volunteers |
| `resources.html` | FIRST resources: manuals, docs, SDK, training, scholarships, grants |
| `news.html` | All updates, newest first |
| `calendar.html` | Embedded Google Calendar plus the season milestones |
| `sponsors.html` | Sponsorship tiers, what support pays for, in-kind help, sponsor wall |
| `join.html` | The student interest form, how to volunteer, and sponsorship |
| `portal.html` | Internal link hub (GitHub, HCB, …) behind a team passcode, in the nav |

## Editing the things you'll actually change

### 1. Connect the forms and the calendar — `assets/js/config.js`

This is the only file you need to touch to wire up the embeds.

- **Student form** (`studentForm`): `embedUrl` is the URL the page frames, `shareUrl` is the
  forms.gle link behind the "Open the form in a new tab" button. Both are already set.
  One quirk worth knowing: this form's `?embedded=true` URL returns a sign-in wall and refuses to
  be framed, so `embedUrl` uses the plain `/viewform` URL instead. If the embed ever shows up blank,
  set `embedUrl` to `""` and the page falls back to a panel with the button, which always works.
- **Volunteers** have no form; they email the team. That path is plain HTML on `join.html#volunteer`.
- **Calendar** (`calendar`): in Google Calendar, **Settings → (your calendar) → Access permissions**
  → tick **Make available to public**, then scroll to **Integrate calendar** and copy the `src="…"`
  URL out of the embed code.
- **Contact email** (`contactEmail`): every "email us" link on the site picks it up automatically.
- **Social + support links** (`social`): `github` and `instagram` are live. `gofundme` is still
  `PASTE_…`, so its button shows a muted "coming soon" rather than a dead link; paste the fundraiser
  URL there when it exists and the button goes live everywhere at once.
- **Portal links** (`portal`): `hcb`, plus optional `drive`, `budget`, and `formResponses`. These
  fill the cards on `portal.html` the same way — an unset link renders as "not set up yet".
- **Portal passcode** (`portal.passcodeSha256`): see "The team portal" below.

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

### 5. The roster — `roster.html`

Three parts:

1. **Leadership chart** — president, engineering, social media, fundraising, outreach and
   recruiting, and an administrative helper. Fundraising and outreach each note two open team
   slots alongside their lead. Everyone on the team works on the robot; these roles are what
   people take on in addition, which is what the page says.
2. **The full roster** — a name / grade / works-on table. Add a row per member and delete the
   "no names listed yet" row once the first name is in.
3. **Advisors and volunteers** — cards sized for headshots.

To fill a leadership role, replace the open card with a named one. There is a commented-out
template right above each grid:

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

Swap the initials for a photo with `<div class="member__avatar"><img src="assets/img/team/alex.jpg" alt=""></div>`,
and add as many link chips inside `member__links` as you like.

Advisors and volunteers are meant to have photos: use the `member--photo` variant (already on
those cards), which renders a larger round headshot. Drop the images in `assets/img/team/`,
roughly square and at least 200px.

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
--brand: #c8102e;         /* Millis red, from the logo */
--accent: #a81c2b;        /* the deeper red from the logo gradient */
--accent-strong: #8b1523; /* hover state for accent buttons */
--accent-ink: #ffffff;    /* text that sits on top of the accent */
```

Everything else is derived from those, so changing them re-skins the site. The palette is
deliberately red plus grey, the same two colours as the logo. Dark mode uses a light red
(`#ff8a99`) so the accent stays legible on dark surfaces.

Two places override the accent on purpose: the dark hero and the red band use a **white** accent
button, because a red button on a red band would disappear. If you change the accent to something
light, set `--accent-ink` to a dark colour so button labels stay readable.

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

## The team portal, and its passcode

`portal.html` is a link hub for the team — GitHub, HCB, and whatever else you add to `config.portal`.
It sits in the main navigation behind a lock icon, and in the footer, so the team can find it. It
still carries a `noindex, nofollow` tag so search engines skip it.

It also has a **passcode gate**. Only the SHA-256 hash of the passcode is stored, in
`config.portal.passcodeSha256`, so the passcode itself is not in the repository. Unlocking is
remembered for the browser session. To change the passcode:

```bash
printf '%s' 'your-new-passcode' | shasum -a 256
```

Paste the hash into `config.portal.passcodeSha256`. Set it to `""` to remove the gate entirely.

**Be clear-eyed about what this is.** It is a speed bump, not security. The whole check runs in the
browser, the link URLs are still readable in the page source, and the hash can be attacked offline.
It keeps the page out of casual view; it does not protect anything. That is an acceptable trade here
because the tools behind those links (GitHub, HCB) each have their own real login, and nothing
secret is stored on the page.

If you ever need real protection, the site has to move somewhere that can enforce it. The free
option is **Cloudflare Pages + Cloudflare Access**: host the same files there, then put an Access
policy on `/portal.html` that requires a Google login from a list of email addresses. That is
genuine authentication, enforced before the file is served, and it needs no code changes here.

## House style

Two things to keep consistent when you edit copy:

- **No em dashes** anywhere in visible text. Use a comma, a colon, a full stop, or brackets instead.
  En dashes in ranges (`Dec–Mar`, `2026–27`) are fine.
- **Do not promise a cost-free season.** The site says we are fundraising so cost is not a barrier
  and that we cannot promise a free season yet. Change that only when it is actually true.
- **Student names.** The leadership cards are unnamed on purpose. Add names when you are ready,
  and consider first names only for students.

## Notes

- Season milestones on the calendar page come from the FTC schedule (kickoff September 12, 2026;
  qualifiers December–March; state championship late March). Confirm specific event dates as they
  are published and put them on the team's Google Calendar.
- The sponsorship goal ($5,500) and the tier amounts are plain HTML in `sponsors.html`.
- Nothing here collects data itself; the only inputs are the embedded Google Forms and Calendar.
