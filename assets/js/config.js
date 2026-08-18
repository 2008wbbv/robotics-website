/* ==========================================================================
   SITE CONFIG: the only file you need to edit to connect the Google Forms,
   the Google Calendar, and the team's social links. Nothing here is secret;
   it all ships to the browser, so only ever put public links in this file.

   Anything left as "PASTE_..." shows a friendly "coming soon" state instead
   of a broken embed or a dead link.
   ========================================================================== */

window.SITE_CONFIG = {
  /* --- Team identity ---------------------------------------------------- */
  teamName: "Millis Dynamics",
  teamTagline: "FIRST Tech Challenge · Millis, MA",
  seasonName: "2026–27 season",

  contactEmail: "MillisDynamics@gmail.com",

  /* --- Social + support links ------------------------------------------- */
  /* Each of these has a reserved spot on the site. Fill one in and its button
     goes live; leave it as PASTE_... and the button shows "coming soon". */
  social: {
    github: "https://github.com/Millis-Dynamics",
    instagram: "https://www.instagram.com/millisdynamics/",
    /* Fundraiser is not live yet; the button shows "coming soon" until this is set. */
    gofundme: "PASTE_GOFUNDME_URL_HERE",
  },

  /* --- Internal team portal (portal.html) -------------------------------- */
  /* Links the team uses to run itself. The portal page is unlisted and marked
     noindex, but it is NOT private. Anything reachable from a static site is
     public to anyone with the URL. Never put passwords or private data here. */
  portal: {
    /* Passcode gate for portal.html. Only the SHA-256 of the passcode lives
       here, so the passcode itself is not in the repository. Change it by
       running, in any terminal:
         printf '%s' 'your-new-passcode' | shasum -a 256
       and pasting the hash below. Set this to "" to remove the gate.
       IMPORTANT: this keeps the page out of casual view. It is NOT security.
       The link URLs are still in the page source, and the hash can be attacked
       offline. For a real lock, host behind Cloudflare Access (see README). */
    passcodeSha256: "bbd478548737e788156ce80af7065791156e05c7b0a4332279b5ddb6814abe1b",

    hcb: "PASTE_HCB_URL_HERE",          /* e.g. https://hcb.hackclub.com/your-team */
    drive: "",                           /* optional: shared Google Drive folder */
    budget: "",                          /* optional: the budget spreadsheet */
    formResponses: "",                   /* optional: sign-up form responses sheet */
  },

  /* --- Student interest form --------------------------------------------
     The short link (forms.gle) is what we share; the long /viewform URL is
     what the page frames. Note: the ?embedded=true variant of this form
     currently returns a sign-in wall, so the plain viewform URL is used
     instead. If the embed ever goes blank, clear embedUrl and the page falls
     back to a panel with the button. */
  studentForm: {
    embedUrl: "https://docs.google.com/forms/d/e/1FAIpQLSeym_kJD-1Y6CntUpLuF-LRu0QjH3s7IDfTeXehPErSBVUJOA/viewform",
    shareUrl: "https://forms.gle/KfDMLwq7tTvbS8Mb6",
  },

  /* Volunteers email us instead of filling in a form, so there is no
     volunteer form to configure. */

  /* --- Team calendar ---------------------------------------------------- */
  calendar: {
    /* Google Calendar: Settings -> (pick the calendar) -> Integrate calendar
       -> Embed code -> copy the src="..." URL. The calendar must be public. */
    embedUrl: "PASTE_GOOGLE_CALENDAR_EMBED_URL_HERE",
    publicUrl: "",
    timeZone: "America/New_York",
  },
};
