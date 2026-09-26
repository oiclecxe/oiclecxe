# Journal des décisions

Format : date — décision — raison. Les décisions en attente sont marquées ⏳.

## Lot 0 — Étude de la référence

- **2026-09-26 — Version de Hugo de référence : 0.166.0 extended** (`hugo version` sur le poste).
  Raison : SPEC § 11.1, la version installée sert de référence et de minimum (`module.hugoVersion.min = "0.166.0"`).

- **2026-09-26 — Node.js installé : v16.14.2.**
  Raison : c'est un constat. SPEC § 11.1 demande Node ≥ 22 pour les outils ponctuels (Pagefind, recette). Ce n'est pas bloquant pour les lots 0 à 2, où aucun outil Node n'est requis pour construire le site. À mettre à jour avant le Lot 4 (Pagefind), ou plus tôt si l'on veut lancer Lighthouse en ligne de commande au Lot 2.

- **2026-09-26 — Nommage des variantes de gabarits : schéma classique à points** (`home.llms.txt`, `page.markdown.md`, `home.fr.html` si besoin).
  Raison : SPEC § 16.4 demandait de vérifier le schéma à préfixes (`_language_`, `_outputformat_`…). Les notes de version indiquent que ce schéma **complète** l'ancien, qui n'est pas déprécié. Le schéma classique est plus lisible ; le schéma à préfixes ne servira qu'en cas d'ambiguïté.

- **2026-09-26 — Pages de référence étudiées : `/cloud`, `/use-cases/knowledge-graphs`, `/blog`.**
  Raison : elles sont équivalentes, respectivement, aux pages Solutions, Offre et Actualités (voir `relevé de la référence` § 6).

- **2026-09-26 — Polices : Geist + JetBrains Mono** (celles de la référence, sous licence SIL OFL 1.1), auto-hébergées depuis les paquets Fontsource. Validé par l'utilisateur, téléchargement autorisé.

- **2026-09-26 — Ambiance des sections : option A, « coller à la référence ».** Validé par l'utilisateur ; remplace le « sombre uniquement » du CDC (§ 2, § 5.1).
  - Accueil : hero et CTA en aplat bordeaux ; sections claires (architecture, ce qui distingue, expertises, manifeste) ; sections sombres (cas clients, FAQ, solutions, preuves) ; footer sombre.
  - Pages intérieures sombres, CTA final bordeaux ; listes de contenus (actualités) en clair, comme le blog de la référence.
  - Conséquence : le thème gère 5 ambiances de section (`brand`, `light`, `light-alt`, `dark`, `dark-alt`), chacune redéfinissant ses propres couleurs locales. `color-scheme` passe de `dark` à `light dark` selon la section.

- **2026-09-26 — Pas de halos, dégradés, grilles de fond ni halo au pointeur.** Validé par l'utilisateur ; remplace le CDC § 5.1 (`--g-brand`, `--g-text`, `--c-brand-glow`) et § 9 (halo des cartes, bordures en dégradé, fonds décoratifs). Remplacés par des aplats, des cartes à angles droits, le champ de carrés animé, l'apparition des titres mot par mot et la citation surlignée (voir `relevé de la référence` § 5 et § 7.1).

- **2026-09-26 — Logo : variante blanche dérivée** (`assets/images/logo-light.svg`) pour les fonds bordeaux et sombres. Symbole et « Excelcio » en blanc, signature en blanc à 70 %. Validé par l'utilisateur. L'original reste utilisé sur les fonds clairs.

## Lot 1 — Socle et design system

- **2026-09-26 — Thème importé en module local** `[[module.imports]] path = "excelcio"`, avec `module.hugoVersion.min = "0.166.0"`.
  Raison : SPEC § 11.2 et § 16.

- **2026-09-26 — Palette dérivée** (valeurs par défaut dans `themes/excelcio/hugo.toml`, `[params.style]`). Les contrastes sont vérifiés en direct sur `/styleguide/` :

  | Texte / fond | Ratio | Usage |
  |---|---|---|
  | blanc / `brand #A82234` | 7,13:1 | Texte sur aplat bordeaux, bouton sur fond clair |
  | blanc 82 % / `brand` | 5,2:1 (calculé) | Texte courant sur bordeaux |
  | blanc 64 % / `brand` | 3,7:1 (calculé) | Seconde phrase des grands titres seulement |
  | `text-on-light #1A171B` / blanc | 17,76:1 | Titres sur clair |
  | `body-on-light #5C5358` / blanc et `#FAF7F6` | 7,41 et 6,95:1 | Texte courant sur clair |
  | `muted-on-light #8A7F84` / blanc et `#FAF7F6` | 3,85 et 3,61:1 | Grand texte seulement |
  | `accent #D42A40` / blanc et `#FAF7F6` | 4,99 et 4,69:1 | Mots en accent, badges (texte blanc : 4,99:1) |
  | `body-on-dark #CAC3C7` / `dark-0…2` | 9,4 à 10,9:1 | Texte courant sur sombre |
  | `muted-on-dark #A0969B` / `dark-0…3` | 5,0 à 6,6:1 | Texte atténué sur sombre |
  | `accent-on-dark #FF6B7F` / `dark-0…2` | 5,9 à 6,9:1 | Accent sur sombre, anneau de focus |
  | `brand` / `dark-1` | 2,49:1 | Interdit pour du texte (décoratif) |

