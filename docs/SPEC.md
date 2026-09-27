# Cahier des charges — Refonte excelcio.com en site statique Hugo

> **Destinataire : Claude Code.** Ce document est la source de vérité du projet (le *quoi*). Le fichier `CLAUDE.md` qui l'accompagne contient les consignes de travail permanentes (le *comment*). Lis les deux en entier avant toute action, relis la section du lot en cours avant de le commencer, et ne t'en écarte pas sans validation explicite de l'utilisateur.
>
> Ces deux fichiers sont rédigés dans `C:\Users\vtexier.EXCELCIO\Documents\cozy\obsidian_pro\site_internet\cdc_2\`. Au démarrage (§ 20), les **copier** dans le dépôt du site `C:\Users\vtexier.EXCELCIO\Desktop\excelcio_com\hugo_2` : `CLAUDE.md` à la racine, `SPEC.md` dans `docs/`. En cas de divergence, la version du dépôt fait foi ; signaler toute modification pour que l'utilisateur mette à jour sa copie de référence.

| Champ | Valeur |
|---|---|
| Projet | Refonte du site vitrine d'Excelcio (cabinet de conseil et de formation en Business Intelligence / Data) |
| Site actuel | https://excelcio.com/ (WordPress) |
| Référence de design | site de référence (non cité) |
| Générateur | Hugo, **version installée sur le poste** (à jour), qui sert de référence et de version minimale imposée dans la configuration du thème (§ 11.1) |
| Environnement cible | Développement local uniquement (pas de déploiement dans ce périmètre) |
| Langue | Français au lancement, architecture prête pour l'anglais |
| Version du document | 1.0 — 2026-09-26 |

---

## 0. Règles de travail pour Claude Code

1. **Travail par lots** (§ 17). À la fin de chaque lot : exécuter les vérifications du lot, produire un court compte rendu (fait / non fait / écarts), puis **s'arrêter et demander validation** avant de passer au lot suivant.
2. **Aucun contenu réel inventé.** Le contenu est en *placeholders* (§ 7.3). Ne jamais inventer de chiffres, de clients, de témoignages, de noms de personnes ni de références présentés comme réels. Les seuls faits réels réutilisables sont listés au § 7.4.
3. **Référence ≠ copie.** On reproduit le *langage visuel* de la référence (mise en page, rythme, système typographique, effets, animations). On n'en copie **jamais** le code (CSS, JS, SVG), les images, illustrations, logos, icônes propriétaires ni les textes. Tout est réécrit.
4. **Zéro dépendance runtime tierce.** Pas de CDN, pas de Google Fonts distant, pas de framework JS ; tout est servi depuis le site (§ 11).
5. **Amélioration progressive.** Chaque page doit être lisible et navigable sans JavaScript.
6. **Ambiguïté ⇒ question.** Si une exigence est ambiguë ou contradictoire, poser la question plutôt que supposer. Consigner les décisions dans `docs/DECISIONS.md` (date, décision, raison).
7. **Commits** : petits, atomiques, messages en français à l'impératif (`Ajoute le mega-menu`), un lot = une branche `lot-N-nom` fusionnée après validation.
8. Environnement de l'utilisateur : **Windows 11**, PowerShell. Toute commande documentée doit fonctionner sous PowerShell.
9. **Langue** : code en anglais (identifiants, classes CSS, clés i18n et de front matter, noms de fichiers de gabarits et de partials, commentaires) ; contenu, URLs, messages de commit, README et `docs/` en français.
10. **Périmètre V1 = Lots 0 à 2.** À la fin du Lot 2, s'arrêter : les lots suivants ne commencent que sur demande explicite de l'utilisateur.

---

## 1. Contexte et objectifs

Excelcio est un cabinet français (bureaux à Paris, Rennes et Nantes) spécialisé en BI et data : conseil en acquisition de solutions, déploiement, expertise métier et formation, partenaire de Qlik, Vizlib, Tableau, Power BI, ThoughtSpot, Jedox et IBM Cognos.

Le site WordPress actuel doit être **revitalisé**. Objectifs, par ordre de priorité :

| # | Objectif | Mesure |
|---|---|---|
| O1 | Nouveau design premium, sombre, « produit tech », dans l'esprit de la référence, aux couleurs d'Excelcio | Validation visuelle par l'utilisateur à chaque lot |
| O2 | Performance nettement supérieure à WordPress | Lighthouse ≥ 95 dans les 4 catégories, Core Web Vitals « bons » (§ 12) |
| O3 | Meilleur référencement naturel | SEO technique complet, données structurées valides (§ 13) |
| O4 | Lisibilité maximale par les agents IA (LLM, moteurs de réponse) | `llms.txt`, sortie Markdown par page, HTML sémantique, JSON-LD (§ 14) |
| O5 | Maintenabilité : contenu en Markdown, gabarits réutilisables, ajout de l'anglais sans refonte | Archetypes, composants documentés, i18n prête |

---

## 2. Décisions actées

| Sujet | Décision |
|---|---|
| Nature du projet | Refonte complète : nouveau design, nouvelle arborescence, contenu retravaillé |
| Contenu | Structure complète + **placeholders**. La rédaction réelle sera faite ensuite par l'équipe Excelcio |
| Référence la référence | **Coller au plus juste** : esthétique, typographie, organisation des pages, animations |
| Couleurs | Principale **#A82234** (rgb 168, 34, 52), fond **#1A171B** (rgb 26, 23, 27), palette dérivée |
| Mode d'affichage | ~~Sombre uniquement~~ → **Avenant Lot 0** : ambiances de section alternées comme la référence (aplat bordeaux, clair, sombre), sans bascule clair/sombre. Voir `docs/DECISIONS.md` et `relevé de la référence (Lot 0)` |
| Effets visuels | **Avenant Lot 0** : pas de halos, dégradés, grilles de fond ni halo au pointeur (§ 5.1 et § 9 amendés) ; aplats, angles droits, champ de carrés animé |
| Polices | **Avenant Lot 0** : Geist + JetBrains Mono (SIL OFL 1.1), auto-hébergées |
| Pages intérieures | **Avenant du 27/09/2026** : ambiances **claires** (`light`, `light-alt`), header en barre sombre pleine ; footer sombre et CTA bordeaux inchangés |
| Catalogue de formations | **Avenant du 27/09/2026** : intitulés publics du site actuel repris ; le reste en placeholders |
| Périmètre | **Avenant du 27/09/2026** : V1 validée (lots 0 à 2), périmètre étendu au Lot 3 |
| Langues | FR seul, i18n Hugo configurée pour ajouter EN plus tard |
| Fonctions dynamiques | Formulaire de contact, recherche interne, inscriptions formations/événements, newsletter |
| Hébergement | Local pour l'instant ; formulaires via une couche d'abstraction configurable avec mode simulé (§ 10) |
| Stack | Hugo seul, CSS natif via `css.Build`, JS natif en modules via `js.Build` ; Pagefind pour la recherche |
| Organisation Hugo | Bonnes pratiques de la **version de Hugo installée**, pour le **projet** comme pour le **thème** : thème séparé et réutilisable `themes/excelcio/`, site spécifique à la racine, aucune API dépréciée (§ 16) |
| Exigences | Niveau élevé : Lighthouse ≥ 95, WCAG 2.2 AA, analytics sans cookie, optimisation agents IA |
| Livraison | En lots validés un par un, dans un dépôt Git **local** (sans dépôt distant) : `C:\Users\vtexier.EXCELCIO\Desktop\excelcio_com\hugo_2` |
| Première version (V1) | **Lots 0 à 2** : étude de la référence, socle et design system, page d'accueil complète. Les lots 3 à 6 ne sont lancés qu'après validation de la V1 |
| Arborescence et menu | Proposition du § 6 **validée** : Offre · Solutions · Formations · Cas clients · Ressources · Entreprise + « Nous contacter » |
| Logo | **Fourni par l'utilisateur** (§ 5.5) ; ne pas le récupérer sur le site actuel |
| Clients | ~~Aucun nom ni logo de client réel~~ → **Avenant du 27/09/2026** : clients cités nommément, tels qu'ils figurent sur le site actuel ; logos non repris |
| Contenu | **Avenant du 27/09/2026** : textes repris du site actuel excelcio.com et adaptés librement aux emplacements (sans ajout de fait) : pages, 28 fiches formations, cas clients, pages légales, actualités des 12 derniers mois. Texte seulement, pas d'images |
| Langue du code | **Anglais** pour le code (identifiants, classes CSS, clés i18n, clés de front matter, noms de partials, commentaires) ; **français** pour le contenu, les URLs, le README et `docs/` |
| Navigateurs | Chrome, Edge, Firefox et Safari (y compris iOS) des **24 derniers mois** |

---

## 3. Périmètre

### 3.1 Dans le périmètre
- Thème Hugo sur mesure `excelcio`, **séparé du site** dans `themes/excelcio/` et conforme aux bonnes pratiques Hugo (§ 16).
- Design system complet (tokens, composants, page de guide de style).
- Tous les gabarits de pages listés au § 6 et § 8, alimentés par des placeholders.
- Fonctions dynamiques côté client avec mode simulé en local.
- SEO technique, données structurées, sorties pour agents IA.
- Documentation : `README.md`, `docs/CONTENU.md` (guide de rédaction), `docs/DECISIONS.md`, `relevé de la référence (Lot 0)`.

### 3.2 Hors périmètre
- Rédaction du contenu définitif, traductions anglaises.
- Migration automatique des articles WordPress.
- Déploiement, nom de domaine, DNS, CI/CD de production.
- Choix et configuration des fournisseurs (formulaires, emailing, analytics) : seuls les points d'intégration sont livrés.
- Tout back-end (CMS headless, base de données).

---

## 4. Étude de la référence la référence (Lot 0)

Avant tout développement, analyser la référence avec le navigateur intégré et produire **`relevé de la référence (Lot 0)`**. Ce document sert ensuite de référence à tous les lots.

### 4.1 À relever (par mesure réelle : styles calculés, DevTools, pas par supposition)
- **Typographie** : familles (titres, texte, code), graisses utilisées, échelle de tailles par breakpoint, interlignages, interlettrages (notamment sur les grands titres), casse (capitales des *eyebrows*).
- **Grille et espacements** : largeur max du contenu, gouttières, marges verticales entre sections, padding des cartes, breakpoints.
- **Surfaces** : rayons de bordure, épaisseur et opacité des bordures, ombres, flous (`backdrop-filter`), bruit/grain éventuel.
- **Effets** : halos lumineux (*glow*), dégradés (direction, étapes, opacités), fonds en grille ou points, bordures en dégradé, masques (`mask-image`) de fondu.
- **Animations** : liste exhaustive (apparition au défilement, marquee de logos, survol des cartes, halo qui suit le pointeur, mega-menu, compteurs, schémas animés…) avec **durée, easing, délai, déclencheur**.
- **Composants** : header (hauteur, comportement au défilement, transparence), mega-menu (structure, colonnes, icônes, descriptions), boutons (variantes, tailles, états), badges, cartes, onglets, accordéons FAQ, footer.
- **Organisation des pages** : inventaire section par section de la page d'accueil et de 3 pages intérieures **choisies par Claude Code**, qui justifie son choix dans le relevé : une page produit (équivalent des pages Solutions), une page solution ou cas d'usage (équivalent des pages Offre), la liste du blog ou des ressources (équivalent d'Actualités). Pour chaque section : rôle, disposition, nombre d'éléments, composants employés.
- Captures d'écran de référence (desktop 1440 px et mobile 390 px) dans `docs/reference/` — **usage interne uniquement**, ne jamais les servir sur le site (`docs/` est hors de `content/` et `static/`).

### 4.2 Polices
- Identifier les polices de la référence et **vérifier leur licence**.
- Si elles sont libres (SIL OFL ou équivalent) : les auto-héberger en `woff2`, sous-ensemble latin + latin-ext.
- Sinon : proposer **2 alternatives libres** au plus proche (métriques, caractère), avec un comparatif visuel sur la page de guide de style, et **demander à l'utilisateur de choisir**.

### 4.3 Transposition
Terminer le document par un tableau « **élément la référence → équivalent Excelcio** » (ex. « Hero produit avec capture de l'interface » → « Hero avec maquette de dashboard BI stylisée »).

---

## 5. Design system

### 5.1 Couleurs

Couleurs imposées : `#A82234` (bordeaux Excelcio) et `#1A171B` (quasi-noir chaud). Le reste de la palette est **dérivé** par Claude Code puis validé au Lot 1.

