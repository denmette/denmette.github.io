# Custom Theme

Dit thema bevat de layouts en stijlen voor `casteels.dev`.

## Structuur

- `layouts/_default/`: basislayouts voor home, single, taxonomy en sitemap.
- `layouts/partials/`: herbruikbare bouwblokken zoals `head`, `header`, `footer`, kaarten en metadata.
- `layouts/shortcodes/`: content shortcodes.
- `assets/css/main.css`: Tailwind v4 inputbestand.
- `data/theme/icons.yaml`: centrale iconcatalogus met bron en render-defaults.

## CSS-aanpak

- Blijf zo dicht mogelijk bij Tailwind utilities en theme tokens.
- Gebruik `@theme` voor fonts en kleuren, niet losse `font-family`-regels verspreid in CSS.
- Zet paginagebonden typografie bij voorkeur op de markup met `prose-*` utilities.
- Voeg alleen `@layer base` of component-CSS toe als utilities het niet helder genoeg maken.

## Waar vaste UI-data vandaan komt

- Hoofdnavigatie komt uit `hugo.toml` onder `[menus.main]`.
- SEO, auteur, persoon- en comments-configuratie komen uit `hugo.toml` onder `[params]`.
- Iconen komen uit `themes/custom/data/theme/icons.yaml`.

## Iconen

- Bron: [Tabler Icons](https://tabler.io/icons)
- Licentie: MIT
- Alle iconen worden via `layouts/partials/icon.html` gerenderd.
- Grootte, stroke width en andere SVG-defaults zitten expliciet in de catalogus, niet verspreid over inline SVG's.
