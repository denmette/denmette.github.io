# Indexatie en vindbaarheid

Praktisch plan om `https://casteels.dev` sneller en beter vindbaar te maken in zoekmachines en AI-systemen.

## Doel

- Goed geïndexeerd raken in Google en Bing
- Nieuwe of aangepaste posts sneller laten oppikken
- Duidelijke metadata en structuur behouden voor klassieke zoekmachines en AI-crawlers
- Een korte checklist hebben voor publicatie en opvolging

## Wat nu al goed staat

Deze zaken zitten vandaag al in de site:

- XML sitemap via Hugo
  Verwachte URL: `https://casteels.dev/sitemap.xml`
  Opmerking: utility-pagina's zoals interne zoekresultaten horen hier niet in thuis.
- `robots.txt` via `enableRobotsTXT = true` in [hugo.toml](/Users/macs/Coding/Personal/denmette.github.io/hugo.toml)
- Canonical tags in [themes/custom/layouts/partials/head.html](/Users/macs/Coding/Personal/denmette.github.io/themes/custom/layouts/partials/head.html)
- JSON-LD / structured data in [themes/custom/layouts/partials/schema-jsonld.html](/Users/macs/Coding/Personal/denmette.github.io/themes/custom/layouts/partials/schema-jsonld.html)
- `llms.txt` in [static/llms.txt](/Users/macs/Coding/Personal/denmette.github.io/static/llms.txt)
- Leestijd en woordenaantal op posts in [themes/custom/layouts/posts/single.html](/Users/macs/Coding/Personal/denmette.github.io/themes/custom/layouts/posts/single.html)
- Zoekindex via Pagefind

Dat is een sterke basis. De grootste winst zit nu niet in “meer tags”, maar in correcte onboarding bij Google/Bing en sneller updaten van indexen.

## Prioriteit 1: Google Search Console

### Te doen

1. Voeg een **Domain property** toe voor `casteels.dev`
2. Verifieer ownership via DNS
3. Dien de sitemap in: `https://casteels.dev/sitemap.xml`
4. Controleer een paar kernpagina’s via URL Inspection:
   - home
   - `over-mij`
   - 2 à 3 recente posts
5. Volg Page Indexing en Enhancements op

### Officiële links

- Property toevoegen:
  [Google Search Console: Add a property](https://support.google.com/webmasters/answer/34592?hl=en)
- Ownership verifiëren:
  [Google Search Console: Verify site ownership](https://support.google.com/webmasters/answer/9008080?hl=en)
- Sitemap indienen:
  [Google Search Console: Sitemaps report](https://support.google.com/webmasters/answer/7451001?hl=en)
- Basisrichtlijnen:
  [Google Search Essentials](https://developers.google.com/search/docs/essentials)
- Structured data:
  [Google Search Central: Intro to structured data](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)

### Opmerking

Google Analytics helpt je bezoekersgedrag begrijpen, maar **niet** om sneller geïndexeerd te raken. Search Console is hier de juiste tool.

## Prioriteit 2: Bing Webmaster Tools

### Te doen

1. Voeg de site toe in Bing Webmaster Tools
2. Sneller: importeer de property rechtstreeks vanuit Google Search Console
3. Controleer of de sitemap zichtbaar is of dien ze manueel in
4. Gebruik URL Inspection voor een paar kernpagina’s

### Officiële links

- Site toevoegen en verifiëren:
  [Bing Webmaster Tools: Add and verify site](https://www.bing.com/webmasters/help/add-and-verify-site-12184f8b)
- Sitemap beheren:
  [Bing Webmaster Tools: Sitemaps](https://www.bing.com/webmasters/help/sitemaps-3b5cf6ed)
- URL submission:
  [Bing Webmaster Tools: URL Submission](https://www.bing.com/webmasters/help/URL-Submission-62f2860b)

### Waarom dit nuttig is

Bing is niet alleen “nog een zoekmachine”. Het is ook relevant voor Microsoft-zoek, Copilot-ervaringen en bredere discovery buiten Google.

## Prioriteit 3: IndexNow

Voor een statische blog is **IndexNow** waarschijnlijk de beste volgende stap nadat Google/Bing correct aangesloten zijn.

### Waarom

- Je kunt Bing en andere deelnemende zoekmachines meteen laten weten dat een URL nieuw, aangepast of verwijderd is
- Dat is nuttiger dan wachten tot crawlers het organisch opnieuw ontdekken
- Bing raadt dit expliciet aan boven klassieke handmatige URL submission

### Officiële links

- Documentatie:
  [IndexNow documentation](https://www.indexnow.org/documentation?hl=en)

### Wat nu in deze repo zit

- Een IndexNow key file op rootniveau van de site
- Een eerste publicatie die alle sitemap-URLs submit zodra de key live staat
- Een deploy-stap die de vorige live sitemap vergelijkt met de nieuwe build
- Een automatische submit van toegevoegde, gewijzigde en verwijderde URLs naar het IndexNow endpoint

### Aanbevolen aanpak

Hou dit klein:

1. Key file op root publiceren
2. Na deploy oude en nieuwe sitemap vergelijken
3. Alleen de gewijzigde URLs submitten

Voor deze blog is dat voldoende. Niet meteen over-engineeren.

## Prioriteit 4: AI-crawlers netjes toelaten

`llms.txt` is nuttig als extra context, maar het vervangt klassieke indexatie niet.

Wat belangrijker is:

- Laat publieke pagina’s crawlbaar
- Blokkeer relevante crawlers niet onbedoeld in `robots.txt`, CDN of WAF
- Hou canonical URLs, structured data en leesbare HTML op orde

### Officiële link

- OpenAI crawler guidance:
  [OpenAI Help: Allow OpenAI web crawlers](https://help.openai.com/en/articles/20001243-advertiser-guidance-for-allowing-openai-web-crawlers)

### Concreet voor deze site

- `llms.txt` behouden
- Geen zware client-side rendering introduceren voor kerncontent
- Controleren dat `robots.txt` geen accidenten bevat
- Interne zoekpagina's op `noindex,follow` zetten en uit de sitemap houden
- Indien ooit nodig: expliciet toelaten van `OAI-SearchBot`

## Aanbevolen publicatiechecklist

Bij elke nieuwe post:

1. Heeft de post een duidelijke `title`, `description`, `summary`, `slug` en `cover.alt`?
2. Build lokaal:
   `npm run build`
3. Check:
   - canonical
   - JSON-LD
   - leestijd
   - sitemap
4. Publiceer
5. Laat Google/Bing de URL kennen:
   - via sitemap
   - later via IndexNow

## Wat ik hierna zou doen

In deze volgorde:

1. Google Search Console property aanmaken en sitemap indienen
2. Bing Webmaster Tools importeren vanuit Google
3. IndexNow technisch toevoegen aan de repo
4. Na publicatie 1 week later controleren:
   - Google index coverage
   - Bing indexed pages
   - of nieuwe posts effectief sneller opgepikt worden

## Kort besluit

Je basis is al beter dan gemiddeld. De grootste winst zit nu in:

- de site officieel aanmelden bij Google en Bing
- sitemaps effectief monitoren
- later IndexNow toevoegen

Niet in “nog meer meta tags” stapelen.
