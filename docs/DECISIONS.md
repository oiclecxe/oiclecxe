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

- **2026-09-26 — Polices proposées : Geist + JetBrains Mono** (celles de la référence, sous licence SIL OFL 1.1).
  ⏳ Validation de l'utilisateur et accord pour le téléchargement.

- **2026-09-26 — ⏳ Ambiance des sections.** La référence alterne des aplats de marque, des sections claires et des sections sombres, alors que le CDC impose « sombre uniquement ». Options A et B dans `relevé de la référence` § 9.

- **2026-09-26 — ⏳ Halos, dégradés et grilles de fond du CDC** (§ 5.1, § 9) **absents de la référence.** Proposition : les remplacer par des aplats et par le champ de carrés animé.

- **2026-09-26 — ⏳ Variante claire du logo** pour les fonds bordeaux et sombres, dérivée du fichier fourni. Son symbole rouge `#D80C0C` et son texte gris `#313131` sont peu lisibles sur ces fonds.
