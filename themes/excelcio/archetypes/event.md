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
start: {{ .Date }}   # date et heure de l'événement (le champ `date` est la date de publication, jamais dans le futur)
end: ""               # date de fin (facultative)
online: false
city: ""
venue: ""
format: ""            # ex. Conférence, Webinaire, Atelier
program: []           # - { time: "09:30", title: "[Titre]", text: "[Description]" }
speakers: []          # - { name: "[Prénom Nom]", role: "[Fonction]" }
registration: {}      # { type: external, url: "https://…" }
---

[À RÉDIGER — Présentation de l'événement.]
