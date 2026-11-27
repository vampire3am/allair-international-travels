---
{
  "name": "All Air International Travels & Tours",
  "description": "Crisp airport wayfinding from a Kathmandu travel desk; documented from the implemented homepage.",
  "colors": {
    "ink": "#102f3a",
    "muted": "#4d646c",
    "accent": "#b84217",
    "accent-hover": "#923411",
    "white": "#fff",
    "surface": "#edf3f3",
    "line": "#cbd8db",
    "light-text": "#d3e3e5",
    "focus": "#156b91"
  },
  "typography": {
    "display": {
      "fontFamily": "\"Barlow Condensed\", sans-serif",
      "fontSize": "clamp(3.4rem, 5.6vw, 5.4rem)",
      "fontWeight": 600,
      "lineHeight": 1.01,
      "letterSpacing": "-0.02em"
    },
    "headline": {
      "fontFamily": "\"Barlow Condensed\", sans-serif",
      "fontSize": "clamp(2.45rem, 4.2vw, 3.75rem)",
      "fontWeight": 600,
      "lineHeight": 1.06,
      "letterSpacing": "-0.015em"
    },
    "title": {
      "fontFamily": "\"Barlow Condensed\", sans-serif",
      "fontSize": "1.8rem",
      "fontWeight": 600,
      "lineHeight": 1.06
    },
    "body": {
      "fontFamily": "\"Source Sans 3\", sans-serif",
      "fontSize": "1.0625rem",
      "fontWeight": 400,
      "lineHeight": 1.55
    },
    "label": {
      "fontFamily": "\"Source Sans 3\", sans-serif",
      "fontSize": "0.9375rem",
      "fontWeight": 600
    }
  },
  "rounded": {
    "control": "4px",
    "radius": "12px"
  },
  "spacing": {
    "button-block": "12px",
    "button-inline": "24px",
    "field-gap": "14px",
    "card-gap": "28px",
    "section-block": "88px"
  },
  "components": {
    "button-primary": {
      "backgroundColor": "{colors.accent}",
      "textColor": "{colors.white}",
      "rounded": "{rounded.control}",
      "padding": "12px 24px"
    },
    "button-primary-hover": {
      "backgroundColor": "{colors.accent-hover}"
    },
    "button-outline": {
      "backgroundColor": "transparent",
      "textColor": "{colors.ink}",
      "rounded": "{rounded.control}",
      "padding": "12px 24px"
    },
    "button-outline-hover": {
      "backgroundColor": "{colors.surface}"
    },
    "button-light": {
      "backgroundColor": "{colors.white}",
      "textColor": "{colors.ink}",
      "rounded": "{rounded.control}",
      "padding": "12px 24px"
    },
    "button-light-hover": {
      "backgroundColor": "#dae9ea"
    },
    "text-link": {
      "textColor": "{colors.ink}",
      "padding": "7px 0"
    },
    "field-input": {
      "backgroundColor": "{colors.white}",
      "textColor": "{colors.ink}",
      "rounded": "{rounded.control}",
      "padding": "10px 11px"
    },
    "journey-review": {
      "backgroundColor": "{colors.surface}",
      "rounded": "{rounded.radius}",
      "padding": "32px"
    }
  }
}
---

# Design System: All Air International Travels & Tours

## Overview

**Creative North Star: "Kathmandu departure hall"**

The approved Kathmandu departure hall world uses deep teal, white reading space and restrained orange actions. Barlow Condensed gives headings the directness of airport signage; Source Sans 3 keeps explanations and journey fields readable. Real destination photography carries the travel inspiration.

This is a code-derived record of the public homepage in index.html, style.css and app.js, with journey.js read to confirm the request boundary. Existing staff admin is a separate retained utility and is outside this visual specification. The goal is a professional redesign that removes generic AI pattern clutter while making the next travel-planning step clear.

**Key Characteristics:**

- Crisp hierarchy with generous section rhythm and dense, readable controls.
- Real rectangular destination photography with restrained rounded corners.
- Flat teal and pale surfaces, visible borders and focused orange actions.
- Native controls, explicit request review and a user-controlled WhatsApp handoff.

Evidence: PRODUCT.md, .impeccable/surfaces/index-html.md and the current source. This scan captures the completed reviewer fix batch; the independent final verdict remains pending. No browser or runtime accessibility review was performed in this documentation pass. The pale planner surface in the actual CSS takes precedence over the brief's earlier description of a white planner.

