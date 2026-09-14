(function () {
  'use strict';
  const KEY = 'allair_cms_v1';
  const defaults = { version: 1, sections: {}, overrides: {}, blogs: [], enquiries: [], audit: [], settings: { businessName: 'All Air International Travels & Tours', phone: '9851425123', whatsapp: '9779851425123', email: 'info@allairtravel.com', address: 'Star Mall, 3rd Floor, Putalisadak, Kathmandu' } };
  const read = () => { try { const state = { ...defaults, ...(JSON.parse(localStorage.getItem(KEY)) || {}) }; state.settings = { ...defaults.settings, ...(state.settings || {}) }; if (state.settings.businessName === 'Allair International Travels & Tours') state.settings.businessName = defaults.settings.businessName; return state; } catch (_) { return { ...defaults }; } };
  const write = state => { localStorage.setItem(KEY, JSON.stringify(state)); window.dispatchEvent(new CustomEvent('allair:cms-update', { detail: state })); };
  const escapeText = value => String(value || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const pathFor = element => {
    if (!element || element === document.body) return 'body';
    if (element.id) return `#${CSS.escape(element.id)}`;
    const parent = element.parentElement;
    if (!parent) return element.tagName.toLowerCase();
    const same = [...parent.children].filter(child => child.tagName === element.tagName);
    return `${pathFor(parent)} > ${element.tagName.toLowerCase()}:nth-of-type(${same.indexOf(element) + 1})`;
  };
  const applyOverrides = state => {
    Object.entries(state.overrides || {}).forEach(([selector, change]) => {
      try { document.querySelectorAll(selector).forEach(el => { if (change.text !== undefined && el.textContent !== change.text) el.textContent = change.text; if (change.src !== undefined && el.tagName === 'IMG' && el.getAttribute('src') !== change.src) el.src = change.src; if (change.href !== undefined && el.tagName === 'A' && el.getAttribute('href') !== change.href) el.href = change.href; }); } catch (_) {}
    });
  };
  const applySettings = state => {
    const settings = state.settings || defaults.settings;
    document.querySelectorAll('a[href^="tel:"]').forEach(a => a.href = `tel:+977${settings.phone}`);
    document.querySelectorAll('a[href*="wa.me/"]').forEach(a => a.href = a.href.replace(/wa\.me\/\d+/, `wa.me/${settings.whatsapp}`));
    document.querySelectorAll('a[href^="mailto:"]').forEach(a => { a.href = `mailto:${settings.email}`; if (a.textContent.includes('@')) a.textContent = settings.email; });
  };
  const apply = () => {
    const state = read();
    Object.entries(state.sections || {}).forEach(([selector, enabled]) => document.querySelectorAll(selector).forEach(el => { el.hidden = enabled === false; el.dataset.cmsHidden = enabled === false ? 'true' : 'false'; }));
    applyOverrides(state);
    applySettings(state);
    document.querySelectorAll('[data-cms-blog]').forEach(el => el.remove());
    const grid = document.querySelector('.blog-grid');
    if (grid) (state.blogs || []).filter(post => post.enabled !== false && post.status === 'published').forEach(post => {
      const card = document.createElement('details'); card.className = 'blog-card'; card.dataset.cmsBlog = post.id;
      const number = String(grid.querySelectorAll('.blog-card').length + 1).padStart(2, '0');
      card.innerHTML = `<summary><span class="blog-number">${number}</span><span class="blog-meta">${escapeText(post.category)} · ${escapeText(post.readTime || '5 min read')}</span><h3>${escapeText(post.title)}</h3><p>${escapeText(post.excerpt)}</p><span class="blog-read">Read article <i>＋</i></span></summary><div class="blog-article">${String(post.body || '').split(/\n\s*\n/).filter(Boolean).map(p => `<p>${escapeText(p)}</p>`).join('')}</div>`;
      grid.appendChild(card);
    });
    const customGrid = document.querySelector('.custom-service-grid');
    if (customGrid && Array.isArray(state.catalog?.other)) {
      const items = state.catalog.other.filter(item => item.enabled !== false);
      customGrid.innerHTML = items.map((item, index) => `<button type="button" class="custom-service-card ${index === 0 ? 'is-selected' : ''} ${item.name === 'Your idea' ? 'custom-service-card--accent' : ''}" data-custom-type="${escapeText(item.name)}" onclick="selectCustomService(this)"><img src="${escapeText(item.image)}" alt="${escapeText(item.name)}" loading="lazy" /><span class="custom-service-copy"><em>${String(index + 1).padStart(2, '0')} · ${escapeText(item.place)}</em><strong>${escapeText(item.name)}</strong><small>${escapeText(item.detail)}</small></span><span class="custom-service-arrow" aria-hidden="true">↗</span></button>`).join('');
      if (items[0]) { const hidden = document.getElementById('custom-service-type'); const title = document.getElementById('custom-request-title'); if (hidden) hidden.value = items[0].name; if (title) title.value = items[0].name; }
    }
  };
  const recordEnquiry = enquiry => {
    const state = read(); const id = `ENQ-${Date.now().toString(36).toUpperCase()}`;
    state.enquiries = [{ id, createdAt: new Date().toISOString(), status: 'new', assignee: 'Unassigned', ...enquiry }, ...(state.enquiries || [])];
    state.audit = [{ at: new Date().toISOString(), action: `New ${enquiry.type || 'website'} enquiry`, detail: id }, ...(state.audit || [])].slice(0, 200);
    write(state); return id;
  };
  window.AllairCMS = { KEY, read, write, apply, pathFor, recordEnquiry };
  document.addEventListener('DOMContentLoaded', apply);
  window.addEventListener('load', () => { apply(); setTimeout(apply, 350); setTimeout(apply, 1200); });
  window.addEventListener('storage', event => { if (event.key === KEY) apply(); });
  window.addEventListener('allair:cms-update', apply);
  new MutationObserver(() => { clearTimeout(window.__allairCmsTimer); window.__allairCmsTimer = setTimeout(() => applyOverrides(read()), 80); }).observe(document.documentElement, { childList: true, subtree: true });
})();
