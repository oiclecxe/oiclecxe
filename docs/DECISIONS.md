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

## Lot 3 — Pages intérieures

- **2026-09-27 — Gabarits choisis par type** (`solution`, `expertise`, `training`, `case-study`, `article`, `event`, `job`, `contact`, `search`, `site-map`), posés par `cascade` dans les `_index.md` des rubriques. Le thème reste indépendant des adresses françaises du site ; les archetypes portent les mêmes noms (`hugo new content --kind training formations/…`). Les chemins de `hugo new content` sont relatifs à `content/fr` (commande corrigée dans le README et `CLAUDE.md`).

- **2026-09-27 — Catalogue : 28 formations** aux intitulés et identifiants d'URL du site actuel (relevés le 27/09/2026 sur excelcio.com/formations/), réparties en Qlik (18, QlikView inclus), Vizlib (1), Jedox (2), Power BI (2), Tableau (3). Le CDC prévoyait 8 formations fictives ; l'utilisateur a demandé le catalogue réel. Codes, niveaux, durées, formats, prix, programmes et sessions restent en placeholders.

- **2026-09-27 — Filtres construits d'après les valeurs présentes** (catalogue, cas clients) : un filtre n'apparaît qu'avec au moins deux valeurs différentes, pour ne pas inventer de niveaux ou de formats. Aujourd'hui, seul le filtre « Solution » est visible. État conservé dans l'URL (`?solution=qlik`) ; sans JavaScript, catalogue complet groupé par solution.

- **2026-09-27 — Dates des contenus provisoires** affichées « [Date à confirmer] » : les dates du front matter ne servent qu'au tri. Pour les événements, `date` est la date de publication (jamais future, sinon la page n'est pas publiée) et `start` la date de l'événement.

- **2026-09-27 — Formulaires, recherche et llms.txt différés** : la page contact affiche les e-mails et un emplacement pour le formulaire, la page recherche renvoie au plan du site, le lien « Explorer avec l'IA » du footer est masqué tant que `llms.txt` n'existe pas. Des points d'accroche sont prévus pour les Lots 4 et 5.

- **2026-09-27 — Inscription aux formations et événements** : sans URL externe, le bouton mène à `/contact/?formation=<slug>` (ou `?evenement=`), que le formulaire du Lot 4 pourra pré-remplir.

- **2026-09-27 — Appel à l'action final des pages intérieures** : `params.cta` du site (placeholder), remplaçable ou supprimable page par page.

- **2026-09-27 — Source unique pour les contenus** (signalé par l'utilisateur : passer « Client 1 » à « Client A » dans la fiche ne se répercutait pas sur l'accueil). Les sections d'accueil `case-studies`, `expertises`, `platform` et `trainings` **lisent les pages** au lieu de recopier leurs données. Par défaut, toutes les fiches sont affichées par `weight` ; `items` (liste de chemins) et `limit` permettent de choisir. Les sessions de l'accueil et du catalogue sont lues dans les fiches formations (`func/upcoming-sessions.html`). Les pages solutions et expertises déclarent leur entrée de menu (`menus:` dans leur front matter) : 18 entrées recopiées ont été retirées de `menus.fr.toml`. Restent volontairement indépendants : les libellés du schéma d'architecture (étiquettes de dessin) et le bandeau de logos clients (tous les clients n'ont pas de fiche).

- **2026-09-27 — Bloc « Prochaines sessions » de l'accueil masqué sans session à venir** (demande de l'utilisateur). Le catalogue des formations garde son message d'attente.


- **2026-09-27 — Affichage des sessions de formation** (composant `components/session.html`, commun à la fiche, au catalogue et à l'accueil) : période « 1 – 2 octobre 2026 », lieu et format. Les dates de session s'affichent toujours, même sur une fiche encore marquée `placeholder: true` : une date de session saisie est réelle. Une session reste listée jusqu'à la fin de son dernier jour (`end`, sinon `start`). Sur la fiche, le bouton devient « S'inscrire » dès qu'une session est programmée (« Demander une session » sinon).


- **2026-09-27 — Offres d'emploi : champ `active`** (demande de l'utilisateur). Seules les offres `active: true` sont listées et figurent dans le plan du site. Une offre fermée (`false` ou champ absent : publication explicite) garde sa page (liens existants) avec la mention « Ce poste n'est plus ouvert », sans bouton de candidature, en `noindex`. Sans offre active, la page Recrutement affiche « Aucun poste n'est ouvert pour l'instant » et la candidature spontanée. À reprendre au Lot 5 : pas de `JobPosting` ni d'entrée `sitemap.xml` pour une offre fermée.


