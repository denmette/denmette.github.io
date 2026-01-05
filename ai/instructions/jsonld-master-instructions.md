# JSON-LD Master Instructions (Agent Playbook)

## 0) Mission
Your task is to produce high-quality JSON-LD structured data that is:
- valid JSON
- aligned with Schema.org
- consistent across the site
- strictly accurate to what the page shows
- safe from spam patterns and conflicting markup

You may be asked to create new JSON-LD or to review and improve existing JSON-LD already present on the page. In all cases, follow these instructions.

---

## 1) Non-negotiables (must always hold)
1. **Visible truth only**  
   Do not mark up facts that are not present on the page (or globally true and clearly represented elsewhere on the site). If it is not visible, do not include it.

2. **One primary intent per page**  
   Each page must have one clear primary entity. Support entities are allowed but must not confuse what the page is about.

3. **No spam and no shortcuts**  
   Do not add:
    - fake FAQ blocks
    - fake reviews or ratings
    - misleading offers, availability, pricing
    - keyword stuffing or irrelevant schema types

4. **No contradictions**  
   JSON-LD must not conflict with:
    - visible page content
    - canonical URL
    - other structured data on the same page

5. **Strict JSON**  
   Must be valid JSON:
    - double quotes only
    - no trailing commas
    - no comments
    - no NaN/Infinity
    - no dangling undefined fields

---

## 2) Inputs and assumptions
When you receive a page, you must base JSON-LD on:
- the visible content of that page
- the page URL (and canonical URL if provided)
- known site-wide facts (organization/site name, logo, social profiles) only if they can be verified from site-wide context

If key data is missing from the page (example: publish date on an article), do not invent it. Omit the field.

---

## 3) Global entity model (use everywhere)
Implement JSON-LD as a graph whenever possible, with stable nodes that can be reused across pages.

### 3.1 Required stable IDs
Use deterministic @id patterns based on the canonical domain and canonical path. Use absolute URLs.

- Organization:
    - `https://{domain}/#org`
- Website:
    - `https://{domain}/#website`
- Logo:
    - `https://{domain}/#logo`
- WebPage:
    - `https://{domain}{path}/#webpage`
- Primary entity (choose by type):
    - Article: `https://{domain}{path}/#article`
    - BlogPosting: `https://{domain}{path}/#article`
    - Product: `https://{domain}{path}/#product`
    - Service: `https://{domain}{path}/#service`
    - FAQPage: `https://{domain}{path}/#faq`
    - Event: `https://{domain}{path}/#event`

Rules:
- Never include query strings or tracking parameters in @id.
- The same entity must always reuse the same @id.
- Do not generate multiple Organization nodes with different @id values.

---

## 4) Base graph (the minimum baseline for most pages)
Unless a page is genuinely exceptional, include these nodes:
- Organization (or LocalBusiness when it is a single-location local business site)
- WebSite
- WebPage

Recommended pattern uses `@graph`:

### Base graph template (fill with real values)
- Always use:
    - `@context: "https://schema.org"`
    - absolute URLs
    - stable @id values

Include:
- Organization:
    - name, url
    - logo (ImageObject) if available
    - sameAs (official social profiles) only if verified
- WebSite:
    - url, name, publisher -> Organization
- WebPage:
    - url, name
    - isPartOf -> WebSite

---

## 5) Pick the correct primary entity
You must choose exactly one primary entity type per page based on page intent.

### 5.1 Common page intents and types
- Home page:
    - Primary focus is the site itself: use WebPage as main, plus Organization and WebSite
- Blog post:
    - Use `BlogPosting` (or `Article` if not a blog)
- News post:
    - Use `NewsArticle` only if it is truly news-style content and the site is operating as a news publisher
- Product detail page:
    - Use `Product` and attach `Offer` or `AggregateOffer` if pricing is shown
- Service page:
    - Use `Service`
- FAQ page:
    - Use `FAQPage` with Question/Answer pairs only if those Q/As are visible on the page
- Category/listing page:
    - Use `CollectionPage` and optionally `ItemList` if items are visible and linkable
- About/Company page:
    - Often Organization-focused, but keep WebPage and Organization nodes consistent
