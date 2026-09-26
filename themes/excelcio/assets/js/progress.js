// Reading progress bar fallback for browsers without scroll-driven animations.
export function initProgress() {
  const bar = document.querySelector('[data-scroll-progress]');
  if (!bar || CSS.supports('animation-timeline: scroll()')) return;

  const root = document.documentElement;
  let ticking = false;

  const update = () => {
    const max = root.scrollHeight - window.innerHeight;
    const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    bar.style.setProperty('--scroll-progress', progress.toFixed(4));
    ticking = false;
  };

  const request = () => {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  };

  window.addEventListener('scroll', request, { passive: true });
  window.addEventListener('resize', request, { passive: true });
  update();
}
