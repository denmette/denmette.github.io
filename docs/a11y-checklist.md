# Accessibility checklist (Hugo theme)

Use this list for quick manual checks after template or content changes.

## Keyboard-only navigation flow
- Tab from the top of the page: focus starts on the skip link, then header controls, then nav, then main content.
- Ensure all interactive elements (links, buttons, form controls) can be reached and activated with Enter/Space.
- Confirm no focus traps: you can always tab forward and backward through all controls.

## Focus visibility
- Every link and button shows a clear focus outline (light and dark modes).
- Focus outline is not clipped by overflow/rounded containers.

## Skip link behavior
- Skip link is the first focusable element.
- Activating it moves focus to `#main` and skips header/nav.

## Headings and landmarks
- One `h1` per page (home, posts, tag terms, tag pages, 404).
- Heading levels are in order (no jumps like h1 -> h3).
- Landmarks exist: `header`, `nav`, `main#main`, `footer`.

## Link names / button names
- Links have meaningful text (avoid “click here”).
- Icon-only controls have a visible label or an accessible name (aria-label or sr-only text).
- Buttons are real `<button>` elements (no clickable divs/spans).

## Contrast (light/dark)
- Body text is readable on backgrounds in both modes.
- Borders/focus rings are visible against their backgrounds.
- Disabled states are distinguishable by more than color (e.g., dashed border + opacity).

## Reduced motion
- With `prefers-reduced-motion`, hover/transition effects do not animate.

## Image alt rules
- Content images must have meaningful alt text.
- Decorative images use `alt=""` and `aria-hidden="true"`.
- Avoid repeating adjacent text in alt unless it adds context.
