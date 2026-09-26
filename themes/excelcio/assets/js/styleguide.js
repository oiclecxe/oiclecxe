// Styleguide only: computes WCAG contrast ratios of the rendered samples.
const channel = (c) => {
  const v = c / 255;
  return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
};

const parse = (color) => {
  const m = color.match(/[\d.]+/g).map(Number);
  return { r: m[0], g: m[1], b: m[2], a: m[3] ?? 1 };
};

const luminance = ({ r, g, b }) => 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);

const ratio = (fg, bg) => {
  const [l1, l2] = [luminance(fg), luminance(bg)].sort((a, b) => b - a);
  return (l1 + 0.05) / (l2 + 0.05);
};

const blend = (fg, bg) => ({
  r: fg.r * fg.a + bg.r * (1 - fg.a),
  g: fg.g * fg.a + bg.g * (1 - fg.a),
  b: fg.b * fg.a + bg.b * (1 - fg.a),
});

const minimum = { normal: 4.5, large: 3, decorative: Infinity };

for (const row of document.querySelectorAll('[data-contrast]')) {
  const sample = row.querySelector('.sg-sample');
  const style = getComputedStyle(sample);
  const bg = parse(style.backgroundColor);
  const fg = blend(parse(style.color), bg);
  const value = ratio(fg, bg);
  const level = row.dataset.level;
  row.querySelector('[data-ratio]').textContent = `${value.toFixed(2)}:1`;
  row.dataset.pass = String(level === 'decorative' ? true : value >= minimum[level]);
}
