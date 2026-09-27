---
title: "Qlik Sense SaaS Décembre 2025"
description: "Qlik Sense SaaS Décembre 2025, le récap’ : retrouvez l’analyse des nouveautés de Qlik Sense SaaS sous le regard de nos experts."
summary: "Qlik Sense SaaS Décembre 2025, le récap’ : retrouvez l’analyse des nouveautés de Qlik Sense SaaS sous le regard de nos experts."
placeholder: false
date: 2026-01-23
authors: ["Cécile Cong"]
categories: ["Nouveautés Qlik"]
tags: []
solutions: ["qlik"]
---

Voici les nouveautés Qlik Sense SaaS de décembre 2025.

## Tri, recherche et changement de dimension dans le tableau simple

Des raccourcis, pour trier, rechercher des valeurs ou encore changer de dimension cyclique directement depuis l’en-tête d’une colonne, sont désormais présents par défaut à la création d’un tableau simple.

Jusqu’à présent, le manque de fluidité pour réaliser ces actions constituait un frein à l’utilisation de l’objet « Tableau simple » à la place de l’objet « Table ». Ce dernier étant voué à disparaître, ces raccourcis sont les bienvenus pour aider à la migration des tableaux existants !

## Réorganisation des graphiques

L’ensemble des graphiques natifs et des extensions des «Visualization Bundle» et «Dashboard Bundle» ont été rassemblés dans la section «Graphiques» des ressources et réorganisés en trois catégories :

- **Visualisations** – présentation des données

- **Objets de dashboard** – organisation / ergonomie des feuilles

- **Héritage** – anciennes visualisations supportées pour un usage dans les applications mais pas pour de l’intégration

A noter que l’on retrouve deux objets «Tableau croisé dynamique» dans la catégorie «Visualisations». Le premier correspond à l’ancien objet natif «Tableau croisé dynamique» et le second correspond à l’ancienne extension «Pivot table» et n’est, en réalité, pas dynamique car l’utilisateur finale ne peut pas (encore) organiser les dimensions comme il le souhaite.

## Identification des graphiques dépréciés

Les administrateurs peuvent désormais identifier où les objets dépréciés sont utilisés sur le tenant grâce au nouvel événement « com.qlik.v1.analytics.analytics-app-client.deprecated-charts.opened ». Ce dernier est déclenché à chaque fois qu’un utilisateur ouvre une feuille contenant un objet déprécié et permet d’identifier facilement l’application et la feuille concernée.

Les événements peuvent être suivis dans la section « Evénements » du centre d’activités « Administration » (cf. image ci-après) ou bien exploités via les API « Audits ».

## Modèles de feuilles

A la création d’une nouvelle feuille (ou depuis une feuille vide), Qlik propose plusieurs modèles permettant de faciliter la création d’analyse. Il s’agit de feuilles préconstruites avec une organisation de graphiques spécifique répondant à un type d’analyse précis (dashboard, reporting détaillé, etc.).

A noter que chaque modèle dispose d’un exemple de rendu via le bouton « Détails ».

## Script

### Suppression des tables de Mapping

Il est désormais possible de supprimer une table de Mapping via l’instruction « Drop mapping table(s) […] ». Cela peut s’avérer utile afin de mieux gérer l’utilisation de la mémoire lors du chargement de tables de mapping volumineuses.

#### Variables de script

Une nouvelle variable système ScriptOnlyVariables permet d’indiquer si les variables définies après cette instruction sont visibles en dehors du script (=0, par défaut) ou bien uniquement dans le script (=1).

## Nouvel objet « Table d’annotations » (ou « Write table »)

Il s’agit d’un tableau simple, dans lequel on peut ajouter des colonnes classiques (dimensions et mesures) et des colonnes modifiables.

Sa mise en place est extrêmement simple : il suffit de définir une clé primaire à partir d’une ou plusieurs colonnes du tableau puis d’ajouter les colonnes modifiables souhaitées. Dans ces dernières, les utilisateurs peuvent saisir des données manuellement ou bien à partir d’une liste déroulante de valeurs prédéfinies.

**Les saisies sont disponibles en temps réel pour tous les utilisateurs, il n’y a pas besoin de recharger les données pour voir les modifications.** En revanche, il est nécessaire de recharger les données pour pouvoir utiliser les valeurs saisies dans d’autres éléments (colonnes du tableau ou autres graphiques).

