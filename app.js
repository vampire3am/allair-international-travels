// Allair International Travels & Tours -- Minimal Edition
// Application Logic: Currency, Routing, Booking Dialog

// Application Logic: Currency, Routing, Booking Dialog

/* ── Currency Engine (Synced with Admin Panel) ── */
const customRates = JSON.parse(localStorage.getItem('allair-custom-rates')) || {};
const RATES   = { NPR: customRates.NPR || 135, USD: 1, AUD: customRates.AUD || 1.54, GBP: customRates.GBP || 0.79, EUR: customRates.EUR || 0.92 };
const SYMBOLS = { NPR: 'रू ', USD: '$', AUD: 'A$', GBP: '£', EUR: '€' };
let activeCurrency = 'NPR';
let currentLiveSearchData = null;

export function setCurrency(code) {
  activeCurrency = code;
  document.querySelectorAll('.curr-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.currency === code);
  });
  document.querySelectorAll('[data-usd]').forEach(el => {
    const usd = parseFloat(el.dataset.usd);
    const val = Math.round(usd * RATES[code]);
    el.textContent = SYMBOLS[code] + val.toLocaleString();
  });

  // Real-time recalculation of live results board
  if (currentLiveSearchData) {
    renderLiveResults(currentLiveSearchData, false);
  }
}

/* ── Route Database ── */
const ROUTES = {
  sydney: {
    label: 'Kathmandu → Sydney',
    airline: 'Singapore Airlines / Malaysia Airlines',
    code: 'SQ-441 · MH-170',
    aircraft: 'Boeing 787-9 Dreamliner & A350',
    route: 'KTM → Singapore (SIN) → Sydney (SYD)',
    duration: '13h 45m  ·  1 stop',
    baggage: '35 kg + 7 kg cabin  |  Student: 46 kg (2 × 23 kg)',
    fareType: 'Economy Standard',
    usd: 890,
  },
  melbourne: {
    label: 'Kathmandu → Melbourne',
    airline: 'Singapore Airlines / Thai Airways',
    code: 'SQ-441 · TG-320',
    aircraft: 'Airbus A350-900',
    route: 'KTM → Bangkok/Singapore → Melbourne (MEL)',
    duration: '14h 10m  ·  1 stop',
    baggage: '35 kg + 7 kg cabin  |  Student: 46 kg',
    fareType: 'Economy Standard',
    usd: 860,
  },
  tokyo: {
    label: 'Kathmandu → Tokyo (Direct)',
    airline: 'Nepal Airlines (Nonstop)',
    code: 'RA-413',
    aircraft: 'Airbus A330-200 Widebody',
    route: 'KTM → Tokyo Narita (NRT)  —  Nonstop',
    duration: '8h 15m  ·  Nonstop',
    baggage: '40 kg + 7 kg cabin',
    fareType: 'Economy Nonstop',
    usd: 680,
  },
  london: {
    label: 'Kathmandu → London Heathrow',
    airline: 'Qatar Airways / Turkish Airlines',
    code: 'QR-653 · TK-727',
    aircraft: 'Boeing 777-300ER',
    route: 'KTM → Doha / Istanbul → London (LHR)',
    duration: '12h 45m  ·  1 quick stop',
    baggage: '35 kg + 7 kg cabin  |  Student: 46 kg',
    fareType: 'Economy Standard',
    usd: 820,
  },
  dallas: {
    label: 'Kathmandu → Dallas Fort Worth',
    airline: 'Qatar Airways',
    code: 'QR-653 + QR-729',
    aircraft: 'Airbus A350-1000',
    route: 'KTM → Doha (DOH) → Dallas (DFW)',
    duration: '21h 15m  ·  1 stop via Doha',
    baggage: '2 × 23 kg checked  (46 kg total)',
    fareType: 'Economy Standard',
    usd: 1180,
  },
  dubai: {
    label: 'Kathmandu → Dubai',
    airline: 'FlyDubai / Emirates',
    code: 'FZ-576 · EK-2164',
    aircraft: 'Boeing 737 MAX 8 / Boeing 777',
    route: 'KTM → Dubai International (DXB)',
    duration: '4h 45m  ·  Nonstop',
    baggage: '30 kg + 7 kg cabin',
    fareType: 'Economy Standard',
    usd: 380,
  },
  bangkok: {
    label: 'Kathmandu → Bangkok',
    airline: 'Thai Lion Air / Nepal Airlines',
    code: 'SL-221 · RA-401',
    aircraft: 'Boeing 737-800',
    route: 'KTM → Bangkok Suvarnabhumi (BKK)',
    duration: '3h 30m  ·  Nonstop',
    baggage: '30 kg + 7 kg cabin',
    fareType: 'Economy Standard',
    usd: 290,
  },
  toronto: {
    label: 'Kathmandu → Toronto',
    airline: 'Qatar Airways / Air India',
    code: 'QR-653 + QR-163',
    aircraft: 'Boeing 777-300ER',
    route: 'KTM → Doha (DOH) → Toronto (YYZ)',
    duration: '22h 30m  ·  1 stop',
    baggage: '2 × 23 kg checked  (46 kg total)',
    fareType: 'Economy Standard',
    usd: 1220,
  },
  everest: {
    label: 'Everest Heli-Tour — Kalapatthar',
    airline: 'Airbus H125 High-Altitude Helicopter',
    code: 'ALLAIR-HELI',
    aircraft: 'Airbus H125 / AS350 B3e',
    route: 'KTM Domestic → Lukla → Kalapatthar (5,400 m) → Syangboche',
    duration: '4 hours  ·  Morning departure 6:30 AM',
    baggage: 'Guaranteed window seat · Oxygen kit · Breakfast included',
    fareType: 'Helicopter Sharing / Private',
    usd: 980,
  },
};

