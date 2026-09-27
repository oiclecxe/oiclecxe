// Client-side filters: [data-filters="id"] form + [data-filter-scope="id"] items.
// Each control `name` (select, or radio group rendered as tags) matches a data-<name>
// attribute on [data-filter-item] (space-separated values). State is kept in the URL (?solution=qlik).
export function initFilters() {
  for (const form of document.querySelectorAll('[data-filters]')) {
    const scope = document.querySelector(`[data-filter-scope="${form.dataset.filters}"]`);
    if (!scope) continue;
    const items = [...scope.querySelectorAll('[data-filter-item]')];
    const groups = [...scope.querySelectorAll('[data-filter-group]')];
    const names = [...new Set([...form.querySelectorAll('select, input[type="radio"]')].map((c) => c.name))];
    const count = form.querySelector('[data-filters-count]');
    const empty = scope.parentElement.querySelector('[data-filters-empty]');
    const label = (n) => (n === 1 ? form.dataset.labelOne : form.dataset.labelOther.replace('999999', n));

    const valueOf = (name) => {
      const control = form.elements[name];
      return control ? control.value : '';
    };

    const setValue = (name, value) => {
      const control = form.elements[name];
      if (!control) return false;
      if (control instanceof RadioNodeList) {
        const radio = [...control].find((r) => r.value === value);
        if (radio) radio.checked = true;
        return Boolean(radio);
      }
      if ([...control.options].some((o) => o.value === value)) {
        control.value = value;
        return true;
      }
      return false;
    };

    const apply = (updateUrl = true) => {
      const active = names.map((name) => [name, valueOf(name)]).filter(([, v]) => v);
      let visible = 0;
      for (const item of items) {
        const match = active.every(([name, v]) => (item.dataset[name] || '').split(' ').includes(v));
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
        names.forEach((name) => (valueOf(name) ? url.searchParams.set(name, valueOf(name)) : url.searchParams.delete(name)));
        window.history.replaceState(null, '', url);
      }
    };

    // Restore state from the URL (only values that exist in the controls).
    const params = new URLSearchParams(window.location.search);
    names.forEach((name) => { if (params.get(name)) setValue(name, params.get(name)); });

    form.addEventListener('change', () => apply());
    form.addEventListener('reset', () => setTimeout(() => apply()));
    form.addEventListener('submit', (event) => event.preventDefault());
    apply(false);
  }
}
