/* ─────────────────────────────────────────
   ALLAIR INTERNATIONAL — ADMIN PANEL LOGIC
───────────────────────────────────────── */

// Shared Currency Rates (synced with localStorage)
let ADMIN_RATES = JSON.parse(localStorage.getItem('allair-custom-rates')) || {
  NPR: 135,
  USD: 1,
  AUD: 1.54,
  GBP: 0.79,
  EUR: 0.92
};

// Initial Passenger CRM Inquiries Data
let INQUIRIES = [
  {
    id: 'AL-9042',
    name: 'Bikash Adhikari',
    phone: '+977 9841223344',
    route: 'Kathmandu (KTM) → Sydney (SYD)',
    carrier: 'Singapore Airlines (SQ)',
    date: '2026-10-12',
    baggage: '46 kg Student (2×23kg)',
    usd: 890,
    status: 'Pending',
    source: 'Website Live Search'
  },
  {
    id: 'AL-9041',
    name: 'Prashant Thapa',
    phone: '+977 9803112233',
    route: 'Kathmandu (KTM) → Dallas/Texas (DFW)',
    carrier: 'Qatar Airways (QR)',
    date: '2026-11-04',
    baggage: '46 kg Student (2×23kg)',
    usd: 960,
    status: 'Confirmed',
    source: 'WhatsApp Desk'
  },
  {
    id: 'AL-9040',
    name: 'Sunita Gurung',
    phone: '+977 9818998877',
    route: 'Kathmandu (KTM) → Tokyo (NRT)',
    carrier: 'Nepal Airlines (RA)',
    date: '2026-09-28',
    baggage: '40 kg Student / Std',
    usd: 620,
    status: 'Ticket Issued',
    source: 'Walk-in Putalisadak'
  },
  {
    id: 'AL-9039',
    name: 'David & Emily Miller',
    phone: '+61 412 345 678',
    route: 'Kathmandu (KTM) → Everest Heli Tour',
    carrier: 'Airbus H125 Helicopter',
    date: '2026-10-02',
    baggage: 'Guaranteed Window Seat',
    usd: 1960,
    status: 'Confirmed',
    source: 'Website Direct Booking'
  },
  {
    id: 'AL-9038',
    name: 'Aayush KC',
    phone: '+977 9860123456',
    route: 'Kathmandu (KTM) → London (LHR)',
    carrier: 'Qatar Airways (QR)',
    date: '2026-10-20',
    baggage: '46 kg Student (2×23kg)',
    usd: 910,
    status: 'Pending',
    source: 'Website Live Search'
  }
];

// Active Flight Routes Data
let ROUTES_CATALOG = [
  {
    key: 'sydney',
    label: 'Kathmandu (KTM) → Sydney (SYD)',
    airline: 'Singapore Airlines · Malaysia Airlines · Cathay',
    baggage: '46 kg Student Special (2×23 kg)',
    usd: 890,
    status: 'High Demand (Australia Intake)'
  },
  {
    key: 'dallas',
    label: 'Kathmandu (KTM) → Dallas / Texas (DFW)',
    airline: 'Qatar Airways & American Airlines',
    baggage: '46 kg Student (2×23 kg)',
    usd: 960,
    status: 'Active Daily'
  },
  {
    key: 'tokyo',
    label: 'Kathmandu (KTM) → Tokyo Narita (NRT)',
    airline: 'Nepal Airlines (Direct Non-Stop)',
    baggage: '40 kg Student / 35 kg Standard',
    usd: 620,
    status: 'Non-Stop Direct'
  },
  {
    key: 'london',
    label: 'Kathmandu (KTM) → London Heathrow (LHR)',
    airline: 'Qatar Airways & Turkish Airlines',
    baggage: '46 kg Student (2×23 kg)',
    usd: 910,
    status: 'UK Student Intake'
  },
  {
    key: 'toronto',
    label: 'Kathmandu (KTM) → Toronto (YYZ)',
    airline: 'Air India & Air Canada',
    baggage: '46 kg Student (2×23 kg)',
    usd: 1040,
    status: 'Canada Direct Transit'
  },
  {
    key: 'everest',
    label: 'Everest Heli-Tour (Kalapatthar 5,400m)',
    airline: 'Airbus H125 Helicopter',
    baggage: 'Guaranteed Window Seat + Oxygen',
    usd: 980,
    status: 'Daily Morning 6:30 AM'
  }
];

