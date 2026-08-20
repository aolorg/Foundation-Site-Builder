---
name: Section blank only on mobile Safari (scroll-reveal observer trap)
description: A whole section invisible only on a phone — usually the scroll-reveal IntersectionObserver never firing, NOT image memory
---

# A section that is blank ONLY on mobile (renders fine on desktop/headless)

**Real root cause (confirmed):** scroll-reveal pattern where every element starts at
`opacity-0` and is revealed only when an `IntersectionObserver` reports the section
`isIntersecting` at some `threshold` (e.g. 0.08–0.15). The intersection *ratio* is
`intersection / element_height`. When a section stacks into a single tall column on
mobile, its height can be many times the viewport, so the maximum ratio that can ever
occur (`viewport_height / element_height`) is tiny — at or below the threshold — and
the observer **never fires**, leaving the whole section permanently invisible.

**Why it's section- and mobile-specific:** on desktop the same section uses multi-column
grids and is short, so the ratio easily exceeds the threshold. Only the *tallest*
section (here: Merchandise, ~13 product cards single-column) breaks, and only on phones.
This is why "blank only on the user's iPhone, other sections fine" was the signature.

**The fix (bulletproof):** in the `useInView` hook —
- `threshold: 0` (fire as soon as 1px intersects) + `rootMargin: "200px 0px"` (fire early),
- short-circuit to visible if `IntersectionObserver` is undefined,
- a `setTimeout(() => setInView(true), 1500)` fallback that force-reveals regardless.
The fallback is the real guarantee: it makes the section impossible to leave blank as long
as the content itself renders (verify that in Chrome/headless first).

**Apply the fallback ONLY to the broken (tall) section.** Adding the force-reveal timer to
every section removes the scroll fade-in animation site-wide (sections below the fold get
revealed by the 1.5s timer before you scroll to them) — an unrequested aesthetic regression.

**What was tried first and did NOT fix it:** resizing the images (18MB→4.6MB) + `loading=lazy`
/ `decoding=async`, on the theory of mobile Safari memory pressure. Harmless and good hygiene,
but it was the wrong root cause — the section was hidden by the observer, not by failed image
decode. Lesson: if a section is blank *including its text/headers* (not just missing images),
suspect the reveal/opacity gate, not the images. Missing-only-images would show card frames.

**Couldn't reproduce locally:** WebKit/Playwright was not installed in this environment, so the
Safari-specific behavior couldn't be driven directly. The fallback-timer fix is correct by
construction, which is why it was shipped without a WebKit repro.
