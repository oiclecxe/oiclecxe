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

- **2026-09-27 — Mesure Lighthouse reportée** à la demande de l'utilisateur. Le critère « Lighthouse mobile ≥ 95 » du Lot 2 reste ouvert ; il sera traité plus tard, au plus tard à la recette (Lot 6).


- **2026-09-27 — Barre de progression de lecture** en haut de l'écran, sur toutes les pages (demande de l'utilisateur ; élément de la référence omis au relevé du Lot 0). Elle reprend la référence : 4 px, fixe, au-dessus du header, décorative (`aria-hidden`). Couleur `--accent-on-dark` (#FF6B7F), lisible sur le bordeaux comme sur le sombre. Elle avance en CSS pur (`animation-timeline: scroll()`) là où c'est supporté, avec repli JavaScript (`progress.js`) ailleurs, Firefox notamment.


- **2026-09-27 — Image des cartes cas clients reprise automatiquement de la fiche liée** (demande de l'utilisateur). La carte cherche la page pointée par `url` ; si celle-ci déclare `image` et `imageAlt`, la photo remplit la carte, via `image.html` en AVIF et WebP. Sinon, la carte garde l'aplat avec le champ de carrés. Des voiles dégradés en haut et en bas (`--scrim`) garantissent la lisibilité du texte : c'est un usage **fonctionnel** du dégradé, distinct des dégradés décoratifs écartés au Lot 0. Testé sur une copie jetable du projet, avec une fiche munie d'une image, une fiche sans image et une carte sans fiche.


## Préparation du Lot 3

- **2026-09-27 — Lot 2 validé** par l'utilisateur et fusionné dans `main`. Le périmètre s'étend au Lot 3.

- **2026-09-27 — Pages intérieures claires** (demande de l'utilisateur ; remplace « pages intérieures sombres » du Lot 0 et de `relevé de la référence` § 6.2–6.3). En-têtes et contenus des pages intérieures en ambiances `light` et `light-alt`, comme la liste du blog de la référence. Conséquence : sur ces pages, le header ne se superpose plus à la première section (texte blanc illisible sur fond clair) ; il devient une barre sombre pleine (`header: solid`), comme sur le blog de la référence. Le footer reste sombre ; l'appel à l'action final reste un aplat bordeaux.

- **2026-09-27 — Catalogue de formations : intitulés publics du site actuel** repris tels quels (faits réels autorisés, par extension du SPEC § 7.4). Descriptions, programmes, durées, prix et sessions restent en placeholders tant qu'ils ne sont pas relevés et validés.

- **2026-09-27 — Photos de test** `photo_001.jpg` et `photo_002.jpg` déposées à la racine par l'utilisateur, **pour les tests uniquement** : non versionnées (`.gitignore`), jamais publiées comme contenu réel.

- **2026-09-27 — Niveaux de partenariat** (fournis par l'utilisateur) : Qlik = « Partenaire Elite », Jedox = « Partenaire certifié ». Les autres solutions (Vizlib, Tableau, Power BI, ThoughtSpot, IBM Cognos) n'ont **aucun badge**, ni réel ni placeholder.

- **2026-09-27 — Header des pages intérieures** : apparence inchangée (barre sombre, logo et texte blancs), confirmée par l'utilisateur. Seule différence avec l'accueil : la barre est sombre dès le haut de la page (pas de transparence au-dessus d'une section claire) ; masquage au défilement vers le bas et réapparition vers le haut conservés.
