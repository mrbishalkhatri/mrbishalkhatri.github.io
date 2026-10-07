# Clean hero effect, advanced CV builder, and blog pages

## Build
- Remove the dash-like glyphs and elongated particle fragments that appear during or after the hero click, while preserving the cinematic rings, prism, impact, and return.
- Rebuild `/cv-builder` from the original ZIP: Classic, Modern, and Minimal templates; accent selection; personal details; repeatable experience, education, skills, and certification entries; languages and interests; live preview; browser persistence; mobile Edit/Preview modes; reset; and print/PDF export.
- Preserve the current portfolio’s dark cyber styling around the builder while keeping the exported CV clean, professional, and ATS-friendly.
- Create two dedicated blog article routes using the complete original article copy, headings, lists, metadata, and navigation back to the portfolio.
- Update the existing homepage blog cards so each opens its matching full article.

## Technical details
- Keep the hero cleanup scoped to the existing spell layers; do not change its timing, 3D launch, or prism behavior.
- Model CV entries as structured React state with stable IDs and local browser storage; use the existing button and design tokens for all controls.
- Use TanStack route files for the two articles, each with unique title, description, Open Graph metadata, and Twitter card metadata.
- Validate the hero after the full 2.9-second sequence, CV editing and print layout on desktop/mobile, article navigation, and preview diagnostics.