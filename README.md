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
# --renderToMemory : rien n'est écrit dans public/ (sans cette option, hugo server y dépose
# ses pages de développement : brouillons, guide de style…)
hugo server --buildDrafts --disableFastRender --renderToMemory

# Build de production dans public/, vidé au préalable (Hugo n'efface pas les fichiers périmés)
if (Test-Path public) { Remove-Item public -Recurse -Force }
hugo --environment production --gc --minify

# Performance des gabarits
hugo --templateMetrics --templateMetricsHints

# Nouveau contenu à partir d'un archetype
hugo new content --kind article actualites/mon-article/index.md
```

En production, Hugo liste en avertissement chaque page encore marquée `placeholder: true`, ainsi que les formulaires qui n'envoient encore rien (mode simulé).

## Recherche interne (Pagefind)

L'index de recherche est construit **après** le build de production, par [Pagefind](https://pagefind.app/) (version épinglée : 1.5.2).

**Mise en ligne** : l'index est produit dans `public/pagefind/` et publié avec le site.

```powershell
if (Test-Path public) { Remove-Item public -Recurse -Force }
hugo --environment production --gc --minify
npx pagefind@1.5.2 --site public
```

**Dans le serveur de développement** : `hugo server` sert l'index rangé dans `.pagefind/` à la racine (dossier non versionné, monté par `config/development/hugo.toml`). Pour le créer ou le mettre à jour après des changements de contenu :

```powershell
if (Test-Path public) { Remove-Item public -Recurse -Force }
hugo --environment production --gc --minify
npx pagefind@1.5.2 --site public --output-path .pagefind
```

Puis **redémarrer** `hugo server` la première fois (le dossier doit exister à son démarrage). Tant que cet index n'existe pas, la recherche du serveur de développement affiche la marche à suivre. L'index reflète le contenu publiable au moment de sa création (sans brouillons ni guide de style).

**Aperçu exact du site en ligne** : `npx pagefind@1.5.2 --site public --serve` indexe `public/` et le sert sur http://localhost:1414.

Autre option sans Node.js : télécharger le binaire autonome `pagefind` (ou `pagefind_extended`) de la même version depuis la page des versions de Pagefind sur GitHub, puis `.\pagefind.exe --site public`.

## SEO et agents IA

Produits à chaque build (adresse du site : `https://www.excelcio.com/`, `baseURL` de `config/_default/hugo.toml`) :

| Fichier | Contenu |
|---|---|
| `sitemap.xml` | Pages publiques : ni `noindex`, ni offre fermée, ni page encore `placeholder: true` (en production) |
| `robots.txt` | Tout autorisé en production ; robots des agents IA réglés par `aiCrawlers.allow` (thème, défaut : autorisés) |
| `llms.txt`, `llms-full.txt` | Présentation d'Excelcio et liens par rubrique ; texte intégral des pages publiées. Rubriques : `[[llms.sections]]` de `config/_default/params.toml` |
| `…/index.md` | Version Markdown de chaque page, signalée dans le HTML (`<link rel="alternate" type="text/markdown">`) |
| `_redirects`, `redirects.htaccess` | Redirections des anciennes adresses WordPress, générées depuis `data/redirects.yaml` (Netlify / Cloudflare Pages ; exemple Apache à recopier dans le `.htaccess`) |

Chaque page porte aussi ses balises Open Graph et Twitter Card, une image de partage générée (aplat bordeaux et titre, 1200 × 630) quand elle n'a pas d'image, et ses données structurées JSON-LD (organisation, site, fil d'Ariane, puis formation, événement, article, offre d'emploi, service, bureaux ou FAQ selon la page). Aucune valeur provisoire (`[À RÉDIGER…]`, `[XX]`…) n'est publiée dans ces données.

Tant que le contenu reste en placeholders, `sitemap.xml` et `llms-full.txt` sont presque vides en production : c'est voulu.

**Redirections** : `data/redirects.yaml` a été prérempli depuis le sitemap du site actuel (556 adresses). Les lignes `check: true` sont des correspondances approximatives à vérifier. L'ancien site est servi sans « www » : la première règle redirige `excelcio.com` vers `www.excelcio.com`.

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
