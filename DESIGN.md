---
{
  "name": "All Air International Travels & Tours",
  "description": "Minimal travel planning from Kathmandu: white, charcoal, Manrope and native disclosure.",
  "colors": {
    "ink": "#1b2422",
    "muted": "#606966",
    "surface": "#f5f6f5",
    "line": "#dfe4e1",
    "white": "#fff",
    "accent": "#1b2422",
    "accent-hover": "#35433d",
    "focus": "#29725c"
  },
  "typography": {
    "display": {
      "fontFamily": "Manrope, sans-serif",
      "fontSize": "clamp(3rem, 5.5vw, 5rem)",
      "fontWeight": 500,
      "lineHeight": 1.15,
      "letterSpacing": "-0.04em"
    },
    "headline": {
      "fontFamily": "Manrope, sans-serif",
      "fontSize": "clamp(1.9rem, 3vw, 2.5rem)",
      "fontWeight": 500,
      "lineHeight": 1.15,
      "letterSpacing": "-0.035em"
    },
    "title": {
      "fontFamily": "Manrope, sans-serif",
      "fontSize": "1.25rem",
      "fontWeight": 500,
      "lineHeight": 1.15,
      "letterSpacing": "-0.02em"
    },
    "body": {
      "fontFamily": "Manrope, sans-serif",
      "fontSize": "1rem",
      "fontWeight": 400,
      "lineHeight": 1.65
    },
    "label": {
      "fontFamily": "Manrope, sans-serif",
      "fontSize": "0.875rem",
      "fontWeight": 500,
      "lineHeight": 1.65
    }
  },
  "rounded": {
    "button": "7px",
    "pill": "100px",
    "field": "6px",
    "radius": "16px",
    "mobile-photo": "12px"
  },
  "spacing": {
    "section-block": "70px",
    "field-gap": "20px",
    "card-gap": "28px"
  },
  "components": {
    "button-primary": {
      "backgroundColor": "{colors.ink}",
      "textColor": "{colors.white}",
      "rounded": "{rounded.button}",
      "padding": "12px 22px"
    },
    "button-outline": {
      "backgroundColor": "{colors.white}",
      "textColor": "{colors.ink}",
      "rounded": "{rounded.button}",
      "padding": "12px 22px"
    },
    "field-input": {
      "backgroundColor": "{colors.white}",
      "textColor": "{colors.ink}",
      "rounded": "{rounded.field}",
      "padding": "11px 12px"
    },
    "journey-review": {
      "backgroundColor": "{colors.surface}",
      "rounded": "{rounded.radius}",
      "padding": "28px"
    }
  }
}
---

# Design System: All Air International Travels & Tours

## Overview

**Creative North Star: "Room for the journey"**

The user-pinned minimal revision uses white space, charcoal text, one Manrope family, natural photographs and modest dark buttons. Visible content covers three photo destinations plus six flight presets, student guidance, Dubai/Thailand holiday stories, an Everest experience, stays/transfers/visa itineraries, three planning steps, six FAQs and contact. Native disclosures contain the planner, preferences, FAQs and booking/privacy guidance.

**Key Characteristics:**

- Single-family typography and quiet neutral hierarchy.
- Unobscured photography, thin rules and no decorative shadows.
- Visible travel guidance and actions; collapsed planner and FAQs.

Source: style.css, index.html, app.js, PRODUCT.md and the homepage surface brief. Latest build reviewer disposition supplied for this handoff: **ship with no material fixes**. Visual references: .impeccable/review/content/desktop.jpg and mobile.jpg. This documentation pass uses final code and existing screenshots; no runtime review. Staff admin remains a separate local utility.

## Colors

Frontmatter is normative; color keys map to same-named root CSS properties. Charcoal ink supplies text, primary buttons and selected-service underlines. Accent currently has the same literal value as ink. Dark green-gray supplies primary hover; white supplies the page/header/fields and reversed button text. Muted green-gray supplies secondary copy and placeholders, the pale surface supplies review/outline hover, and the neutral line supplies rules and outline borders. Focus green supplies keyboard outlines, carets, text-action hover and destination selection. Only a light color scheme is implemented.