- **2026-09-27 — Page de test Markdown** `/styleguide/markdown/` (développement uniquement, comme le guide de style) : chaque format Goldmark avec sa syntaxe et son rendu, via le shortcode de documentation `md-example`. Styles du texte courant complétés (tableaux, notes, listes de définitions et de tâches, code). Coloration syntaxique : feuille générée par `css.ChromaStyles` (style `github`, paramètre `params.code.style`), chargée seulement sur les pages contenant du code.


- **2026-09-27 — Moteur Markdown : Goldmark (intégré), pas Pandoc.** Décision de l'utilisateur. Pandoc, bien qu'installé, désactiverait les *render hooks* du thème (images AVIF/WebP, texte alternatif obligatoire, vérification des liens), ralentirait le build et imposerait Pandoc chez l'hébergeur. Extensions activées dans `config/_default/markup.toml` : texte supprimé `~~…~~` (remplace l'extension « barré », incompatible avec l'indice), inséré `++…++`, surligné `==…==`, indice `H~2~O`, exposant `1^er^` ; guillemets français automatiques avec espace fine insécable.


- **2026-09-27 — Catalogue : filtre par solution en étiquettes cliquables** (demande de l'utilisateur), au lieu d'une liste déroulante. Groupe de boutons radio habillés en étiquettes (« Tous » + une étiquette par solution, avec le nombre de formations), utilisable au clavier (flèches) et synchronisé avec l'URL. Le composant `filters.html` accepte `style: tags` par filtre ; les autres filtres (cas clients, niveau et format) restent en listes déroulantes. Entrée de menu « Formations par solution » retirée.


- **2026-09-27 — Catalogue : les fiches formations font foi pour les solutions** (signalé par l'utilisateur : une solution citée dans une nouvelle fiche n'apparaissait pas). Les étiquettes et les groupes du catalogue sont construits à partir des valeurs du champ `solutions` des formations : d'abord les solutions qui ont une page, dans l'ordre de leur `weight`, puis les autres par ordre alphabétique, avec un nom déduit du nom de dossier (`google-looker` → « Google Looker ») tant qu'aucune page n'existe. Les formations sans `solutions` sont rangées dans un groupe « Autres formations », pour qu'aucune ne disparaisse.

- **2026-09-27 — Cas clients : même mécanisme que le catalogue, par secteur d'activité** (demande de l'utilisateur). La page Cas clients est groupée et filtrée par **secteur d'activité** (étiquettes cliquables avec nombre de cas), construits à partir du champ `sector` des fiches, par ordre alphabétique. Les fiches sans secteur sont rangées dans « Autres cas clients ». Le filtre par solution est retiré de cette page (les cas d'une solution restent listés sur la page de la solution). La carte `story-card` accepte un niveau de titre (`level`) pour garder une hiérarchie de titres correcte dans les groupes.

- **2026-09-27 — Cas clients : filtre seul, sans groupes** (demande de l'utilisateur). La page Cas clients revient à une grille unique (ordre des `weight`) ; les secteurs d'activité ne servent qu'aux étiquettes de filtre. Remplace la partie « groupes » de la décision précédente.

- **2026-09-27 — Champs de classement généralisés** (demande de l'utilisateur : `sector: ["industrie", "distribution"]` refusé alors que `solutions` accepte une liste). `solutions`, `expertises` et `sector` acceptent indifféremment une valeur ou une liste, partout (listes, fiches, cartes, pages liées). Deux fonctions communes au thème : `func/as-list.html` (normalise en liste) et `func/facet.html` (valeurs présentes dans un ensemble de pages, avec leur nombre, comparées sous forme d'URL : « Industrie » = « industrie »). Le catalogue et la page Cas clients reposent tous deux sur `facet.html` ; `func/related.html` accepte aussi une valeur seule. Nom affiché d'un secteur : `func/term-name.html` (majuscule initiale, tirets remplacés par des espaces).

- **2026-09-27 — Lot 4 : choix préalables** (réponses de l'utilisateur).
  - Inscription formation / événement : **page dédiée** `/inscription/`, préremplie par l'URL (`?formation=…&session=…` ou `?evenement=…`) ; la fiche garde la liste des sessions avec un bouton par session.
  - Formation sans session programmée : le même formulaire propose « Session à définir » et « Intra-entreprise » à la place des dates (plus de renvoi vers `/contact/`).
  - E-mail du formulaire de contact : **tous les domaines acceptés**, seul le format est vérifié.
  - Pagefind : téléchargement via `npx` autorisé (paquet npm officiel, version 1.x épinglée, aucun `package.json`). Node.js 22 LTS installé.
