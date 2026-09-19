# cheersoida-website

Marketing & support site for [CheersOida](https://github.com/checkelmann/CheersOida).
Serves as the App Store **Support URL** and **Marketing URL**.

- Live: <https://checkelmann.github.io/cheersoida-website/>
- App Store marketing URL: <https://checkelmann.github.io/cheersoida-website/>
- App Store support URL: <https://checkelmann.github.io/cheersoida-website/#get>
- Privacy policy: <https://checkelmann.github.io/cheersoida-website/privacy.html>

## Stack

Plain HTML + one shared CSS file + a tiny `main.js`. No build step, no `node_modules`,
no toolchain. Served by GitHub Pages from the repo root.

## Local preview

```bash
python3 -m http.server 5173
# then open http://127.0.0.1:5173/
```

## Editing

`index.html` and `de/index.html` share an identical structure — only the visible copy
differs. Keep them structurally in sync when adding a new section. The privacy pages
have the same property: `privacy.html` and `de/privacy.html`.

Design tokens (colors, type, spacing) live as CSS custom properties at the top of
`assets/style.css`. Do not introduce hard-coded values in section styles.

See [`CheersOida`](https://github.com/checkelmann/CheersOida) for the app this site
documents, including [its privacy policy in the design docs](https://github.com/checkelmann/CheersOida/blob/main/docs/superpowers/specs/2026-09-19-cheersoida-website-design.md).
