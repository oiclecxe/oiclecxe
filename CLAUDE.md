# CLAUDE.md — excelcio.com (Hugo)

Site vitrine d'Excelcio (conseil et formation BI) refait en site statique **Hugo**, dans l'esprit visuel de la référence, aux couleurs `#A82234` / `#1A171B`. Accueil en ambiances alternées comme la référence (aplats bordeaux, sections claires, sections sombres) ; **pages intérieures claires** avec header en barre sombre pleine (voir `docs/DECISIONS.md`).

**Source de vérité : `docs/SPEC.md`** (le *quoi*). Ce fichier donne le *comment* : consignes permanentes, conventions et commandes. En cas de conflit, SPEC.md l'emporte ; signale-le.

## État d'avancement

<!-- À mettre à jour par Claude Code à la fin de chaque lot validé. -->
- Périmètre : V1 (lots 0 à 2) validée ; **étendu au Lot 3** (27/09/2026). S'arrêter après le Lot 3.
- Lot en cours : **Lot 3 — Gabarits des rubriques et contenu placeholder** : terminé, en attente de validation
- Lots validés : Lot 0, Lot 1 (26/09/2026), Lot 2 (27/09/2026)
- Catalogue de formations : reprendre les **intitulés publics du site actuel** ; le reste en placeholders.
- Photos de test `photo_001.jpg`, `photo_002.jpg` à la racine : tests uniquement, non versionnées, jamais publiées comme contenu réel.
- En suspens : score Lighthouse officiel (téléchargement de Lighthouse via `npx` à autoriser ; Node 16 installé, ≥ 18 requis pour la version récente)
- Logo Excelcio fourni : `assets/images/logo.svg`

## Méthode de travail

- Travailler **lot par lot** (SPEC § 17). Avant un lot, relire sa section et les § qu'il cite. À la fin : vérifier chaque critère d'acceptation, faire un compte rendu (fait / non fait / écarts), mettre à jour « État d'avancement », puis **s'arrêter et attendre la validation**.
- Une branche par lot (`lot-N-nom`), petits commits atomiques en français à l'impératif (`Ajoute le mega-menu`). Ne pas pousser ni fusionner sans accord.
- Toute décision non prévue par SPEC.md : la poser en question, puis la consigner dans `docs/DECISIONS.md` (date, décision, raison).
- Environnement : Windows 11, **PowerShell**. Toute commande documentée doit fonctionner sous PowerShell. Dépôt Git **local uniquement** : `C:\Users\vtexier.EXCELCIO\Desktop\excelcio_com\hugo_2`, aucun dépôt distant.
- Langue : **code en anglais** (identifiants, classes CSS, clés i18n et front matter, noms de partials, commentaires) ; contenu, URLs, commits, README et `docs/` en **français**.
- Navigateurs cibles : Chrome, Edge, Firefox, Safari (y compris iOS) des 24 derniers mois ; repli obligatoire pour toute fonction plus récente.
- Vérifier visuellement chaque composant dans le navigateur intégré (desktop 1440 px et mobile 390 px) avant de le déclarer terminé.

## Règles non négociables

- **Pas de copie de la référence** : reproduire le langage visuel (mise en page, typographie, effets, animations), jamais son code, ses images, logos, icônes ni ses textes.
- **Pas de contenu inventé** : textes en placeholders `[À RÉDIGER — consigne…]`, chiffres en `[XX]`, `placeholder: true` dans le front matter. Jamais de *lorem ipsum*, de faux clients, de faux témoignages ni de faux chiffres. Faits réels autorisés : SPEC § 7.4. **Aucun nom ni logo de client réel** (« Client 1 », « Client 2 »…), même ceux du site actuel. Le logo Excelcio est fourni par l'utilisateur, ne pas le récupérer en ligne.
- **Zéro tiers au chargement** : pas de CDN, pas de Google Fonts distant, pas de framework JS. Polices auto-hébergées.
- **Amélioration progressive** : chaque page est lisible et navigable sans JavaScript.
- `#A82234` (`--brand`) n'est **jamais** une couleur de texte sur fond sombre (contraste 2,5:1). Utiliser `--accent-on-dark` (ou le rôle `--fg-accent` d'une ambiance sombre).
- Pas de halos, dégradés décoratifs, grilles de fond ni halo au pointeur (décision du Lot 0) : aplats, angles droits, champ de carrés animé.
- Aucune couleur, taille ou durée en dur : uniquement les tokens de `tokens.css`.
- Aucun texte d'interface en dur dans les gabarits : `T "cle"` et `i18n/fr.toml`.

