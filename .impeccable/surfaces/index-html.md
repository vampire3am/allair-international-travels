---
version: 1
slug: "index-html"
primary_target: "index.html"
related_targets: ["style.css","app.js"]
---

# Homepage redesign

Mode: Persuade, with a journey-planning task. User rejected the first implementation as dated and explicitly requested minimalism. This latest instruction replaces the earlier airport-wayfinding styling. Code-led workflow remains approved.

## Direction contract
THESIS: A minimal travel homepage makes the agency and next step immediately understandable. Remove condensed display lettering, utility bars, colored service bands, oversized form panels and duplicated marketing passages.

OWN-WORLD: White ground, charcoal ink, muted green-gray secondary text and thin neutral rules. One self-hosted Manrope family at regular, medium and semibold weights. Natural photographs remain unobscured, with rounded corners and no text overlay. Understated dark controls and no decorative shadows.

STORY: Visitors understand flights, student support and holidays, explore actual trip ideas, and prepare a detailed journey request. Live payment and ticketing are not represented as available before merchant/inventory onboarding.

FIRST VIEWPORT: A clean logo/navigation row; large regular-weight Kathmandu headline on the left and a short introduction/action on the right; one panoramic Himalayan photograph below. The planner is a single expandable row rather than a permanent side panel. Signature interaction: choosing a destination opens and prefills the planner, then focuses the destination; reduced motion is respected.

FORM: User-pinned minimal revision supersedes the visual output of seed 54956b34. No new concept choice is required: the user explicitly directed simplification of the existing implementation. Three destinations and four native service disclosures replace the long sequence of promotional panels. Agency contact and booking/privacy guidance remain present.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Constraints and unresolved work
Keep existing name/logo and production contact defaults. Keep admin as a local editing utility; do not store personal booking data there. User confirms no inventory provider or merchant account yet and asks for recommendations. Do not invent live prices or simulate confirmed booking/payment. Preserve core flights/student/tours/heli/hotel/transport services; remove irrelevant merchandise from the primary customer path.