/* ── Live Flight Schedules & Alternative Carriers ── */
const LIVE_SCHEDULES = {
  sydney: [
    {
      airline: 'Singapore Airlines',
      code: 'SQ-441 + SQ-211',
      aircraft: 'Boeing 787-10 & A350-900',
      depTime: '13:05',
      arrTime: '06:15 +1',
      originCode: 'KTM',
      destCode: 'SYD',
      duration: '13h 40m',
      transit: '1 stop (SIN)',
      baggage: '46 kg Student (2×23kg) · 35kg Std',
      usd: 890,
      tag: 'Best Transit',
      tagClass: 'popular'
    },
    {
      airline: 'Malaysia Airlines',
      code: 'MH-170 + MH-123',
      aircraft: 'Airbus A330-300',
      depTime: '23:30',
      arrTime: '20:10 +1',
      originCode: 'KTM',
      destCode: 'SYD',
      duration: '16h 10m',
      transit: '1 stop (KUL)',
      baggage: '46 kg Student (2×23kg)',
      usd: 830,
      tag: 'Value Deal',
      tagClass: 'student'
    },
    {
      airline: 'Cathay Pacific',
      code: 'CX-604 + CX-139',
      aircraft: 'Airbus A350-900',
      depTime: '23:15',
      arrTime: '21:00 +1',
      originCode: 'KTM',
      destCode: 'SYD',
      duration: '17h 15m',
      transit: '1 stop (HKG)',
      baggage: '46 kg (2×23kg checked)',
      usd: 940,
      tag: 'Premium Service',
      tagClass: 'direct'
    }
  ],
  melbourne: [
    {
      airline: 'Singapore Airlines',
      code: 'SQ-441 + SQ-217',
      aircraft: 'Airbus A350-900',
      depTime: '13:05',
      arrTime: '05:55 +1',
      originCode: 'KTM',
      destCode: 'MEL',
      duration: '13h 20m',
      transit: '1 stop (SIN)',
      baggage: '46 kg Student Special',
      usd: 860,
      tag: 'Fastest Transit',
      tagClass: 'popular'
    },
    {
      airline: 'Thai Airways',
      code: 'TG-320 + TG-465',
      aircraft: 'Boeing 777-300ER',
      depTime: '13:30',
      arrTime: '07:20 +1',
      originCode: 'KTM',
      destCode: 'MEL',
      duration: '14h 20m',
      transit: '1 stop (BKK)',
      baggage: '46 kg Student Allowance',
      usd: 810,
      tag: 'Student Choice',
      tagClass: 'student'
    }
  ],
  tokyo: [
    {
      airline: 'Nepal Airlines (Direct Nonstop)',
      code: 'RA-413',
      aircraft: 'Airbus A330-200 Widebody',
      depTime: '00:30',
      arrTime: '10:45',
      originCode: 'KTM',
      destCode: 'NRT',
      duration: '08h 15m',
      transit: 'Nonstop Direct',
      baggage: '40 kg + 7 kg Cabin',
      usd: 680,
      tag: 'Only Nonstop',
      tagClass: 'direct'
    },
    {
      airline: 'Korean Air',
      code: 'KE-696 + KE-703',
      aircraft: 'Boeing 777-300ER',
      depTime: '20:15',
      arrTime: '12:30 +1',
      originCode: 'KTM',
      destCode: 'NRT',
      duration: '11h 45m',
      transit: '1 stop (ICN)',
      baggage: '46 kg (2×23kg)',
      usd: 750,
      tag: 'Daily Service',
      tagClass: 'popular'
    }
  ],
  london: [
    {
      airline: 'Qatar Airways',
      code: 'QR-653 + QR-001',
      aircraft: 'Airbus A350-1000',
      depTime: '09:40',
      arrTime: '18:55',
      originCode: 'KTM',
      destCode: 'LHR',
      duration: '13h 45m',
      transit: '1 stop (DOH)',
      baggage: '46 kg Student · 35kg Std',
      usd: 820,
      tag: 'Top Rated Carrier',
      tagClass: 'popular'
    },
    {
      airline: 'Turkish Airlines',
      code: 'TK-727 + TK-1985',
      aircraft: 'Airbus A330-300',
      depTime: '07:35',
      arrTime: '16:40',
      originCode: 'KTM',
      destCode: 'LHR',
      duration: '13h 35m',
      transit: '1 stop (IST)',
      baggage: '46 kg Student Baggage',
      usd: 790,
      tag: 'Student Promo',
      tagClass: 'student'
    }
  ],
  dallas: [
    {
      airline: 'Qatar Airways',
      code: 'QR-653 + QR-729',
      aircraft: 'Airbus A350-1000',
      depTime: '09:40',
      arrTime: '17:35 +1',
      originCode: 'KTM',
      destCode: 'DFW',
      duration: '21h 15m',
      transit: '1 stop (DOH)',
      baggage: '2 × 23 kg (46 kg total)',
      usd: 1180,
      tag: 'USA Student Favorite',
      tagClass: 'student'
    },
    {
      airline: 'Emirates + United',
      code: 'EK-2164 + UA-182',
      aircraft: 'Boeing 777-300ER',
      depTime: '00:45',
      arrTime: '14:20 +1',
      originCode: 'KTM',
      destCode: 'DFW',
      duration: '22h 35m',
      transit: '1 stop (DXB)',
      baggage: '2 × 23 kg checked',
      usd: 1240,
      tag: 'Flexible Rebooking',
      tagClass: 'popular'
    }
  ],
  dubai: [
    {
      airline: 'FlyDubai',
      code: 'FZ-576',
      aircraft: 'Boeing 737 MAX 8',
      depTime: '09:10',
      arrTime: '12:40',
      originCode: 'KTM',
      destCode: 'DXB',
      duration: '04h 45m',
      transit: 'Nonstop Direct',
      baggage: '30 kg + 7 kg Cabin',
      usd: 380,
      tag: 'Direct Flight',
      tagClass: 'direct'
    },
    {
      airline: 'Nepal Airlines',
      code: 'RA-229',
      aircraft: 'Airbus A320-200',
      depTime: '23:00',
      arrTime: '02:30 +1',
      originCode: 'KTM',
      destCode: 'DXB',
      duration: '04h 45m',
      transit: 'Nonstop Direct',
      baggage: '35 kg Included',
      usd: 350,
      tag: 'National Flag Carrier',
      tagClass: 'popular'
    }
  ],
  bangkok: [
    {
      airline: 'Nepal Airlines',
      code: 'RA-401',
      aircraft: 'Airbus A320-200',
      depTime: '11:25',
      arrTime: '16:00',
      originCode: 'KTM',
      destCode: 'BKK',
      duration: '03h 20m',
      transit: 'Nonstop Direct',
      baggage: '30 kg + 7 kg Cabin',
      usd: 290,
      tag: 'Fast Direct',
      tagClass: 'direct'
    },
    {
      airline: 'Thai Airways',
      code: 'TG-320',
      aircraft: 'Boeing 777-200',
      depTime: '13:30',
      arrTime: '18:15',
      originCode: 'KTM',
      destCode: 'BKK',
      duration: '03h 30m',
      transit: 'Nonstop Direct',
      baggage: '30 kg + Full Meal',
      usd: 320,
      tag: 'Full Service',
      tagClass: 'popular'
    }
  ],
  toronto: [
    {
      airline: 'Qatar Airways',
      code: 'QR-653 + QR-163',
      aircraft: 'Boeing 777-300ER',
      depTime: '09:40',
      arrTime: '19:40',
      originCode: 'KTM',
      destCode: 'YYZ',
      duration: '22h 30m',
      transit: '1 stop (DOH)',
      baggage: '2 × 23 kg (46 kg total)',
      usd: 1220,
      tag: 'Canada Student Route',
      tagClass: 'student'
    }
  ],
  everest: [
    {
      airline: 'Airbus H125 VIP Helicopter',
      code: 'ALLAIR-HELI-01',
      aircraft: 'Airbus H125 / AS350 B3e',
      depTime: '06:30 AM',
      arrTime: '10:30 AM',
      originCode: 'KTM',
      destCode: 'EBC',
      duration: '04h 00m Total Tour',
      transit: 'KTM → Lukla → Kalapatthar (5,400m)',
      baggage: 'Guaranteed Window Seat · Oxygen Included',
      usd: 980,
      tag: 'Everest Landing Guaranteed',
      tagClass: 'direct'
    }
  ]
};

