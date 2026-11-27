import { buildJourney, createMessage, localDate } from "./journey.js";
const form = document.querySelector("#journey-form");
const destination = document.querySelector("#destination");
const departure = document.querySelector("#departure");
const returnDate = document.querySelector("#return-date");
const tripType = document.querySelector("#trip-type");
const error = document.querySelector("#form-error");
const review = document.querySelector("#journey-review");
const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector("#primary-nav");
let service = "flight";
function syncDates() {
  departure.min = localDate();
  returnDate.min = departure.value || localDate();
  if (returnDate.value && departure.value && returnDate.value < departure.value)
    returnDate.value = "";
  const required =
    service === "hotel" ||
    (service === "flight" && tripType.value === "return");
  document.querySelector("#return-field").hidden = !required;
  returnDate.required = required;
}
function selectService(next) {
  if (next === service && form.dataset.ready === "true") return;
  form.dataset.ready = "true";
  service = next;
  document
    .querySelectorAll("[data-service]")
    .forEach((b) =>
      b.setAttribute("aria-pressed", String(b.dataset.service === next)),
    );
  document.querySelectorAll(".flight-only,.transport-only").forEach((el) => {
    const shown = el.classList.contains(`${next}-only`);
    el.hidden = !shown;
    el.querySelectorAll("input,select").forEach(
      (input) => (input.disabled = !shown),
    );
  });
  document
    .querySelector("#destination-label")
    .classList.toggle("full", next === "hotel" || next === "holiday");
  document.querySelector("#destination-caption").textContent = {
    flight: "To",
    holiday: "Where would you like to go?",
    hotel: "City or neighbourhood",
    transport: "Drop-off",
  }[next];
  document.querySelector("#depart-caption").textContent =
    next === "hotel"
      ? "Check-in"
      : next === "transport"
        ? "Pickup date"
        : "Departure";
  document.querySelector("#return-caption").textContent =
    next === "hotel" ? "Check-out" : "Return";
  destination.placeholder =
    next === "hotel"
      ? "e.g. Thamel, Kathmandu"
      : next === "holiday"
        ? "e.g. Bali, Indonesia"
        : next === "transport"
          ? "Hotel, city or address"
          : "City or airport";
  destination.removeAttribute("list");
  if (next === "flight") destination.setAttribute("list", "destinations");
  destination.value = "";
  error.hidden = true;
  invalidateReview();
  syncDates();
}
function invalidateReview() {
  review.hidden = true;
  document.querySelector("#review-whatsapp").removeAttribute("href");
}
form.addEventListener("input", invalidateReview);
form.addEventListener("change", invalidateReview);
function focusPlanner() {
  invalidateReview();
  document.querySelector("#booking").open = true;
  document.querySelector("#booking").scrollIntoView({ block: "start" });
  destination.focus({ preventScroll: true });
}
function showReview(journey) {
  const list = document.querySelector("#review-details");
  list.replaceChildren();
  Object.entries(journey.details).forEach(([label, value]) => {
    const item = document.createElement("div"),
      term = document.createElement("dt"),
      description = document.createElement("dd");
    term.textContent = label;
    description.textContent = value;
    item.append(term, description);
    list.append(item);
  });
  const number = String(
    window.AllairCMS?.read()?.settings?.whatsapp || "9779851425123",
  ).replace(/\D/g, "");
  document.querySelector("#review-whatsapp").href =
    `https://wa.me/${number}?text=${encodeURIComponent(createMessage(journey))}`;
  review.hidden = false;
  review.focus({ preventScroll: true });
  review.scrollIntoView({ block: "start" });
}
form.addEventListener("submit", (event) => {
  event.preventDefault();
  error.hidden = true;
  try {
    showReview(buildJourney(Object.fromEntries(new FormData(form)), service));
  } catch (failure) {
    error.textContent = failure.message;
    error.hidden = false;
  }
});
document.querySelector("#edit-journey").addEventListener("click", focusPlanner);
document
  .querySelectorAll("[data-service]")
  .forEach((b) =>
    b.addEventListener("click", () => selectService(b.dataset.service)),
  );
document.querySelectorAll("[data-destination]").forEach((b) =>
  b.addEventListener("click", () => {
    selectService("flight");
    destination.value = b.dataset.destination;
    document
      .querySelectorAll(".destination")
      .forEach((card) =>
        card.classList.toggle("is-selected", card.contains(b)),
      );
    focusPlanner();
  }),
);
document.querySelectorAll("[data-holiday]").forEach((b) =>
  b.addEventListener("click", () => {
    selectService("holiday");
    destination.value = b.dataset.holiday;
    focusPlanner();
  }),
);
document.querySelectorAll("[data-plan-service]").forEach((b) =>
  b.addEventListener("click", () => {
    selectService(b.dataset.planService);
    if (service === "hotel") destination.value = "Kathmandu";
    focusPlanner();
  }),
);
document.querySelector("#student-plan").addEventListener("click", () => {
  selectService("flight");
  document.querySelector("#student-fare").checked = true;
  focusPlanner();
});
tripType.addEventListener("change", syncDates);
departure.addEventListener("change", syncDates);
menuButton.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") !== "true";
  menuButton.setAttribute("aria-expanded", String(open));
  nav.classList.toggle("is-open", open);
});
function closeMenu() {
  menuButton.setAttribute("aria-expanded", "false");
  nav.classList.remove("is-open");
}
nav.addEventListener("click", (event) => {
  if (event.target.closest("a")) closeMenu();
});
document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    menuButton.getAttribute("aria-expanded") === "true"
  ) {
    closeMenu();
    menuButton.focus();
  }
});
matchMedia("(min-width:801px)").addEventListener("change", closeMenu);
function revealAnchor() {
  const target = document.getElementById(location.hash.slice(1));
  if (target?.tagName === "DETAILS") target.open = true;
}
window.addEventListener("hashchange", revealAnchor);
document.querySelectorAll('a[href^="#"]').forEach((link) =>
  link.addEventListener("click", () => {
    const target = document.getElementById(link.getAttribute("href").slice(1));
    if (target?.tagName === "DETAILS") target.open = true;
  }),
);
document.querySelector("#year").textContent = String(new Date().getFullYear());
selectService("flight");
revealAnchor();
