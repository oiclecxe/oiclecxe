# CLAUDE.md — excelcio.com (Hugo)

Site vitrine d'Excelcio (conseil et formation BI) refait en site statique **Hugo**, dans l'esprit visuel de la référence, aux couleurs `#A82234` / `#1A171B`. Accueil en ambiances alternées comme la référence (aplats bordeaux, sections claires, sections sombres) ; **pages intérieures claires** avec header en barre sombre pleine (voir `docs/DECISIONS.md`).

**Source de vérité : `docs/SPEC.md`** (le *quoi*). Ce fichier donne le *comment* : consignes permanentes, conventions et commandes. En cas de conflit, SPEC.md l'emporte ; signale-le.

## État d'avancement

<!-- À mettre à jour par Claude Code à la fin de chaque lot validé. -->
- Périmètre : V1 (lots 0 à 2) validée ; lots 3, 4 et 5 réalisés et validés (27/09/2026). Lot 6 non lancé : attendre l'accord de l'utilisateur.
- Lot en cours : aucun (Lot 6 — Recette et remise : à lancer sur accord)
- Lots validés : Lot 0, Lot 1 (26/09/2026), Lot 2 (27/09/2026), Lot 3 (27/09/2026), Lot 4 (27/09/2026), Lot 5 (27/09/2026)
- Contenu : textes du site excelcio.com repris (branche `contenu-reprise`, point de restauration : étiquette `avant-reprise-contenu`), en attente de validation. Actualités : 12 derniers mois. Restent en placeholder : Accessibilité, Newsletter, adresse de Nantes.
- Photos de test `photo_001.jpg`, `photo_002.jpg` à la racine : tests uniquement, non versionnées, jamais publiées comme contenu réel.
- En suspens : score Lighthouse officiel (Lot 6 ; téléchargement de Lighthouse via `npx` à autoriser) ; validation en ligne du JSON-LD (validator.schema.org, résultats enrichis Google) reportée par l'utilisateur, à autoriser plus tard. Node.js 22.23.2 LTS installé le 27/09/2026 (outils ponctuels uniquement : Pagefind, Lighthouse).
- Préproduction : GitHub Pages (`.github/workflows/hugo.yaml`), site servi sous `/oiclecxe/`, toutes les pages en noindex (`HUGO_PARAMS_SEO_BLOCKROBOTS`). Dans les gabarits, un lien interne écrit `/chemin/` passe par `partial "func/rel-url.html"` (jamais `relLangURL`, qui ignore le sous-dossier).
- Édition : Sveltia CMS sur `/admin/` (`static/admin/config.yml`, version figée hébergée dans le dépôt), jetons d'accès GitHub ; chaque enregistrement est un commit sur `main` : faire `git pull` avant de travailler en local. Tout nouveau champ de front matter doit être ajouté à `static/admin/config.yml` (avec sa consigne en `hint`).
- Logo Excelcio fourni : `assets/images/logo.svg`

## Méthode de travail

- Travailler **lot par lot** (SPEC § 17). Avant un lot, relire sa section et les § qu'il cite. À la fin : vérifier chaque critère d'acceptation, faire un compte rendu (fait / non fait / écarts), mettre à jour « État d'avancement », puis **s'arrêter et attendre la validation**.
- Une branche par lot (`lot-N-nom`), petits commits atomiques en français à l'impératif (`Ajoute le mega-menu`). Ne pas pousser ni fusionner sans accord.
- Toute décision non prévue par SPEC.md : la poser en question, puis la consigner dans `docs/DECISIONS.md` (date, décision, raison).
- Environnement : Windows 11, **PowerShell**. Toute commande documentée doit fonctionner sous PowerShell. Dépôt Git : `C:\Users\vtexier.EXCELCIO\Desktop\excelcio_com\hugo_2` ; dépôt distant `origin` = https://github.com/oiclecxe/oiclecxe (public) depuis le 28/10/2026 : chaque push sur `main` publie la préproduction GitHub Pages (https://oiclecxe.github.io/oiclecxe/). Ne jamais pousser sans accord de l'utilisateur.
- Langue : **code en anglais** (identifiants, classes CSS, clés i18n et front matter, noms de partials, commentaires) ; contenu, URLs, commits, README et `docs/` en **français**.
- Navigateurs cibles : Chrome, Edge, Firefox, Safari (y compris iOS) des 24 derniers mois ; repli obligatoire pour toute fonction plus récente.
- Vérifier visuellement chaque composant dans le navigateur intégré (desktop 1440 px et mobile 390 px) avant de le déclarer terminé.

## Règles non négociables

- **Pas de copie de la référence** : reproduire le langage visuel (mise en page, typographie, effets, animations), jamais son code, ses images, logos, icônes ni ses textes.
- **Pas de contenu inventé** : les textes viennent du **site actuel excelcio.com** (repris et adaptés librement, sans ajouter de fait : avenant du 27/09/2026) ou de l'utilisateur ; à défaut, placeholders `[À RÉDIGER — consigne…]`, chiffres en `[XX]`, `placeholder: true` dans le front matter. Jamais de *lorem ipsum*, de faux clients, de faux témoignages ni de faux chiffres. **Noms de clients réels autorisés** tels qu'ils figurent sur le site actuel (avenant du 27/09/2026) ; pas de logo de client sans fourniture par l'utilisateur. Le logo Excelcio est fourni par l'utilisateur, ne pas le récupérer en ligne. Images : ne pas reprendre celles du site actuel (texte seulement).
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
hugo server --buildDrafts --disableFastRender --renderToMemory   # développement (http://localhost:1313), n'écrit pas dans public/
hugo --environment production --gc --minify            # build de production dans public/ (vider public/ avant : Hugo n'efface pas les fichiers périmés)
npx pagefind@1.5.2 --site public --serve               # index de recherche + serveur http://localhost:1414 (après le build)
hugo --templateMetrics --templateMetricsHints          # performance des gabarits
hugo new content --kind training formations/mon-slug/index.md   # chemin relatif à content/fr ; --kind = type
```

Pour tester la recherche : `public/` vidé, build de production, puis `npx pagefind@1.5.2 --site public --output-path .pagefind` ; `hugo server` sert alors cet index (montage de développement, redémarrer le serveur la première fois). Voir README, « Recherche interne ». Formulaires : mode simulé par défaut (`[forms]` dans `params.toml`), e-mail contenant `+error` = échec simulé.

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
