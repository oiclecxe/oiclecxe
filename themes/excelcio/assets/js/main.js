// Entry point, bundled by js.Build. Every module is a no-op when its markup is absent.
import { initHeader } from './header.js';
import { initMenu } from './menu.js';
import { initMobileNav } from './mobile-nav.js';
import { initReveal } from './reveal.js';
import { initTabs } from './tabs.js';
import { initCarousels } from './carousel.js';
import { initCounters } from './counters.js';

window.__themeReady = true;

initHeader();
initMenu();
initMobileNav();
initTabs();
initCarousels();
initCounters();
initReveal();
