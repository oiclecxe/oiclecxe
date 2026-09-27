// Small helpers shared by several modules.

// Whether the visitor asked the system to reduce motion.
export const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Tags rendered as radio buttons: a click on the tag that is already active deselects
// it (browsers fire no change event in that case). `activeValue(name)` returns the
// value currently applied for the radio group `name`; `onDeselect(radio)` resets it.
export function onActiveTagClick(container, activeValue, onDeselect) {
  container.addEventListener('click', (event) => {
    const radio = event.target;
    if (!(radio instanceof HTMLInputElement) || radio.type !== 'radio' || !radio.value) return;
    if (activeValue(radio.name) === radio.value) onDeselect(radio);
  });
}
