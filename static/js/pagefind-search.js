import * as pagefind from "/pagefind/pagefind.js";

(function () {
  var input = document.querySelector("#search-input");
  var resultsEl = document.querySelector("#search-results");
  var statusEl = document.querySelector("#search-status");

  if (!input || !resultsEl || !statusEl) {
    return;
  }

  var formatter = new Intl.DateTimeFormat("nl-BE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  var debounceId = null;
  var activeSearch = 0;

  function setStatus(message) {
    statusEl.textContent = message;
  }

  function clearResults() {
    resultsEl.innerHTML = "";
    setStatus("");
  }

  function parseTags(raw) {
    if (!raw) {
      return [];
    }
    return raw
      .split(",")
      .map(function (tag) {
        return tag.trim();
      })
      .filter(Boolean);
  }

  function formatDate(value) {
    if (!value) {
      return "";
    }
    var parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) {
      return "";
    }
    return formatter.format(parsed);
  }

  function renderResult(result) {
    var li = document.createElement("li");
    li.className =
      "rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700";

    var title = (result.meta && result.meta.title) || result.title || "";
    var dateText = formatDate(result.meta && result.meta.date);
    var tags = parseTags(result.meta && result.meta.tags);
    var summary = result.meta && result.meta.summary;

    var titleLink = document.createElement("a");
    titleLink.href = result.url;
    titleLink.className =
      "text-lg font-semibold text-slate-900 underline-offset-4 hover:text-moss hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:text-slate-100 dark:hover:text-mustard dark:focus-visible:ring-moss/70 dark:focus-visible:ring-offset-slate-950";
    titleLink.textContent = title;

    var metaWrap = document.createElement("div");
    metaWrap.className =
      "mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400";

    if (dateText) {
      var dateEl = document.createElement("span");
      dateEl.textContent = dateText;
      metaWrap.appendChild(dateEl);
    }

    if (tags.length) {
      var tagWrap = document.createElement("div");
      tagWrap.className = "flex flex-wrap items-center gap-2";
      tags.forEach(function (tag) {
        var chip = document.createElement("span");
        chip.className =
          "rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-semibold text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300";
        chip.textContent = tag;
        tagWrap.appendChild(chip);
      });
      metaWrap.appendChild(tagWrap);
    }

    var summaryEl = document.createElement("p");
    summaryEl.className = "mt-3 text-sm text-slate-700 dark:text-slate-300";
    if (summary) {
      summaryEl.textContent = summary;
    } else if (result.excerpt) {
      summaryEl.innerHTML = result.excerpt;
    }

    li.appendChild(titleLink);
    if (dateText || tags.length) {
      li.appendChild(metaWrap);
    }
    li.appendChild(summaryEl);

    return li;
  }

  function renderEmpty(query) {
    setStatus('Geen resultaten voor "' + query + '".');
    resultsEl.innerHTML = "";
  }

  async function runSearch(query) {
    var searchId = (activeSearch += 1);
    setStatus("Zoeken...");

    try {
      var search = await pagefind.search(query);
      if (searchId !== activeSearch) {
        return;
      }

      if (!search.results.length) {
        renderEmpty(query);
        return;
      }

      var fragment = document.createDocumentFragment();
      for (var i = 0; i < search.results.length; i += 1) {
        var data = await search.results[i].data();
        if (searchId !== activeSearch) {
          return;
        }
        fragment.appendChild(renderResult(data));
      }

      resultsEl.innerHTML = "";
      resultsEl.appendChild(fragment);
      setStatus(
        search.results.length +
          (search.results.length === 1 ? " resultaat" : " resultaten") +
          ' voor "' +
          query +
          '".'
      );
    } catch (error) {
      setStatus("Zoeken mislukt, probeer opnieuw.");
    }
  }

  input.addEventListener("input", function () {
    var query = input.value.trim();

    if (!query) {
      activeSearch += 1;
      clearResults();
      return;
    }

    if (debounceId) {
      window.clearTimeout(debounceId);
    }

    debounceId = window.setTimeout(function () {
      runSearch(query);
    }, 150);
  });
})();