/* ── Airport & City Database ── */
export const AIRPORTS = [
  { code: 'KTM', city: 'Kathmandu', country: 'Nepal', name: "Tribhuvan Int'l Airport", aliases: ['ktm', 'kathmandu', 'nepal'] },
  { code: 'SYD', city: 'Sydney', country: 'Australia', name: 'Kingsford Smith Airport', aliases: ['syd', 'sydney', 'australia', 'nsw'] },
  { code: 'MEL', city: 'Melbourne', country: 'Australia', name: 'Melbourne Airport (Tullamarine)', aliases: ['mel', 'melbourne', 'victoria'] },
  { code: 'DFW', city: 'Dallas / Texas', country: 'USA', name: "Dallas Fort Worth Int'l", aliases: ['dfw', 'dallas', 'texas', 'texes', 'usa', 'america', 'tx'] },
  { code: 'NRT', city: 'Tokyo', country: 'Japan', name: "Narita Int'l Airport", aliases: ['nrt', 'tokyo', 'japan', 'tyo'] },
  { code: 'LHR', city: 'London', country: 'United Kingdom', name: 'Heathrow Airport', aliases: ['lhr', 'london', 'uk', 'england', 'britain'] },
  { code: 'YYZ', city: 'Toronto', country: 'Canada', name: "Pearson Int'l Airport", aliases: ['yyz', 'toronto', 'canada', 'ontario'] },
  { code: 'DXB', city: 'Dubai', country: 'UAE', name: "Dubai Int'l Airport", aliases: ['dxb', 'dubai', 'uae', 'emirates'] },
  { code: 'BKK', city: 'Bangkok', country: 'Thailand', name: 'Suvarnabhumi Airport', aliases: ['bkk', 'bangkok', 'thailand'] },
  { code: 'JFK', city: 'New York', country: 'USA', name: "John F. Kennedy Int'l", aliases: ['jfk', 'new york', 'nyc', 'ny'] },
  { code: 'ICN', city: 'Seoul', country: 'South Korea', name: "Incheon Int'l Airport", aliases: ['icn', 'seoul', 'korea'] },
  { code: 'EBC', city: 'Everest Base Camp', country: 'Nepal', name: 'Kalapatthar Heli Landing', aliases: ['ebc', 'everest', 'heli', 'lukla', 'kalapatthar'] },
  { code: 'PKR', city: 'Pokhara', country: 'Nepal', name: "Pokhara Int'l Airport", aliases: ['pkr', 'pokhara'] },
];

export function getAirportInfo(query) {
  if (!query) return { code: 'KTM', city: 'Kathmandu', country: 'Nepal', name: "Tribhuvan Int'l", aliases: ['ktm'] };
  const clean = query.toLowerCase().trim();
  for (const apt of AIRPORTS) {
    if (apt.code.toLowerCase() === clean || clean.includes(apt.code.toLowerCase())) {
      return apt;
    }
    for (const alias of apt.aliases) {
      if (clean.includes(alias)) return apt;
    }
  }
  return { code: query.slice(0, 3).toUpperCase(), city: query, country: 'International', name: query, aliases: [] };
}

export function updateLocationHint(inputId, hintId) {
  const input = document.getElementById(inputId);
  const hint = document.getElementById(hintId);
  if (!input || !hint) return;
  const apt = getAirportInfo(input.value);
  hint.textContent = `${apt.name} · ${apt.country}`;
}

