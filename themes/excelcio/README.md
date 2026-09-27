# Thème Hugo `excelcio`

Thème sur mesure pour excelcio.com : aplats de couleur de marque, sections claires et sombres, cartes à angles droits, champ de carrés animé. Sans framework ni dépendance tierce au chargement.

- Hugo **≥ 0.166.0**, système de gabarits actuel (`home.html`, `page.html`, `section.html`, `_partials/`, `_shortcodes/`, `_markup/`)
- CSS natif assemblé par `css.Build`, couleurs de marque injectées par `@import "hugo:vars"`
- JavaScript natif en modules, assemblé par `js.Build` (≈ 1,3 Ko gzip)
- Polices auto-hébergées : Geist et JetBrains Mono (SIL OFL 1.1, licences dans `assets/fonts/`)

## Installation

Le thème est importé comme module local :

```toml
# config/_default/hugo.toml
[[module.imports]]
  path = "excelcio"
```

Il construit un site vide sans erreur : tous les paramètres ont une valeur par défaut dans [`hugo.toml`](hugo.toml).

## Paramètres (`params`)

| Paramètre | Rôle |
|---|---|
| `description` | Meta description par défaut |
| `logo.default` / `logo.onDark` / `logo.compactOnDark` / `logo.alt` | Chemins dans `assets/` : logo sur fond clair, sur fond sombre, version compacte du header. Vide = nom du site en texte |
| `organization.name` / `legalName` / `registration` / `email` / `jobsEmail` | Informations légales affichées dans le footer |
| `header.ctaLabel` / `header.ctaURL` | Bouton d'action du header |
| `header.searchURL` | Lien de l'icône de recherche |
| `pillars` | Liste de `{title, text}` : 3 piliers affichés sous le titre du hero et dans le footer |
| `footer.headline` | Signature affichée en grand dans le footer |
| `footer.aiLabel` / `footer.aiURL` | Lien « Explorer avec l'IA » (vers `llms.txt`) |
| `style.*` | Couleurs de marque : chaque clé devient `--clé` en CSS (`brand`, `ink`, `accent`, `dark-0…3`, `light-1…2`, `*-on-light`, `*-on-dark`) |
| `fontFallback.sizeAdjust` / `ascent` / `descent` | Métriques de la police de secours (limite le décalage de mise en page) |
| `dev.showPlaceholders` | Affiche le repère « Contenu provisoire » en développement |

## Données (`data/`, facultatives)

- `social.yaml` : liste de `{name, icon, url}` (icônes : `linkedin`, `x`, `youtube`)
- `offices.yaml` : liste de `{city, address, postalCode}`

## Menus

- `main` : navigation principale. Une entrée avec des enfants ouvre un mega-menu ; `params.group` range l'enfant dans une colonne, `params.featured = true` le place dans la rangée basse, `params.description` ajoute un sous-titre.
- `footer` : une entrée parente par colonne, les enfants sont les liens.

## Front matter reconnu

| Clé | Rôle |
|---|---|
| `sections` | Liste ordonnée de blocs `{type: …}` rendus par `_partials/sections/<type>.html` (accueil et pages modulaires). `hidden: true` masque un bloc |
| `header` | `overlay` (défaut : le header se superpose à la première section) ou `solid` |
| `placeholder` | `true` : contenu provisoire (repère en dev, avertissement au build de production) |
| `seo.title` / `seo.noindex` | Surcharges SEO |

## Ambiances de section

Classes à poser sur une `.section` : `tone-brand`, `tone-light`, `tone-light-alt`, `tone-dark`, `tone-dark-alt`, `tone-deep`. Chaque ton redéfinit `--bg`, `--fg`, `--fg-body`, `--fg-muted` (grand texte), `--fg-accent`, `--surface`, `--line`, `--focus` ; les composants n'utilisent que ces rôles.

## Composants et partials

| Partial | Usage |
|---|---|
| `components/logo.html` | Logo (`variant`, `height`) |
| `components/pillars.html` | Trois piliers |
| `components/squares.html` | Champ de carrés (`seed`, `anchor`, `cols`, `rows`, `density`) |
| `components/page-hero.html`, `components/breadcrumb.html` | En-tête des pages intérieures |
| `icon.html` | Icône SVG inline (`name`, `class`, `label`) |
| `image.html` | Image responsive AVIF/WebP (`page`, `src`, `alt`, `sizes`, `priority`) ; échec du build si `alt` manque |
| `components/title.html` | Titre en deux temps avec apparition mot par mot (`title` : texte, ou `{lines: [{accent, text}], lead, rest}`) |
| `components/words.html` | Découpe un texte en mots animables (retourne `html`, `next`) |
| `components/mini-visual.html` | Illustration SVG de tableau de bord (`type` : bars, grid, line, kpi, search, table, report) |
| `hooks/head-end.html`, `hooks/body-end.html` | Points d'extension vides, à surcharger depuis le site |

### Sections (`sections:` du front matter)

