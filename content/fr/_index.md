---
title: "Excelcio"
description: "[À RÉDIGER — Meta description de l'accueil, 150 caractères : cabinet de conseil et de formation en Business Intelligence à Paris, Rennes et Nantes.]"
placeholder: true

# Blocs de la page, dans l'ordre d'affichage. `hidden: true` masque un bloc.
sections:

  - type: hero
    title: "[À RÉDIGER — Promesse principale en 8 mots]"
    primary: { label: "Nous contacter", url: "/contact/" }
    secondary: { label: "Découvrir nos formations", url: "/formations/" }
    # Bandeau de logos clients : placeholders anonymes (décision du 26/09/2026).
    logos: ["Client 1", "Client 2", "Client 3", "Client 4", "Client 5", "Client 6", "Client 7", "Client 8", "Client 9", "Client 10"]

  - type: architecture
    # Titre en trois temps : deux lignes commençant par un mot en accent, puis un complément atténué.
    title:
      lines:
        - { accent: "[Mot clé 1]", text: "[suite de la ligne 1]." }
        - { accent: "[Mot clé 2]", text: "[suite de la ligne 2]." }
      rest: "[À RÉDIGER — Complément : comment Excelcio relie vos données à vos décisions, 12 mots max.]"
    top: { label: "Vos sources de données", detail: "ERP, CRM, fichiers, bases de données" }
    band1:
      label: "Plateformes BI"
      items: ["Qlik", "Power BI", "Tableau"]
    band2:
      label: "Usages métiers"
      items: ["Pilotage de direction", "Commercial", "Supply chain", "Finance", "Planification", "Reporting"]
    bottom: { label: "Vos décisions", detail: "[À RÉDIGER — 5 mots]" }


  - type: features
    title: "Ce qui nous distingue"
    tabs:
      - label: "Conseil"
        cards:
          - { title: "[Titre 1].", accent: "[Complément 1].", text: "[À RÉDIGER — Atout 1 du conseil Excelcio, 35 mots max.]", url: "/offre/conseil-acquisition/" }
          - { title: "[Titre 2].", accent: "[Complément 2].", text: "[À RÉDIGER — Atout 2 du conseil Excelcio, 35 mots max.]", url: "/offre/deploiement/" }
          - { title: "[Titre 3].", accent: "[Complément 3].", text: "[À RÉDIGER — Atout 3 du conseil Excelcio, 35 mots max.]", url: "/offre/expertise/" }
          - { title: "[Titre 4].", accent: "[Complément 4].", text: "[À RÉDIGER — Atout 4 du conseil Excelcio, 35 mots max.]", url: "/solutions/" }
      - label: "Formation"
        cards:
          - { title: "[Titre 1].", accent: "[Complément 1].", text: "[À RÉDIGER — Atout 1 de la formation Excelcio, 35 mots max.]", url: "/formations/" }
          - { title: "[Titre 2].", accent: "[Complément 2].", text: "[À RÉDIGER — Atout 2 de la formation Excelcio, 35 mots max.]", url: "/formations/" }
          - { title: "[Titre 3].", accent: "[Complément 3].", text: "[À RÉDIGER — Atout 3 de la formation Excelcio, 35 mots max.]", url: "/formations/" }
          - { title: "[Titre 4].", accent: "[Complément 4].", text: "[À RÉDIGER — Atout 4 de la formation Excelcio, 35 mots max.]", url: "/formations/" }

  - type: expertises
    title:
      lead: "[À RÉDIGER — Ce que nous faisons pour chaque direction.]"
      rest: "[À RÉDIGER — Complément, 10 mots max.]"
    linkLabel: "Découvrir l'expertise"
    # Les expertises sont lues dans content/fr/offre/expertise/ (titre, résumé, badges).
    # Pour en choisir ou en réordonner : items: ["/offre/expertise/finance", …]

  - type: statement
    text: "[À RÉDIGER — Phrase manifeste d'Excelcio, 30 à 40 mots, affichée en grand et centrée.]"

  - type: case-studies
    title: "[À RÉDIGER — Titre de la section, 3 mots]"
    limit: 4
    # Les cartes sont lues dans content/fr/cas-clients/ (résultat, client, secteur, image), par ordre de « weight ».
    # Pour choisir ou réordonner : items: ["/cas-clients/o2", …]

  - type: faq
    title: { lead: "Vos questions,", rest: "nos réponses" }
    items:
      - { q: "[À RÉDIGER — Question 1 : qu'est-ce qu'Excelcio ?]", a: "[À RÉDIGER — Réponse 1, 60 mots max.]" }
      - { q: "[À RÉDIGER — Question 2 : quelles solutions BI accompagnez-vous ?]", a: "[À RÉDIGER — Réponse 2, 60 mots max.]" }
      - { q: "[À RÉDIGER — Question 3 : comment choisir une solution BI ?]", a: "[À RÉDIGER — Réponse 3, 60 mots max.]" }
      - { q: "[À RÉDIGER — Question 4 : vos formations sont-elles certifiantes ?]", a: "[À RÉDIGER — Réponse 4, 60 mots max.]" }
      - { q: "[À RÉDIGER — Question 5 : intervenez-vous partout en France ?]", a: "[À RÉDIGER — Réponse 5, 60 mots max.]" }
      - { q: "[À RÉDIGER — Question 6 : comment démarrer un projet ?]", a: "[À RÉDIGER — Réponse 6, 60 mots max.]" }

  - type: platform
    title:
      lead: "[À RÉDIGER — Titre : les solutions que nous maîtrisons.]"
      rest: "Sept éditeurs partenaires, une seule équipe."
    # Les solutions sont lues dans content/fr/solutions/ (nom, accroche « tagline », visuel « visual »).

  - type: trainings
    title:
      lead: "Prochaines sessions de formation."
      rest: "[À RÉDIGER — Complément, 10 mots max.]"
    cta: { label: "Voir tout le catalogue", url: "/formations/" }
    limit: 3
    # Les sessions sont lues dans les fiches formations (champ « sessions ») ; seules les sessions futures s'affichent.

  - type: proof
    title:
      lead: "[À RÉDIGER — Titre de preuve, 4 mots.]"
      rest: "[À RÉDIGER — Complément, 15 mots max.]"
    stats:
      - { value: 690, suffix: "+", label: "sessions de formation depuis 2018" }
      - { value: "[XX]", suffix: "", label: "[À RÉDIGER — Deuxième indicateur]" }
    quote:
      before: "[À RÉDIGER — Début du témoignage client,"
      highlight: "passage clé mis en avant,"
      after: "suite et fin du témoignage, 50 mots au total.]"
      author: "[Prénom Nom]"
      role: "[Fonction, Client]"

  - type: cta
    title:
      lead: "[À RÉDIGER — Appel à l'action, 8 mots.]"
      rest: "[À RÉDIGER — Complément, 20 mots max.]"
    primary: { label: "Nous contacter", url: "/contact/" }
    secondary: { label: "Découvrir nos formations", url: "/formations/" }
    badges: ["[Partenaire certifié 1]", "[Partenaire certifié 2]", "[Organisme de formation certifié]"]
---