⚠️ **Contrainte de contraste** : `#A82234` sur `#1A171B` a un contraste d'environ **2,5:1**. Il ne doit **jamais** servir de couleur de texte ni d'icône porteuse de sens sur fond sombre. Usages autorisés : fonds de boutons (avec texte blanc, ~7,1:1 ✅), dégradés, halos, éléments décoratifs. Pour du texte d'accent, utiliser une teinte éclaircie ≥ 4,5:1.

Tokens à définir dans `themes/excelcio/assets/css/tokens.css` (les valeurs sont des **propositions de départ**, à ajuster pour respecter les contrastes et coller à l'ambiance la référence).

Les **couleurs de marque** (`--c-brand`, `--c-bg` et leurs dérivées) ne sont pas écrites en dur : ce sont des paramètres `params.style` du thème, injectés dans le CSS par `@import "hugo:vars"` et l'option `vars` de `css.Build` (§ 11.1). Le site peut ainsi les changer dans sa configuration sans toucher au thème. Les autres tokens (espacements, typographie, mouvement) restent dans `tokens.css`. Valeurs de départ :

```css
:root {
  /* Fonds */
  --c-bg:            #1A171B; /* fond principal (imposé) */
  --c-bg-deep:       #120F13; /* sections alternées, footer */
  --c-surface:       #221E23; /* cartes */
  --c-surface-2:     #2C272D; /* cartes au survol, champs */
  --c-border:        rgb(255 255 255 / .08);
  --c-border-strong: rgb(255 255 255 / .16);

  /* Texte */
  --c-text:          #F5F1F3; /* ≥ 15:1 sur --c-bg */
  --c-text-muted:    #ABA2A8; /* ≥ 4.5:1 sur --c-bg ET sur --c-surface, à vérifier */
  --c-text-subtle:   #7D747A; /* texte non essentiel uniquement, ≥ 3:1 pour gros texte */

  /* Marque */
  --c-brand:         #A82234; /* imposé */
  --c-brand-hover:   #BF2A3F;
  --c-brand-light:   #E8566B; /* texte d'accent, liens : ≥ 4.5:1 sur --c-bg */
  --c-brand-glow:    rgb(168 34 52 / .45);

  /* Dégradé signature (équivalent du dégradé magenta→violet de la référence) */
  --g-brand: linear-gradient(135deg, #FF5A6E 0%, #A82234 50%, #5A1230 100%);
  --g-text:  linear-gradient(90deg, #FF8A98 0%, #E8566B 50%, #C23A50 100%); /* titres en dégradé */

  /* États */
  --c-focus:   #FF8A98; /* anneau de focus, ≥ 3:1 sur tous les fonds */
  --c-success: #4CC38A;
  --c-error:   #FF6B6B;
}
```

Exigences :
- Livrer `scripts/check-contrast.mjs` **ou** un tableau calculé dans `docs/DECISIONS.md` prouvant les ratios WCAG de toutes les paires texte/fond utilisées.
- Aucune couleur écrite en dur hors de `tokens.css`.
- `color-scheme: dark` sur `:root` ; `<meta name="theme-color" content="#1A171B">`.

### 5.2 Typographie
- Familles : issues du Lot 0 (§ 4.2), déclarées en tokens `--font-display`, `--font-body`, `--font-mono`.
- Échelle **fluide** avec `clamp()` : tokens `--fs-xs` à `--fs-display` (au moins 8 niveaux) reproduisant les tailles relevées sur la référence entre 390 px et 1440 px.
- Tokens d'interlignage et d'interlettrage associés (grands titres resserrés, *eyebrows* en capitales espacées).
- Polices : `font-display: swap`, préchargement (`<link rel="preload">`) de **2 fichiers maximum**, `size-adjust`/`ascent-override` sur la police de secours pour limiter le CLS.

### 5.3 Espacements, grille, formes
- Échelle d'espacement en tokens (`--sp-1` … `--sp-12`), base 4 px.
- Conteneur : largeur max relevée sur la référence (≈ 1200–1280 px), gouttières fluides (min 16 px en mobile).
- Breakpoints conformes au relevé ; préférer les **container queries** pour les composants.
- Tokens de rayons, bordures, ombres, flous, calques (`--z-header`, `--z-menu`, `--z-modal`).

### 5.4 Mouvement
- Tokens : `--dur-fast` (≈150 ms), `--dur-base` (≈300 ms), `--dur-slow` (≈600 ms), `--ease-out`, `--ease-in-out` (courbes relevées au Lot 0).
- Animer **uniquement** `transform`, `opacity`, `filter` (et `background-position` pour les dégradés).
- `@media (prefers-reduced-motion: reduce)` : désactiver apparitions, marquee, compteurs, parallaxe et halos animés ; le contenu reste visible immédiatement.

### 5.5 Iconographie et visuels
- Icônes : jeu **libre** en SVG inline via un partial `icon.html` (ex. Lucide ou Tabler, licence à consigner), `aria-hidden="true"` si décoratives.
- Visuels « produit » : maquettes stylisées de dashboards (SVG ou images générées localement), jamais de captures de la référence.
- **Logo Excelcio : fourni par l'utilisateur.** Il est attendu dans `assets/images/logo.svg` à la racine du site (paramètre `params.logo`, avec variante claire si fournie). Au début du Lot 1, s'il est absent, le demander à l'utilisateur ; en attendant, afficher « Excelcio » en texte dans la police des titres, sans bloquer le lot. Ne jamais le récupérer sur le site actuel.
- Logos partenaires : **placeholders neutres** en SVG (rectangle + nom du partenaire en texte) tant qu'Excelcio n'a pas fourni les fichiers officiels.
- Clients : ~~placeholders anonymes~~ → **Avenant du 27/09/2026** : les cas clients du site actuel, avec les noms réels.

### 5.6 Guide de style
Page `/styleguide/` générée **uniquement en environnement `development`** (`build.render: never` en production, via `cascade` ou condition sur `hugo.Environment`), présentant : palette avec ratios de contraste, échelle typographique, espacements, tous les composants dans tous leurs états, animations.

---

## 6. Architecture de l'information

### 6.1 Navigation principale (mega-menu inspiré de la référence)

| Entrée | Contenu du panneau |
|---|---|
| **Offre** | Domaines d'expertise · Conseil en acquisition · Déploiement (avec icône et description d'une ligne chacun) + encart mis en avant |
| **Solutions** | Les 7 partenaires (Qlik, Vizlib, Tableau, Power BI, ThoughtSpot, Jedox, IBM Cognos) + lien « Toutes les solutions » |
| **Formations** | Catalogue, formations par solution, prochaines sessions + encart « +690 sessions depuis 2018 » |
| **Cas clients** | Lien direct (pas de panneau) |
| **Ressources** | Actualités · Événements · (réservé : livres blancs) |
| **Entreprise** | À propos · Recrutement · Contact |
| Bouton CTA | « Nous contacter » (style primaire) |
| Icône | Recherche (ouvre la modale, raccourci `Ctrl/⌘ + K`) |

