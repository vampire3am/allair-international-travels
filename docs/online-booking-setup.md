# Enabling real online booking and payment

Status, 27 November 2026: the owner confirmed there is no inventory provider or merchant account. This redesign includes a working journey planner and explicit WhatsApp handoff, not a completed online booking/payment integration. No paid inventory, merchant registration, financial account or contract was created.

## Recommended rollout for All Air

1. Start merchant onboarding with **Khalti for NPR payments**, subject to its approval and All Air's commercial requirements. Complete the merchant's own verification and test-to-live process. The official web checkout requires merchant initiation, redirect to hosted payment and a server-side status lookup; a return URL alone is not proof of payment. Sources: https://docs.khalti.com/getting-started/ and https://docs.khalti.com/khalti-epayment/ .
2. Obtain a **flight inventory and ticketing agreement** covering Nepal departures, agency settlement, changes/refunds and support. Ask a Nepal-serving GDS/airline consolidator for a production API or branded booking engine and confirm supported carriers and currencies. This is the first commercial dependency; payment processing alone cannot issue an airline ticket.
3. Evaluate **Duffel Flights API** as an alternative only after Duffel confirms eligibility for All Air's Nepal entity and the necessary ticketing/settlement coverage. Managed Content offers use of its ticketing authority, but this is not evidence that All Air has been accepted. Duffel Links specifically requires a country supported by Duffel Payments, so do not treat it as a guaranteed Nepal shortcut. Sources: https://duffel.com/docs/guides/getting-started-with-flights , https://duffel.com/flights/content/managed and https://duffel.com/docs/guides/duffel-links .
4. Add a secure backend and shared database, authenticated staff operations, and payment/booking reconciliation before accepting money. Replace the local editing utility as an operational booking inbox; it currently has no server authentication or shared records.
5. Integrate sandbox inventory and merchant checkout, exercise cancellation/failure/refund paths, then obtain production access. Only then change the website's current availability/payment wording and enable a real checkout.

## Implementation boundary after onboarding

The server must reprice/validate inventory, bind the amount/currency to an expiring quote, create the reservation and payment intent idempotently, verify payment using the provider API, and confirm fulfilment through the inventory provider. Store booking state securely. Explicitly distinguish payment pending, payment received, ticket issuance pending, ticket issued, failed and refund states. Verify signatures/lookup responses; do not trust browser totals, URL parameters or localStorage. Prevent duplicate charging and reconcile a successful payment when ticketing fails. Confirm consent, retention and refund rules with the agency before collecting passenger documents.

## Accounts the owner needs

- Approved payment merchant account and settlement arrangement.
- Approved inventory/ticketing provider agreement and sandbox/production access.
- Approved backend hosting/data region and staff authentication model.
- Agency-confirmed booking, cancellation, refund and privacy content.

Enter secret keys through the hosting provider's environment-variable interface, never in chat, frontend source or Git. No live payment or ticketing is claimed by this implementation.
