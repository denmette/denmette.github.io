import { readFile } from "node:fs/promises";

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (!token.startsWith("--")) continue;
    const key = token.slice(2);
    const value = argv[i + 1];
    if (!value || value.startsWith("--")) {
      args[key] = true;
      continue;
    }
    args[key] = value;
    i += 1;
  }
  return args;
}

function parseSitemap(xml) {
  if (!xml) return new Map();

  const entries = new Map();
  const urlBlockPattern = /<url>([\s\S]*?)<\/url>/g;
  const locPattern = /<loc>(.*?)<\/loc>/;
  const lastmodPattern = /<lastmod>(.*?)<\/lastmod>/;

  for (const match of xml.matchAll(urlBlockPattern)) {
    const block = match[1];
    const locMatch = block.match(locPattern);
    if (!locMatch) continue;
    const loc = locMatch[1].trim();
    const lastmod = block.match(lastmodPattern)?.[1]?.trim() ?? "";
    entries.set(loc, lastmod);
  }

  return entries;
}

function normalizeSiteUrl(siteUrl) {
  return siteUrl.endsWith("/") ? siteUrl.slice(0, -1) : siteUrl;
}

function keyLocationFor(siteUrl, keyFilePath) {
  const normalizedSiteUrl = normalizeSiteUrl(siteUrl);
  const filename = keyFilePath.split("/").pop();
  return `${normalizedSiteUrl}/${filename}`;
}

function deriveHost(siteUrl) {
  return new URL(siteUrl).host;
}

function collectChangedUrls(previousMap, currentMap) {
  const changed = new Set();

  for (const [url, lastmod] of currentMap.entries()) {
    if (!previousMap.has(url) || previousMap.get(url) !== lastmod) {
      changed.add(url);
    }
  }

  for (const url of previousMap.keys()) {
    if (!currentMap.has(url)) {
      changed.add(url);
    }
  }

  return [...changed].sort();
}

async function readOptionalFile(path) {
  if (!path) return "";
  try {
    return await readFile(path, "utf8");
  } catch (error) {
    if (error && error.code === "ENOENT") {
      return "";
    }
    throw error;
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const siteUrl = args["site-url"];
  const previousSitemapPath = args["previous-sitemap"];
  const currentSitemapPath = args["current-sitemap"];
  const keyFilePath = args["key-file"];
  const dryRun = Boolean(args["dry-run"]);

  if (!siteUrl || !currentSitemapPath || !keyFilePath) {
    throw new Error(
      "Usage: node scripts/indexnow-submit.mjs --site-url <url> --current-sitemap <path> --key-file <path> [--previous-sitemap <path>] [--dry-run]",
    );
  }

  const [previousXml, currentXml, key] = await Promise.all([
    readOptionalFile(previousSitemapPath),
    readFile(currentSitemapPath, "utf8"),
    readFile(keyFilePath, "utf8"),
  ]);

  const previousMap = parseSitemap(previousXml);
  const currentMap = parseSitemap(currentXml);
  const changedUrls = collectChangedUrls(previousMap, currentMap);

  console.log(`IndexNow previous URLs: ${previousMap.size}`);
  console.log(`IndexNow current URLs: ${currentMap.size}`);
  console.log(`IndexNow changed URLs: ${changedUrls.length}`);

  if (changedUrls.length === 0) {
    return;
  }

  const normalizedKey = key.trim();
  const payload = {
    host: deriveHost(siteUrl),
    key: normalizedKey,
    keyLocation: keyLocationFor(siteUrl, keyFilePath),
    urlList: changedUrls,
  };

  if (dryRun) {
    console.log(JSON.stringify(payload, null, 2));
    return;
  }

  const response = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: {
      "content-type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(payload),
  });

  const body = await response.text();
  console.log(`IndexNow response: ${response.status}`);
  if (body) {
    console.log(body);
  }

  if (!response.ok && response.status !== 202) {
    throw new Error(`IndexNow submission failed with ${response.status}`);
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