- **2026-09-26 — Logo compact pour le header** (`logo-light-compact.svg`, sans la signature « Esprit d'expertise »).
  Raison : à 32 px de haut, la signature ferait environ 4 px et serait illisible. Le logo complet reste dans le footer. Une version compacte colorée (`logo-compact.svg`) est prête pour les fonds clairs.

- **2026-09-26 — Icônes dessinées pour le projet** (SVG en trait, `themes/excelcio/assets/icons/`), sans bibliothèque tierce. Les pictogrammes LinkedIn, X et YouTube sont des évocations simplifiées, à remplacer par les logos officiels si Excelcio le souhaite.

- **2026-09-26 — Police de secours** : Arial ajustée aux métriques de Geist, mesurées dans Edge (`size-adjust: 102.54%`, `ascent-override: 98.5%`, `descent-override: 29.26%`).

- **2026-09-26 — Navigation accessible sans JavaScript.**
  - Desktop : chaque rubrique est un lien vers sa page, plus un bouton distinct (chevron) qui ouvre le mega-menu.
  - Mobile : `<details>`/`<summary>`, amélioré par JS (verrouillage du défilement, Échap, piège à focus).

- **2026-09-26 — Header superposé.** Il ne prend pas de place dans le flux et se superpose à la première section (`data-header="overlay"` par défaut). Une page peut demander `header: solid` dans son front matter.

- **2026-09-26 — Licence du thème** : propriétaire (Excelcio). ⏳ À confirmer par l'utilisateur.

- **2026-09-26 — ⏳ Node.js 16** : Lighthouse en ligne de commande (recette du Lot 2) demande Node ≥ 18. En attendant, la recette du Lot 2 utilisera Lighthouse 9 (compatible Node 16) avec Edge, ou la mesure dans les outils de développement d'Edge.

## Lot 2 — Page d'accueil

- **2026-09-26 — Ordre et ambiances de l'accueil** (option A validée) : hero (bordeaux) · architecture et ce qui nous distingue (clair) · expertises (clair alterné) · manifeste (clair) · cas clients (sombre alterné) · FAQ (sombre) · solutions, prochaines formations et preuves (sombre alterné) · CTA (bordeaux) · footer.

- **2026-09-26 — Section « Prochaines formations »** ajoutée (absente de la référence), avec le composant « liste de lignes » des pages produit de la référence : clé en mono, titre, texte et lien.

- **2026-09-26 — Cas clients sans photo.** Faute de visuels, les cartes carrées ont un fond de marque avec le champ de carrés. Le logo client est un pictogramme neutre suivi de « Client N ».

- **2026-09-26 — Mini-visuels des solutions** : illustrations SVG stylisées de tableaux de bord (barres, grille, courbe, indicateurs, recherche, tableau, rapport). Les chiffres affichés sont **décoratifs** (générés, `aria-hidden`), à l'image des visuels de la référence ; ce ne sont pas des données réelles.

- **2026-09-26 — Animation du hero en CSS pur.** Elle démarre dès le premier affichage, sans attendre le JavaScript, pour ne pas retarder le LCP (le titre du hero est le plus grand élément visible). Les autres sections se révèlent au défilement via IntersectionObserver. Sans JS ou en mouvement réduit, tout est visible immédiatement.

- **2026-09-26 — Titres découpés en mots par Hugo** (`components/words.html`), et non par JavaScript : pas de reflow au chargement, et le HTML reste lisible sans JS.

- **2026-09-26 — FAQ : données structurées `FAQPage`** émises par la section (SPEC § 8.1), en avance sur le Lot 5.

- **2026-09-26 — ⏳ Mesure Lighthouse.** Les mesures locales (Edge headless, processeur ralenti ×4, réseau 4G lent) donnent LCP = FCP, TBT ≈ 0 et CLS = 0. Leurs valeurs absolues ne sont pas fiables : la machine est chargée, et la page 404 presque vide mesure autant que l'accueil. Le score Lighthouse officiel demande de télécharger Lighthouse via `npx` : accord de l'utilisateur requis.