// Switch Tab Logic
window.switchAdminTab = function(tabId) {
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));

  const targetPanel = document.getElementById(	ab-);
  const targetTab = document.querySelector(.nav-tab[data-tab=""]);

  if (targetPanel) targetPanel.classList.add('active');
  if (targetTab) targetTab.classList.add('active');

  const titleMap = {
    overview: 'Operations Dashboard',
    bookings: 'Passenger Inquiries & Bookings (CRM)',
    inventory: 'Flight Routes & Fare Manager',
    currency: 'Currency Exchange Controller',
    heli: 'Everest Heli Operations'
  };

  const titleEl = document.getElementById('admin-section-title');
  if (titleEl) titleEl.textContent = titleMap[tabId] || 'Operations Dashboard';
};

// Render Overview Inquiries (Top 4)
function renderOverviewInquiries() {
  const tbody = document.getElementById('overview-inquiries-body');
  if (!tbody) return;

  tbody.innerHTML = INQUIRIES.slice(0, 4).map(item => {
    const nprPrice = Math.round(item.usd * ADMIN_RATES.NPR).toLocaleString();
    const statusClass = item.status === 'Ticket Issued' ? 'status-pill-issued' : (item.status === 'Confirmed' ? 'status-pill-ok' : 'status-pill-pending');

    return 
      <tr>
        <td>
          <div class="passenger-cell">
            <span class="p-name"></span>
            <span class="p-contact"></span>
          </div>
        </td>
        <td><strong></strong><br><span style="font-size:0.7rem; color:var(--c-ink-3);"></span></td>
        <td></td>
        <td></td>
        <td><strong style="color:var(--c-orange);">रू </strong> ({item.usd})</td>
        <td><span class=""></span></td>
        <td>
          <button type="button" class="btn-sm-action orange" onclick="triggerWhatsApp('')" title="Send WhatsApp">💬 WhatsApp</button>
        </td>
      </tr>
    ;
  }).join('');
}

// Render Full CRM Table
function renderCRMTable(list = INQUIRIES) {
  const tbody = document.getElementById('crm-full-table-body');
  if (!tbody) return;

  tbody.innerHTML = list.map(item => {
    const nprPrice = Math.round(item.usd * ADMIN_RATES.NPR).toLocaleString();
    const statusClass = item.status === 'Ticket Issued' ? 'status-pill-issued' : (item.status === 'Confirmed' ? 'status-pill-ok' : 'status-pill-pending');

    return 
      <tr>
        <td><code style="font-size:0.75rem; color:var(--c-blue);"></code></td>
        <td>
          <div class="passenger-cell">
            <span class="p-name"></span>
            <span class="p-contact"></span>
          </div>
        </td>
        <td><strong></strong><br><span style="font-size:0.7rem; color:var(--c-ink-3);"></span></td>
        <td><br><span style="font-size:0.7rem; color:var(--c-orange);"></span></td>
        <td><strong style="color:var(--c-orange);">रू </strong><br><span style="font-size:0.7rem; color:var(--c-ink-3);">{item.usd} USD</span></td>
        <td>
          <button type="button" class="" onclick="cycleStatus('')" title="Click to cycle status"> ▾</button>
        </td>
        <td>
          <div style="display:flex; gap:0.35rem;">
            <button type="button" class="btn-sm-action orange" onclick="triggerWhatsApp('')">💬 Contact</button>
            <button type="button" class="btn-sm-action" onclick="printTicketPreview('')">📄 Ticket</button>
          </div>
        </td>
      </tr>
    ;
  }).join('');

  // Update Pending badge
  const pendingCount = INQUIRIES.filter(i => i.status === 'Pending').length;
  const badge = document.getElementById('pending-count-badge');
  if (badge) badge.textContent = ${pendingCount} New;
}

// Filter CRM Table
window.filterCRMTable = function() {
  const search = document.getElementById('crm-search-input')?.value.toLowerCase() || '';
  const status = document.getElementById('crm-status-filter')?.value || 'ALL';

  const filtered = INQUIRIES.filter(item => {
    const matchSearch = item.name.toLowerCase().includes(search) || item.route.toLowerCase().includes(search) || item.phone.includes(search);
    const matchStatus = status === 'ALL' || item.status === status;
    return matchSearch && matchStatus;
  });

  renderCRMTable(filtered);
};

