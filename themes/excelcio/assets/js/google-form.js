// Google Forms facade: the iframe (docs.google.com) is only created on click.
export function initGoogleForms() {
  for (const box of document.querySelectorAll('[data-gform]')) {
    const load = box.querySelector('[data-gform-load]');
    const facade = box.querySelector('.gform__facade');
    if (!load || !facade) continue;
    load.addEventListener('click', (event) => {
      event.preventDefault();
      const iframe = document.createElement('iframe');
      iframe.className = 'gform__frame';
      iframe.src = box.dataset.gform;
      iframe.title = box.dataset.title;
      iframe.height = box.dataset.height;
      iframe.loading = 'eager';
      facade.replaceWith(iframe);
      box.classList.add('is-loaded');
      iframe.focus();
    });
  }
}
