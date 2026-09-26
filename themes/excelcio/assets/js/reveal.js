// Reveal on scroll: adds .is-visible to [data-reveal] elements when they enter the viewport.
// Elements with .reveal--now are revealed right away (hero).
export function initReveal() {
  const targets = [...document.querySelectorAll('[data-reveal]')];
  if (targets.length === 0) return;

  const show = (el) => el.classList.add('is-visible');

  if (!('IntersectionObserver' in window)) {
    targets.forEach(show);
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        show(entry.target);
        observer.unobserve(entry.target);
      }
    }
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.15 });

  for (const el of targets) {
    if (el.classList.contains('reveal--now')) {
      requestAnimationFrame(() => requestAnimationFrame(() => show(el)));
    } else {
      observer.observe(el);
    }
  }

  // Travel distance of the pulse on the architecture diagram.
  const diagrams = document.querySelectorAll('.arch__diagram');
  const size = () => diagrams.forEach((d) => d.style.setProperty('--arch-h', `${d.offsetHeight}px`));
  size();
  window.addEventListener('resize', size, { passive: true });
}
