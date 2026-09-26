// Desktop mega-menu: disclosure buttons, hover intent, Escape, click outside.
import * as params from '@params';

const OPEN_DELAY = 120;
const CLOSE_DELAY = 200;

export function initMenu() {
  const header = document.querySelector('[data-site-header]');
  const overlay = document.querySelector('[data-site-overlay]');
  const items = [...document.querySelectorAll('[data-nav-item]')];
  if (!header || items.length === 0) return;

  const desktop = window.matchMedia(params.desktopQuery);
  let current = null;
  let openTimer;
  let closeTimer;

  const toggleOf = (item) => item.querySelector('[data-nav-toggle]');

  const close = (item = current) => {
    if (!item) return;
    item.classList.remove('is-open');
    toggleOf(item).setAttribute('aria-expanded', 'false');
    if (item === current) {
      current = null;
      header.classList.remove('is-open');
      overlay?.classList.remove('is-visible');
    }
  };

  const open = (item) => {
    if (item === current) return;
    if (current) close(current);
    current = item;
    item.classList.add('is-open');
    toggleOf(item).setAttribute('aria-expanded', 'true');
    header.classList.add('is-open');
    header.removeAttribute('data-hidden');
    overlay?.classList.add('is-visible');
  };

  // Align the panel columns with the first navigation link.
  const alignPanels = () => {
    const nav = header.querySelector('[data-nav]');
    const logo = header.querySelector('[data-nav-logo]');
    if (!nav || !logo) return;
    const offset = nav.getBoundingClientRect().left - logo.getBoundingClientRect().left;
    header.style.setProperty('--nav-offset', `${Math.max(0, offset)}px`);
  };

  for (const item of items) {
    toggleOf(item).addEventListener('click', () => {
      if (item.classList.contains('is-open')) close(item);
      else open(item);
    });

    item.addEventListener('pointerenter', (event) => {
      if (event.pointerType !== 'mouse' || !desktop.matches) return;
      clearTimeout(closeTimer);
      clearTimeout(openTimer);
      openTimer = setTimeout(() => open(item), current ? 0 : OPEN_DELAY);
    });

    item.addEventListener('pointerleave', (event) => {
      if (event.pointerType !== 'mouse') return;
      clearTimeout(openTimer);
      closeTimer = setTimeout(() => close(item), CLOSE_DELAY);
    });

    item.addEventListener('focusout', (event) => {
      if (!item.contains(event.relatedTarget)) close(item);
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || !current) return;
    const toggle = toggleOf(current);
    close();
    toggle.focus();
  });

  overlay?.addEventListener('click', () => close());
  desktop.addEventListener('change', () => close());

  alignPanels();
  window.addEventListener('resize', alignPanels, { passive: true });
  document.fonts?.ready.then(alignPanels);
}
