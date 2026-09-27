// YouTube facade: the iframe (youtube-nocookie.com) is only created on click.
export function initVideos() {
  for (const box of document.querySelectorAll('[data-video]')) {
    const play = box.querySelector('[data-video-play]');
    if (!play) continue;
    play.addEventListener('click', (event) => {
      event.preventDefault();
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(box.dataset.video)}?autoplay=1`;
      iframe.title = box.dataset.title;
      iframe.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
      iframe.allowFullscreen = true;
      box.replaceChildren(iframe);
      iframe.focus();
    });
  }
}
