/**
 * theme.js — Universal theme + mobile polish for mrbishalkhatri.github.io
 * Include once in every page <head> as: <script src="theme.js"></script>
 * 
 * Features:
 *  - Dark/light mode synced across all pages via localStorage
 *  - Supabase cross-device download tracking
 *  - iOS/Android safe-area padding injected via JS
 *  - Prevents FOUC (flash of unstyled content)
 */

// ── 1. INSTANT THEME (runs before paint to prevent FOUC) ──────────────────
;(function(){
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const dark = saved ? saved === 'dark' : prefersDark;
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
})();

// ── 2. THEME MANAGER (runs after DOM ready) ───────────────────────────────
window.BKTheme = {
  init() {
    const root   = document.documentElement;
    const saved  = localStorage.getItem('theme');
    const pDark  = window.matchMedia('(prefers-color-scheme: dark)');

    this.apply(saved ? saved === 'dark' : pDark.matches);

    // Sync if OS preference changes and user hasn't set manually
    pDark.addEventListener('change', e => {
      if (!localStorage.getItem('theme')) this.apply(e.matches);
    });

    // Wire up any toggle button on the page (only ones explicitly opted in via data-theme-toggle,
    // to avoid double-binding on pages that already wire #dark-toggle themselves)
    document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
      btn.addEventListener('click', () => this.toggle());
    });
  },

  apply(dark) {
    const root = document.documentElement;
    root.setAttribute('data-theme', dark ? 'dark' : 'light');
    localStorage.setItem('theme', dark ? 'dark' : 'light');
    // Update icon if present
    const icon = document.getElementById('theme-icon');
    if (icon) icon.className = dark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    // Update any other toggle icons
    document.querySelectorAll('.theme-icon-auto').forEach(el => {
      el.className = 'theme-icon-auto ' + (dark ? 'fa-solid fa-sun' : 'fa-solid fa-moon');
    });
    // Update mobile browser chrome color (Android status bar / iOS Safari bar)
    let meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'theme-color';
      document.head.appendChild(meta);
    }
    meta.content = dark ? '#0d0f0e' : '#f5f2ed';
  },

  toggle() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    this.apply(!isDark);
  }
};

// ── 3. SUPABASE DOWNLOAD TRACKER ──────────────────────────────────────────
window.BKTracker = {
  SUPABASE_URL: 'https://sowldjgtbygbpgguzhcu.supabase.co',
  SUPABASE_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvd2xkamd0YnlnYnBnZ3V6aGN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI5ODY4OTMsImV4cCI6MjA5ODU2Mjg5M30.5t1a-1kCLd6YSUWqIVbXumCIwcArvQb5rjwvCev3nBA',
  TABLE: 'downloads',

  // Stable anonymous device ID (persists across sessions on same device)
  deviceId() {
    let id = localStorage.getItem('bk_device_id');
    if (!id) {
      id = 'dev_' + Math.random().toString(36).slice(2) + Date.now().toString(36);
      localStorage.setItem('bk_device_id', id);
    }
    return id;
  },

  // Detect platform
  platform() {
    const ua = navigator.userAgent;
    if (/iPad|iPhone|iPod/.test(ua)) return 'iOS';
    if (/Android/.test(ua))          return 'Android';
    if (/Win/.test(ua))              return 'Windows';
    if (/Mac/.test(ua))              return 'macOS';
    if (/Linux/.test(ua))            return 'Linux';
    return 'Unknown';
  },

  async track(resourceId, resourceName) {
    const payload = {
      resource_id:   resourceId,
      resource_name: resourceName,
      device_id:     this.deviceId(),
      platform:      this.platform(),
      referrer:      document.referrer || 'direct',
      page:          location.pathname,
      created_at:    new Date().toISOString()
    };

    // Also log locally (for the localStorage dashboard as fallback)
    try {
      const key = 'bk_dl_log';
      const log = JSON.parse(localStorage.getItem(key) || '[]');
      log.push({ id: resourceId, ts: Date.now(), platform: payload.platform });
      localStorage.setItem(key, JSON.stringify(log));
    } catch(e) {}

    // Send to Supabase (non-blocking)
    if (this.SUPABASE_URL !== 'YOUR_SUPABASE_URL') {
      fetch(`${this.SUPABASE_URL}/rest/v1/${this.TABLE}`, {
        method:  'POST',
        headers: {
          'Content-Type':  'application/json',
          'apikey':        this.SUPABASE_KEY,
          'Authorization': `Bearer ${this.SUPABASE_KEY}`,
          'Prefer':        'return=minimal'
        },
        body: JSON.stringify(payload)
      }).catch(() => {}); // fail silently
    }
  }
};

// ── 4. MOBILE POLISH ──────────────────────────────────────────────────────
window.BKMobile = {
  init() {
    // Inject safe-area CSS custom properties
    this.injectSafeArea();
    // Fix 300ms tap delay on older Android
    this.fixTapDelay();
    // Prevent double-tap zoom on buttons/links
    this.preventDoubleTapZoom();
  },

  injectSafeArea() {
    // env() values aren't readable via JS but we can set a CSS override
    const style = document.createElement('style');
    style.textContent = `
      :root {
        --sat: env(safe-area-inset-top, 0px);
        --sar: env(safe-area-inset-right, 0px);
        --sab: env(safe-area-inset-bottom, 0px);
        --sal: env(safe-area-inset-left, 0px);
      }
    `;
    document.head.appendChild(style);
  },

  fixTapDelay() {
    // touch-action: manipulation removes 300ms delay without needing FastClick
    const style = document.createElement('style');
    style.textContent = `
      a, button, [role="button"], input[type="submit"], label {
        touch-action: manipulation;
      }
    `;
    document.head.appendChild(style);
  },

  preventDoubleTapZoom() {
    let lastTap = 0;
    document.addEventListener('touchend', e => {
      const now = Date.now();
      if (now - lastTap < 300 && e.target.closest('a, button, [role="button"]')) {
        e.preventDefault();
        e.target.click();
      }
      lastTap = now;
    }, { passive: false });
  }
};

// ── 5. AUTO-INIT on DOM ready ──────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  window.BKTheme.init();
  window.BKMobile.init();
});
