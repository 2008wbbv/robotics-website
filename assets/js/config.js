/* ==========================================================================
   SITE CONFIG — this is the only file you need to edit to connect the
   Google Forms and the Google Calendar. Nothing here is secret; it all ships
   to the browser, so only ever put public links in this file.

   Anything left as "PASTE_..." shows a friendly setup panel on the page
   instead of a broken embed.
   ========================================================================== */

window.SITE_CONFIG = {
  /* --- Team identity ---------------------------------------------------- */
  teamName: "Millis Robotics",
  teamTagline: "VEX V5 Robotics Competition · Millis, MA",
  seasonName: "2026–27 season",

  /* Public contact address for the team. TODO: replace with the real one
     (a team Gmail is better than a personal address). */
  contactEmail: "millisrobotics@gmail.com",

  /* --- Student sign-up form --------------------------------------------- */
  /* In Google Forms: Publish (or Send) -> Embed <> -> copy the src="..." URL.
     It usually looks like:
     https://docs.google.com/forms/d/e/1FAIpQLS.../viewform?embedded=true */
  studentForm: {
    embedUrl: "https://docs.google.com/forms/d/1RJyB5OMUHeqlamBBbm6lrEzw7Umq-WOROQIZRP4jhGA/viewform?embedded=true",
    shareUrl: "https://docs.google.com/forms/d/1RJyB5OMUHeqlamBBbm6lrEzw7Umq-WOROQIZRP4jhGA/viewform",
  },

  /* --- Volunteer / mentor form ------------------------------------------ */
  /* Make a second Google Form for adults who want to help, then paste its
     embed and share URLs here the same way. */
  volunteerForm: {
    embedUrl: "PASTE_VOLUNTEER_FORM_EMBED_URL_HERE",
    shareUrl: "",
  },

  /* --- Team calendar ---------------------------------------------------- */
  calendar: {
    /* In Google Calendar: Settings -> (pick the calendar) -> Integrate calendar
       -> Embed code -> copy the src="..." URL. The calendar must be set to
       "Make available to public" for visitors to see it. */
    embedUrl: "PASTE_GOOGLE_CALENDAR_EMBED_URL_HERE",

    /* Optional: the public "add to your own calendar" link. */
    publicUrl: "",

    timeZone: "America/New_York",
  },
};
