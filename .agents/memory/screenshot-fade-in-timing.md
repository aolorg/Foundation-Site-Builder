---
name: app_preview screenshots vs IntersectionObserver fade-ins
description: Why hash-navigated screenshots come back blank on this site, and how to get a clean capture
---

# app_preview screenshots catch fade-in animations mid-transition

On this site, most sections render their content at `opacity-0` and fade to
`opacity-100` only after an `IntersectionObserver` reports them in view (700ms+
transition, often with stagger delays). The Hero is `min-h-screen`, so to capture
a lower section you must navigate to its hash (e.g. `/#merchandise`) and rely on a
scroll-to-hash effect in `App.tsx`.

**Symptom:** the `app_preview` screenshot of `/#merchandise` comes back blank/white
(sometimes with the navbar mid-frame) even though the section renders perfectly in
normal browsing. Easy to misread as "the section is broken."

**Why:** the screenshot tool captures shortly after page load and has no wait/delay
option. If the scroll fires right before capture (e.g. on the `load` event), the
fade-in has barely started → near-zero opacity → blank capture. If the scroll fires
*early* (~50ms after mount), the fade completes before the tool captures → content
visible.

**How to apply:**
- Don't trust a single blank hash-screenshot as proof of breakage. Confirm via:
  `/` screenshot (site health), import/render correctness, assets serving 200,
  typecheck, and workflow logs.
- For a clean capture, make the scroll-to-hash fire early (small `setTimeout`, ~50ms)
  so the fade finishes before the tool snaps. Also re-fire on `load` for correct
  final position after images settle (layout shift moves the target otherwise).
- The architect/code_review tool was failing earlier in the project (server error);
  retrying later in the session worked. Retry before falling back to manual review.
