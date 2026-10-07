# Cinematic 3D orbit impact

## Build
- Enhance only the existing hero orbit and its interaction logic; preserve the current portrait, copy, buttons, layout, navigation, responsive behavior, and every other homepage section.
- Make the existing orbit region clickable/tappable with an accessible label, while leaving normal links and hero controls unaffected.
- Keep the idle orbit restrained, then run one replayable 2.8-second sequence: charge, multi-plane acceleration, audience-facing launch, camera impact, shockwave, and smooth return.
- Layer original futuristic rings, segmented marks, geometric glyphs, energy arcs, trails, sparks, and foreground fragments using the current cyan, violet, and lime palette.
- Make the approach read as real depth through a perspective scene with independently transformed layers, strong `translateZ`, changing plane rotations, near-camera clipping, and foreground rings extending beyond the viewport—not by zooming the portrait.
- Add a brief impact flash and controlled hero-only camera shake after the orbit reaches the viewer.
- Support mouse, keyboard activation, and touch; ignore repeat activation while the sequence is running.
- Preserve subtle desktop pointer tilt, simplify mobile rendering, and provide a restrained reduced-motion pulse instead of the full launch.

## Technical details
- Keep `Hero.tsx` as the existing component and extend its current SVG/interaction implementation rather than replacing it.
- Use CSS 3D transforms, keyframes, opacity, filters, and pseudo-elements for the full sequence; use JavaScript only for pointer tilt and restarting the finite animation state.
- Isolate all new selectors under the hero spell scene so the existing card-click effects and persistent scrolling QA Lab remain unchanged.
- Validate idle appearance, click timing, post-impact return, replay, mobile tap behavior, reduced-motion behavior, focus accessibility, and preview diagnostics.
