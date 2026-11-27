import test from "node:test";
import assert from "node:assert/strict";
import { buildJourney, createMessage } from "../journey.js";
const date = "2026-11-27";
const flight = {
  origin: "Kathmandu (KTM)",
  destination: "Sydney (SYD)",
  departure: "2026-12-04",
  travellers: "2",
  cabin: "Economy",
  tripType: "oneway",
};
test("one-way quote excludes a stale return date and preserves student request", () => {
  const result = buildJourney(
    { ...flight, returnDate: "2026-01-01", student: "on" },
    "flight",
    date,
  );
  assert.equal(result.details.Return, undefined);
  assert.equal(result.details.Travellers, "2");
  assert.match(result.details["Student fare"], /eligibility/);
  assert.match(createMessage(result), /confirm availability/);
  assert.match(createMessage(result), /before I decide/);
});
test("return journey cannot depart before today or return before departure", () => {
  assert.throws(
    () => buildJourney({ ...flight, departure: "2026-11-26" }, "flight", date),
    /from today/,
  );
  assert.throws(
    () =>
      buildJourney(
        { ...flight, tripType: "return", returnDate: "2026-12-03" },
        "flight",
        date,
      ),
    /return date/,
  );
});
test("impossible calendar dates cannot reach a journey summary", () => {
  assert.throws(
    () => buildJourney({ ...flight, departure: "2027-02-30" }, "flight", date),
    /valid travel date/,
  );
});
test("a hotel stay requires checkout strictly after checkin", () => {
  assert.throws(
    () =>
      buildJourney({ ...flight, returnDate: flight.departure }, "hotel", date),
    /after check-in/,
  );
  const stay = buildJourney(
    { ...flight, returnDate: "2026-12-05" },
    "hotel",
    date,
  );
  assert.equal(stay.details.Service, "Stay");
  assert.equal(stay.details.Cabin, undefined);
  assert.ok(stay.details["Check-out"]);
});
test("flight cannot use identical origins and destinations", () => {
  assert.throws(
    () =>
      buildJourney(
        { ...flight, destination: " kathmandu (ktm) " },
        "flight",
        date,
      ),
    /different/,
  );
});
test("transfers keep pickup and drop-off; group size is an honest request", () => {
  const result = buildJourney(
    {
      ...flight,
      origin: "Airport",
      destination: "Thamel",
      travellers: "group",
    },
    "transport",
    date,
  );
  assert.equal(result.details.From, "Airport");
  assert.equal(result.details["Drop-off"], "Thamel");
  assert.equal(result.details.Travellers, "Group of 9+");
});
test("blank destination and invalid traveller count are rejected", () => {
  assert.throws(
    () => buildJourney({ ...flight, destination: " " }, "flight", date),
    /destination/,
  );
  assert.throws(
    () => buildJourney({ ...flight, travellers: "0" }, "flight", date),
    /number of travellers/,
  );
});
