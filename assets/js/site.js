/* ==========================================================================
   Millis Robotics — site behaviour
   Plain JavaScript, no dependencies, no build step. Loaded on every page
   after config.js and (where needed) news-data.js.
   ========================================================================== */

(function () {
  "use strict";

  var CONFIG = window.SITE_CONFIG || {};
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* A config value counts as "not filled in yet" if it is empty or still
     carries the PASTE_ marker from config.js. */
  function isConfigured(value) {
    return typeof value === "string" && value.trim() !== "" && value.indexOf("PASTE_") === -1;
  }

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  /* ------------------------------------------------------------------------
     Mobile navigation
     ------------------------------------------------------------------------ */

  function initNav() {
    var toggle = document.querySelector("[data-nav-toggle]");
    var nav = document.querySelector("[data-nav]");
    if (!toggle || !nav) return;

    function setOpen(open) {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    }

    toggle.addEventListener("click", function () {
      setOpen(!nav.classList.contains("is-open"));
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        setOpen(false);
        toggle.focus();
      }
    });

    /* Reset when the layout grows back to the desktop nav. */
    window.matchMedia("(min-width: 62.0625rem)").addEventListener("change", function (event) {
      if (event.matches) setOpen(false);
    });
  }

  /* ------------------------------------------------------------------------
     Hero banner — shuffles the photo order on every page load, then rotates
     ------------------------------------------------------------------------ */

  var SLIDE_MS = 6500;

  function initBanner() {
    var banner = document.querySelector("[data-banner]");
    if (!banner) return;

    var track = banner.querySelector("[data-banner-slides]");
    var slides = Array.prototype.slice.call(banner.querySelectorAll("[data-banner-slide]"));
    if (!track || slides.length === 0) return;

    /* Fisher–Yates shuffle, then re-append so the DOM order matches what the
       visitor sees (keeps the dots in step with the slides). */
    for (var i = slides.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = slides[i];
      slides[i] = slides[j];
      slides[j] = tmp;
    }
    slides.forEach(function (slide) {
      track.appendChild(slide);
    });

    var dotsHost = banner.querySelector("[data-banner-dots]");
    var dots = [];
    var index = 0;
    var timer = null;

    function show(next) {
      index = (next + slides.length) % slides.length;
      slides.forEach(function (slide, position) {
        var active = position === index;
        slide.classList.toggle("is-active", active);
        slide.setAttribute("aria-hidden", active ? "false" : "true");
      });
      dots.forEach(function (dot, position) {
        dot.setAttribute("aria-pressed", position === index ? "true" : "false");
      });
    }

    if (dotsHost && slides.length > 1) {
      slides.forEach(function (slide, position) {
        var dot = el("button", "banner__dot");
        dot.type = "button";
        dot.setAttribute("aria-label", "Show photo " + (position + 1) + " of " + slides.length);
        dot.addEventListener("click", function () {
          show(position);
          restart();
        });
        dotsHost.appendChild(dot);
        dots.push(dot);
      });
    }

    function stop() {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    }

    function start() {
      if (prefersReducedMotion || slides.length < 2) return;
      stop();
      timer = window.setInterval(function () {
        show(index + 1);
      }, SLIDE_MS);
    }

    function restart() {
      stop();
      start();
    }

    var prev = banner.querySelector("[data-banner-prev]");
    var next = banner.querySelector("[data-banner-next]");
    if (prev) prev.addEventListener("click", function () { show(index - 1); restart(); });
    if (next) next.addEventListener("click", function () { show(index + 1); restart(); });

    /* Hold still while somebody is reading or tabbing through the controls. */
    banner.addEventListener("mouseenter", stop);
    banner.addEventListener("mouseleave", start);
    banner.addEventListener("focusin", stop);
    banner.addEventListener("focusout", start);
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) stop(); else start();
    });

    show(0);
    start();
  }

  /* ------------------------------------------------------------------------
     News
     ------------------------------------------------------------------------ */

  function sortedPosts() {
    var posts = (window.SITE_NEWS || []).slice();
    posts.sort(function (a, b) {
      return String(b.date).localeCompare(String(a.date));
    });
    return posts;
  }

  /* Noon avoids the date sliding a day either way across time zones. */
  function formatDate(iso) {
    var date = new Date(String(iso) + "T12:00:00");
    if (isNaN(date.getTime())) return String(iso);
    return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  }

  function metaRow(post) {
    var meta = el("div", "post__meta");
    meta.appendChild(el("span", "post__date", formatDate(post.date)));
    if (post.tag) meta.appendChild(el("span", "pill pill--brand", post.tag));
    return meta;
  }

  function renderNewsList() {
    var host = document.querySelector("[data-news-list]");
    if (!host) return;

    var posts = sortedPosts();
    if (posts.length === 0) {
      host.appendChild(el("p", "muted", "No updates posted yet — check back soon."));
      return;
    }

    posts.forEach(function (post) {
      var article = el("article", "post");
      article.appendChild(metaRow(post));
      article.appendChild(el("h2", null, post.title));

      var body = el("div", "post__body");
      var paragraphs = post.body && post.body.length ? post.body : [post.summary];
      paragraphs.forEach(function (text) {
        body.appendChild(el("p", null, text));
      });
      article.appendChild(body);
      host.appendChild(article);
    });
  }

  function renderNewsTeasers() {
    var host = document.querySelector("[data-news-teasers]");
    if (!host) return;

    var limit = parseInt(host.getAttribute("data-news-teasers"), 10);
    var posts = sortedPosts().slice(0, isNaN(limit) ? 3 : limit);
    if (posts.length === 0) {
      host.appendChild(el("p", "muted", "No updates posted yet — check back soon."));
      return;
    }

    posts.forEach(function (post) {
      var card = el("article", "teaser");
      card.appendChild(metaRow(post));
      card.appendChild(el("h3", null, post.title));
      card.appendChild(el("p", null, post.summary));

      var more = el("p", "teaser__more");
      var link = el("a", null, "Read on the news page →");
      link.href = "news.html";
      more.appendChild(link);
      card.appendChild(more);

      host.appendChild(card);
    });
  }

  /* ------------------------------------------------------------------------
     Embeds — Google Forms and Google Calendar
     ------------------------------------------------------------------------ */

  function mountEmbed(name, url, title, extras) {
    var host = document.querySelector('[data-embed="' + name + '"]');
    var setup = document.querySelector('[data-embed-setup="' + name + '"]');
    if (!host) return;

    if (!isConfigured(url)) {
      /* Leave the setup instructions visible and the embed shell hidden. */
      if (setup) setup.hidden = false;
      return;
    }

    var frame = document.createElement("iframe");
    frame.src = url;
    frame.title = title;
    frame.loading = "lazy";
    frame.setAttribute("frameborder", "0");
    frame.textContent = "Loading " + title + "…";
    if (extras) {
      Object.keys(extras).forEach(function (key) {
        frame.setAttribute(key, extras[key]);
      });
    }

    host.appendChild(frame);
    host.hidden = false;
    if (setup) setup.hidden = true;
  }

  /* Point every "open this form in a tab" link at whatever config says, and
     hide the link when there's no URL to send people to. */
  function wireShareLink(attribute, url) {
    document.querySelectorAll("[" + attribute + "]").forEach(function (link) {
      if (isConfigured(url)) {
        link.href = url;
        link.hidden = false;
      } else {
        link.hidden = true;
      }
    });
  }

  function initEmbeds() {
    var student = CONFIG.studentForm || {};
    var volunteer = CONFIG.volunteerForm || {};
    var calendar = CONFIG.calendar || {};

    mountEmbed("student-form", student.embedUrl, "Student sign-up form", {
      marginheight: "0",
      marginwidth: "0",
    });

    mountEmbed("volunteer-form", volunteer.embedUrl, "Volunteer sign-up form", {
      marginheight: "0",
      marginwidth: "0",
    });

    mountEmbed("calendar", calendar.embedUrl, "Millis Robotics team calendar", {
      scrolling: "no",
    });

    wireShareLink("data-student-form-link", student.shareUrl);
    wireShareLink("data-volunteer-form-link", volunteer.shareUrl);
    wireShareLink("data-calendar-link", calendar.publicUrl);
  }

  /* ------------------------------------------------------------------------
     Social + support links (GitHub, Instagram, GoFundMe)
     ------------------------------------------------------------------------ */

  function wireLinkGroup(attribute, urls) {
    document.querySelectorAll("[" + attribute + "]").forEach(function (node) {
      var url = urls[node.getAttribute(attribute)];
      if (isConfigured(url)) {
        node.href = url;
        node.rel = "noopener";
        node.classList.remove("is-pending");
        node.removeAttribute("aria-disabled");
      } else {
        /* Keep the spot on the page, but don't offer a link that goes nowhere. */
        node.removeAttribute("href");
        node.classList.add("is-pending");
        node.setAttribute("aria-disabled", "true");
      }
    });
  }

  function initSocial() {
    wireLinkGroup("data-social-link", CONFIG.social || {});
    wireLinkGroup("data-portal-link", CONFIG.portal || {});
  }

  /* ------------------------------------------------------------------------
     Tabs — used for the student / volunteer sign-up forms
     ------------------------------------------------------------------------ */

  function initTabs() {
    document.querySelectorAll("[data-tabs]").forEach(function (group) {
      var tabs = Array.prototype.slice.call(group.querySelectorAll('[role="tab"]'));
      if (tabs.length === 0) return;

      function select(tab, focus) {
        tabs.forEach(function (other) {
          var active = other === tab;
          other.setAttribute("aria-selected", active ? "true" : "false");
          other.tabIndex = active ? 0 : -1;
          var panel = document.getElementById(other.getAttribute("aria-controls"));
          if (panel) panel.hidden = !active;
        });
        if (focus) tab.focus();
      }

      /* Links like join.html#volunteer should open that tab, not just scroll. */
      function selectFromHash() {
        var target = tabs.filter(function (tab) {
          return "#" + tab.id === window.location.hash;
        })[0];
        if (target) select(target, false);
      }
      window.addEventListener("hashchange", selectFromHash);
      selectFromHash();

      tabs.forEach(function (tab, position) {
        tab.addEventListener("click", function () { select(tab, false); });
        tab.addEventListener("keydown", function (event) {
          var step = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
          if (!step) return;
          event.preventDefault();
          select(tabs[(position + step + tabs.length) % tabs.length], true);
        });
      });
    });
  }

  /* ------------------------------------------------------------------------
     Small fillers: contact address + footer year
     ------------------------------------------------------------------------ */

  function initFillers() {
    if (CONFIG.contactEmail) {
      /* Every marked element gets the mailto; only data-contact-email="show"
         swaps its label for the address itself (buttons keep their wording). */
      document.querySelectorAll("[data-contact-email]").forEach(function (node) {
        if (node.tagName === "A") node.href = "mailto:" + CONFIG.contactEmail;
        if (node.getAttribute("data-contact-email") === "show") {
          node.textContent = CONFIG.contactEmail;
        }
      });
    }

    document.querySelectorAll("[data-year]").forEach(function (node) {
      node.textContent = String(new Date().getFullYear());
    });
  }

  /* ------------------------------------------------------------------------
     Boot
     ------------------------------------------------------------------------ */

  function boot() {
    initNav();
    initBanner();
    renderNewsList();
    renderNewsTeasers();
    initEmbeds();
    initSocial();
    initTabs();
    initFillers();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
