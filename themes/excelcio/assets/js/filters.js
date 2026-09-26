// Client-side filters: [data-filters="id"] form + [data-filter-scope="id"] items.
// Each select `name` matches a data-<name> attribute on [data-filter-item]
// (space-separated values). State is kept in the URL (?solution=qlik).
export function initFilters() {
  for (const form of document.querySelectorAll('[data-filters]')) {
    const scope = document.querySelector(`[data-filter-scope="${form.dataset.filters}"]`);
    if (!scope) continue;
    const items = [...scope.querySelectorAll('[data-filter-item]')];
    const groups = [...scope.querySelectorAll('[data-filter-group]')];
    const selects = [...form.querySelectorAll('select')];
    const count = form.querySelector('[data-filters-count]');
    const empty = scope.parentElement.querySelector('[data-filters-empty]');
    const label = (n) => (n === 1 ? form.dataset.labelOne : form.dataset.labelOther.replace('999999', n));

    const apply = (updateUrl = true) => {
      const active = selects.filter((s) => s.value);
      let visible = 0;
      for (const item of items) {
        const match = active.every((s) => (item.dataset[s.name] || '').split(' ').includes(s.value));
        item.hidden = !match;
        if (match) visible += 1;
      }
      for (const group of groups) {
        group.hidden = !group.querySelector('[data-filter-item]:not([hidden])');
      }
      if (count) count.textContent = label(visible);
      if (empty) empty.hidden = visible > 0;
      if (updateUrl) {
        const url = new URL(window.location.href);
        selects.forEach((s) => (s.value ? url.searchParams.set(s.name, s.value) : url.searchParams.delete(s.name)));
        window.history.replaceState(null, '', url);
      }
    };

    // Restore state from the URL (only values that exist in the options).
    const params = new URLSearchParams(window.location.search);
    for (const s of selects) {
      const v = params.get(s.name);
      if (v && [...s.options].some((o) => o.value === v)) s.value = v;
    }

    form.addEventListener('change', () => apply());
    form.addEventListener('reset', () => setTimeout(() => apply()));
    form.addEventListener('submit', (event) => event.preventDefault());
    apply(false);
  }
}