## Colors

The frontmatter is normative. Its color keys map directly to the same-named CSS custom properties in style.css.

### Primary

- **Deep teal ink** (ink): primary text, utility line, student section, service strip and footer.
- **Restrained orange** (accent): action backgrounds, selected service underline, route outline and caret. accent-hover deepens action hover.

### Neutral

- **White** (white): page, inputs and reversed text.
- **Blue-green surface** (surface): planner, review, guidance and secondary panels.
- **Muted slate** (muted): explanations, metadata and secondary copy.
- **Divider** (line): header, review and section boundaries.
- **Light teal text** (light-text): supporting copy on dark surfaces.

The focus token is a dedicated blue outline. Repeated literal colors, rather than root properties, include field borders (#91a9b1), placeholders (#5c7077), error text (#9a1c13), dark-surface dividers (#48626c) and FAQ borders (#aebfc4). These are implementation values, not an invented semantic palette or a complete tonal scale.

## Typography

Local WOFF2 files provide Barlow Condensed at weight 600 and Source Sans 3 at weights 400, 600 and 700, with font-display: swap and sans-serif fallbacks. The regular body and display files are preloaded. There is no fixed modular type ratio: sizes are role-specific.

Frontmatter records the desktop base hierarchy. Headings balance wrapping; the base paragraph measure is 68ch. Hero supporting copy is 1.125rem/1.6 with a 35ch measure; the planner heading is 2.4rem. Destination titles are 2.5rem; holiday titles are 2.4rem; student headings use clamp(3rem, 5vw, 4.5rem). Service headings and office detail headings deliberately use body type. Responsive overrides are described below; they are not additional global type tokens.

## Layout

The main wrap is min(1280px, calc(100% - 80px)), centered. Base sections use 88px block padding. The sticky white header has a 90px minimum inner height; the teal utility strip is 36px. Root scroll padding is 112px and planner scroll margin is 104px.

The desktop hero uses minmax(0, 1.65fr) minmax(350px, 1fr), with a 650px minimum image surface and 32px planner padding. Fields use two equal columns and a 14px gap; full-width labels span both columns. Destinations use three equal columns with 28px gaps. Holidays use 1.25fr 1fr 1fr, with a larger lead photograph. Student and guidance layouts pair text columns; content is not uniformly boxed into cards. Review details start at four columns.

| CSS query | Implemented response |
| --- | --- |
| min-width: 1450px | Hero minimum height becomes 675px; hero copy top padding becomes 65px. |
| max-width: 1190px | Wrap subtracts 56px; hero uses 1.4fr plus a minimum-350px planner; heading becomes 4.3rem; planner padding becomes 25px; image heights and column gaps tighten. |
| max-width: 1000px | Menu button replaces horizontal navigation; header minimum is 80px. Hero remains two columns (1fr and minimum-320px/0.95fr); hero heading becomes 3.65rem. Sections become 65px. Service strip, holidays and support services use two columns; lead holiday spans the row. Contact becomes one column; review details become three columns. |
| max-width: 720px | Wrap subtracts 36px; header minimum is 76px; hero and planner stack. Image minimum height is 430px; hero heading uses clamp(3.7rem, 10vw, 4.7rem). Sections become 50px. Destinations become horizontal image/text rows in a one-column list; holidays, student, Everest, support and guidance layouts stack. Planner padding is 28px 24px; fields retain two columns, gap becomes 16px and input/select minimum height becomes 48px. Review details become two columns. Root scroll padding and planner scroll margin become 90px. |
| max-width: 380px | Wrap subtracts 28px; branding and planner padding tighten; hero heading becomes 3.7rem. Destination rows remain split 0.9fr/1.1fr with a 15px gap. Contact actions stack; review details become one column. |

JavaScript separately uses min-width:1001px to close the mobile menu when crossing back to desktop. This complements the CSS max-width:1000px query.

## Elevation & Depth

No box-shadow vocabulary is implemented. Depth comes from flat alternating surfaces, borders, photography and contrast. The hero uses a functional dark photographic overlay: linear-gradient(180deg, rgba(5, 27, 39, 0.7), rgba(5, 27, 39, 0.48) 65%, rgba(5, 27, 39, 0.75)). It supports white headline legibility rather than decorating a blank panel.

## Shapes

Controls and action buttons use the control radius; photographs, review and selected supporting containers use the radius property. Hero geometry remains square. Buttons have a 1px border; fields use a 1px visible border. The selected destination photograph receives a 3px accent outline with 4px offset. Country metadata follows the destination h3 in the DOM and visual reading order.

## Components

### Buttons and navigation

Primary, outline and light actions share a minimum height of 50px and the frontmatter padding. Small actions use 44px minimum height and 10px 18px padding. Text links use a bottom border, 44px minimum height and orange hover. Native buttons perform planner actions; anchors navigate or open contact destinations. Disabled buttons use opacity 0.6 and a not-allowed cursor.

The four service controls are native type=button elements in a labelled role=group with aria-pressed. They are not ARIA tabs: the selected service uses orange text and a 3px bottom border. The mobile menu is a native button with aria-controls and aria-expanded. It closes after link activation, on Escape (returning focus to the button), and at the desktop media-query change. A keyboard-visible skip link targets main.

### Journey fields and review

The form retains native validation: wrapped labels, required fields, date controls, a destination datalist, selects, a student checkbox and a resizable textarea. Input/select minimum height is 46px at base. Fields have white fill and the control radius. Selects retain native select behavior with a CSS SVG arrow; appearance is customized. Hidden flight/transfer groups disable their contained input/select controls. Service selection updates field captions, layout, requirements and destination suggestions.

Date minimums use the browser's local date. Return dates are required for return flights and stays; journey.js additionally validates service, route, date ordering, traveller values and cabin. Errors appear as text in role=alert. The generic focus-visible treatment is a 3px focus outline with 4px offset; focused inputs/selects/textareas use a 2px outline and 2px offset plus focus-colored border.

Submitting prevents network form submission and builds a dl review using textContent. The review is focusable with tabindex=-1; success reveals, focuses and scrolls to it. A URL-encoded WhatsApp link contains the prepared message. Input/change, service changes and planner shortcuts hide stale review and remove its href; the visitor must submit again to generate a current review. Edit returns focus to the destination. No request is automatically sent and no booking or payment is made. Journey details stay in page state; the staff CMS remains a browser-local editing utility, not a secure booking backend.

**The The Request Boundary Rule.** The planner prepares a request for review. Only the visitor decides whether to send the prepared message in WhatsApp; availability, price, booking conditions and payment arrangements require the travel desk.

### Destination and service content

Destination action buttons prefill flight destinations, outline the clicked card and scroll/focus the planner. Holiday and Everest buttons prefill a holiday request; hotel/transfer actions choose the appropriate service; student planning checks the student option. The route outline reflects the clicked shortcut; it is not implemented as a live match against subsequent manual typing. Cards use real image elements, explicit dimensions and meaningful alt text; the hero has high fetch priority and lower content images use lazy loading. Preserve existing photo credits and provenance rather than inventing source or licensing claims.

### Progressive disclosure and motion

Preferences, holiday details, FAQ and booking/privacy guidance use native details/summary. FAQ chevrons are CSS decoration; native open state controls disclosure. Anchor navigation opens a targeted details element both on hash changes and same-anchor clicks. No custom accordion keyboard model is required.

The implemented motion vocabulary is smooth native scrolling and a background-color transition on buttons (0.18s ease). Under prefers-reduced-motion: reduce, root scrolling becomes auto and button transitions are removed. Planner focus uses preventScroll before an explicit scrollIntoView; it does not override the CSS motion preference.

## Do's and Don'ts

### Do:

- Do keep country metadata below each destination title.
- Do invalidate the prepared review and remove its WhatsApp href whenever journey input changes or a planner shortcut is used.
- Do preserve native button, form, label, select, date input and details/summary semantics.
- Do retain the existing name, logo and production contact defaults until agency confirmation.
- Do use real destination photography and retain image provenance and photo-credit links.

### Don't:

- Don't add theatrical loaders, unverified metrics, floating utility clutter or repeated generic icon-card sections.
- Don't imply live inventory, ticket issuance, confirmed booking, payment processing or automatic request delivery.
- Don't store personal journey requests in the browser-only staff CMS or request passport or card details in the planner.
- Don't treat this documentation pass as an independent final review verdict.
