---
applyTo: '**'
description: 'description'
---
## Purpose

Guide GitHub Copilot to correctly migrate an existing Hugo blog to a Quarkus-based Roq CMS application, **preserving the existing theme, styling, and content structure**, while producing maintainable, production-grade code. All migration logic and template patterns must follow the official Roq “Basics” documentation available at **[https://iamroq.com/docs/basics/](https://iamroq.com/docs/basics/)**.

---

## High-Level Goals

1. **Recreate the Hugo blog** as a **Quarkus + Roq** application, following the conventions and requirements defined in the Roq “Basics” documentation.
2. **Keep the same styling**, including:

    * Layout
    * Typography
    * Color palette
    * Header/footer structure
    * Custom CSS or Sass
    * Any Hugo shortcodes that map to components
3. Migrate all content, including:

    * Blog posts
    * Static pages
    * Assets (images, fonts, media)
    * Taxonomies (categories, tags)
4. Produce a clean, modular project structure aligned with **Quarkus + Roq best practices as documented in the Roq Basics guide**.
5. Avoid unnecessary rewrites; only replace Hugo-specific templating with Roq-compatible patterns.

---

## Project Structure Requirements

When generating or updating files, Copilot must follow both the structure below and the conventions illustrated in Roq “Basics”:

```
/src
  /main
    /java/... (Quarkus application code)
    /resources
      /templates (Roq templates replacing Hugo layouts — structured per Roq Basics)
      /static (CSS, JS, images from Hugo /static)
      /db or /content (Roq content, Markdown or DB-backed depending on config)
roq-config.yaml
application.properties
```

---

## Expectations for Copilot

### 1. **Extract Hugo Theme and Rebuild in Roq (per Roq Basics)**

When analyzing Hugo templates (`layouts/_default`, `partials`, etc.), Copilot must:

* Identify the equivalent Roq component or template structure based on the patterns in the Roq “Basics” guide.
* Port HTML structure **unchanged** except for Hugo templating syntax.
* Convert Hugo templating (`{{ .Title }}`, `{{ .Content }}`, ranges, metadata, partials) to the Roq template syntax described in the “Basics” section.
* Maintain Hugo SEO metadata and permalink structures where possible.

### 2. **Preserve Styling**

* Copy all CSS, Sass, fonts, and JS files as-is into `/static`.
* Ensure path rewrites do not break asset references.
* Do not modernize or alter styling unless explicitly instructed.

### 3. **Content Migration Rules**

Following Roq Basics content guidelines:

* Convert front matter from Hugo’s TOML/YAML into the Roq metadata structure.
* Preserve all metadata (title, date, tags, categories, summary, slug).
* Maintain the existing directory hierarchy unless Roq requires adjustments.

### 4. **API and Backend Expectations**

* Generate only the minimal Quarkus REST endpoints required by Roq Basics.
* Use standard Quarkus patterns (CDI, resource classes).
* Avoid implementing custom services for features Roq already supports natively.

### 5. **Code Style Requirements**

* Use idiomatic Quarkus patterns.
* Follow Roq template conventions exactly as documented in the “Basics” section.
* Avoid introducing external UI frameworks.
* Ensure all generated code compiles and adheres to Maven/Quarkus standards.

---

## Prohibited Actions for Copilot

Copilot must **not**:

* Alter styling unless explicitly asked.
* Replace Hugo shortcodes with complex components not defined in the Roq Basics patterns.
* Introduce unrelated refactors.
* Add new UI frameworks.
* Generate placeholder content unless instructed.

---

## Example Migration Tasks Copilot Should Perform Automatically

1. When encountering a Hugo layout file:

    * Replace Hugo template expressions with their Roq Basics equivalents.
    * Port loops, ranges, metadata access, and partials into the appropriate Roq template constructs.
    * Keep HTML identical unless syntax must change.
2. When copying assets:

    * Rewrite URLs only if the folder structure changes under the Roq Basics model.
3. When converting front matter:

    * Map Hugo metadata keys to Roq metadata keys, adding comments when assumptions are required.

---

## Behavioral Guidelines

* Favor explicit structures that match the Roq Basics examples.
* When uncertain about a mapping, insert a comment explaining reasoning.
* Maintain strict separation of templates, content, and backend logic.
* Favor clarity, modularity, and maintainability.

---

## Final Note

The key outcome is a **visually identical reproduction of the Hugo blog**, rebuilt using **Quarkus + Roq**, while strictly following the architecture, templates, and conventions defined in **Roq’s “Basics” documentation**.

