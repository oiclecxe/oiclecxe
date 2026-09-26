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