Les menus sont définis dans `config/_default/menus.fr.toml`, avec `params` pour l'icône et la description : **aucune entrée écrite en dur dans les gabarits**.

### 6.2 Arborescence et URLs

```
/                                   Accueil
/offre/                             Vue d'ensemble de l'offre
/offre/expertise/                   Domaines d'expertise (liste)
/offre/expertise/<domaine>/         pilotage-direction, commercial, supply-chain, finance
/offre/conseil-acquisition/
/offre/deploiement/
/solutions/                         Liste des solutions partenaires
/solutions/<solution>/              qlik, vizlib, tableau, power-bi, thoughtspot, jedox, ibm-cognos
/formations/                        Catalogue (filtrable)
/formations/<formation>/            Fiche formation
/cas-clients/                       Liste (filtrable par secteur / solution)
/cas-clients/<cas>/
/actualites/                        Blog
/actualites/<article>/
/evenements/                        À venir + passés
/evenements/<evenement>/
/a-propos/
/recrutement/                       Page + liste des offres
/recrutement/<offre>/
/contact/
/newsletter/                        Page d'inscription (+ bloc réutilisable ailleurs)
/recherche/                         Page de recherche (sans JS : message + plan du site)
/plan-du-site/
/mentions-legales/
/confidentialite/
/accessibilite/                     Déclaration d'accessibilité
/404.html
```

Règles d'URL : minuscules, sans accents, mots séparés par des tirets, slash final, pas de date dans les URLs d'articles.

### 6.3 Taxonomies

| Taxonomie | URL | Usage |
|---|---|---|
| `solutions` | `/solutions/…` → **utiliser une section, pas une taxonomie** ; relier les contenus via le paramètre `solutions: [qlik, …]` et les résoudre avec `site.GetPage` | Formations, cas clients, articles, événements |
| `expertises` | paramètre `expertises: [finance, …]` | Cas clients, articles |
| ~~`secteurs`~~ | ~~taxonomie Hugo `/secteurs/<secteur>/`~~ → **Avenant du 27/09/2026** : paramètre `sector` (une valeur ou une liste), filtre de la page Cas clients ; pas de taxonomie ni de page `/secteurs/` | Cas clients |
| `tags` | taxonomie Hugo `/tags/<tag>/` | Articles |

Chaque page de solution affiche automatiquement ses formations, cas clients et articles liés.

---

## 7. Modèle de contenu

### 7.1 Types de contenu et front matter

Chaque type a un **archetype** dans `themes/excelcio/archetypes/`. Champs communs à tous les types :

```yaml
title: ""
description: ""          # 120–160 caractères, obligatoire (meta description)
summary: ""              # accroche pour les cartes
date: 2026-01-01
lastmod: 2026-01-01
draft: false
placeholder: true        # voir § 7.3
image: ""                # image principale (page bundle), alt obligatoire
imageAlt: ""
seo:
  title: ""              # facultatif, surcharge le <title>
  noindex: false
```

