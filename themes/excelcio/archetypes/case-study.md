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
client: "Client N"   # aucun nom réel sans accord écrit du client
sector: []           # secteur(s) d'activité, ex. [industrie, distribution]
result: "[À RÉDIGER — Résultat marquant, 6 mots]"
solutions: []
expertises: []       # slugs des pages expertises, ex. [finance]
context: "[À RÉDIGER — Contexte, 60 mots max.]"
challenge: "[À RÉDIGER — Enjeu, 60 mots max.]"
solution: "[À RÉDIGER — Solution mise en œuvre, 80 mots max.]"
benefits: "[À RÉDIGER — Bénéfices obtenus, liste à puces possible.]"
results:
  - { value: "[XX] %", label: "[À RÉDIGER — Indicateur]" }
quote: { text: "[À RÉDIGER — Témoignage validé par le client.]", author: "[Prénom Nom]", role: "[Fonction]" }
---
