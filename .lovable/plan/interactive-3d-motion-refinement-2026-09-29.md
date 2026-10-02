# Interactive 3D motion refinement

## Build
- Give the homepage portrait layered cursor parallax, with the image tilting and translating independently from its overlay and text.
- Replace the three oversized hero rings with a denser set of smaller, varied orbit circles that keep the current Gravity-inspired look.
- Add a reusable pointer-aware 3D interaction to cards, tool chips, and calls to action: tilt toward the cursor, compress on click, then spring back.
- Preserve keyboard focus, touch behavior, reduced-motion preferences, all existing content, and the scrolling QA Lab background.

## Technical details
- Use lightweight CSS transforms and requestAnimationFrame-based pointer updates rather than adding another animation dependency.
- Scope interactions through shared utility classes and a homepage interaction wrapper so existing links and form behavior remain unchanged.
- Validate desktop cursor movement, click reactions, mobile layout, reduced-motion fallback, and current preview diagnostics.
