// Entry point, bundled by js.Build. Every module is a no-op when its markup is absent.
import { initHeader } from './header.js';
import { initMenu } from './menu.js';
import { initMobileNav } from './mobile-nav.js';

document.documentElement.classList.add('js');

initHeader();
initMenu();
initMobileNav();
