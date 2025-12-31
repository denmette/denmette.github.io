(function () {
  var CONSENT_KEY = "cookie-consent";
  var CONSENT_COOKIE = "cookie_consent";
  var MEASUREMENT_ID = "G-ERYD26136F";

  var banner = document.querySelector("[data-cookie-banner]");
  var modal = document.querySelector("[data-cookie-modal]");
  var openButtons = document.querySelectorAll("[data-cookie-open-preferences]");
  var acceptAllButton = document.querySelector("[data-cookie-accept-all]");
  var acceptNecessaryButton = document.querySelector("[data-cookie-accept-necessary]");
  var saveButton = document.querySelector("[data-cookie-save]");
  var closeButtons = document.querySelectorAll("[data-cookie-close]");
  var analyticsToggle = document.querySelector("[data-cookie-analytics]");
  var dntNote = document.querySelector("[data-dnt-note]");

  if (!banner || !modal) {
    return;
  }

  function readConsent() {
    var stored = readFromLocalStorage();
    if (stored) {
      return stored;
    }
    var fromCookie = readFromCookie();
    if (fromCookie) {
      writeToLocalStorage(fromCookie);
      return fromCookie;
    }
    return {
      necessary: true,
      analytics: false,
      updatedAt: new Date().toISOString()
    };
  }

  function hasStoredConsent() {
    return !!(readFromLocalStorage() || readFromCookie());
  }

  function readFromLocalStorage() {
    try {
      var stored = localStorage.getItem(CONSENT_KEY);
      if (!stored) {
        return null;
      }
      return JSON.parse(stored);
    } catch (e) {
      return null;
    }
  }

  function writeToLocalStorage(consent) {
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
    } catch (e) {
      // Ignore storage failures.
    }
  }

  function readFromCookie() {
    try {
      if (!document.cookie) {
        return null;
      }
      var pairs = document.cookie.split("; ");
      for (var i = 0; i < pairs.length; i += 1) {
        var parts = pairs[i].split("=");
        if (parts[0] === CONSENT_COOKIE) {
          return JSON.parse(decodeURIComponent(parts.slice(1).join("=")));
        }
      }
      return null;
    } catch (e) {
      return null;
    }
  }

  function isDoNotTrackEnabled() {
    var dnt = navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack;
    if (typeof dnt === "string") {
      return dnt === "1" || dnt.toLowerCase() === "yes";
    }
    return dnt === 1;
  }

  function normalizeConsent(consent) {
    if (isDoNotTrackEnabled()) {
      return {
        necessary: true,
        analytics: false,
        updatedAt: consent.updatedAt
      };
    }
    return consent;
  }

  function writeConsent(consent) {
    var normalized = normalizeConsent(consent);
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify(normalized));
    } catch (e) {
      // Ignore storage failures.
    }
    try {
      var payload = encodeURIComponent(JSON.stringify(normalized));
      document.cookie = CONSENT_COOKIE + "=" + payload + "; Max-Age=31536000; Path=/; SameSite=Lax";
    } catch (e) {
      // Ignore cookie failures.
    }
    return normalized;
  }

  window.trackingManager = window.trackingManager || createTrackingManager();

  function createTrackingManager() {
    var categories = {
      analytics: [],
      marketing: [],
      functional: []
    };

    function register(category, plugin) {
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(plugin);
    }

    function enable(category) {
      var list = categories[category] || [];
      list.forEach(function (plugin) {
        if (plugin && typeof plugin.enable === "function") {
          plugin.enable();
        }
      });
    }

    function disable(category) {
      var list = categories[category] || [];
      list.forEach(function (plugin) {
        if (plugin && typeof plugin.disable === "function") {
          plugin.disable();
        }
      });
    }

    return {
      categories: Object.keys(categories),
      register: register,
      enable: enable,
      disable: disable
    };
  }

  window.trackingManager.register("analytics", {
    name: "GoogleAnalytics",
    enable: loadAnalytics,
    disable: disableAnalytics
  });

  window.trackingManager.register("marketing", {
    name: "FacebookPixel",
    enable: function () {},
    disable: function () {}
  });

  window.trackingManager.register("marketing", {
    name: "LinkedInInsightTag",
    enable: function () {},
    disable: function () {}
  });

  window.trackingManager.register("marketing", {
    name: "InstagramMeta",
    enable: function () {},
    disable: function () {}
  });

  function applyConsent(consent) {
    if (isDoNotTrackEnabled()) {
      disableAnalytics();
      return;
    }
    var analyticsAllowed = !!(consent && consent.analytics);
    if (analyticsAllowed) {
      window.trackingManager.enable("analytics");
    } else {
      window.trackingManager.disable("analytics");
    }
  }

  function loadAnalytics() {
    if (window.__gtagLoaded) {
      return;
    }
    window.__gtagLoaded = true;

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;

    var script = document.createElement("script");
    script.id = "ga-gtag";
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + MEASUREMENT_ID;
    document.head.appendChild(script);

    gtag("js", new Date());
    gtag("config", MEASUREMENT_ID, { anonymize_ip: true });
  }

  function disableAnalytics() {
    window["ga-disable-" + MEASUREMENT_ID] = true;
    var existing = document.getElementById("ga-gtag");
    if (existing && existing.parentNode) {
      existing.parentNode.removeChild(existing);
    }
    var host = window.location.hostname;
    var parts = host.split(".");
    var parentDomain = parts.length > 2 ? "." + parts.slice(-2).join(".") : "." + host;
    var domains = [host, parentDomain];
    var cookieNames = ["_ga", "_gid", "_gat"];
    var allCookies = document.cookie ? document.cookie.split("; ") : [];
    allCookies.forEach(function (entry) {
      var name = entry.split("=")[0];
      if (name.indexOf("_ga_") === 0) {
        cookieNames.push(name);
      }
    });
    cookieNames.forEach(function (name) {
      domains.forEach(function (domain) {
        document.cookie = name + "=; Max-Age=0; Path=/; Domain=" + domain + "; SameSite=Lax";
      });
    });
  }

  function showBanner() {
    banner.classList.remove("hidden");
  }

  function hideBanner() {
    banner.classList.add("hidden");
  }

  var lastFocused = null;

  function openModal() {
    lastFocused = document.activeElement;
    modal.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");

    var consent = readConsent();
    var dntEnabled = isDoNotTrackEnabled();
    analyticsToggle.checked = !!(consent && consent.analytics) && !dntEnabled;
    analyticsToggle.disabled = dntEnabled;
    if (dntNote) {
      dntNote.classList.toggle("hidden", !dntEnabled);
    }

    trapFocus(modal);
  }

  function closeModal() {
    modal.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
    releaseFocusTrap();
    if (lastFocused && typeof lastFocused.focus === "function") {
      lastFocused.focus();
    }
  }

  var focusHandler = null;

  function trapFocus(container) {
    var focusable = container.querySelectorAll(
      "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
    );
    if (!focusable.length) {
      return;
    }
    var first = focusable[0];
    var last = focusable[focusable.length - 1];

    focusHandler = function (event) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeModal();
        return;
      }
      if (event.key !== "Tab") {
        return;
      }
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    container.addEventListener("keydown", focusHandler);
    first.focus();
  }

  function releaseFocusTrap() {
    if (focusHandler) {
      modal.removeEventListener("keydown", focusHandler);
      focusHandler = null;
    }
  }

  acceptAllButton.addEventListener("click", function () {
    var consent = {
      necessary: true,
      analytics: true,
      updatedAt: new Date().toISOString()
    };
    var stored = writeConsent(consent);
    applyConsent(stored);
    hideBanner();
  });

  acceptNecessaryButton.addEventListener("click", function () {
    var consent = {
      necessary: true,
      analytics: false,
      updatedAt: new Date().toISOString()
    };
    var stored = writeConsent(consent);
    applyConsent(stored);
    hideBanner();
  });

  openButtons.forEach(function (button) {
    button.addEventListener("click", openModal);
  });

  closeButtons.forEach(function (button) {
    button.addEventListener("click", closeModal);
  });

  saveButton.addEventListener("click", function () {
    var dntEnabled = isDoNotTrackEnabled();
    var consent = {
      necessary: true,
      analytics: dntEnabled ? false : analyticsToggle.checked,
      updatedAt: new Date().toISOString()
    };
    var stored = writeConsent(consent);
    applyConsent(stored);
    hideBanner();
    closeModal();
  });

  var existing = readConsent();
  var hasStored = hasStoredConsent();
  if (isDoNotTrackEnabled()) {
    disableAnalytics();
  }
  if (existing) {
    applyConsent(existing);
  }
  if (!hasStored) {
    showBanner();
  }
})();
