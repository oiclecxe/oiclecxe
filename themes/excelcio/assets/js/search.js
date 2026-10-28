// Internal search (SPEC § 10.3): custom UI on the Pagefind JS API, in the search
// dialog (header link, Ctrl/⌘ + K) and on the search page. Pagefind is loaded on
// first use only; when the index is missing (e.g. `hugo server`), a message says so.
import * as params from '@params';
import { onActiveTagClick } from './utils.js';

const PAGE_SIZE = { dialog: 6, page: 10 };

let pagefind = null;

function loadPagefind(bundle, baseUrl) {
  pagefind ??= import(`${bundle}pagefind.js`).then(async (pf) => {
    await pf.options({ excerptLength: 24, baseUrl }); // baseUrl: site served from a sub-path
    await pf.init();
    await pf.filters(); // enables per-filter counts in search results
    return pf;
  });
  pagefind.catch(() => { pagefind = null; });
  return pagefind;
}

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function initSearch(root) {
  const d = root.dataset;
  const mode = d.search;
  const input = root.querySelector('[data-search-input]');
  const form = input.form;
  const filters = root.querySelector('[data-search-filters]');
  const legend = filters.querySelector('legend');
  const status = root.querySelector('[data-search-status]');
  const list = root.querySelector('[data-search-results]');
  const foot = root.querySelector('[data-search-foot]');
  const more = root.querySelector('[data-search-more]');
  const all = root.querySelector('[data-search-all]');
  const pageSize = PAGE_SIZE[mode] || 10;
  const countLabel = (n) => (n === 1 ? d.labelOne : d.labelOther.replace('999999', n));

  let type = '';
  let results = [];
  let shown = 0;
  let run = 0; // guards against late answers of a superseded query

  const syncUrl = () => {
    const q = input.value.trim();
    if (all) {
      const url = new URL(all.href, window.location.href);
      url.search = '';
      if (q) url.searchParams.set('q', q);
      if (type) url.searchParams.set('type', type);
      all.href = url.pathname + url.search;
    }
    if (mode !== 'page') return;
    const url = new URL(window.location.href);
    q ? url.searchParams.set('q', q) : url.searchParams.delete('q');
    type ? url.searchParams.set('type', type) : url.searchParams.delete('type');
    window.history.replaceState(null, '', url);
  };

  // Content-type tags ("All" + one per type present in the results of the query).
  const renderFilters = (counts, total) => {
    const values = Object.entries(counts || {}).filter(([, n]) => n > 0);
    filters.hidden = values.length < 2 && !type;
    filters.replaceChildren(legend);
    const tag = (value, text, n) => {
      const label = el('label', 'filter-tag');
      const radio = el('input', 'filter-tag__input');
      radio.type = 'radio';
      radio.name = `${input.id}-type`;
      radio.value = value;
      radio.checked = value === type;
      const span = el('span', 'filter-tag__text', text);
      if (n !== undefined) span.append(el('span', 'filter-tag__count', String(n)));
      label.append(radio, span);
      return label;
    };
    filters.append(tag('', d.msgAll, total));
    values.sort(([a], [b]) => a.localeCompare(b)).forEach(([value, n]) => filters.append(tag(value, value, n)));
  };

  const renderItem = (data) => {
    const item = el('li', 'search-result');
    const link = el('a', 'search-result__link');
    link.href = data.url;
    const meta = [data.meta.type, data.meta.date].filter(Boolean).join(' · ');
    if (meta) link.append(el('span', 'search-result__meta mono', meta));
    link.append(el('span', 'search-result__title', data.meta.title || data.url));
    const excerpt = el('span', 'search-result__excerpt');
    excerpt.innerHTML = data.excerpt; // Pagefind escapes the text and only adds <mark>
    link.append(excerpt);
    item.append(link);
    return item;
  };

  const showMore = async (current) => {
    const next = results.slice(shown, shown + pageSize);
    const data = await Promise.all(next.map((r) => r.data()));
    if (current !== run) return;
    shown += next.length;
    list.append(...data.map(renderItem));
    foot.hidden = shown >= results.length;
  };

  const search = async () => {
    const current = ++run;
    const q = input.value.trim();
    syncUrl();
    if (!q) {
      results = [];
      list.replaceChildren();
      status.textContent = '';
      filters.hidden = true;
      foot.hidden = true;
      return;
    }
    let pf;
    try {
      pf = await loadPagefind(d.bundle, d.base || '/');
    } catch {
      status.textContent = d.msgUnavailable;
      return;
    }
    const answer = await pf.debouncedSearch(q, type ? { filters: { type } } : {}, 200);
    if (answer === null || current !== run) return;
    results = answer.results;
    shown = 0;
    list.replaceChildren();
    renderFilters(answer.totalFilters?.type, answer.unfilteredResultCount);
    status.textContent = results.length ? countLabel(results.length) : d.msgEmpty.replace('{q}', q);
    await showMore(current);
  };

  input.addEventListener('input', search);
  input.addEventListener('focus', () => loadPagefind(d.bundle, d.base || '/').catch(() => {}), { once: true });
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    search();
  });
  filters.addEventListener('change', (event) => {
    type = event.target.value;
    search();
  });
  onActiveTagClick(filters, () => type, () => {
    type = '';
    search();
  });
  more?.addEventListener('click', () => showMore(run));

  // Keyboard: arrow keys move between the field and the results.
  root.addEventListener('keydown', (event) => {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
    const links = [...list.querySelectorAll('a')];
    const index = links.indexOf(document.activeElement);
    if (event.target === input && event.key === 'ArrowDown' && links.length) {
      event.preventDefault();
      links[0].focus();
    } else if (index >= 0) {
      event.preventDefault();
      const next = event.key === 'ArrowDown' ? links[index + 1] : links[index - 1];
      (next || (event.key === 'ArrowUp' ? input : links[index])).focus();
    }
  });

  if (mode === 'page') {
    const query = new URLSearchParams(window.location.search);
    type = query.get('type') || '';
    if (query.get('q')) {
      input.value = query.get('q');
      search();
    }
  }
  return { input, reset: () => { input.value = ''; type = ''; search(); } };
}

export function initSearchUI() {
  const roots = [...document.querySelectorAll('[data-search]')];
  if (!roots.length) return;
  const uis = new Map(roots.map((root) => [root.dataset.search, initSearch(root)]));
  const page = uis.get('page');
  const dialog = document.querySelector('[data-search-dialog]');
  const canOpen = dialog && typeof dialog.showModal === 'function';
  let opener = null;

  const open = () => {
    if (page) {
      page.input.focus();
      return;
    }
    if (!canOpen || dialog.open) return;
    opener = document.activeElement;
    dialog.showModal();
    uis.get('dialog').input.focus();
    uis.get('dialog').input.select();
  };

  document.addEventListener('click', (event) => {
    const link = event.target.closest('[data-search-open]');
    if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.button !== 0) return;
    if (!page && !canOpen) return;
    event.preventDefault();
    open();
  });

  document.addEventListener('keydown', (event) => {
    if (params.searchShortcut && (event.ctrlKey || event.metaKey) && !event.altKey && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      open();
    }
  });

  if (canOpen) {
    dialog.querySelector('[data-search-close]').addEventListener('click', () => dialog.close());
    // A click on the backdrop (outside the panel) closes the dialog.
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) dialog.close();
    });
    // Escape closes at once (in a search field, browsers first use it to clear the text).
    dialog.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        dialog.close();
      }
    });
    dialog.addEventListener('close', () => opener?.focus?.());
  }
}
