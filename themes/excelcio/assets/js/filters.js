// Client-side filters: [data-filters="id"] form + [data-filter-scope="id"] items.
// Each control `name` (select, or radio group rendered as tags) matches a data-<name>
// attribute on [data-filter-item] (space-separated values). State is kept in the URL (?solution=qlik).
// Clicking the active tag again deselects it (back to "All").
// Transition inspired by the breathing squares: leaving cards are covered square by
// square, entering cards uncovered square by square (none with reduced motion).

const MAX_DELAY_STEPS = 4; // square delays: 0 … 3 × --tile-stagger

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Length of the longest square transition of a mask, in ms.
function maskDuration(mask) {
  const toMs = (v) => Math.max(...v.split(',').map((t) => parseFloat(t) * (t.trim().endsWith('ms') ? 1 : 1000)));
  let longest = 0;
  for (const cell of mask.children) {
    const style = getComputedStyle(cell);
    longest = Math.max(longest, toMs(style.transitionDuration) + toMs(style.transitionDelay));
  }
  return longest;
}

// Grid of squares fitting an element, from the --tile-cell token (null if the token is missing).
function grid(element) {
  const rootSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
  const cell = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--tile-cell')) * rootSize;
  if (!cell) return null;
  const { width, height } = element.getBoundingClientRect();
  return { cols: Math.max(1, Math.round(width / cell)), rows: Math.max(1, Math.round(height / cell)) };
}

// Square mask over an item.
function addMask(item, state) {
  const size = grid(item);
  if (!size) return null;
  const { cols, rows } = size;
  const mask = document.createElement('span');
  mask.className = 'tile-mask';
  mask.setAttribute('aria-hidden', 'true');
  mask.dataset.state = state;
  mask.style.setProperty('--cols', cols);
  mask.style.setProperty('--rows', rows);
  for (let i = 0; i < cols * rows; i += 1) {
    const square = document.createElement('span');
    square.className = 'tile-mask__cell';
    square.style.setProperty('--i', Math.floor(Math.random() * MAX_DELAY_STEPS));
    mask.append(square);
  }
  item.append(mask);
  return mask;
}

// Moves every mask to `state` and resolves when the squares are done.
function play(list, state) {
  const masks = list.filter(Boolean);
  if (!masks.length) return Promise.resolve();
  masks.forEach((m) => m.getBoundingClientRect()); // commit the start state before transitioning
  masks.forEach((m) => { m.dataset.state = state; });
  const wait = Math.max(...masks.map(maskDuration));
  return new Promise((resolve) => setTimeout(resolve, wait + 30));
}

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
    const selected = {}; // value of each filter at the last apply (to detect a click on the active tag)
    let run = 0;

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

    const matches = (item, active) => active.every(([name, v]) => (item.dataset[name] || '').split(' ').includes(v));

    // Shows the matching items (layout step, no animation).
    const layout = (active) => {
      let visible = 0;
      for (const item of items) {
        item.hidden = !matches(item, active);
        if (!item.hidden) visible += 1;
      }
      for (const group of groups) {
        group.hidden = !group.querySelector('[data-filter-item]:not([hidden])');
      }
      if (count) count.textContent = label(visible);
      if (empty) empty.hidden = visible > 0;
    };

    const apply = async (updateUrl = true, animate = true) => {
      const current = ++run;
      scope.querySelectorAll('.tile-mask').forEach((m) => m.remove()); // a previous transition is cut short
      const active = names.map((name) => [name, valueOf(name)]).filter(([, v]) => v);
      names.forEach((name) => { selected[name] = valueOf(name); });
      if (updateUrl) {
        const url = new URL(window.location.href);
        names.forEach((name) => (valueOf(name) ? url.searchParams.set(name, valueOf(name)) : url.searchParams.delete(name)));
        window.history.replaceState(null, '', url);
      }

      const leaving = items.filter((item) => !item.hidden && !matches(item, active));
      const entering = items.filter((item) => item.hidden && matches(item, active));
      if (!animate || reducedMotion()) {
        layout(active);
        return;
      }
      await play(leaving.map((item) => addMask(item, 'clear')), 'covered');
      if (current !== run) return;
      leaving.forEach((item) => item.querySelector('.tile-mask')?.remove());
      layout(active);
      const masks = entering.map((item) => addMask(item, 'covered'));
      await play(masks, 'clear');
      if (current !== run) return;
      masks.forEach((m) => m?.remove());
    };

    // Restore state from the URL (only values that exist in the controls).
    const params = new URLSearchParams(window.location.search);
    names.forEach((name) => { if (params.get(name)) setValue(name, params.get(name)); });

    // A click on the tag that is already active deselects it (no change event in that case).
    form.addEventListener('click', (event) => {
      const radio = event.target;
      if (!(radio instanceof HTMLInputElement) || radio.type !== 'radio' || !radio.value) return;
      if (selected[radio.name] === radio.value) {
        setValue(radio.name, '');
        apply();
      }
    });
    form.addEventListener('change', () => apply());
    form.addEventListener('reset', () => setTimeout(() => apply()));
    form.addEventListener('submit', (event) => event.preventDefault());
    apply(false, false);
  }
}