// Cycle Status on click
window.cycleStatus = function(id) {
  const item = INQUIRIES.find(i => i.id === id);
  if (!item) return;

  if (item.status === 'Pending') item.status = 'Confirmed';
  else if (item.status === 'Confirmed') item.status = 'Ticket Issued';
  else item.status = 'Pending';

  renderOverviewInquiries();
  filterCRMTable();
};

// Trigger Direct WhatsApp
window.triggerWhatsApp = function(id) {
  const item = INQUIRIES.find(i => i.id === id);
  if (!item) return;

  const nprPrice = Math.round(item.usd * ADMIN_RATES.NPR).toLocaleString();
  const cleanPhone = item.phone.replace(/[^0-9]/g, '');

  const msg = encodeURIComponent(
    Namaste !\n\n +
    This is Allair International Travels & Tours (Putalisadak, Star Mall Floor 3).\n\n +
    Regarding your flight inquiry:\n +
    ✈️ Route: \n +
    🗓️ Date: \n +
    🧳 Baggage: \n +
    💰 Fare: रू  ({item.usd} USD)\n +
    📌 Status: \n\n +
    Your ticket reservation is ready at our Putalisadak office. Please reply to confirm passport details or seat preference!
  );

  window.open(https://wa.me/?text=, '_blank');
};

// Print Ticket Manifest Preview
window.printTicketPreview = function(id) {
  const item = INQUIRIES.find(i => i.id === id);
  if (!item) return;

  alert(
    ═══════════════════════════════════\n +
    ALLAIR INTERNATIONAL TRAVELS & TOURS\n +
    Star Mall 3rd Floor, Putalisadak, Kathmandu\n +
    Govt. Regd: 284910/078/079\n +
    ═══════════════════════════════════\n +
    PASSENGER TICKET ITINERARY\n +
    Booking Ref: \n +
    Passenger:  ()\n +
    Flight Route: \n +
    Carrier: \n +
    Depart Date: \n +
    Baggage Included: \n +
    Total Fare: रू  (USD {item.usd})\n +
    Status: \n +
    ═══════════════════════════════════
  );
};

// Render Route Inventory
function renderRoutesInventory() {
  const container = document.getElementById('routes-admin-container');
  if (!container) return;

  container.innerHTML = ROUTES_CATALOG.map(r => {
    const nprPrice = Math.round(r.usd * ADMIN_RATES.NPR).toLocaleString();
    const audPrice = Math.round(r.usd * ADMIN_RATES.AUD).toLocaleString();

    return 
      <div class="route-admin-card">
        <div style="display:flex; justify-content:space-between; align-items:flex-start;">
          <h4></h4>
          <span class="status-pill-ok"></span>
        </div>
        <p style="font-size:0.75rem; color:var(--c-ink-3); margin:0;"></p>
        <div style="font-size:0.75rem; color:var(--c-orange); font-weight:600;">🧳 </div>
        <div style="display:flex; justify-content:space-between; align-items:flex-end; padding-top:0.5rem; border-top:1px solid var(--c-rule);">
          <div>
            <span style="font-size:0.6rem; color:var(--c-ink-3); text-transform:uppercase;">Live NPR Rate</span>
            <div style="font-family:'Space Mono'; font-size:1.1rem; font-weight:700; color:var(--c-orange);">रू </div>
            <span style="font-size:0.65rem; color:var(--c-ink-3);">{r.usd} USD · A$  AUD</span>
          </div>
          <button type="button" class="btn-sm-action" onclick="editRoutePrompt('')">Edit Base Fare</button>
        </div>
      </div>
    ;
  }).join('');
}

// Edit Route Base Fare
window.editRoutePrompt = function(key) {
  const r = ROUTES_CATALOG.find(i => i.key === key);
  if (!r) return;

  const newUsd = prompt(Enter new Base USD fare for :, r.usd);
  if (newUsd && !isNaN(newUsd)) {
    r.usd = parseFloat(newUsd);
    renderRoutesInventory();
    renderOverviewInquiries();
    renderCRMTable();
    alert(Updated base fare for  to {r.usd} USD!);
  }
};

// Render Quick Rates
function renderQuickRates() {
  const list = document.getElementById('quick-rates-list');
  if (!list) return;

  list.innerHTML = 
    <div class="rate-preview-item">
      <span>🇳🇵 NPR / USD</span>
      <strong style="color:var(--c-orange);">रू </strong>
    </div>
    <div class="rate-preview-item">
      <span>🇦🇺 AUD / USD</span>
      <strong style="color:var(--c-blue);">A$ </strong>
    </div>
    <div class="rate-preview-item">
      <span>🇬🇧 GBP / USD</span>
      <strong style="color:var(--c-ink);">£ </strong>
    </div>
    <div class="rate-preview-item">
      <span>🇪🇺 EUR / USD</span>
      <strong style="color:var(--c-ink);">€ </strong>
    </div>
  ;

  // Simulator
  const testUsd = 890;
  const simNpr = document.getElementById('sim-npr');
  const simAud = document.getElementById('sim-aud');
  const simGbp = document.getElementById('sim-gbp');
  const simEur = document.getElementById('sim-eur');

  if (simNpr) simNpr.textContent = रू ;
  if (simAud) simAud.textContent = A$ ;
  if (simGbp) simGbp.textContent = £ ;
  if (simEur) simEur.textContent = € ;
}

// Save Custom Exchange Rates
window.saveCustomRates = function() {
  const npr = parseFloat(document.getElementById('rate-npr')?.value || 135);
  const aud = parseFloat(document.getElementById('rate-aud')?.value || 1.54);
  const gbp = parseFloat(document.getElementById('rate-gbp')?.value || 0.79);
  const eur = parseFloat(document.getElementById('rate-eur')?.value || 0.92);

  ADMIN_RATES = { NPR: npr, USD: 1, AUD: aud, GBP: gbp, EUR: eur };
  localStorage.setItem('allair-custom-rates', JSON.stringify(ADMIN_RATES));

  renderQuickRates();
  renderRoutesInventory();
  renderOverviewInquiries();
  renderCRMTable();

  alert('✅ Exchange rates saved and broadcasted! Public website flight search will now use these updated rates.');
};

// Kathmandu Clock
function initClock() {
  const clockEl = document.getElementById('admin-clock-val');
  if (!clockEl) return;

  function update() {
    const now = new Date();
    clockEl.textContent = now.toLocaleTimeString('en-US', { timeZone: 'Asia/Kathmandu', hour12: true });
  }
  update();
  setInterval(update, 1000);
}

// Modal Handlers
const modal = document.getElementById('admin-booking-modal');

window.openNewInquiryModal = function() {
  if (modal) modal.showModal();
};

window.closeAdminModal = function() {
  if (modal) modal.close();
};

window.handleCreateBooking = function(e) {
  e.preventDefault();
  const name = document.getElementById('nb-name').value;
  const phone = document.getElementById('nb-phone').value;
  const route = document.getElementById('nb-route').value;
  const date = document.getElementById('nb-date').value;
  const baggage = document.getElementById('nb-baggage').value;
  const usd = parseFloat(document.getElementById('nb-usd').value || 890);

  const newId = AL-;

  INQUIRIES.unshift({
    id: newId,
    name,
    phone,
    route,
    carrier: 'Confirmed Allair GDS',
    date,
    baggage,
    usd,
    status: 'Pending',
    source: 'Manual Desk Entry'
  });

  renderOverviewInquiries();
  renderCRMTable();
  closeAdminModal();
  alert(Booking  created for !);
};

window.openNewRouteModal = function() {
  const dest = prompt('Enter new destination name (e.g. Frankfurt / Germany):');
  if (!dest) return;
  const code = prompt('Enter Airport Code (e.g. FRA):', 'FRA');
  const usd = parseFloat(prompt('Enter Base USD Fare:', '920') || 920);

  ROUTES_CATALOG.push({
    key: code.toLowerCase(),
    label: Kathmandu (KTM) →  (),
    airline: 'Qatar Airways & Lufthansa',
    baggage: '46 kg Student (2×23 kg)',
    usd,
    status: 'Newly Added'
  });

  renderRoutesInventory();
  alert(New destination  () added to live flight catalogue!);
};

// Theme Toggle
window.toggleTheme = function() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('allair-theme', next);
};

// Boot
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('allair-theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);

  initClock();
  renderOverviewInquiries();
  renderCRMTable();
  renderRoutesInventory();
  renderQuickRates();

  // Populate inputs with current rates
  const rNpr = document.getElementById('rate-npr');
  const rAud = document.getElementById('rate-aud');
  const rGbp = document.getElementById('rate-gbp');
  const rEur = document.getElementById('rate-eur');

  if (rNpr) rNpr.value = ADMIN_RATES.NPR;
  if (rAud) rAud.value = ADMIN_RATES.AUD;
  if (rGbp) rGbp.value = ADMIN_RATES.GBP;
  if (rEur) rEur.value = ADMIN_RATES.EUR;
});
