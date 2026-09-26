// ARIA tabs: click, arrow keys, Home/End. Without JS every panel stays visible.
export function initTabs() {
  for (const root of document.querySelectorAll('[data-tabs]')) {
    const tabs = [...root.querySelectorAll('[role="tab"]')];
    const panels = [...root.querySelectorAll('[data-tab-panel]')];
    if (tabs.length === 0) continue;

    const select = (index, focus = false) => {
      tabs.forEach((tab, i) => {
        const selected = i === index;
        tab.setAttribute('aria-selected', String(selected));
        tab.tabIndex = selected ? 0 : -1;
        panels[i].hidden = !selected;
        if (selected) {
          panels[i].querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-visible'));
        }
      });
      if (focus) tabs[index].focus();
    };

    panels.forEach((panel) => { panel.tabIndex = 0; });

    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => select(i));
      tab.addEventListener('keydown', (event) => {
        const last = tabs.length - 1;
        const moves = { ArrowRight: i === last ? 0 : i + 1, ArrowLeft: i === 0 ? last : i - 1, Home: 0, End: last };
        if (event.key in moves) {
          event.preventDefault();
          select(moves[event.key], true);
        }
      });
    });

    select(Math.max(0, tabs.findIndex((t) => t.getAttribute('aria-selected') === 'true')));
  }
}