export function swapLocations() {
  const o = document.getElementById('s-origin');
  const d = document.getElementById('s-destination');
  if (o && d) {
    const temp = o.value;
    o.value = d.value;
    d.value = temp;
    updateLocationHint('s-origin', 's-origin-hint');
    updateLocationHint('s-destination', 's-destination-hint');
  }
}

/* ── Render Live Search Results ── */
export function renderLiveResults(data, shouldScroll = true) {
  const tray = document.getElementById('live-results-tray');
  if (!tray) return;

  const schedules = LIVE_SCHEDULES[data.key] || LIVE_SCHEDULES.sydney;
  const isStudent = data.cabin.includes('Student') || data.cabin.includes('45 kg') || data.cabin.includes('46 kg');

  const originInfo = getAirportInfo(data.origin);
  const destInfo   = getAirportInfo(data.dest);

  let cardsHtml = '';
  schedules.forEach((item) => {
    const price = Math.round(item.usd * RATES[activeCurrency]);
    const formattedPrice = SYMBOLS[activeCurrency] + price.toLocaleString();

    const waMsg = encodeURIComponent(
      `Hello Allair International Travels!\n\n` +
      `I want to book this flight itinerary:\n` +
      `✈️ Route: ${data.origin} → ${data.dest}\n` +
      `🗓️ Depart Date: ${data.date}\n` +
      `🏢 Airline: ${item.airline} (${item.code})\n` +
      `💺 Cabin: ${data.cabin}\n` +
      `🧳 Baggage: ${item.baggage}\n` +
      `🏷️ Live Fare: ${formattedPrice} (${activeCurrency})\n\n` +
      `Please check seat availability and confirm reservation.`
    );

    const cardOrigin = originInfo.code || item.originCode;
    const cardDest   = destInfo.code || item.destCode;

    cardsHtml += `
      <div class="lrt-card">
        <div class="lrt-card-top">
          <div class="lrt-airline-info">
            <span class="lrt-airline-name">${item.airline}</span>
            <span class="lrt-flight-code">${item.code} · ${item.aircraft}</span>
          </div>
          <span class="lrt-tag ${item.tagClass}">${item.tag}</span>
        </div>

        <div class="lrt-flight-timeline">
          <div class="lrt-time-point">
            <span class="lrt-time-code">${item.depTime}</span>
            <span class="lrt-time-city">${cardOrigin}</span>
          </div>
          <div class="lrt-duration-visual">
            <span class="lrt-dur-text">${item.duration}</span>
            <div class="lrt-dur-line"></div>
            <span class="lrt-dur-text" style="font-size: 0.58rem; color: var(--c-orange);">${item.transit}</span>
          </div>
          <div class="lrt-time-point" style="text-align: right;">
            <span class="lrt-time-code">${item.arrTime}</span>
            <span class="lrt-time-city">${cardDest}</span>
          </div>
        </div>

        <div class="lrt-baggage-note">
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="color: var(--c-orange); flex-shrink: 0;"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-4 0v2"/><path d="M8 7V5a2 2 0 0 0-4 0v2"/></svg>
          <span><strong>Baggage:</strong> ${item.baggage}</span>
        </div>

        <div class="lrt-card-footer">
          <div class="lrt-footer-row">
            <div class="lrt-price-box">
              <span class="lrt-price-lbl">Live Fare (${activeCurrency})</span>
              <span class="lrt-price-val">${formattedPrice}</span>
            </div>
            <span class="lrt-tag ${item.tagClass}">${item.tag}</span>
          </div>

          <div class="lrt-actions">
            <a href="https://wa.me/9779762117199?text=${waMsg}" target="_blank" rel="noopener" class="lrt-btn-wa" title="Book instantly on WhatsApp">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              <span>Book on WhatsApp</span>
            </a>
            <button type="button" class="lrt-btn-details" onclick="openModal('${data.key}', ${isStudent})" title="View full flight itinerary breakdown">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
              <span>Details</span>
            </button>
          </div>
        </div>
      </div>
    `;
  });

  tray.innerHTML = `
    <div class="lrt-header">
      <div class="lrt-title-group">
        <div class="lrt-badge">
          <span class="lrt-pulse"></span>
          <span>Live Fares Available</span>
        </div>
        <h3 class="lrt-route-title">${data.origin} → ${data.dest}</h3>
      </div>
      <div class="lrt-meta-pills">
        <span class="lrt-meta-pill">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          ${data.date}
        </span>
        <span class="lrt-meta-pill">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          ${data.cabin}
        </span>
        <button type="button" class="lrt-close-btn" onclick="closeLiveResults()" title="Close live results" aria-label="Close">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
    </div>
    <div class="lrt-grid">
      ${cardsHtml}
    </div>
  `;

  tray.style.display = 'block';

  if (shouldScroll) {
    setTimeout(() => {
      if (window.__lenis) {
        window.__lenis.scrollTo(tray, { offset: -90, duration: 0.8 });
      } else {
        tray.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 50);
  }
}

export function closeLiveResults() {
  const tray = document.getElementById('live-results-tray');
  if (tray) tray.style.display = 'none';
  currentLiveSearchData = null;
}

/* ── Booking Modal ── */
const dialog = document.getElementById('booking-dialog');

export function openModal(key, isStudent = false) {
  const r = ROUTES[key] || ROUTES.sydney;

  document.getElementById('m-label').textContent    = 'Flight Itinerary & Fare Estimate';
  document.getElementById('m-title').textContent    = r.label;
  document.getElementById('m-airline').textContent  = r.airline;
  document.getElementById('m-code').textContent     = r.code;
  document.getElementById('m-aircraft').textContent = r.aircraft;
  document.getElementById('m-route').textContent    = r.route;
  document.getElementById('m-duration').textContent = r.duration;
  document.getElementById('m-baggage').textContent  = isStudent
    ? (r.baggage.includes('|') ? r.baggage.split('|')[1].trim() : r.baggage)
    : (r.baggage.includes('|') ? r.baggage.split('|')[0].trim() : r.baggage);
  document.getElementById('m-fare-type').textContent = isStudent ? 'Student Special Fare' : r.fareType;

  const price = Math.round(r.usd * RATES[activeCurrency]);
  document.getElementById('m-price').textContent    = SYMBOLS[activeCurrency] + price.toLocaleString();
  document.getElementById('m-price').dataset.usd    = r.usd;

  const msg = encodeURIComponent(
    `Hello Allair International Travels!\n\n` +
    `I'd like a fare quote for:\n` +
    `Route: ${r.route}\n` +
    `Airline: ${r.airline}\n` +
    `Fare: ${isStudent ? 'Student Special (40–46 kg baggage)' : 'Standard Economy'}\n` +
    `Estimated fare: ${SYMBOLS[activeCurrency]}${price.toLocaleString()}\n\n` +
    `Please advise on seat availability and payment options.`
  );
  document.getElementById('m-wa-link').href = `https://wa.me/9779762117199?text=${msg}`;

  dialog.showModal();
}

export function closeModal() {
  dialog.close();
}

/* ── Search Form Handler ── */
function handleSearch(e) {
  e.preventDefault();
  const origin = document.getElementById('s-origin')?.value || 'Kathmandu (KTM)';
  const dest   = document.getElementById('s-destination')?.value || 'Sydney (SYD)';
  const date   = document.getElementById('s-date')?.value || '2026-10-01';
  const cabin  = document.getElementById('s-cabin')?.value || '1 Adult — Economy';

  const lowerDest   = dest.toLowerCase();
  const lowerOrigin = origin.toLowerCase();

  let key = 'sydney';
  if (lowerDest.includes('dallas') || lowerDest.includes('texas') || lowerDest.includes('dfw') || lowerOrigin.includes('dallas') || lowerOrigin.includes('texas') || lowerOrigin.includes('dfw')) {
    key = 'dallas';
  } else if (lowerDest.includes('tokyo') || lowerDest.includes('japan') || lowerDest.includes('nrt') || lowerOrigin.includes('tokyo')) {
    key = 'tokyo';
  } else if (lowerDest.includes('melbourne') || lowerDest.includes('mel') || lowerOrigin.includes('melbourne')) {
    key = 'melbourne';
  } else if (lowerDest.includes('london') || lowerDest.includes('uk') || lowerDest.includes('lhr') || lowerOrigin.includes('london')) {
    key = 'london';
  } else if (lowerDest.includes('dubai') || lowerDest.includes('dxb') || lowerOrigin.includes('dubai')) {
    key = 'dubai';
  } else if (lowerDest.includes('bangkok') || lowerDest.includes('thailand') || lowerDest.includes('bkk') || lowerOrigin.includes('bangkok')) {
    key = 'bangkok';
  } else if (lowerDest.includes('toronto') || lowerDest.includes('canada') || lowerDest.includes('yyz') || lowerOrigin.includes('toronto')) {
    key = 'toronto';
  } else if (lowerDest.includes('everest') || lowerDest.includes('heli') || lowerDest.includes('ebc')) {
    key = 'everest';
  } else {
    key = Object.keys(LIVE_SCHEDULES).find(k => lowerDest.includes(k)) || 'sydney';
  }

  currentLiveSearchData = { origin, dest, date, cabin, key };
  renderLiveResults(currentLiveSearchData, true);
}

/* ── Filter Routes ── */
export function filterRoutes(cat) {
  document.querySelectorAll('[data-region]').forEach(card => {
    card.style.display = (cat === 'all' || card.dataset.region === cat) ? '' : 'none';
  });
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.cat === cat);
  });
}

