// Header state: solid once the page scrolls, hidden on scroll down,
// shown again on scroll up (reference behaviour).
const HIDE_AFTER = 200;
const THRESHOLD = 4;

export function initHeader() {
  const header = document.querySelector('[data-site-header]');
  if (!header) return;

  let lastY = window.scrollY;
  let ticking = false;

  const update = () => {
    const y = window.scrollY;
    header.toggleAttribute('data-scrolled', y > 8);

    const busy = header.classList.contains('is-open') || header.contains(document.activeElement);
    if (y > lastY + THRESHOLD && y > HIDE_AFTER && !busy) {
      header.setAttribute('data-hidden', '');
    } else if (y < lastY - THRESHOLD || y <= HIDE_AFTER) {
      header.removeAttribute('data-hidden');
    }
    lastY = y;
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });

  header.addEventListener('focusin', () => header.removeAttribute('data-hidden'));
  update();
}
