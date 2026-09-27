// Forms layer (SPEC § 10.1): one module for every form[data-form].
// Validation relies on native constraints (required, type, min/max) with French
// messages shown under the fields; the whole flow runs in place, without reload.
// "mock" mode: nothing leaves the browser, the payload is logged and an e-mail
// containing "+error" simulates a failure. "live" mode: fetch to data-endpoint.
// Without JS, the form posts natively (see forms/form.html).

const MOCK_DELAY = 800;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Validation message for a field, from the form's data-msg-* attributes.
function messageFor(field, msg) {
  const v = field.validity;
  if (v.valueMissing) return field.type === 'checkbox' ? msg.consent : msg.required;
  if (v.typeMismatch && field.type === 'email') return msg.email;
  if (v.rangeUnderflow || v.rangeOverflow || v.stepMismatch || v.badInput) return msg.number;
  return msg.invalid;
}

// Payload: named fields, without the honeypot.
function payloadOf(form) {
  const data = {};
  for (const [name, value] of new FormData(form)) {
    if (name === 'website') continue;
    data[name] = name in data ? [].concat(data[name], value) : value;
  }
  data.page = window.location.pathname;
  return data;
}

async function send(form, payload) {
  const d = form.dataset;
  if (d.mode !== 'live') {
    console.info(`[forms] mode simulé — formulaire « ${d.form} »`, payload);
    await wait(MOCK_DELAY);
    return !/\+error@/i.test(payload.email || '');
  }
  const json = d.encoding !== 'form';
  const body = new FormData(form);
  body.delete('website');
  const response = await fetch(d.endpoint, {
    method: d.method || 'POST',
    headers: json ? { Accept: 'application/json', 'Content-Type': 'application/json' } : { Accept: 'application/json' },
    body: json ? JSON.stringify(payload) : body,
  });
  return response.ok;
}

// Registration: prefill from the URL and keep only the sessions of the chosen training.
function initRegistration(form) {
  const target = form.elements.registrationFor;
  const session = form.elements.session;
  if (!target || !session) return;
  const sessionField = session.closest('[data-field]');
  // Keep every option in memory: hiding <option>/<optgroup> is not reliable on iOS Safari.
  const all = [...session.querySelectorAll('option')].map((o) => o.cloneNode(true));

  const keyOf = (select) => select.selectedOptions[0]?.dataset.key || '';
  const selectByKey = (select, key) => {
    const option = [...select.options].find((o) => o.dataset.key === key);
    if (option) option.selected = true;
    return Boolean(option);
  };

  const refresh = () => {
    const chosen = keyOf(target);
    const previous = keyOf(session);
    const isEvent = chosen.startsWith('evenement:');
    session.replaceChildren(...all.filter((o) => !o.dataset.for || o.dataset.for === chosen).map((o) => o.cloneNode(true)));
    if (!selectByKey(session, previous)) session.selectedIndex = 0;
    sessionField.hidden = isEvent;
    session.disabled = isEvent;
  };

  const params = new URLSearchParams(window.location.search);
  const training = params.get('formation');
  const event = params.get('evenement');
  if (training) selectByKey(target, `formation:${training}`);
  else if (event) selectByKey(target, `evenement:${event}`);
  refresh();
  if (params.get('session')) selectByKey(session, params.get('session'));
  target.addEventListener('change', refresh);
}

function initForm(form) {
  const d = form.dataset;
  const msg = {
    required: d.msgRequired, email: d.msgEmail, consent: d.msgConsent, number: d.msgNumber,
    invalid: d.msgInvalid, summary: d.msgSummary, tooFast: d.msgDelay, send: d.msgSend, sending: d.msgSending,
  };
  const block = form.closest('[data-form-block]');
  const success = block?.querySelector('[data-form-success]');
  const status = form.querySelector('[data-form-status]');
  const submit = form.querySelector('[type="submit"]');
  const honeypot = form.querySelector('[data-honeypot] input');
  const minDelay = Number(d.minDelay || 0) * 1000;
  const startedAt = Date.now();
  let busy = false;

  form.noValidate = true;
  const fields = () => [...form.elements].filter((el) => el.willValidate && el !== honeypot);

  const setStatus = (text, state = '') => {
    status.textContent = text;
    if (state) status.dataset.state = state;
    else delete status.dataset.state;
  };

  // Shows or clears the error of one field; returns its validity.
  const check = (field) => {
    const valid = field.checkValidity();
    const error = form.querySelector(`#${CSS.escape(field.id)}-error`);
    field.setAttribute('aria-invalid', String(!valid));
    if (error) {
      error.textContent = valid ? '' : messageFor(field, msg);
      error.hidden = valid;
    }
    return valid;
  };

  // Errors appear once a field has been left (or on submit), then update live.
  form.addEventListener('focusout', (event) => {
    const field = event.target;
    if (field.willValidate && field !== honeypot && (field.value || field.dataset.touched)) {
      field.dataset.touched = 'true';
      check(field);
    }
  });
  const recheck = (event) => {
    if (event.target.getAttribute?.('aria-invalid') === 'true') check(event.target);
  };
  form.addEventListener('input', recheck);
  form.addEventListener('change', recheck);

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (busy) return;
    const invalid = fields().filter((field) => !check(field));
    if (invalid.length) {
      setStatus(msg.summary, 'error');
      invalid[0].focus();
      return;
    }
    const showSuccess = () => {
      form.hidden = true;
      success.hidden = false;
      success.focus();
    };
    // Honeypot filled: silently pretend it worked.
    if (honeypot?.value) {
      showSuccess();
      return;
    }
    if (Date.now() - startedAt < minDelay) {
      setStatus(msg.tooFast, 'error');
      return;
    }

    busy = true;
    form.setAttribute('aria-busy', 'true');
    submit.setAttribute('aria-disabled', 'true');
    setStatus(msg.sending);
    let ok = false;
    try {
      ok = await send(form, payloadOf(form));
    } catch {
      ok = false;
    }
    busy = false;
    form.removeAttribute('aria-busy');
    submit.removeAttribute('aria-disabled');
    if (ok) {
      setStatus('');
      showSuccess();
    } else {
      setStatus(msg.send, 'error');
    }
  });

  if (d.form === 'registration') initRegistration(form);
}

export function initForms() {
  document.querySelectorAll('form[data-form]').forEach(initForm);
}