/* ── Booking Tab Switcher ── */
export function switchTab(tab) {
  document.querySelectorAll('.booking-tab').forEach(b => {
    b.classList.toggle('active', b.dataset.tab === tab);
  });
  const field = document.getElementById('s-destination');
  const cabin = document.getElementById('s-cabin');
  const map = {
    flights:  { dest: 'Sydney (SYD)',                       cabin: 'Economy Class',                  key: 'sydney' },
    student:  { dest: 'Melbourne (MEL) / Sydney / Dallas',  cabin: 'Student Fare (+45 kg Baggage)', key: 'melbourne' },
    heli:     { dest: 'Everest Base Camp & Kalapatthar',    cabin: 'Helicopter Window Seat',         key: 'everest' },
    tours:    { dest: 'Dubai / Thailand / Bali / Japan',    cabin: 'Full Tour Package',              key: 'dubai' },
    visa:     { dest: 'London Heathrow (LHR) / Schengen',   cabin: 'Embassy Flight Itinerary',       key: 'london' },
  };
  if (map[tab]) {
    if (field) field.value = map[tab].dest;
    if (cabin) cabin.value = map[tab].cabin;

    // Trigger live preview for selected service
    const origin = document.getElementById('s-origin')?.value || 'Kathmandu (KTM)';
    const date   = document.getElementById('s-date')?.value || '2026-10-01';
    currentLiveSearchData = { origin, dest: map[tab].dest, date, cabin: map[tab].cabin, key: map[tab].key };
    renderLiveResults(currentLiveSearchData, false);
  }
}

/* ── Contact Form ── */
function handleContact(e) {
  e.preventDefault();
  const name    = document.getElementById('c-name')?.value    || '';
  const phone   = document.getElementById('c-phone')?.value   || '';
  const service = document.getElementById('c-service')?.value || '';
  const dest    = document.getElementById('c-dest')?.value    || '';
  const note    = document.getElementById('c-note')?.value    || '';

  const msg = encodeURIComponent(
    `New inquiry from website:\n\nName: ${name}\nPhone: ${phone}\nService: ${service}\nDestination: ${dest}\nNotes: ${note}`
  );
  window.open(`https://wa.me/9779762117199?text=${msg}`, '_blank');
  e.target.reset();
}

