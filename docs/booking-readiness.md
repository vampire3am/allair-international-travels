# Booking readiness

The redesign must support actual booking and payment, as requested by the owner. The existing repository is a static frontend with a browser-only admin and contains no live inventory or merchant integration.

## Decisions awaiting the owner

- Inventory/GDS provider, fulfilment model and supported services.
- Nepal wallet versus international payment provider and merchant onboarding status.
- Server-side booking data store and authenticated staff access.
- Fare confirmation, cancellation/refund rules and reconciliation workflow.

## Required transaction boundary

Search provider inventory on the server; create an expiring price-confirmed offer; collect passenger details only when needed; create booking/payment intent server-side with an idempotency key; use provider-hosted payment; verify payment server-side using authenticated lookup/webhook; issue ticket/confirm fulfilment through provider; never label payment as ticket issuance. Recover and reconcile failures so payment does not silently leave an unissued booking. Do not trust client-supplied prices or callback query parameters.

## Existing admin

The retained admin uses localStorage and a client-side development access code. It is a local editing utility, not a shared or authenticated customer operations backend. Do not store passenger identity documents or payment data there, or claim that preparing a WhatsApp message notifies staff.