## Conventions Hugo (détail : SPEC § 16)

- Suivre les bonnes pratiques de la **version de Hugo installée**, d'après la documentation officielle (gohugo.io), **jamais de mémoire** ni d'après des tutoriels. En cas de doute, lire la page de documentation concernée avant d'écrire le code.
- Appliquer les pratiques de SPEC § 16.4 (`hugo.Data`, `hugo.Sites`, `.IsBranch`, `locale`/`label` pour les langues, `files` et `sites` dans les mounts…). Le build doit passer sans aucun avertissement de dépréciation.
- Gabarits : `baseof.html`, `home.html`, `page.html`, `section.html`, `taxonomy.html`, `term.html`, dossiers `_partials/`, `_shortcodes/`, `_markup/`.
- Thème importé en module local (`[[module.imports]] path = "excelcio"`), version installée reportée comme minimum dans `themes/excelcio/hugo.toml` (`[module.hugoVersion] min`).
- CSS : `css.Build` (point d'entrée `main.css`, `@import`), couleurs de marque injectées par `@import "hugo:vars"` depuis `site.Params.style`. Pas de Sass, PostCSS ni Tailwind.
- **Thème séparé** `themes/excelcio/` = présentation (gabarits, CSS, JS, polices, icônes, i18n, archetypes). **Racine** = propre à Excelcio (`config/`, `content/fr/`, `data/`, images de contenu). Aucune donnée Excelcio en dur dans le thème : tout passe par `site.Params`, `hugo.Data` ou le front matter, avec valeurs par défaut dans `themes/excelcio/hugo.toml`.
- Le thème doit construire un site vide sans erreur.
- Ne pas surcharger le thème depuis la racine sans le consigner dans `docs/DECISIONS.md` (objectif : zéro surcharge).
- CSS et JS uniquement via Hugo Pipes (`resources.Get` → `css.Build`/`js.Build` → `fingerprint` avec SRI en production), jamais dans `static/`.
- Images via le partial `image.html` et le render hook `_markup/render-image.html` (AVIF/WebP, `srcset`, dimensions, `alt` obligatoire).
- `partialCached` pour header, footer, mega-menu ; vérifier avec `--templateMetrics`.
- La page d'accueil et les pages modulaires sont décrites par la liste `sections:` du front matter → `_partials/sections/<type>.html`.

## Commandes

```powershell
hugo version                                           # version de référence du projet
hugo --logLevel info                                   # doit sortir sans aucun avertissement de dépréciation
hugo server --buildDrafts --disableFastRender          # développement (http://localhost:1313)
hugo --environment production --gc --minify            # build de production dans public/
npx pagefind --site public                             # index de recherche (après le build)
hugo --templateMetrics --templateMetricsHints          # performance des gabarits
hugo new content --kind training formations/mon-slug/index.md   # chemin relatif à content/fr ; --kind = type
```

Pour tester la recherche : build de production, puis Pagefind, puis servir `public/` avec un serveur statique (voir README).

## Budgets et cibles (détail : SPEC § 12 à 15)

- Lighthouse mobile ≥ 95 sur les 4 catégories ; LCP < 1,8 s ; CLS < 0,05.
- CSS ≤ 40 Ko gzip ; JS ≤ 15 Ko gzip (hors Pagefind) ; polices ≤ 120 Ko.
- WCAG 2.2 AA, `prefers-reduced-motion` respecté, navigation clavier complète.
- Build sans aucun avertissement, hors liste des placeholders en production.

## Fichiers clés

- `docs/SPEC.md` : cahier des charges
- `docs/DECISIONS.md` : journal des décisions
- `relevé de la référence (Lot 0)` : relevés de la référence (Lot 0), à consulter pour toute question de style
- `docs/CONTENU.md` : guide de rédaction et des placeholders
- `themes/excelcio/README.md` : paramètres, sections, shortcodes du thème
