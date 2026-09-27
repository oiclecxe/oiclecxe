// Horizontal carousel: previous/next buttons scroll by one slide; buttons disabled at the ends.
import { reducedMotion } from './utils.js';

export function initCarousels() {
  for (const root of document.querySelectorAll('[data-carousel]')) {
    const viewport = root.querySelector('[data-carousel-viewport]');
    const prev = root.querySelector('[data-carousel-prev]');
    const next = root.querySelector('[data-carousel-next]');
    if (!viewport || !prev || !next) continue;

    const step = () => {
      const slide = viewport.querySelector('.carousel__slide');
      const gap = parseFloat(getComputedStyle(slide.parentElement).columnGap) || 0;
      return slide.getBoundingClientRect().width + gap;
    };

    const update = () => {
      const max = viewport.scrollWidth - viewport.clientWidth - 2;
      prev.disabled = viewport.scrollLeft <= 2;
      next.disabled = viewport.scrollLeft >= max;
    };

    const smooth = reducedMotion() ? 'auto' : 'smooth';
    prev.addEventListener('click', () => viewport.scrollBy({ left: -step(), behavior: smooth }));
    next.addEventListener('click', () => viewport.scrollBy({ left: step(), behavior: smooth }));
    viewport.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    update();
  }
}
