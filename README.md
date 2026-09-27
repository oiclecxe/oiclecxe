# excelcio.com — site statique Hugo

Refonte du site d'Excelcio en site statique Hugo. Cahier des charges : [`docs/SPEC.md`](docs/SPEC.md). Consignes de travail : [`CLAUDE.md`](CLAUDE.md).

## Prérequis

| Outil | Version | Usage |
|---|---|---|
| Hugo | **≥ 0.166.0** (standard ou extended) | Construction du site |
| Git | toute version récente | Versionnement |
| Node.js | ≥ 22 (facultatif) | Outils ponctuels uniquement, via `npx` : Pagefind 1.5.2 (index de recherche), contrôles de recette. Aucun `package.json` |

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

En production, Hugo liste en avertissement chaque page encore marquée `placeholder: true`, ainsi que les formulaires qui n'envoient encore rien (mode simulé).

## Recherche interne (Pagefind)

L'index de recherche est construit **après** le build de production, par [Pagefind](https://pagefind.app/) (version épinglée : 1.5.2). Il n'existe pas en `hugo server` : la recherche y affiche « La recherche n'est pas disponible pour le moment ».

Pour tester la recherche en local :

```powershell
hugo --environment production --gc --minify
npx pagefind@1.5.2 --site public --serve
```

Le site indexé est alors servi sur http://localhost:1414 (fenêtre de recherche : icône loupe ou `Ctrl + K`, page : `/recherche/`). Sans le serveur intégré, `npx pagefind@1.5.2 --site public` produit seulement l'index dans `public/pagefind/`, à publier avec le site.

Autre option sans Node.js : télécharger le binaire autonome `pagefind` (ou `pagefind_extended`) de la même version depuis la page des versions de Pagefind sur GitHub, puis `.\pagefind.exe --site public`.

## Formulaires

Trois formulaires : contact (`/contact/`), inscription à une formation ou à un événement (`/inscription/`), newsletter (fin d'article, liste des actualités, footer, `/newsletter/`). Réglages dans `config/_default/params.toml`, bloc `[forms]` :

| Réglage | Rôle |
|---|---|
| `mode = "mock"` | **Simulé** (valeur actuelle) : rien n'est envoyé ; le parcours complet est joué dans le navigateur et le contenu envoyé est affiché dans la console. Un e-mail contenant `+error` (ex. `test+error@exemple.fr`) simule un échec |
| `mode = "live"` | Envoi réel vers l'adresse (`endpoint`) de chaque formulaire, fournie par le prestataire choisi (Formspree, Brevo, HubSpot, fonction serverless…). Un formulaire sans `endpoint` reste simulé |
| `[forms.contact]`, `[forms.registration]`, `[forms.newsletter]` | `endpoint`, et au besoin `method` (`POST`) et `encoding` (`json` ou `form`) |
| `redirectField` | Nom du champ que le prestataire utilise pour rediriger après un envoi sans JavaScript (ex. `_next`), vers la page `/merci/` |
| `privacyURL` | Page liée dans la mention RGPD sous chaque formulaire |

Pour passer en réel : renseigner les trois `endpoint`, puis `mode = "live"` (idéalement dans `config/production/params.toml`, pour garder le mode simulé en développement). Anti-spam intégré : champ piège invisible et délai minimal de 3 secondes avant envoi. Un emplacement de captcha respectueux de la vie privée est prévu mais désactivé (voir le README du thème).

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
- [`docs/CONTENU.md`](docs/CONTENU.md) : guide de rédaction
- [`relevé de la référence (Lot 0)`](relevé de la référence (Lot 0)) : relevé de la référence de design
- [`themes/excelcio/README.md`](themes/excelcio/README.md) : paramètres, composants et sections du thème
