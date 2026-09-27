// Entry point, bundled by js.Build. Every module is a no-op when its markup is absent.
import { initHeader } from './header.js';
import { initMenu } from './menu.js';
import { initMobileNav } from './mobile-nav.js';
import { initReveal } from './reveal.js';
import { initTabs } from './tabs.js';
import { initCarousels } from './carousel.js';
import { initCounters } from './counters.js';
import { initProgress } from './progress.js';
import { initFilters } from './filters.js';
import { initVideos } from './video.js';
import { initForms } from './forms.js';
import { initSearchUI } from './search.js';

window.__themeReady = true;

initProgress();
initHeader();
initMenu();
initMobileNav();
initTabs();
initFilters();
initVideos();
initForms();
initSearchUI();
initCarousels();
initCounters();
initReveal();
