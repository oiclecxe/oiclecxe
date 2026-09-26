// Mobile navigation (<details>): scroll lock, Escape, focus trap, labels.
import * as params from '@params';

const FOCUSABLE = 'a[href], button:not([disabled]), summary, input, select, textarea, [tabindex]:not([tabindex="-1"])';

export function initMobileNav() {
  const nav = document.querySelector('[data-mobile-nav]');
  if (!nav) return;

  const summary = nav.querySelector('summary');
  const header = document.querySelector('[data-site-header]');
  const labels = { open: summary.dataset.labelOpen, close: summary.dataset.labelClose };

  const sync = () => {
    document.documentElement.classList.toggle('is-scroll-locked', nav.open);
    header?.classList.toggle('is-open', nav.open);
    summary.setAttribute('aria-label', nav.open ? labels.close : labels.open);
    summary.setAttribute('aria-expanded', String(nav.open));
  };

  nav.addEventListener('toggle', sync);

  nav.addEventListener('keydown', (event) => {
    if (!nav.open) return;
    if (event.key === 'Escape') {
      nav.open = false;
      summary.focus();
      return;
    }
    if (event.key !== 'Tab') return;
    const focusables = [...nav.querySelectorAll(FOCUSABLE)].filter((el) => el.offsetParent !== null);
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  nav.addEventListener('click', (event) => {
    if (event.target.closest('a[href]')) nav.open = false;
  });

  window.matchMedia(params.desktopQuery).addEventListener('change', (event) => {
    if (event.matches) nav.open = false;
  });

  sync();
}
