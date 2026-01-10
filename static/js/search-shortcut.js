(function () {
  function isEditableTarget(target) {
    if (!target) {
      return false;
    }

    var tag = target.tagName;
    if (!tag) {
      return false;
    }

    var name = tag.toLowerCase();
    if (name === "input" || name === "textarea" || name === "select") {
      return true;
    }

    return target.isContentEditable === true;
  }

  function isMacPlatform() {
    var platform = navigator.platform || "";
    var userAgent = navigator.userAgent || "";
    return /Mac/.test(platform) || /Macintosh|Mac OS X/.test(userAgent);
  }

  function handleShortcut(event) {
    if (event.defaultPrevented) {
      return;
    }

    if (event.isComposing) {
      return;
    }

    var isMac = isMacPlatform();
    var hasModifier = isMac ? event.metaKey : event.ctrlKey;
    if (!(hasModifier && event.key.toLowerCase() === "k")) {
      return;
    }

    if (isEditableTarget(event.target)) {
      return;
    }

    event.preventDefault();

    var searchUrl =
      (document.body && document.body.getAttribute("data-search-url")) ||
      "/zoeken/";
    var searchPath = searchUrl.split("?")[0];

    if (window.location.pathname === searchPath) {
      var input = document.querySelector("#search-input");
      if (input) {
        input.focus();
      }
      return;
    }

    var target = searchUrl.indexOf("?") === -1 ? searchUrl + "?focus=1" : searchUrl + "&focus=1";
    window.location.assign(target);
  }

  window.addEventListener("keydown", handleShortcut);
})();
