/* ============================================================
   BOOKARE — Shared JS Utilities
   ============================================================ */

// ===================== NAV =====================
(function initNav() {
  const nav = document.querySelector('.nav');
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileNav = document.querySelector('.nav-mobile');

  // Scroll shadow
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });
  }

  // Mobile menu
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const open = hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // Highlight active link
  const links = document.querySelectorAll('.nav-link');
  links.forEach(link => {
    if (link.getAttribute('href') === window.location.pathname.split('/').pop()) {
      link.classList.add('active');
    }
  });
})();

// ===================== TABS =====================
function initTabs(container) {
  const btns = container.querySelectorAll('.tab-btn');
  const contents = container.querySelectorAll('.tab-content');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      btns.forEach(b => b.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      const content = container.querySelector(`[data-tab-content="${target}"]`);
      if (content) content.classList.add('active');
    });
  });
  // Activate first
  if (btns[0]) btns[0].click();
}
document.querySelectorAll('[data-tabs]').forEach(initTabs);

// ===================== SHORTLIST (localStorage) =====================
const SHORTLIST_KEY = 'bookare_shortlist';

function getShortlist() {
  try { return JSON.parse(localStorage.getItem(SHORTLIST_KEY)) || []; }
  catch { return []; }
}
function saveShortlist(list) {
  localStorage.setItem(SHORTLIST_KEY, JSON.stringify(list));
}
function isShortlisted(id) {
  return getShortlist().includes(String(id));
}
function toggleShortlist(id) {
  id = String(id);
  let list = getShortlist();
  if (list.includes(id)) {
    list = list.filter(i => i !== id);
    showToast('Removed from shortlist', 'default');
  } else {
    list.push(id);
    showToast('Added to shortlist ♡', 'success');
  }
  saveShortlist(list);
  return list.includes(id);
}

// Bind all shortlist buttons
document.querySelectorAll('[data-shortlist]').forEach(btn => {
  const id = btn.dataset.shortlist;
  if (isShortlisted(id)) btn.classList.add('active');
  btn.addEventListener('click', (e) => {
    e.preventDefault(); e.stopPropagation();
    const active = toggleShortlist(id);
    btn.classList.toggle('active', active);
    // Update icon
    const icon = btn.querySelector('.shortlist-icon');
    if (icon) icon.textContent = active ? '♥' : '♡';
  });
});

// ===================== TOAST =====================
let toastContainer = document.querySelector('.toast-container');
if (!toastContainer) {
  toastContainer = document.createElement('div');
  toastContainer.className = 'toast-container';
  document.body.appendChild(toastContainer);
}

function showToast(message, type = 'default', duration = 3000) {
  const toast = document.createElement('div');
  toast.className = `toast${type !== 'default' ? ' ' + type : ''}`;
  const icons = { success: '✓', error: '✕', default: 'ℹ' };
  toast.innerHTML = `<span>${icons[type] || ''}</span> ${message}`;
  toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(20px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// ===================== MODAL =====================
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
}
function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
}
document.querySelectorAll('[data-modal-open]').forEach(btn => {
  btn.addEventListener('click', () => openModal(btn.dataset.modalOpen));
});
document.querySelectorAll('[data-modal-close]').forEach(btn => {
  btn.addEventListener('click', () => closeModal(btn.dataset.modalClose));
});
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) { overlay.style.display = 'none'; document.body.style.overflow = ''; }
  });
});

// ===================== SMOOTH SCROLL =====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===================== ANIMATION ON SCROLL =====================
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// ===================== RANGE SLIDERS =====================
document.querySelectorAll('.range-with-value').forEach(wrap => {
  const input = wrap.querySelector('input[type="range"]');
  const display = wrap.querySelector('.range-value-display');
  if (input && display) {
    const prefix = display.dataset.prefix || '';
    const suffix = display.dataset.suffix || '';
    input.addEventListener('input', () => {
      display.textContent = prefix + Number(input.value).toLocaleString() + suffix;
    });
  }
});

// ===================== PILL FILTERS =====================
document.querySelectorAll('.pill-filter-bar').forEach(bar => {
  const multi = bar.dataset.multi === 'true';
  bar.querySelectorAll('.pill-filter').forEach(pill => {
    pill.addEventListener('click', () => {
      if (!multi) bar.querySelectorAll('.pill-filter').forEach(p => p.classList.remove('active'));
      pill.classList.toggle('active');
    });
  });
});

// ===================== ICONS (LUCIDE) =====================
function initIcons() {
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initIcons);
} else {
  initIcons();
}
window.initIcons = initIcons;