Champs spécifiques :

| Type | Champs spécifiques |
|---|---|
| `solution` | `partnerName`, `logo`, `partnerLevel` (ex. « Partenaire Elite »), `tagline`, `features[]` {title, text, icon}, `faq[]` {q, a} |
| `expertise` | `icon`, `benefits[]`, `kpis[]`, `faq[]` |
| `formation` | `code`, `solutions[]`, `level` (débutant/intermédiaire/avancé), `durationDays`, `format` (présentiel/distanciel/mixte), `price` (HT, facultatif), `objectives[]`, `prerequisites[]`, `audience[]`, `program[]` {title, items[]}, `sessions[]` {start, end, city, format, seats}, `registration` {type: form\|external, url} |
| `cas-client` | `client`, `logo`, `sector`, `solutions[]`, `expertises[]`, `challenge`, `solution`, `results[]` {value, label}, `quote` {text, author, role} |
| `article` | `authors[]`, `tags[]`, `solutions[]`, `readingTime` (calculé par Hugo, pas saisi) |
| `evenement` | `start`, `end`, `city`, `venue`, `online` (bool), `format`, `registration` {type, url}, `speakers[]` |
| `offre-emploi` | `location`, `contract` (CDI/CDD/stage/alternance), `remote`, `validThrough`, `missions[]`, `profile[]` |

Les pages bundles (`index.md` + images dans le même dossier) sont obligatoires pour tout contenu illustré.

### 7.2 Page d'accueil pilotée par les données
`content/fr/_index.md` décrit la page d'accueil par une liste ordonnée `sections:` (§ 8.1). Chaque élément a un `type` qui correspond à un partial du thème `layouts/_partials/sections/<type>.html`. Réordonner, masquer ou dupliquer une section ne demande **aucune modification de gabarit**. Les mêmes blocs sont réutilisables dans les pages d'offre et de solution.

### 7.3 Convention des placeholders
- Tout contenu provisoire porte `placeholder: true` dans son front matter.
- Les textes provisoires sont des **consignes de rédaction** entre crochets, jamais du *lorem ipsum* :
  `[À RÉDIGER — Accroche de 12 mots max sur le bénéfice principal pour un DAF : fiabilité et rapidité du reporting.]`
- Les longueurs des placeholders doivent être réalistes (mêmes ordres de grandeur que le texte final), pour valider la mise en page.
- Chiffres provisoires : format `[XX] %` ou `[+XXX]`, jamais de valeur plausible inventée.
- En environnement `development`, un badge discret « Placeholder » s'affiche sur les pages et blocs concernés. Il n'apparaît jamais en production.
- Un build `hugo --environment production` émet un **avertissement** (`warnf`) listant chaque page encore en placeholder.
- `docs/CONTENU.md` explique aux rédacteurs comment remplacer chaque placeholder, champ par champ.

### 7.4 Faits réels réutilisables tels quels
Nom Excelcio ; bureaux Paris, Rennes, Nantes ; `contact@excelcio.com`, `rh@excelcio.com` ; les 7 partenaires listés au § 1 ; les 4 domaines d'expertise (pilotage du top management, commercial, supply chain, financier) ; « 690+ sessions de formation depuis 2018 » ; réseaux LinkedIn, X/Twitter, YouTube (URLs à récupérer sur le site actuel) ; événement « AI Reality Tour ». Tout le reste est placeholder.

### 7.5 Volume de contenu fictif à créer
7 solutions · 4 domaines d'expertise · 3 pages d'offre · 8 formations (réparties sur au moins 4 solutions, avec des sessions passées et futures) · 4 cas clients · 6 articles · 3 événements (2 à venir, 1 passé) · 2 offres d'emploi · toutes les pages institutionnelles.

---

## 8. Gabarits de pages

### 8.1 Accueil — ordre calqué sur la référence

| # | Section (`type`) | Équivalent la référence | Contenu Excelcio |
|---|---|---|---|
| 1 | `hero` | Hero + 2 CTA | Badge d'annonce cliquable (ex. événement), H1 avec mot-clé en dégradé, sous-titre, CTA primaire « Nous contacter », CTA secondaire « Découvrir nos formations », visuel de dashboard stylisé avec halo, fond en grille estompée |
| 2 | `logos` | Bandeau de logos clients | Marquee infini de logos clients (placeholders), pause au survol et au focus |
| 3 | `architecture` | « How it fits together » | Schéma animé : sources de données → plateforme BI partenaire → usages métiers (direction, commercial, supply chain, finance). SVG inline accessible (titre + description) |
| 4 | `features` | « What sets it apart » (6 points) | 6 cartes en grille bento : ce qui distingue Excelcio |
| 5 | `expertises` | Use cases | 4 cartes vers les domaines d'expertise, halo au survol qui suit le pointeur |
| 6 | `case-studies` | Customer stories | 4 cas clients : logo, secteur, résultat chiffré en avant |
| 7 | `faq` | FAQ | 6 à 8 questions en accordéon, avec JSON-LD `FAQPage` |
| 8 | `platform` | « The platform » (5 surfaces) | Les 7 solutions partenaires en onglets ou en cartes, avec lien vers chaque page |
| 9 | `trainings` | *(spécifique Excelcio)* | Prochaines sessions de formation (3 à venir, triées par date) + lien vers le catalogue |
| 10 | `stats` | Chiffres | Compteurs animés : 690+ sessions de formation, puis `[XX]` placeholders |
| 11 | `testimonial` | Citation | Grande citation (placeholder), avec avatar, nom et fonction |
| 12 | `cta` | CTA final | Titre, texte, 2 boutons, halo bordeaux, fond en dégradé |

L'ordre et la disposition de chaque section suivent le relevé du Lot 0. Si la page d'accueil de la référence a changé à la date de l'analyse, **suivre l'analyse** et signaler l'écart.

### 8.2 Autres gabarits

| Gabarit | Composition |
|---|---|
| Page d'offre / expertise | Hero interne, sections modulaires (même système `sections:` que l'accueil), cas clients liés, FAQ, CTA |
| Page solution | Hero avec logo partenaire et badge de niveau, fonctionnalités en bento, « Ce qu'Excelcio apporte », formations liées, cas clients liés, FAQ, CTA |
| Liste formations | Filtres côté client (solution, niveau, format) avec URL synchronisée (`?solution=qlik`) ; sans JS : liste complète groupée par solution |
| Fiche formation | En-tête (code, durée, niveau, format, prix), objectifs, public, prérequis, programme en accordéon, sessions à venir, bloc d'inscription collant en desktop, formations associées |
| Liste / fiche cas client | Cartes filtrables ; fiche : contexte → enjeu → solution → résultats chiffrés → citation → cas liés |
| Liste / fiche article | Article à la une + grille, pagination ; fiche : table des matières collante, temps de lecture, auteur, articles liés, bloc newsletter |
| Liste / fiche événement | À venir d'abord, puis passés ; fiche : date, lieu ou « En ligne », programme, intervenants, inscription |
| Recrutement | Page de marque employeur + liste d'offres ; fiche offre + candidature par e-mail `rh@` (lien `mailto:` prérempli) |
| Contact | Formulaire, les 3 bureaux (adresses en placeholders), e-mails |
| Pages légales | Gabarit texte long, typographie de lecture |
| 404 | Message, recherche, liens principaux, dans le style du site |

Tous les gabarits comportent un fil d'Ariane (sauf l'accueil) et exactement **un `<h1>`**.

