---
title: "Qlik Cloud Février 2026"
description: "Qlik Cloud Février 2026, le récap’ : retrouvez l’analyse des nouveautés de Qlik Cloud sous le regard de nos experts."
summary: "Qlik Cloud Février 2026, le récap’ : retrouvez l’analyse des nouveautés de Qlik Cloud sous le regard de nos experts."
placeholder: false
date: 2026-03-16
authors: ["Cécile Cong"]
categories: ["Nouveautés Qlik"]
tags: []
solutions: ["qlik"]
---

Voici les nouveautés Qlik Cloud de février 2026.

## Glisser/Déposer des colonnes dans le tableau simple

Il est désormais possible de déplacer les colonnes d’un tableau simple en mode navigation, via un simple glisser/déposer, sans passer par l’exploration de graphique. A noter que l’utilisateur peut enregistrer cette nouvelle organisation des colonnes dans un favori en cochant l’option « Enregistrer la disposition ». 

Cette nouveauté vient compléter l’ajout récente des raccourcis pour trier, rechercher des valeurs ou encore changer de dimension cyclique directement depuis l’en-tête d’une colonne. Les principaux frein à la migration des anciens tableaux simples vers cet objet sont donc levés (pour rappel, l’ancien objet « Table » est voué à disparaître). 

## Groupes de favoris publics

Tout comme les feuilles, les favoris publics peuvent maintenant être organisés et regroupés par les développeurs depuis les espaces personnels ou partagés. Les groupes peuvent ensuite être repliés pour améliorer la gestion et l’utilisation d’un très grand nombre de favoris 

## Ajout de filtres à la barre de sélections

Afin d’éviter la répétition de volets de filtre sur toutes les feuilles d’une application, des champs ou des dimensions principales peuvent être épinglés directement à la barre de sélections. Cet ajout se fait en mode édition, via un clic droit sur un champ ou un élément principal depuis le menu « Ressources ». 

## Identification des graphiques dépréciés

Une nouvelle feuille « Deprecated chart » dans l’application de monitoring « App Analyzer » permet d’identifier les graphiques dépréciés encore utilisés afin de les remplacer par une alternative plus moderne.

Cette analyse se base sur l’événement « com.qlik.v1.analytics.analytics-app-client.deprecated-charts.opened », qui se déclenche à chaque fois qu’un utilisateur ouvre une feuille contenant un objet déprécié. 

## Qlik Data Gateway – Direct Access 1.7.11

Afin d’éviter la répétition de volets de filtre sur toutes les feuilles d’une application, des champs ou des dimensions principales peuvent être épinglés directement à la barre de sélections. Cet ajout se fait en mode édition, via un clic droit sur un champ ou un élément principal depuis le menu « Ressources ». 

## Amélioration de la navigation et de la gestion des ressources

Les ressources (application, jeu de données, etc.) disposent d’un nouveau menu contextuel regroupant les différentes actions par ensemble cohérent.
Par exemple, pour les applications, on retrouvera :

- « Gérer » pour modifier les détails, publier, déplacer, etc.

- « Recharger » pour recharger, planifier ou encore accéder à l’historique.

- « Outils » pour la traçabilité, l’analyse d’impact et l’évaluation des performances.

- Etc.

Le nouveau panneau de détails est également accessible à tout moment (en cliquant sur « Détails »), ce qui permet d’afficher les métadonnées sans changer de fenêtre.

## Nouvelles fonctions de script et de graphique

Cinq nouvelles fonctions de script et de graphique sont disponibles :