| `type` | Ambiance | Champs |
|---|---|---|
| `hero` | brand | `title`, `primary` et `secondary` `{label, url}`, `logos` (liste de noms) |
| `architecture` | light | `title` (`lines`, `rest`), `top` et `bottom` `{label, detail}`, `band1` et `band2` `{label, items}` |
| `features` | light | `title`, `tabs: [{label, cards: [{title, accent, text, url}]}]` |
| `expertises` | light-alt | `title`, `linkLabel` ; lit les pages `expertise` (toutes par `weight`, ou `items` : liste de chemins, `limit`) |
| `statement` | light | `text` |
| `case-studies` | dark-alt | `title`, `tone` ; lit les pages `case-study` (`result`, `client`, `sector`, `image`) : toutes par `weight`, ou `items` (liste de chemins), `limit` |
| `faq` | dark | `title`, `items: [{q, a}]` (émet le JSON-LD `FAQPage`) |
| `platform` | dark-alt | `title` ; lit les pages `solution` (`partnerName`, `tagline`, `visual`) : toutes par `weight`, ou `items`, `limit` |
| `trainings` | dark-alt | `title`, `cta {label, url}`, `limit` ; lit les sessions futures des pages `training` (`sessions`) |
| `proof` | dark-alt | `title`, `stats: [{value, suffix, label}]`, `quote {before, highlight, after, author, role}` |
| `cta` | brand | `title`, `primary`, `secondary`, `badges` |

Chaque bloc accepte `hidden: true`.

**Source unique** : les sections qui présentent des contenus (expertises, cas clients, solutions, formations) les **lisent dans leurs pages** ; rien n'est recopié dans le front matter de l'accueil. De même, les pages solutions et expertises déclarent leur entrée de menu (`menus:`) plutôt que d'être recopiées dans `menus.fr.toml`.

**Espacement automatique** : deux blocs voisins de même ambiance forment une seule bande ; le second perd sa marge haute, pour que l'écart reste d'une marge de section. Deux blocs d'ambiances différentes gardent leurs marges complètes. La règle est calculée par le CSS d'après les voisins réellement affichés : retirer, masquer ou réordonner des blocs ne demande aucun réglage. Le filet au-dessus de `proof` n'apparaît que lorsqu'il prolonge un bloc de même ambiance.

Classes CSS : `.btn` (`--primary`, `--secondary`, `--sm`), `.link-arrow`, `.icon-btn`, `.badge` (`--alt`), `.eyebrow` (`--mono`), `.title__lead` / `.title__rest` / `.title__accent`, `.statement`, `.card` (`__title`, `__title-accent`, `__corner`, `__text`), `.accordion` (`__item`, `__summary`, `__icon`, `__body`), `.tabs`, `.carousel`, `.item-list`, `.rows`, `.stats`, `.quote`, `.split`, `.grid` (`--2` à `--5`), `.prose`.

Barre de progression de lecture : présente sur toutes les pages (`baseof.html`), tokens `--progress-h` et `--progress-color`.

Animations : `data-reveal` + `.reveal` (mots d'un titre) ou `.reveal-block` (bloc) déclenchent l'apparition au défilement ; `--delay` décale un bloc. Tout reste visible sans JS et en mouvement réduit.

La page `/styleguide/` (développement uniquement) présente tous les tokens et composants, avec les contrastes calculés en direct.

## Types de contenu et gabarits

Les gabarits sont choisis par **type** (champ `type`, en général posé par `cascade` dans le `_index.md` de la rubrique), ce qui rend le thème indépendant des adresses du site.

| Type | Gabarits | Archetype (`hugo new content --kind …`) |
|---|---|---|
| `solution` | `solution/section.html`, `solution/page.html` | `solution.md` |
| `expertise` | `expertise/section.html`, `expertise/page.html` | `expertise.md` |
| `training` | `training/section.html` (catalogue filtrable, prochaines sessions), `training/page.html` | `training.md` |
| `case-study` | `case-study/section.html` (filtrable), `case-study/page.html` | `case-study.md` |
| `article` | `article/section.html` (à la une, pagination), `article/page.html` (sommaire) | `article.md` |
| `event` | `event/section.html` (à venir / passés), `event/page.html` | `event.md` |
| `job` | `job/section.html`, `job/page.html` | `job.md` |
| `contact`, `search`, `site-map` | `contact/page.html`, `search/page.html`, `site-map/page.html` | — |
| autre | `page.html`, `section.html` (pages claires ; `sections:` accepté) | `default.md` |

Relations automatiques : les contenus citent des solutions (`solutions: [qlik]`) et des expertises (`expertises: [finance]`) par le nom de dossier de la page cible ; `_partials/func/related.html` les retrouve.

Pages intérieures : ambiances claires, header plein dès le haut (`header: solid` implicite hors accueil et 404), appel à l'action final `params.cta` (remplaçable par `cta:` ou supprimable par `cta: false`).

### Shortcodes

`callout`, `figure`, `video` (façade YouTube, rien n'est chargé avant le clic), `button`, `cta`, `stats`, `columns`. Syntaxe : `docs/CONTENU.md` du site.

### Points d'accroche pour le Lot 4

`contact/page.html` utilise `_partials/forms/contact.html` s'il existe ; `search/page.html` utilise `_partials/search/page.html` s'il existe. Le lien « Explorer avec l'IA » du footer n'apparaît que si la page d'accueil publie le format de sortie `llms` (Lot 5).

## Surcharges

Pour adapter un fichier, créer le fichier de même chemin dans le site (système de fichiers unifié de Hugo), par exemple `layouts/_partials/hooks/body-end.html` pour ajouter un outil d'analytics.
