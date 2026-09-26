// Counts key figures up from 0 when they enter the viewport.
// The final value is in the HTML (and in a visually hidden copy for screen readers).
const DURATION = 1400;

export function initCounters() {
  const counters = [...document.querySelectorAll('[data-count-to]')];
  if (counters.length === 0 || !('IntersectionObserver' in window)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const format = new Intl.NumberFormat(document.documentElement.lang || undefined);

  const run = (el) => {
    const target = Number(el.dataset.countTo);
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / DURATION);
      const eased = 1 - (1 - t) ** 3;
      el.textContent = format.format(Math.round(target * eased));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        run(entry.target);
        observer.unobserve(entry.target);
      }
    }
  }, { threshold: 0.6 });

  for (const el of counters) {
    el.textContent = '0';
    observer.observe(el);
  }
}