- [**Quarter**](https://help.qlik.com/en-US/cloud-services/Subsystems/Hub/Content/Sense_Hub/Scripting/DateAndTimeFunctions/quarter.htm) : renvoie le trimestre d’une date sous la forme d’un entier compris entre 1 et 4.

- [**MakeGeoPoint**](https://help.qlik.com/en-US/cloud-services/Subsystems/Hub/Content/Sense_Hub/Scripting/GeospatialFunctions/MakeGeoPoint.htm) : valide les données géographiques au format JSON et confirme que les données sont un tableau contenant deux nombres.

- [**MakeGeoLine**](https://help.qlik.com/en-US/cloud-services/Subsystems/Hub/Content/Sense_Hub/Scripting/GeospatialFunctions/MakeGeoLine.htm) : valide les données géographiques au format JSON et confirme que les données sont un tableau contenant des points.

- [**MakeGeoPolygon**](https://help.qlik.com/en-US/cloud-services/Subsystems/Hub/Content/Sense_Hub/Scripting/GeospatialFunctions/MakeGeoPolygon.htm) : valide les données géographiques au format JSON et confirme que les données sont un tableau contenant des lignes.

- [**MakeGeoRegion**](https://help.qlik.com/en-US/cloud-services/Subsystems/Hub/Content/Sense_Hub/Scripting/GeospatialFunctions/MakeGeoRegion.htm) : valide les données géographiques au format JSON et confirme que les données sont un tableau contenant des polygones.

## Produits de données (= « Data product ») disponibles dans Qlik Analytics

Qlik Analytics intègre de nouvelles fonctionnalités permettant de créer des ensembles de données documentés, fiabilisés et prêts à être utilisés dans des applications Qlik ou des outils tierces.

Elles s’articulent autour de trois nouvelles sections :

- **Produit de données**: il s’agit de regrouper des jeux de données du catalogue dans un ensemble cohérent (par exemple les différents jeux de données nécessaires à l’analyse des ventes : ventes, clients, produits, etc.). Cet ensemble comporte des métadonnées (description, documentation, contacts clés, lignage, etc.), des informations de qualité de données et des points de terminaisons API pour exposer les données.

- **Qualité des données**: cette section permet de configurer :
- la manière dont les données sont validées au travers de **types sémantiques** (en fonction du type de données) et de **règles de validation** personnalisées (code commençant par « C*** », valeur comprise entre 0 et 100, etc.).

- le score de qualité (**Qlik Trust Score**), calculé selon plusieurs critères au choix (validité, complétude, utilisation, etc.) et dont le poids est personnalisable.

A noter que les informations de qualité des données sont disponibles pour l’ensemble des jeux et produits de données.

- **Marketplace des données**: catalogue centralisant les différents produits de données disponibles.

A noter que ces fonctionnalités initialement présentes dans Qlik Talend Cloud, sont désormais disponibles dans Qlik Cloud Analytics Premium / Enterprise et Qlik Sense SaaS.

## Nouvelle version de Qlik Answers

Jusqu’à présent, Qlik proposait deux solutions d’IA générative :

- **Qlik Answers** pour interroger les **données non structurées**(PDF, HTML, DOCX, etc.) : Création d’assistant permettant d’interroger des données non structurées (au préalable indexées dans des bases de connaissances).

- **Insight Advisor** pour interroger des **données structurées** et créer des analyses / visualisations.

Désormais, Qlik propose une nouvelle solution d’IA agentique unifiée pour travailler avec les **données structurées et non structurées** : **Qlik Answers**.

Pour pouvoir bénéficier de la nouvelle version (et donc remplacer les outils Insight Advisor et Insight Advisor Chat), il faut au préalable activer le « traitement de données interrégion » dans la console d’administration.

Plusieurs contextes d’exécution sont possibles :

- **Aide de Qlik**, pour interroger l’aide en ligne de Qlik

- **Analyse de l’application**, pour interragir avec les applications disponibles (explorer les données, créer des feuilles, graphiques ou éléments principaux, etc.)

- **Assistants Answers**, pour utiliser des assistants qui peuvent se sourcer avec des bases de connaissances **et** des applications.

Qlik Answers est facturé au nombre de questions posées par mois et au nombre de pages indexées (pour les assistants). Le nombre de questions dont vous disposez de base dépend de votre abonnement. 

## Serveur Qlik MCP

Qlik met à disposition son propre serveur MPC (= « Model Context Protocol » – standard qui permet aux LLM de communiquer avec des applications externes).

Il s’agit d’un ensemble d’[outils](https://help.qlik.com/en-US/cloud-services/Subsystems/Hub/Content/Sense_Hub/QlikMCP/Qlik-MCP-server-tools.htm) permettant à n’importe quel LLM compatible MCP de communiquer avec la plateforme Qlik Cloud et de bénéficier du moteur analytique de Qlik.

L’utilisateur, directement depuis son LLM, va pouvoir :

- Interroger des données d’applications en langage naturel

- Créer des feuilles, visualisations et éléments principaux dans les applications

- Explorer les produits et jeux de données disponibles

- Créer des produits de données

- Créer des glossaires

Côté facturation, c’est le nombre d’outils utilisés pour répondre à la demande qui est comptabilisé : 5 outils = 1 question décomptée du nombre de questions de l’abonnement (même quota que pour Qlik Answers). 

## Autres nouveautés :

- Possibilité d’intégrer des**images dans l’objet « Text »** et de les redimensionner.

- **Suppression de la distinction « Full » vs « Basic » user sur les tenant capacitaires :** tous les utilisateurs de la plateforme (jusqu’à 100 000) peuvent prétendre à tous les droits. Ce sont les rôles dont ils disposent qui vont conditionner ce qu’ils peuvent faire ou non.

- **Améliorations du planificateur :**vocabulaire plus clair, ajout d’icônes, d’infobulles, etc. afin de préparer l’introduction du gestionnaire de tâches global qui devrait être disponible prochainement.

- **Refonte de la page des**[**paramètres de compte Qlik**](https://console.qlikcloud.com/account/profile)**:** modification des informations personnelles (nom, organisation, etc.) et du mot de passe simplifiée.

- **Dépréciation du rôle « Automation Creator »**, permettant de créer des automatisation dans son espace personnel : sera supprimé d’ici fin 2026 et est à remplacer par la permission « Automatisations privées » dans un rôle personnalisé ou le rôle « User Default ».

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
