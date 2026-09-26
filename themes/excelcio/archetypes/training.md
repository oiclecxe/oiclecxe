---
title: "{{ replace .File.ContentBaseName "-" " " | title }}"
description: "[À RÉDIGER — Meta description de 120 à 160 caractères.]"
summary: "[À RÉDIGER — Accroche pour les cartes, 25 mots max.]"
date: {{ .Date }}
lastmod: {{ .Date }}
draft: false
placeholder: true
image: ""        # fichier du dossier de la page (ex. cover.jpg) ; imageAlt obligatoire si image
imageAlt: ""
code: ""            # code catalogue
solutions: []       # slugs des pages solutions, ex. [qlik]
level: ""           # ex. Débutant, Intermédiaire, Avancé
durationDays: 0     # nombre de jours ; 0 = à compléter
format: ""          # ex. Présentiel, Distanciel, Mixte
price: ""           # ex. "1 200 € HT" ; vide = « Sur demande »
objectives: ["[À RÉDIGER — Objectif 1]", "[À RÉDIGER — Objectif 2]"]
audience: ["[À RÉDIGER — Public visé]"]
prerequisites: ["[À RÉDIGER — Prérequis]"]
program:
  - { title: "[Module 1]", items: ["[À RÉDIGER — Point 1]", "[À RÉDIGER — Point 2]"] }
sessions: []        # ex. - { start: 2026-11-16, end: 2026-11-17, city: "Paris", format: "Présentiel" }
registration: {}    # { type: external, url: "https://…" } ; sinon demande via /contact/
---
