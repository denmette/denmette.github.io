(function () {
  var toggle = document.querySelector("[data-mobile-nav-toggle]");
  var panel = document.querySelector("[data-mobile-nav-panel]");
  var lastFocused = null;
  var focusableSelectors = [
    "a[href]",
    "button:not([disabled])",
    "textarea:not([disabled])",
    "input:not([type=\"hidden\"]):not([disabled])",
    "select:not([disabled])",
    "[tabindex]:not([tabindex=\"-1\"])",
  ];

  if (!toggle || !panel) {
    return;
  }

  function getFocusableElements() {
    return Array.prototype.slice.call(
      panel.querySelectorAll(focusableSelectors.join(","))
    ).filter(function (el) {
      return !el.hasAttribute("disabled") && el.offsetParent !== null;
    });
  }

  var content = panel.querySelector("[data-mobile-nav-content]");

  function setOpen(open) {
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Sluit navigatie" : "Open navigatie");
    panel.setAttribute("aria-hidden", open ? "false" : "true");
    panel.classList.toggle("hidden", !open);

    if (open) {
      lastFocused = document.activeElement;
      var focusables = getFocusableElements();
      if (focusables.length) {
        focusables[0].focus();
      }
      if (content) {
        content.classList.remove("opacity-0", "-translate-y-2");
        content.classList.add("opacity-100", "translate-y-0");
      }
    } else if (lastFocused && typeof lastFocused.focus === "function") {
      lastFocused.focus();
      lastFocused = null;
      if (content) {
        content.classList.add("opacity-0", "-translate-y-2");
        content.classList.remove("opacity-100", "translate-y-0");
      }
    }
  }

  setOpen(false);

  toggle.addEventListener("click", function () {
    var isOpen = toggle.getAttribute("aria-expanded") === "true";
    setOpen(!isOpen);
  });

  panel.addEventListener("keydown", function (event) {
    if (event.key !== "Tab") {
      return;
    }

    var focusables = getFocusableElements();
    if (!focusables.length) {
      return;
    }

    var first = focusables[0];
    var last = focusables[focusables.length - 1];
    var active = document.activeElement;

    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  });

  panel.addEventListener("click", function (event) {
    var target = event.target;
    if (target && target.tagName && target.tagName.toLowerCase() === "a") {
      setOpen(false);
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      setOpen(false);
    }
  });
})();