On peut retrouver trois statuts de cellule :

- Non enregistrée (orange) : Cellule modifiée par l’utilisateur mais pas encore sauvegardée.

- Enregistrée (vert) : Modification sauvegardée, visible par les autres utilisateurs.

- Verrouillée (bleu) : Modification en cours par un autre utilisateur, la ligne est verrouillée.

A noter que les données saisies sont stockées, chez Qlik, pendant 90 jours et qu’elles sont exploitables via les API REST. Il est donc possible, assez facilement, de récupérer les données, via l’éditeur de script ou Qlik Automate par exemple, pour les stocker et/ou les réutiliser ailleurs.

Ce graphique est uniquement disponible dans les offres Qlik suivantes :

- Qlik Cloud Analytics Premium

- Qlik Cloud Analytics Enterprise

- Qlik Sense Enterprise SaaS

Pour aller plus loin, retrouvez la présentation des nouveautés des précédentes versions :

Qlik Cloud 2026

Qlik Cloud 2025

Qlik Cloud 2024

Qlik Cloud 2023

Qlik Cloud 2022

Qlik Cloud 2026

- [Qlik Cloud Janvier 2026](/actualites/qlik-cloud-janvier-2026/)

- [Qlik Cloud Février 2026](/actualites/qlik-cloud-fevrier-2026/)

- [Qlik Cloud Mars 2026](/actualites/qlik-cloud-mars-2026/)

- [Qlik Cloud Avril 2026](/actualites/qlik-cloud-avril-2026/)

- [Qlik Cloud Mai 2026](/actualites/qlik-cloud-mai-2026/)

- [Qlik Cloud Juin 2026](/actualites/qlik-cloud-juin-2026/)

Qlik Cloud 2025

- Qlik Cloud Janvier 2025

- Qlik Cloud Février 2025

- Qlik Cloud Mars 2025

- Qlik Cloud Avril 2025

- Qlik Cloud Mai 2025

- Qlik Cloud Juin 2025

- Qlik Cloud été 2025

- [Qlik Cloud Septembre 2025](/actualites/qlik-sense-saas-sept-2025/)

- [Qlik Cloud Octobre 2025](/actualites/qlik-sense-saas-octobre-2025/)

- [Qlik Cloud Novembre 2025](/actualites/qlik-sense-saas-novembre-2025/)

- [Qlik Cloud Décembre 2025](/actualites/qlik-sense-saas-decembre-2025/)

Qlik Cloud 2024

- Qlik Cloud Janvier 2024

- Qlik Cloud Février 2024

- Qlik Cloud Mars 2024

- Qlik Cloud Avril 2024

- Qlik Cloud Mai 2024

- Qlik Cloud Juin 2024

- Qlik Cloud Juillet et Août 2024

- Qlik Cloud Septembre 2024

- Qlik Cloud Octobre 2024

- Qlik Cloud Novembre 2024

- Qlik Cloud Décembre 2024

Qlik Cloud 2023

- Qlik Cloud Janvier 2023

- Qlik Cloud Février 2023

- Qlik Cloud Mars 2023

- Qlik Cloud Avril 2023

- Qlik Cloud Mai 2023

- Qlik Cloud Juin 2023

- Qlik Cloud Eté 2023

- Qlik Cloud Septembre 2023

- Qlik Cloud Octobre 2023

- Qlik Cloud Novembre 2023

- Qlik Cloud Décembre 2023

Qlik Cloud 2022

- Qlik Cloud Février 2022

- Qlik Cloud Mars 2022

- Qlik Cloud Avril 2022

- Qlik Cloud Mai 2022

- Qlik Cloud Juin 2022

- Qlik Cloud Juillet 2022

- Qlik Cloud Août 2022

- Qlik Cloud Septembre 2022

- Qlik Cloud Octobre 2022

- Qlik Cloud Novembre 2022

- Qlik Cloud Décembre 2022

Pour continuer à **tirer le meilleur de Qlik Cloud,**retrouvez des vidéos vous présentants :

- trois fonctionnalités qui vont vous permettre de surveiller vos données,

- différents cas d’usages des notes collaboratives,

- l’analyse d’impact et traçabilité de vos données.

### Vous souhaitez monter en compétences sur Qlik Sense SaaS ?

[Découvrez nos formations Qlik Sense SaaS](/formations/?solution=qlik)