Supporting literals: field border (#b7c1bb), error text (#a2261f), selection fill (#d9e8df), scrollbar thumb (#a4b1aa). These are not additional themes or invented tonal ramps.

## Typography

One self-hosted Manrope family serves headings and body with sans-serif fallback and font-display: swap. Regular (400) and medium (500) files are preloaded; the semibold face declares 600–700. Base headings use 500, balanced wrapping and tight tracking; body is 400. Frontmatter records base roles. Paragraph measure is 65ch. Navigation, field labels and service controls use 0.875rem; inputs use 0.9375rem. Planner heading is 1.5rem with -0.025em tracking. Captions commonly use 0.8125rem. Sizes are role-specific, not a fixed modular scale.

## Layout

Centered wrapper: min(1248px, calc(100% - 96px)). Base sections: 70px block padding. Sticky white header: 96px minimum inner height; root scroll padding: 110px. Hero starts with a 1fr/300px heading/introduction grid, 60px gap, then a 360px-high panoramic photograph without text overlay. The open planner has a 950px maximum width and 12px 0 32px padding. Fields start at four equal columns with 20px gaps; full-width labels span the grid except the first field, explicitly reset to auto at base. Preferences use 1fr/2fr. Destinations use three columns, 28px gaps and 255px-high images. Student/practical-services/FAQ and contact/guidance use 1fr/1.25fr with 90px gaps. Holiday stories use two equal columns with 36px gaps; Everest uses a 1.15fr/1fr image/text split with a 70px gap. Three planning steps use equal columns with 45px gaps. Six flight presets wrap beneath a ruled route directory. Review details start at four columns.

| Maximum width | Current responsive behavior |
| --- | --- |
| 1100px | Wrapper subtracts 64px; nav gap 24px. Hero uses 1fr/260px with 40px gap and heading clamp(3rem, 5.5vw, 4.6rem). Destination images 220px high. Contact/guidance gaps 60px; fields become three columns. |
| 800px | Wrapper subtracts 48px; header minimum 82px. Menu replaces inline nav; expanded links stack beneath branding. Hero heading/introduction stack; heading 3.5rem, intro/action share a row. Photo 310px high. Sections 52px. Destinations retain three columns, 20px gaps, 190px images. Contact/guidance use 0.9fr/1.1fr with 40px gaps. Student/practical-services/FAQ use 1fr/1.2fr with 36px gaps. Holiday stories retain two columns with 24px gaps and 220px images; Everest uses equal columns with a 32px gap and 350px image. Step gaps become 24px; route actions wrap below their label. Office details stack; review uses three columns. |
| 560px | Wrapper subtracts 40px; header minimum 80px; scroll padding 90px. Hero heading clamp(2.35rem, 9.5vw, 3rem), line-height 1.12; intro/action stack. Photo 255px high with 12px corners; secondary caption and planner-summary hint hide. Fields become two columns with 16px gaps, first field full width; input/select type becomes 1rem. Preferences stack; submit fills width. Sections 43px; h2 1.8rem. Destinations become a single list with image/text rows. Student/practical-services/FAQ, holidays, Everest, steps, contact/guidance/footer stack. Holiday stories have 36px gaps; Everest imagery is 245px high. Steps have 25px gaps and bottom rules. Review padding 24px, two-column details and full-width actions. |

JavaScript resets the mobile menu at min-width:801px. The journal section is initially hidden in HTML; styling does not imply populated journal content.

## Elevation & Depth

No box shadows or photographic gradient overlays are implemented. White space, rules, photography and the pale review surface provide separation. Buttons transition background-color over 0.2s ease; scrolling is smooth. Reduced-motion preference removes the transition and restores auto scrolling.

## Shapes

Frontmatter records observed corners: main photographs/review, modest buttons, small pill action, tighter fields and mobile hero override. Borders are 1px. Selected destination images have a 2px focus-colored outline with 4px offset. Global focus-visible uses a 2px outline with 5px offset; fields use 2px offset. No separate chip/tag primitive exists.

## Components

**Actions and navigation.** Primary/outline buttons have 48px minimum height; the small pill action has 44px minimum height and 10px 22px padding. Primary hover uses accent-hover; outline hover uses surface. Underlined text actions have 44px minimum height, 7px 0 padding, 0.875rem/1.5 medium type and focus-green hover. Disabled buttons use opacity 0.5. Nav links underline on hover. The native mobile-menu button exposes aria-controls/aria-expanded; links, Escape and desktop media changes close it. Escape restores button focus; the skip link targets main.

**Planner.** Native details#booking is collapsed initially. Its ruled summary has a CSS chevron and 76px base minimum height (65px on mobile). Hash changes and same-anchor clicks open targeted disclosures. Destination/holiday/student/stay/transfer/heli shortcuts open and prefill the planner, scroll it into view and focus destination; student planning checks the student option, stays prefill Kathmandu. Flight-card selection reflects the clicked shortcut rather than live manual input matching.

Four native service buttons form a labelled aria-pressed group, not ARIA tabs. Selected state uses a 2px charcoal underline and weight 600. Service changes update labels, placeholders, date requirements and suggestions; hidden flight/transfer inputs/selects are disabled. Native labels, validation, date fields, datalist, selects, checkbox, resizable notes and preference disclosure remain. Fields have a 47px minimum height. Date minimums use local dates; returns are required for return flights and stays.

**Request review.** Submission prevents network form submission, calls the journey builder and displays caught errors in role=alert. The review uses textContent in a definition list, then receives focus and scrolls into view. WhatsApp gets an encoded prepared message. Input/change, service changes and shortcuts hide stale review and remove its href; editing returns to the planner.

**The Request Boundary Rule.** The planner prepares a request; the visitor chooses whether to send it in WhatsApp. Checkout is unimplemented, with no inventory provider or merchant account configured.

Journey details remain in page state. The localStorage CMS is not a secure shared booking backend.

**Destinations and visible guidance.** Sydney/Tokyo flight and Bali holiday photo cards include country metadata, descriptions and planner actions. Six additional flight presets cover London, Melbourne, Toronto, Dallas, Dubai and Bangkok. Visible sections provide a student checklist, Dubai/Thailand holiday stories, an Everest image/text experience, stays/transfers/visa-itinerary articles and three numbered planning steps. Contact pairs a WhatsApp action with office details. Images retain dimensions and meaningful alt text, hero fetch priority and lower-image lazy loading.

**FAQs and guidance disclosures.** Six independent native FAQ disclosures reuse the former service-list styling: thin rules, CSS chevrons and 70px base summary minimum height (65px mobile). The old four service disclosures are removed. Booking/privacy guidance also uses native disclosures; targeted anchors open them. No custom accordion keyboard model is needed.

## Do's and Don'ts

### Do:

- Do preserve agency identity, contact defaults, photo credits and provenance.
- Do preserve native controls, visible focus and progressive disclosure.
- Do invalidate stale review and remove its WhatsApp href after journey changes or shortcuts.

### Don't:

- Don't restore condensed headings, colored service bands or an oversized permanent form panel.
- Don't imply live inventory, confirmed booking, ticket issuance, automatic delivery or payment processing.
- Don't store personal journey requests in the browser-only staff CMS or collect passport/card details in the planner.
