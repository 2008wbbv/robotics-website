/* ==========================================================================
   SITE CONFIG — the only file you need to edit to connect the Google Forms,
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
    github: "https://github.com/2008wbbv",
    instagram: "PASTE_INSTAGRAM_URL_HERE",
    gofundme: "PASTE_GOFUNDME_URL_HERE",
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
