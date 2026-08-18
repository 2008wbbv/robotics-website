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
    hcb: "PASTE_HCB_URL_HERE",          /* e.g. https://hcb.hackclub.com/your-team */
    drive: "",                           /* optional: shared Google Drive folder */
    budget: "",                          /* optional: the budget spreadsheet */
    formResponses: "",                   /* optional: sign-up form responses sheet */
  },

  /* --- Student sign-up form --------------------------------------------- */
  /* In Google Forms: Publish (or Send) -> Embed <> -> copy the src="..." URL.
     It usually looks like:
     https://docs.google.com/forms/d/e/1FAIpQLS.../viewform?embedded=true */
  studentForm: {
    embedUrl: "https://docs.google.com/forms/d/1RJyB5OMUHeqlamBBbm6lrEzw7Umq-WOROQIZRP4jhGA/viewform?embedded=true",
    shareUrl: "https://docs.google.com/forms/d/1RJyB5OMUHeqlamBBbm6lrEzw7Umq-WOROQIZRP4jhGA/viewform",
  },

  /* --- Volunteer / mentor form ------------------------------------------ */
  volunteerForm: {
    embedUrl: "PASTE_VOLUNTEER_FORM_EMBED_URL_HERE",
    shareUrl: "",
  },

  /* --- Team calendar ---------------------------------------------------- */
  calendar: {
    /* Google Calendar: Settings -> (pick the calendar) -> Integrate calendar
       -> Embed code -> copy the src="..." URL. The calendar must be public. */
    embedUrl: "PASTE_GOOGLE_CALENDAR_EMBED_URL_HERE",
    publicUrl: "",
    timeZone: "America/New_York",
  },
};
