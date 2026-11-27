export function localDate(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
const clean = (value, max = 1200) =>
  String(value || "")
    .trim()
    .slice(0, max);
function validDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T12:00:00Z`);
  return (
    !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value
  );
}
function readableDate(value) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T12:00:00Z`));
}
export function buildJourney(data, service, today = localDate()) {
  const names = {
    flight: "Flight",
    holiday: "Holiday",
    hotel: "Stay",
    transport: "Transfer",
  };
  if (!names[service]) throw new Error("Choose a travel service.");
  const destination = clean(data.destination, 100),
    origin = clean(data.origin, 100);
  if (!destination)
    throw new Error("Enter a destination so we can plan your journey.");
  if ((service === "flight" || service === "transport") && !origin)
    throw new Error("Enter where your journey starts.");
  if (
    service === "flight" &&
    origin.toLowerCase() === destination.toLowerCase()
  )
    throw new Error("Choose a destination different from your departure city.");
  const departure = clean(data.departure, 10);
  if (!validDate(departure) || departure < today)
    throw new Error("Choose a valid travel date from today onwards.");
  const needsReturn =
    service === "hotel" || (service === "flight" && data.tripType === "return");
  if (
    needsReturn &&
    (!validDate(data.returnDate) ||
      data.returnDate < departure ||
      (service === "hotel" && data.returnDate === departure))
  )
    throw new Error(
      service === "hotel"
        ? "Choose a check-out date after check-in."
        : "Choose a return date on or after departure.",
    );
  const travellers = clean(data.travellers, 5);
  if (!["1", "2", "3", "4", "5", "6", "7", "8", "group"].includes(travellers))
    throw new Error("Choose the number of travellers.");
  const details = { Service: names[service] };
  if (service === "flight" || service === "transport") details.From = origin;
  details[service === "transport" ? "Drop-off" : "Destination"] = destination;
  details[
    service === "hotel"
      ? "Check-in"
      : service === "transport"
        ? "Pickup date"
        : "Departure"
  ] = readableDate(departure);
  if (needsReturn)
    details[service === "hotel" ? "Check-out" : "Return"] = readableDate(
      data.returnDate,
    );
  details.Travellers = travellers === "group" ? "Group of 9+" : travellers;
  if (service === "flight") {
    if (!["Economy", "Premium economy", "Business"].includes(data.cabin))
      throw new Error("Choose a cabin class.");
    details.Cabin = data.cabin;
    if (data.student)
      details["Student fare"] = "Please check eligibility and baggage";
  }
  if (clean(data.notes)) details.Preferences = clean(data.notes);
  return { service, details };
}
export function createMessage(journey) {
  return `Hello All Air, I would like help planning this journey.\n\n${Object.entries(
    journey.details,
  )
    .map(([key, value]) => `${key}: ${value}`)
    .join(
      "\n",
    )}\n\nPlease confirm availability, the final price, inclusions and booking conditions before I decide.`;
}
