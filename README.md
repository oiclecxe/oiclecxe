# excelcio.com — site statique Hugo

Refonte du site d'Excelcio en site statique Hugo. Cahier des charges : [`docs/SPEC.md`](docs/SPEC.md). Consignes de travail : [`CLAUDE.md`](CLAUDE.md).

## Prérequis

| Outil | Version | Usage |
|---|---|---|
| Hugo | **≥ 0.166.0** (standard ou extended) | Construction du site |
| Git | toute version récente | Versionnement |
| Node.js | ≥ 22 (facultatif) | Outils ponctuels uniquement : Pagefind (Lot 4), contrôles de recette |

Installation ou mise à jour de Hugo sous Windows :

```powershell
winget install Hugo.Hugo.Extended
```

## Commandes (PowerShell)

```powershell
# Serveur de développement : http://localhost:1313 (guide de style : /styleguide/)
hugo server

# Build de production dans public/
hugo --environment production --gc --minify

# Performance des gabarits
hugo --templateMetrics --templateMetricsHints

# Nouveau contenu à partir d'un archetype
hugo new content --kind article actualites/mon-article/index.md
```

En production, Hugo liste en avertissement chaque page encore marquée `placeholder: true`.

## Arborescence

```
config/            Configuration du site (_default, development, production)
content/fr/        Contenu en français (content/en/ plus tard)
data/              Données propres au site (bureaux, réseaux sociaux…)
assets/images/     Logo et images partagées
docs/              Cahier des charges, décisions, relevé de la référence
themes/excelcio/   Thème : gabarits, CSS, JS, polices, icônes, i18n (voir son README)
```

Le **thème** contient la présentation, le **site** contient ce qui est propre à Excelcio. Pour adapter un fichier du thème, créer le fichier de même chemin à la racine plutôt que de modifier le thème, et le consigner dans `docs/DECISIONS.md`.

## Documentation

- [`docs/SPEC.md`](docs/SPEC.md) : cahier des charges
- [`docs/DECISIONS.md`](docs/DECISIONS.md) : journal des décisions
- [`relevé de la référence (Lot 0)`](relevé de la référence (Lot 0)) : relevé de la référence de design
- [`themes/excelcio/README.md`](themes/excelcio/README.md) : paramètres, composants et sections du thème