/* ─────────────────────────────────────────
   SMOOTH SCROLL & ANIMATION ENGINE
   Powered by Lenis + GSAP (spragadheeshraj.com architecture)
───────────────────────────────────────── */

let lenisInstance = null;

function initSmoothScroll() {
  if (typeof Lenis !== 'undefined') {
    lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    window.__lenis = lenisInstance;

    function raf(time) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    if (window.gsap && window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      lenisInstance.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenisInstance.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    }
  }
}

/* ── Interactive Custom Cursor & Follower ── */
function initCustomCursor() {
  const cursor = document.getElementById('custom-cursor');
  const dot = document.getElementById('custom-cursor-dot');
  if (!cursor || !dot || window.matchMedia('(pointer: coarse)').matches) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let cursorX = mouseX;
  let cursorY = mouseY;
  let isVisible = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!isVisible) {
      isVisible = true;
      cursor.style.opacity = '1';
      dot.style.opacity = '1';
    }
    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
  });

  window.addEventListener('mouseleave', () => {
    isVisible = false;
    cursor.style.opacity = '0';
    dot.style.opacity = '0';
  });

  function renderCursor() {
    cursorX += (mouseX - cursorX) * 0.16;
    cursorY += (mouseY - cursorY) * 0.16;
    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;
    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  // Hover expansion on interactive elements
  const interactives = 'a, button, input, select, textarea, .route-card, .tour-card, .sft-row, .booking-field';
  document.querySelectorAll(interactives).forEach((el) => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
  });
}

/* ── Scroll Progress & Nav Sync ── */
function initScrollProgress() {
  const progressLine = document.getElementById('scroll-progress-line');
  const nav = document.getElementById('site-nav');

  function update() {
    const scrollY = window.scrollY || window.pageYOffset;
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docH > 0 ? (scrollY / docH) * 100 : 0;

    if (progressLine) {
      progressLine.style.width = `${progress}%`;
    }
    if (nav) {
      nav.classList.toggle('scrolled', scrollY > 20);
    }
  }

  window.addEventListener('scroll', update, { passive: true });
  if (lenisInstance) {
    lenisInstance.on('scroll', update);
  }
  update();
}