- Contact page:
    - Organization or LocalBusiness plus ContactPoint and PostalAddress if shown
- Event page:
    - Use `Event`

### 5.2 Primary entity linkage
Link the page and primary entity using one of these patterns:
- On the primary entity: `mainEntityOfPage` -> WebPage @id or URL
- On WebPage: `mainEntity` -> primary entity @id

Choose one approach and keep it consistent across the site.

---

## 6) Type-specific minimum fields (do not invent)

### 6.1 BlogPosting / Article
Minimum:
- @id
- headline (must match visible title)
- author (Person or Organization, whichever is shown)
- datePublished (only if visible)
- dateModified (only if visible)
- image (only if shown)
- mainEntityOfPage

Recommended:
- publisher -> Organization
- description (only if it matches visible excerpt/summary)

### 6.2 Product + Offer
Product minimum:
- @id
- name
  Recommended:
- image, description, brand, sku (only if shown)

Offer minimum (only if price is shown):
- price
- priceCurrency
- availability (only if availability is explicitly shown)
- url

Never add AggregateRating unless real reviews/ratings are visible and supported.

### 6.3 Service
Minimum:
- @id
- name
  Recommended:
- description
- provider -> Organization
- areaServed only if clearly stated

### 6.4 FAQPage
Only use if the page visibly contains Q/A pairs.
Minimum:
- mainEntity: array of Question items with acceptedAnswer

Do not add marketing text as fake questions.

### 6.5 Event
Minimum:
- name
- startDate
- location (Place with address or name)
  Recommended:
- endDate if known
- offers if tickets/pricing are shown

---

## 7) Breadcrumbs (recommended when UI has breadcrumbs)
If the page UI shows breadcrumbs, include BreadcrumbList:
- itemListElement with ListItem positions
- each item is a name + URL

Do not invent breadcrumb structure if the UI does not show it.

---

## 8) Multi-language handling
If a site supports multiple locales:
- ensure the JSON-LD strings match the page language
- ensure url points to the current locale page URL
- optionally use `inLanguage` on WebPage/Article when known

---

## 9) Cleaning up existing JSON-LD (important)
If JSON-LD already exists on the page:
1. Do not blindly add more.
2. First detect:
    - duplicates (multiple Organization nodes, repeated Products, conflicting WebPage URLs)
    - invalid JSON
    - fields not supported by visible content
    - missing linking between WebPage and primary entity
3. Then propose a single consolidated solution:
    - one consistent @graph is preferred
    - remove duplicated entities
    - standardize @id format
    - ensure canonical URL alignment

Goal: fewer, cleaner nodes that are correctly linked.

---

## 10) Output requirements (what you must deliver)
When you respond with a solution, provide:

1. **A short summary** of what you changed and why (no fluff).
2. **The final JSON-LD snippet** ready to paste into the page.
3. **A checklist** confirming:
    - valid JSON
    - matches visible content
    - consistent @id strategy
    - no spam patterns
4. **Notes** listing anything you intentionally omitted because it was not visible on the page.

---

## 11) Safety rails (common “do not do this”)
Do not:
- add Review or AggregateRating without real visible reviews and required fields
- mark up FAQPage without visible Q/A
- mark up Product on category pages
- use relative URLs for images or @id
- include phone/address/opening hours unless shown
- include social profile sameAs links unless verified
- create multiple conflicting Organization / WebSite nodes
- include invalid availability or price fields

---

## 12) Minimal base graph example (for reference only)
You must adapt to real values. Do not copy as-is.

{
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Organization",
            "@id": "https://example.com/#org",
            "name": "Example",
            "url": "https://example.com/",
            "logo": {
                "@type": "ImageObject",
                "@id": "https://example.com/#logo",
                "url": "https://example.com/logo.png"
            }
        },
        {
            "@type": "WebSite",
            "@id": "https://example.com/#website",
            "url": "https://example.com/",
            "name": "Example",
            "publisher": { "@id": "https://example.com/#org" }
        },
        {
            "@type": "WebPage",
            "@id": "https://example.com/blog/my-post/#webpage",
            "url": "https://example.com/blog/my-post/",
            "name": "My Post",
            "isPartOf": { "@id": "https://example.com/#website" }
        }
    ]
}

End of file.