### 8.3 Shortcodes pour les rédacteurs
`callout` (info/attention), `figure` (image traitée par Hugo), `video` (façade YouTube, § 11.4), `cta`, `stats`, `button`, `columns`. Tous documentés avec exemples dans `docs/CONTENU.md`.

---

## 9. Composants et interactions

| Composant | Exigences |
|---|---|
| Header | Collant, transparent en haut de page puis fond flouté (`backdrop-filter`) avec bordure basse après défilement ; hauteur relevée sur la référence |
| Mega-menu | Motif *disclosure* (bouton `aria-expanded` + panneau) ; ouverture au clic **et** au survol (délai d'intention ≈ 150 ms) en desktop ; `Échap` ferme et rend le focus au bouton ; fermeture au clic extérieur ; navigation au clavier complète ; animation d'ouverture relevée au Lot 0 |
| Menu mobile | Panneau plein écran, sections en accordéon, focus piégé, défilement de la page bloqué, `Échap` ferme |
| Boutons | Primaire (fond `--c-brand`, halo au survol), secondaire (contour), tertiaire (lien + flèche animée) ; tailles S/M/L ; états hover/focus-visible/active/disabled |
| Cartes | Bordure fine, **halo radial qui suit le pointeur** (variable CSS mise à jour en JS, inactif sur écran tactile et en mouvement réduit), variante avec bordure en dégradé |
| Fonds décoratifs | Grille ou points en CSS (pas d'image), estompés par `mask-image` ; halos en `radial-gradient` flouté ; décoratifs uniquement (`aria-hidden`) |
| Apparition au défilement | `IntersectionObserver` ajoute une classe ; contenu visible par défaut sans JS (la classe masquante n'est posée que si JS est actif) |
| Marquee | CSS pur (`@keyframes` sur `transform`), liste dupliquée avec `aria-hidden` sur la copie, pause au survol et au focus, arrêt en mouvement réduit |
| Compteurs | Animation déclenchée à l'apparition ; valeur finale dans le HTML (lisible sans JS et par les robots) |
| Onglets | Motif ARIA *tabs* (flèches, Home/End) ; sans JS : tous les panneaux affichés à la suite |
| Accordéon / FAQ | `<details>`/`<summary>` natifs, animation de hauteur en amélioration progressive |
| Modale de recherche | `<dialog>` natif, `Ctrl/⌘ + K`, résultats Pagefind, navigation clavier dans les résultats |
| Titres en dégradé | `background-clip: text` avec couleur de repli pleine |

**Budget JavaScript total** (hors Pagefind, chargé à la demande) : **≤ 15 Ko gzip**. Un module par fonctionnalité, chargé seulement si le composant est présent sur la page (`type="module"`, `defer`).

---

## 10. Fonctions dynamiques (sans serveur)

### 10.1 Couche d'abstraction des formulaires
Configuration dans `config/_default/params.toml` :

```toml
[forms]
  mode = "mock"            # "mock" | "live"
  [forms.contact]
    endpoint = ""          # URL du fournisseur (Formspree, Brevo, HubSpot, fonction serverless…)
    method   = "POST"
    encoding = "json"      # "json" | "form"
  [forms.registration]
    endpoint = ""
  [forms.newsletter]
    endpoint = ""
    doubleOptIn = true     # géré par le fournisseur
```

- **Mode `mock`** (défaut en local) : pas d'envoi réseau ; la charge utile est affichée dans la console et le parcours complet est simulé (chargement → succès, et un moyen de simuler une erreur, ex. un e-mail contenant `+error`).
- **Mode `live`** : `fetch` vers l'endpoint ; sans JS, `action` et `method` natifs du `<form>`, avec page de confirmation `/merci/`.
- Un seul module `forms.js` pour tous les formulaires.
- Validation : attributs HTML natifs + messages en français, affichés sous les champs et annoncés via `aria-live`.
- Anti-spam : champ *honeypot* + délai minimal de soumission. Emplacement prévu pour un captcha respectueux de la vie privée (Turnstile, Friendly Captcha), **désactivé par défaut**.
- Mention RGPD sous chaque formulaire (finalité, lien vers `/confidentialite/`).

### 10.2 Formulaires
| Formulaire | Champs |
|---|---|
| Contact | Nom*, prénom*, e-mail professionnel*, société*, téléphone, sujet* (liste : conseil, déploiement, formation, partenariat, autre), message*, consentement* |
| Inscription formation / événement | Prérempli avec l'intitulé et la session choisie ; nom*, prénom*, e-mail*, société*, fonction, nombre de participants, message ; si `registration.type = external` → bouton vers l'URL externe (`rel="noopener"`) |
| Newsletter | E-mail*, consentement explicite* ; bloc réutilisable (fin d'article, footer, page dédiée) |

### 10.3 Recherche interne
- **Pagefind**, indexation après le build : `npx pagefind --site public` (ou binaire autonome ; documenter les deux options sous PowerShell).
- Indexer : solutions, expertises, formations, cas clients, articles, événements, offres d'emploi. Exclure : pages légales, 404, styleguide (`data-pagefind-ignore`).
- Filtres par type de contenu (`data-pagefind-filter="type"`) ; métadonnées affichées (type, date).
- Interface personnalisée aux couleurs du site (pas l'UI par défaut non stylée) dans la modale **et** sur `/recherche/`.
- En `hugo server`, documenter comment tester la recherche (build + indexation + serveur statique).

---

## 11. Stack et contraintes techniques

### 11.1 Outils
- Hugo : **version installée sur le poste**, relevée avec `hugo version` au Lot 0, reportée comme minimum dans `[module.hugoVersion] min` de `themes/excelcio/hugo.toml` et indiquée dans le README.
- Édition standard ou extended indifférente : le projet n'utilise pas Sass.
- CSS : fichiers natifs dans `themes/excelcio/assets/css/`, point d'entrée unique `main.css` qui importe les autres (`@import`), assemblés par **`css.Build`** avec `minify` et `sourceMap` selon l'environnement, `target` explicite correspondant aux navigateurs supportés (Chrome, Edge, Firefox, Safari et Safari iOS des 24 derniers mois), la même cible pour `js.Build`. Toute fonction CSS ou JS plus récente que cette fenêtre doit avoir un repli, puis `fingerprint` avec SRI en production. Couches `@layer reset, tokens, base, layout, components, utilities`. Couleurs de marque injectées via `@import "hugo:vars"` et l'option `vars` à partir de `site.Params.style` (§ 5.1). Pas de `resources.Concat` pour le CSS, pas de Sass, pas de PostCSS.
- JS : modules natifs dans `themes/excelcio/assets/js/`, groupés par `js.Build` (esbuild intégré à Hugo), minifiés et avec empreinte ; paramètres transmis au JS via l'option `params` de `js.Build` (import `@params`), jamais par des chaînes injectées dans le code.
- Node.js ≥ 22 **uniquement** pour les outils ponctuels (Pagefind, contrôles de recette via `npx`) : **aucun `package.json` requis pour construire le site**.

### 11.2 Configuration
- Site : `config/_default/` avec `hugo.toml`, `params.toml`, `menus.fr.toml`, `languages.toml`, `markup.toml`.
- `config/development/` et `config/production/` pour les différences (brouillons, styleguide, analytics, `forms.mode`).
- Thème importé comme **module local** : `[[module.imports]] path = "excelcio"` (dossier dans `themes/`).
- Multilingue par dossier dès le départ : `defaultContentLanguage = "fr"`, `defaultContentLanguageInSubdir = false`, et pour le français `contentDir = "content/fr"`, `label = "Français"`, `locale = "fr-FR"`, `direction = "ltr"`, `weight = 1`. Ajouter l'anglais revient à créer `content/en/`, le bloc `[en]` de `languages.toml` et `menus.en.toml`.
- Toutes les chaînes d'interface dans `themes/excelcio/i18n/fr.toml` (**aucun texte d'interface en dur dans les gabarits**) ; `i18n/en.toml` créé avec les mêmes clés.
- Le thème fournit ses valeurs par défaut dans `themes/excelcio/hugo.toml` ; le site ne déclare que ce qu'il change (§ 16.3).

### 11.3 Images
- Traitement par Hugo (`.Resize`/`.Process`) : AVIF + WebP + repli, `srcset` et `sizes`, `width`/`height` explicites.
- `loading="lazy"` et `decoding="async"` partout **sauf** l'image LCP (`fetchpriority="high"`).
- Partial unique `image.html` ; build en échec (`errorf`) si `alt` manque sur une image non décorative.

### 11.4 Tiers et vie privée
- Aucune requête vers un tiers au chargement de la page.
- Vidéos YouTube : façade (miniature locale + bouton), chargement de `youtube-nocookie.com` au clic uniquement.
- Cartes des bureaux : image statique + lien vers OpenStreetMap, pas d'iframe.
- Analytics : emplacement configurable pour une solution **sans cookie** (Plausible, Matomo sans cookie, Umami…), désactivé en développement, **aucune bannière de cookies nécessaire**. Si un outil déposant des cookies est ajouté plus tard, une bannière conforme CNIL deviendra obligatoire (à consigner dans `docs/DECISIONS.md`).

---

## 12. Performance

| Indicateur | Cible (Lighthouse mobile, build de production servi localement) |
|---|---|
| Performance / Accessibilité / Bonnes pratiques / SEO | **≥ 95** chacun, sur accueil, page solution, fiche formation, article, contact |
| LCP | < 1,8 s |
| CLS | < 0,05 |
| TBT | < 100 ms |
| CSS total | ≤ 40 Ko gzip |
| JS total (hors Pagefind) | ≤ 15 Ko gzip |
| Poids de la page d'accueil | ≤ 500 Ko transférés (hors images différées) |
| Polices | ≤ 4 fichiers woff2, ≤ 120 Ko au total |

Également : HTML minifié ; CSS critique inline seulement si la mesure le justifie ; halos et flous limités en taille et en nombre pour ne pas dégrader le rendu sur mobile (tester avec le ralentissement CPU ×4).

---

## 13. SEO

- `<title>` unique (`Titre de page · Excelcio`) et `meta description` sur chaque page ; build en avertissement si `description` manque.
- URL canonique, `robots` (respect de `seo.noindex`), balises Open Graph et Twitter Card.
- **Images Open Graph générées par Hugo** (`images.Text` sur un fond de marque) quand aucune image n'est fournie.
- `sitemap.xml` (hors pages `noindex`, placeholders inclus en dev uniquement), `robots.txt` généré depuis un gabarit.
- Balises `hreflang` prêtes (FR + `x-default`), activées automatiquement à l'ajout de l'anglais.
- Hiérarchie de titres stricte, fil d'Ariane visible + `BreadcrumbList`.
- **Données structurées JSON-LD** (partial `schema/*.html`, un graphe `@graph` par page) :
  - Toutes les pages : `Organization` (logo, `sameAs` réseaux, `contactPoint`), `WebSite` + `SearchAction` (vers `/recherche/?q=`), `BreadcrumbList`
  - Contact / À propos : 3 × `LocalBusiness` / `ProfessionalService` (Paris, Rennes, Nantes)
  - Formation : `Course` + `CourseInstance` par session
  - Événement : `Event` (en ligne ou en présentiel)
  - Article : `Article` / `BlogPosting`
  - Offre d'emploi : `JobPosting`
  - Offre / solution : `Service`
  - FAQ : `FAQPage`
- Redirections depuis les anciennes URLs WordPress : fichier `data/redirects.yaml` (ancien → nouveau, pré-rempli avec les URLs du menu actuel d'excelcio.com), à partir duquel Hugo génère un `_redirects` (format Netlify/Cloudflare) **et** un `redirects.htaccess` d'exemple, en attendant le choix de l'hébergeur.

---

## 14. Lisibilité par les agents IA

- **`/llms.txt`** généré par Hugo (format de sortie personnalisé sur l'accueil) : présentation d'Excelcio en 3 lignes, puis sections « Offre », « Solutions », « Formations », « Cas clients », « Ressources » avec liens et résumés d'une ligne.
- **`/llms-full.txt`** : contenu textuel intégral des pages principales concaténé (hors placeholders en production).
- **Sortie Markdown par page** : format de sortie `markdown` (`index.md` à côté de `index.html`), déclaré par `<link rel="alternate" type="text/markdown" href="…/index.md">`. Contenu : titre, description, métadonnées clés en liste, corps.
- HTML sémantique : `header`, `nav`, `main`, `article`, `section` avec titre, `aside`, `footer`, listes de définition pour les caractéristiques (durée, niveau…), `<time datetime>`.
- Aucun contenu essentiel rendu uniquement en JS ; compteurs, onglets et filtres exposent tout le contenu dans le HTML.
- `robots.txt` : politique pour les robots IA (GPTBot, ClaudeBot, PerplexityBot, Google-Extended…) pilotée par `params.aiCrawlers.allow = true|false` (défaut : autorisé).
- Page `/a-propos/` structurée en faits vérifiables (création, implantations, partenariats, domaines) faciles à citer.

---

## 15. Accessibilité (WCAG 2.2 AA)

- Lien d'évitement « Aller au contenu » ; ordre de tabulation logique ; `:focus-visible` très visible (`--c-focus`, 2 px + décalage).
- Contrastes validés (§ 5.1) ; information jamais portée par la seule couleur.
- Cibles tactiles ≥ 24 × 24 px (44 px recommandé en mobile).
- Menus, onglets, accordéons, modale : motifs ARIA conformes (§ 9), testés au clavier.
- Formulaires : `label` explicites, erreurs associées (`aria-describedby`), récapitulatif d'erreurs, `autocomplete` renseigné.
- `prefers-reduced-motion` respecté (§ 5.4) ; aucun contenu qui clignote plus de 3 fois par seconde ; marquee pausable.
- `lang="fr"` ; changements de langue balisés (`lang="en"` sur les termes anglais longs).
- Déclaration d'accessibilité `/accessibilite/` (gabarit + placeholders du RGAA).

---

## 16. Organisation du projet et du thème (bonnes pratiques Hugo)

### 16.1 Principes
- Suivre les bonnes pratiques de la **version de Hugo installée**, d'après la **documentation officielle** (gohugo.io), pour la structure du projet comme pour celle du thème. En cas de doute, consulter la documentation et non la mémoire ni des tutoriels en ligne.
- Au Lot 0, vérifier les pratiques du § 16.4 dans la documentation et les compléter si besoin.
- Système de gabarits : `layouts/baseof.html`, `home.html`, `page.html`, `section.html`, `taxonomy.html`, `term.html`, et les dossiers `_partials/`, `_shortcodes/`, `_markup/`. Les dossiers sans `_` correspondent à des chemins de pages (ex. `layouts/formations/page.html`).
- Le build doit passer **sans aucun avertissement de dépréciation**, y compris avec `hugo --logLevel info`.
- **Séparer le thème du site** : `themes/excelcio/` contient la **présentation** (gabarits, CSS, JS, polices, icônes, i18n d'interface, archetypes). La racine contient **ce qui est propre à Excelcio** (contenu, configuration, données, images de contenu). Le thème ne contient **aucun contenu** et **aucune donnée propre à Excelcio** écrite en dur (nom, e-mails, adresses, réseaux sociaux, partenaires) : tout passe par `site.Params`, `hugo.Data` ou le front matter.
- **Surcharge plutôt que modification** : pour adapter un gabarit ou un fichier du thème au site, créer le fichier de même chemin à la racine (système de fichiers unifié de Hugo) plutôt que de modifier le thème, et consigner chaque surcharge dans `docs/DECISIONS.md`. L'objectif est **zéro surcharge** à la livraison.

### 16.2 Arborescence

```
hugo_2/                              # C:\Users\vtexier.EXCELCIO\Desktop\excelcio_com\hugo_2
├── CLAUDE.md                        # consignes de travail pour Claude Code
├── README.md                        # installation, commandes PowerShell, arborescence
├── config/
│   ├── _default/ (hugo.toml, params.toml, menus.fr.toml, languages.toml, markup.toml)
│   ├── development/
│   └── production/
├── content/
│   └── fr/                          # content/en/ ajouté plus tard
├── data/                            # propre au site : redirects.yaml, offices.yaml, partners.yaml, social.yaml
├── assets/                          # propre au site : images de contenu partagées, logos ; surcharges éventuelles
├── static/                          # favicon et fichiers servis tels quels uniquement
├── scripts/                         # contrôles de recette (contraste, budgets, liens)
├── docs/ (SPEC.md, DECISIONS.md, CONTENU.md, RECETTE.md, relevé de la référence, reference/)
└── themes/
    └── excelcio/
        ├── hugo.toml                # config du thème : valeurs par défaut des params, formats de sortie, types de médias, module.hugoVersion
        ├── README.md                # installation, params disponibles, composants, sections, shortcodes, surcharges possibles
        ├── LICENSE
        ├── archetypes/              # default.md + un archetype par type de contenu
        ├── assets/
        │   ├── css/  (reset.css, tokens.css, base.css, layout.css, components/*.css, utilities.css, main.css)
        │   ├── js/   (main.js, menu.js, search.js, forms.js, reveal.js, pointer-glow.js, tabs.js, counters.js, filters.js)
        │   ├── fonts/
        │   └── icons/
        ├── i18n/ (fr.toml, en.toml)
        └── layouts/
            ├── baseof.html
            ├── home.html
            ├── page.html  section.html  taxonomy.html  term.html  404.html
            ├── home.llms.txt  home.llmsfull.txt  page.markdown.md  section.markdown.md
            ├── robots.txt  sitemap.xml (si personnalisé)  _redirects
            ├── formations/ (page.html, section.html)     # un dossier par type qui s'écarte du gabarit par défaut
            ├── cas-clients/  actualites/  evenements/  solutions/  recrutement/ …
            ├── _partials/
            │   ├── head/ (meta.html, seo.html, css.html, js.html, fonts.html)
            │   ├── header/  footer/
            │   ├── sections/                             # blocs de page d'accueil et de pages modulaires (§ 7.2)
            │   ├── components/                           # boutons, cartes, badges, onglets, accordéons, formulaires
            │   ├── schema/                               # JSON-LD
            │   ├── hooks/ (head-end.html, body-end.html) # points d'extension vides, à surcharger par le site
            │   ├── image.html  icon.html
            ├── _shortcodes/
            └── _markup/ (render-image.html, render-link.html, render-heading.html, render-codeblock.html)
```

`.gitignore` : `public/`, `resources/_gen/`, `.hugo_build.lock`, `node_modules/`, `docs/reference/*.png` (captures locales, à ne pas versionner).

### 16.3 Bonnes pratiques du thème
- **Configurable** : chaque réglage (logo, couleurs de marque, menus, liens sociaux, CTA d'en-tête, formulaires, analytics, robots IA) est un paramètre documenté, avec valeur par défaut dans `themes/excelcio/hugo.toml`. Les couleurs de marque du § 5.1 sont des `params.style` injectés par `hugo:vars` ; le site peut les redéfinir sans toucher au thème.
- **Robuste** : le thème fonctionne avec un site vide (un `content/` minimal, sans `data/` ni menus) sans erreur. Un paramètre absent donne un comportement par défaut sensé, jamais une erreur de gabarit. Tester ce cas au Lot 1 et au Lot 6.
- **Gabarits** : `baseof.html` unique avec des `block` nommés (`main`, `head`, `scripts`) ; gabarits spécifiques seulement quand un type s'écarte vraiment du gabarit par défaut ; logique commune factorisée en partials. Partials purs (qui renvoient une valeur via `return`) pour les calculs réutilisés (URL d'image, données JSON-LD, sessions à venir).
- **Performance du build** : `partialCached` pour les partials identiques d'une page à l'autre (header, footer, mega-menu), avec les bonnes clés de variation (langue, section active). Vérifier avec `hugo --templateMetrics --templateMetricsHints`.
- **Rendu du Markdown** : les *render hooks* (`_markup/`) gèrent les images (traitement, `alt`, dimensions), les liens (externes avec `rel="noopener"`, liens internes vérifiés via `site.GetPage`) et les ancres de titres. Pas de HTML brut dans le contenu (`markup.goldmark.renderer.unsafe = false`).
- **Assets** : tout passe par Hugo Pipes (`resources.Get`, `fingerprint`, SRI), aucun fichier CSS/JS dans `static/`.
- **Internationalisation** : `T` / `i18n` pour toutes les chaînes, `.Language`, `.Translations` et `relLangURL` pour les liens, formats de date via `time.Format` avec la langue courante.
- **Points d'extension** : partials vides `hooks/head-end.html` et `hooks/body-end.html` pour ajouter du code (analytics, vérifications) depuis le site sans modifier le thème.
- **Documentation** : le `README.md` du thème liste tous les paramètres, les sections disponibles pour `sections:`, les shortcodes, les archetypes et les partials surchargeables.

### 16.4 Pratiques Hugo à appliquer

| Domaine | Pratique |
|---|---|
| Gabarits | `baseof.html`, `home.html`, `page.html`, `section.html`, `taxonomy.html`, `term.html` à la racine de `layouts/` ; `_partials/`, `_shortcodes/`, `_markup/` |
| Variantes de gabarits | Schéma de nommage des identifiants (langue, format de sortie, type, layout) tel que décrit par la documentation, appliqué de façon cohérente |
| Partials intégrés | Appelés par `partial "…"` |
| Logique de gabarit | `return` pour les partials qui calculent une valeur ; `.Render` avec arguments de contexte pour passer des données aux vues de contenu |
| CSS | `css.Build` avec `hugo:vars` et `importContext` |
| Mounts | Options `files` pour filtrer, `sites` pour cibler les langues |
| Version | `module.hugoVersion.min` |
| Données | `hugo.Data` |
| Sites et langues | `hugo.Sites`, `.Translations`, `.Language` |
| Données distantes (si besoin) | `resources.GetRemote`, dans le cadre de la politique `security.http` |
| Configuration des langues | Clés `label`, `locale`, `direction`, `weight`, `contentDir` |
| Arborescence des pages | `.IsBranch` pour distinguer les pages de liste |
| Images | Qualité réglée par format (AVIF, WebP) dans `[imaging]` |
| Sécurité | Réglages `security` par défaut conservés (contenu HTML refusé, redirections validées, liens symboliques rejetés) ; contenu exclusivement en Markdown |

Toute pratique complémentaire relevée dans la documentation au Lot 0 est ajoutée à ce tableau et consignée dans `docs/DECISIONS.md`.

---

## 17. Lots, livrables et critères d'acceptation

Chaque lot se termine par la vérification de **tous** ses critères, un compte rendu, puis **un arrêt pour validation**.

**Première version (V1) = Lots 0, 1 et 2.** Les lots 3 à 6 sont spécifiés pour cadrer l'architecture dès le départ (le thème doit déjà les rendre possibles), mais ne sont réalisés qu'après validation de la V1.

### Lot 0 — Étude de la référence
- **Livrables** : `relevé de la référence (Lot 0)` (§ 4), captures dans `docs/reference/`, proposition de polices.
- **Acceptation** : relevés chiffrés (pas d'estimation « à l'œil ») ; inventaire de l'accueil + 3 pages intérieures ; tableau de transposition ; licence des polices vérifiée ; choix de polices validé par l'utilisateur.

### Lot 1 — Socle et design system
- **Livrables** : arborescence complète du § 16 (site + `themes/excelcio/`), configuration Hugo, tokens, polices, `baseof`, header + mega-menu + menu mobile, footer, pipeline CSS/JS, page `/styleguide/`, contrôle des contrastes, README du site et du thème.
- **Acceptation** : arborescence et gabarits conformes au § 16 ; aucune donnée Excelcio en dur dans le thème ; le thème construit un site minimal vide sans erreur ; `hugo server` démarre sans erreur ni avertissement (dépréciations comprises) ; `hugo --environment production --minify` réussit ; styleguide complet ; mega-menu et menu mobile utilisables au clavier ; tous les contrastes ≥ AA ; aucune couleur en dur hors tokens ; comparaison visuelle header/footer vs la référence validée par l'utilisateur.

### Lot 2 — Page d'accueil
- **Livrables** : les 12 sections du § 8.1 en partials du thème, pilotées par `content/fr/_index.md`, avec toutes les animations.
- **Acceptation** : rendu fidèle à la référence à 1440 px, 1024 px, 768 px et 390 px (captures côte à côte fournies) ; réordonner deux sections dans le front matter fonctionne sans toucher aux gabarits ; page lisible sans JS ; mouvement réduit respecté ; Lighthouse mobile ≥ 95 sur les 4 catégories.

### Lot 3 — Gabarits des rubriques et contenu placeholder
- **Livrables** : tous les gabarits du § 8.2, archetypes, contenu fictif du § 7.5, relations solution ↔ formations/cas/articles, filtres, pagination, shortcodes, `docs/CONTENU.md`.
- **Acceptation** : chaque URL du § 6.2 répond ; aucun lien interne cassé ; aucun *lorem ipsum* ; badge placeholder visible en dev et absent en production ; `hugo new content` produit un fichier conforme pour chaque type.

### Lot 4 — Fonctions dynamiques
- **Livrables** : `forms.js` + 3 formulaires, mode `mock`/`live`, page `/merci/`, Pagefind (modale + page), filtres synchronisés à l'URL.
- **Acceptation** : parcours succès et erreur simulés pour chaque formulaire ; formulaires utilisables et validés au clavier et au lecteur d'écran ; recherche fonctionnelle après `hugo` + `pagefind` avec filtres par type ; `Ctrl/⌘ + K` ouvre la recherche ; aucune requête réseau tierce en mode `mock`.

### Lot 5 — SEO et agents IA
- **Livrables** : meta, Open Graph, images OG générées, sitemap, robots, JSON-LD complet, `llms.txt`, `llms-full.txt`, sorties Markdown, redirections.
- **Acceptation** : JSON-LD de chaque type de page valide (validator.schema.org, test des résultats enrichis Google) — fournir un exemple par type dans le compte rendu ; `llms.txt` conforme au format de llmstxt.org ; chaque page a son `index.md` accessible ; `_redirects` généré depuis `data/redirects.yaml`.

### Lot 6 — Recette et remise
- **Livrables** : rapport `docs/RECETTE.md` (Lighthouse par page type, axe/pa11y, liens, validation HTML, poids CSS/JS/polices, tests clavier, 3 navigateurs : Chrome, Firefox, Edge + Safari iOS si possible), corrections, README finalisé, liste des éléments à fournir par Excelcio.
- **Acceptation** : toutes les cibles des § 12, 13, 14 et 15 atteintes, ou écart justifié et accepté par l'utilisateur ; zéro erreur axe ; zéro lien cassé ; HTML valide (vnu) ; bonnes pratiques du § 16.3 vérifiées une à une (dont `--templateMetrics`, zéro surcharge de thème à la racine) ; README du thème complet ; checklist du § 18 cochée.

---

## 18. Définition de « terminé » (toutes pages)

- [ ] Un seul `<h1>`, hiérarchie de titres continue
- [ ] `title` et `description` présents et uniques
- [ ] Rendu correct de 320 px à 1920 px, aucun défilement horizontal
- [ ] Lisible et navigable sans JavaScript
- [ ] Navigable entièrement au clavier, focus toujours visible
- [ ] Mouvement réduit respecté
- [ ] Toutes les images avec `alt` pertinent (ou vide si décoratives) et dimensions explicites
- [ ] JSON-LD valide
- [ ] Sortie Markdown générée
- [ ] Aucun texte d'interface en dur (tout dans `i18n/`)
- [ ] Aucune donnée propre à Excelcio en dur dans le thème
- [ ] Aucun avertissement de dépréciation Hugo
- [ ] Aucune requête tierce au chargement
- [ ] Aucun avertissement Hugo hors placeholders

---

## 19. Éléments à fournir par Excelcio (bloquants pour la mise en production, pas pour le développement)

1. Logo Excelcio en SVG (versions claire et monochrome) et favicon — **attendu dès le Lot 1** (§ 5.5)
2. Logos officiels des partenaires (avec leurs règles d'usage) et des clients autorisés
3. Photos (équipe, bureaux, événements) avec droits d'utilisation
4. Contenu rédigé (voir `docs/CONTENU.md`)
5. Adresses exactes des bureaux, mentions légales (raison sociale, SIREN, directeur de publication, hébergeur)
6. Liste complète des URLs WordPress à rediriger (export du sitemap actuel)
7. Choix des fournisseurs : formulaires, emailing/newsletter, analytics sans cookie, hébergement
8. Témoignages et chiffres clients validés par les clients concernés

---

## 20. Démarrage

Commence par le **Lot 0**. Avant d'ouvrir le navigateur :
1. crée le dépôt Git local dans `C:\Users\vtexier.EXCELCIO\Desktop\excelcio_com\hugo_2` (`git init`, sans dépôt distant ; si le dossier existe et n'est pas vide, montrer son contenu à l'utilisateur avant toute écriture) avec `docs/`, puis copie `CLAUDE.md` à sa racine et `SPEC.md` dans `docs/` : les livrables du Lot 0 y sont écrits, le reste de l'arborescence est créé au Lot 1 ;
2. relève la version de Hugo installée (`hugo version`) : elle sert de référence pour tout le projet ;
3. confirme la présence de Node.js (utile seulement pour Pagefind et les outils de recette) ;
4. confirme que `SPEC.md` et `CLAUDE.md` ont bien été lus en entier.