/* ── GSAP & Intersection Scroll Reveals ── */
function initScrollAnimations() {
  // 1. Text Split / Word Reveal
  document.querySelectorAll('.reveal-text').forEach((el) => {
    const original = el.textContent.trim();
    const words = original.split(/\s+/);
    el.innerHTML = words
      .map(
        (w, i) =>
          `<span style="display:inline-block;overflow:hidden;vertical-align:bottom;padding-bottom:0.1em;">` +
          `<span class="word-span" style="display:inline-block;transform:translateY(115%);opacity:0;transition:transform 0.85s cubic-bezier(0.16,1,0.3,1),opacity 0.7s ease;transition-delay:${i * 60}ms">${w}</span>` +
          `</span>`
      )
      .join(' ');
  });

  // 2. IntersectionObserver trigger for reveals
  const revealCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target;
        target.classList.add('in-view');

        // Animate word spans inside
        target.querySelectorAll('.word-span').forEach((span) => {
          span.style.transform = 'translateY(0)';
          span.style.opacity = '1';
        });

        // Trigger counter if present
        target.querySelectorAll('.reveal-count').forEach((countEl) => {
          if (countEl.dataset.counted) return;
          countEl.dataset.counted = 'true';
          const targetNum = parseInt(countEl.dataset.target || countEl.textContent, 10);
          const suffix = countEl.dataset.suffix || '';
          let start = null;
          const duration = 1500;
          function animateCount(timestamp) {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            countEl.textContent = Math.round(ease * targetNum).toLocaleString() + suffix;
            if (progress < 1) requestAnimationFrame(animateCount);
          }
          requestAnimationFrame(animateCount);
        });

        observer.unobserve(target);
      }
    });
  };

  const observer = new IntersectionObserver(revealCallback, {
    threshold: 0.08,
    rootMargin: '0px 0px -50px 0px',
  });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-text, [data-stagger]').forEach((el) => {
    observer.observe(el);
  });

  // 3. Stagger children inside [data-stagger]
  document.querySelectorAll('[data-stagger]').forEach((container) => {
    const items = container.querySelectorAll(':scope > *');
    items.forEach((item, index) => {
      item.style.transitionDelay = `${index * 90}ms`;
      item.classList.add('reveal');
      observer.observe(item);
    });
  });

  // 4. Smooth Anchor Scrolling via Lenis
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        if (lenisInstance) {
          lenisInstance.scrollTo(target, { offset: -70, duration: 1.4 });
        } else {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // 5. Magnetic Button Effect
  document.querySelectorAll('[data-magnetic]').forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      btn.style.transform = `translate(${x * 0.28}px, ${y * 0.28}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px)';
    });
  });
}

/* ── Mobile Navigation Drawer Toggle ── */
export function toggleMobileNav() {
  const drawer = document.getElementById('mobile-nav-drawer');
  const toggle = document.getElementById('mobile-nav-toggle');
  if (!drawer) return;

  const isOpen = drawer.classList.toggle('open');
  drawer.setAttribute('aria-hidden', !isOpen);
  if (toggle) toggle.setAttribute('aria-expanded', isOpen);

  if (isOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
}

/* ── Live Kathmandu Time Clock (NPT / UTC+5:45) ── */
function initKathmanduClock() {
  const clockEl = document.getElementById('ktm-clock');
  if (!clockEl) return;

  function updateClock() {
    try {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Kathmandu',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      const timeStr = new Intl.DateTimeFormat('en-US', options).format(now);
      clockEl.textContent = `Kathmandu, NP: ${timeStr} (NPT)`;
    } catch (e) {
      clockEl.textContent = 'Kathmandu · Putalisadak Desk';
    }
  }

  updateClock();
  setInterval(updateClock, 1000);
}

/* ── Punchline Scrub Character Reveal (spragadheeshraj style) ── */
function initPunchlineReveal() {
  const container = document.getElementById('punchline-text');
  if (!container) return;

  const quote =
    'Aviation is not just about flying across continents. It is where student dreams, family reunions, and lifetime journeys begin. Star Mall, Putalisadak.';
  const highlightWords = ['aviation', 'student', 'dreams', 'journeys', 'putalisadak'];
  const highlightSeen = {};

  const words = quote.split(/(\s+)/);
  const chars = [];

  container.innerHTML = '';
  words.forEach((token) => {
    if (/^\s+$/.test(token)) {
      container.appendChild(document.createTextNode(token));
      for (let i = 0; i < token.length; i++) chars.push(null);
    } else {
      const clean = token.replace(/[^a-zA-Z]/g, '').toLowerCase();
      const isHL = highlightWords.includes(clean) && !highlightSeen[clean];
      if (isHL) highlightSeen[clean] = true;

      for (let i = 0; i < token.length; i++) {
        const span = document.createElement('span');
        span.classList.add('q-char');
        if (isHL) span.classList.add('q-highlight');
        span.textContent = token[i];
        container.appendChild(span);
        chars.push(span);
      }
    }
  });

  const charSpans = chars.filter(Boolean);
  charSpans.forEach((span) => {
    span.style.opacity = '0.12';
  });

  function applyMask(progress) {
    const total = charSpans.length;
    const front = progress * (total + 1);
    const feather = total * 0.08;

    charSpans.forEach((span, i) => {
      const dist = front - i;
      const isHL = span.classList.contains('q-highlight');
      let opacity;
      if (dist <= 0) {
        opacity = 0.12;
        if (isHL) span.style.color = '';
      } else if (dist < feather) {
        const t = dist / feather;
        opacity = 0.12 + (1 - 0.12) * (t * t);
        if (isHL) span.style.color = '';
      } else {
        opacity = 1;
        if (isHL) span.style.color = '#F05A1A';
      }
      span.style.opacity = opacity;
    });
  }

  if (window.ScrollTrigger) {
    ScrollTrigger.create({
      trigger: container,
      start: 'top 85%',
      end: 'top 45%',
      scrub: true,
      onUpdate: (self) => applyMask(self.progress),
    });
  } else {
    charSpans.forEach((span) => (span.style.opacity = '1'));
  }
}

/* ── 3D Barrel Roll Button Drums (spragadheeshraj style) ── */
function initBarrelRollButtons() {
  document.querySelectorAll('.footer-barrel-link').forEach((link) => {
    const wrap = link.querySelector('.fbl-drum-wrap');
    if (!wrap) return;
    const label = wrap.dataset.label || '';
    const letters = label.split('');

    wrap.innerHTML = '';
    const drums = letters.map((ch) => {
      const drum = document.createElement('span');
      drum.className = 'fbl-drum';

      const f0 = document.createElement('span');
      f0.className = 'fbl-face fbl-face-0';
      f0.textContent = ch === ' ' ? '\u00A0' : ch;

      const f1 = document.createElement('span');
      f1.className = 'fbl-face fbl-face-1';
      f1.textContent = ch === ' ' ? '\u00A0' : ch;

      drum.appendChild(f0);
      drum.appendChild(f1);
      wrap.appendChild(drum);

      if (window.gsap) {
        gsap.set(f0, { y: '0%', opacity: 1 });
        gsap.set(f1, { y: '-100%', opacity: 0 });
      }

      return { drum, f0, f1 };
    });

    link.addEventListener('mouseenter', () => {
      if (!window.gsap) return;
      const tl = gsap.timeline();
      drums.forEach(({ f0, f1 }, i) => {
        const delay = i * 0.025;
        tl.to(f0, { y: '100%', opacity: 0, duration: 0.25, ease: 'power3.in' }, delay).to(
          f1,
          { y: '0%', opacity: 1, duration: 0.25, ease: 'power3.out' },
          delay + 0.06
        );
      });
    });

    link.addEventListener('mouseleave', () => {
      if (!window.gsap) return;
      const tl = gsap.timeline();
      drums.forEach(({ f0, f1 }, i) => {
        const delay = i * 0.025;
        tl.to(f1, { y: '-100%', opacity: 0, duration: 0.25, ease: 'power3.in' }, delay).to(
          f0,
          { y: '0%', opacity: 1, duration: 0.25, ease: 'power3.out' },
          delay + 0.06
        );
      });
    });
  });
}

/* ── Interactive Particle & Glitch Canvas (spragadheeshraj style) ── */
function initFooterCanvas() {
  const canvas = document.getElementById('footer-name-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const NAME = 'ALLAIR INTERNATIONAL';

  let W, H;
  let particles = [];
  let isHovering = false;
  let animId = null;

  function resizeCanvas() {
    const rect = canvas.parentElement.getBoundingClientRect();
    W = canvas.width = rect.width;
    H = canvas.height = rect.height;
    buildParticles();
  }

  function buildParticles() {
    particles = [];
    const isSmall = W < 600;
    const GAP = isSmall ? 8 : 6;
    const off = document.createElement('canvas');
    off.width = W;
    off.height = H;
    const oc = off.getContext('2d');

    let fontSize = Math.round(H * 0.45);
    oc.font = `800 ${fontSize}px 'Space Mono', 'DM Serif Display', monospace`;
    let tw = oc.measureText(NAME).width;
    while (tw > W - 40 && fontSize > 14) {
      fontSize -= 2;
      oc.font = `800 ${fontSize}px 'Space Mono', 'DM Serif Display', monospace`;
      tw = oc.measureText(NAME).width;
    }

    oc.textAlign = 'center';
    oc.textBaseline = 'middle';
    oc.fillStyle = '#ffffff';
    oc.fillText(NAME, W / 2, H / 2);

    const data = oc.getImageData(0, 0, W, H).data;

    for (let y = 0; y < H; y += GAP) {
      for (let x = 0; x < W; x += GAP) {
        const inText = data[(y * W + x) * 4 + 3] > 120;
        if (inText || Math.random() < 0.02) {
          particles.push({
            x,
            y,
            ox: x,
            oy: y,
            vx: 0,
            vy: 0,
            inText,
            r: inText ? 1.4 : 0.8,
            color: inText ? '#F05A1A' : '#29B5E8',
            alpha: inText ? 0.75 : 0.15,
          });
        }
      }
    }
  }

  let glitching = false;
  let glitchSlices = [];

  function triggerGlitch() {
    glitching = true;
    glitchSlices = [];
    const count = 3 + Math.floor(Math.random() * 4);
    for (let i = 0; i < count; i++) {
      glitchSlices.push({
        y: Math.random() * H,
        h: 4 + Math.random() * 16,
        offset: (Math.random() - 0.5) * 24,
      });
    }
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);

    particles.forEach((p) => {
      let drawX = p.x;
      let drawY = p.y;

      if (glitching) {
        glitchSlices.forEach((slice) => {
          if (p.y >= slice.y && p.y <= slice.y + slice.h) {
            drawX += slice.offset;
          }
        });
      }

      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(drawX, drawY, p.r, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.globalAlpha = 1;
    animId = requestAnimationFrame(loop);
  }

  canvas.addEventListener('mouseenter', () => {
    isHovering = true;
    triggerGlitch();
    const glitchInterval = setInterval(() => {
      if (!isHovering) clearInterval(glitchInterval);
      else triggerGlitch();
    }, 400);
  });

  canvas.addEventListener('mouseleave', () => {
    isHovering = false;
    glitching = false;
    glitchSlices = [];
  });

  window.addEventListener('resize', () => {
    resizeCanvas();
  });

  resizeCanvas();
  loop();
}

/* ── Theme Engine ── */
export function initTheme() {
  const saved = localStorage.getItem('allair-theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial = saved || (prefersDark ? 'dark' : 'light');
  applyTheme(initial);

  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('allair-theme')) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }
}

export function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const isDark = theme === 'dark';

  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
    btn.setAttribute('data-current-theme', theme);
    btn.title = isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme';
  });
}

export function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  localStorage.setItem('allair-theme', next);
  applyTheme(next);
}

/* ── Minimalist Aviation Preloader Engine (Dribbble Inspired) ── */
let preloaderDismissed = false;

export function initPreloader() {
  const preloader = document.getElementById('preloader');
  const percentEl = document.getElementById('preloader-percent');
  const fillEl    = document.getElementById('preloader-progress-fill');
  const statusEl  = document.getElementById('preloader-status');

  if (!preloader) return;

  const statuses = [
    { p: 0,  text: "Preparing flight schedules & student desk..." },
    { p: 30, text: "Calibrating international carrier routes (SQ · RA · QR)..." },
    { p: 60, text: "Verifying 46kg student baggage allowances..." },
    { p: 85, text: "Connecting Putalisadak central desk..." },
    { p: 98, text: "Ready for departure." }
  ];

  const startTime = performance.now();
  const duration = 1350; // 1.35 seconds smooth transition

  function step(now) {
    if (preloaderDismissed) return;

    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Smooth easeOutCubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const currentPct = Math.round(eased * 100);

    if (percentEl) percentEl.textContent = currentPct;
    if (fillEl) fillEl.style.width = `${currentPct}%`;

    // Update status text
    if (statusEl) {
      for (let i = statuses.length - 1; i >= 0; i--) {
        if (currentPct >= statuses[i].p) {
          if (statusEl.textContent !== statuses[i].text) {
            statusEl.textContent = statuses[i].text;
          }
          break;
        }
      }
    }

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      setTimeout(() => {
        dismissPreloader();
      }, 200);
    }
  }

  requestAnimationFrame(step);
}

export function dismissPreloader() {
  if (preloaderDismissed) return;
  preloaderDismissed = true;
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.classList.add('loaded');
    setTimeout(() => {
      preloader.remove();
    }, 600);
  }
}

// Immediate theme bootstrap to prevent flash of wrong theme
initTheme();

/* ── Expose Globals ── */
window.setCurrency        = setCurrency;
window.openModal          = openModal;
window.closeModal         = closeModal;
window.filterRoutes       = filterRoutes;
window.switchTab          = switchTab;
window.toggleMobileNav    = toggleMobileNav;
window.toggleTheme        = toggleTheme;
window.closeLiveResults   = closeLiveResults;
window.renderLiveResults  = renderLiveResults;
window.updateLocationHint = updateLocationHint;
window.swapLocations      = swapLocations;
window.dismissPreloader   = dismissPreloader;

/* ── Boot ── */
document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initTheme();
  initSmoothScroll();
  initCustomCursor();
  initScrollProgress();
  initScrollAnimations();
  initKathmanduClock();
  initPunchlineReveal();
  initBarrelRollButtons();
  initFooterCanvas();

  const searchForm = document.getElementById('search-form');
  const contactForm = document.getElementById('contact-form');
  if (searchForm) searchForm.addEventListener('submit', handleSearch);
  if (contactForm) contactForm.addEventListener('submit', handleContact);

  if (dialog) {
    dialog.addEventListener('click', (e) => {
      if (e.target === dialog) dialog.close();
    });
  }

  setCurrency('NPR');
});




