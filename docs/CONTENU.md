# Guide de rédaction

Ce guide explique comment remplir et modifier le contenu du site. Aucune connaissance technique n'est nécessaire au-delà de l'édition de fichiers texte.

## 1. Principes

- **Tout le contenu est dans `content/fr/`**, en fichiers Markdown (`.md`).
- Chaque fichier commence par un **en-tête** (le *front matter*), entre deux lignes `---`, qui contient les champs de la page (titre, description, listes…). Le texte libre de la page vient **après** le second `---`.
- Les textes provisoires sont des **consignes** entre crochets : `[À RÉDIGER — …]`. Les chiffres inconnus sont notés `[XX]`. Remplacez la consigne entière, crochets compris.
- Quand une page est terminée, **supprimez la ligne `placeholder: true`**. Le badge jaune « Contenu provisoire » disparaît, ainsi que l'avertissement au build de production. Tant que la ligne est présente, les dates s'affichent « [Date à confirmer] ».
- Pour voir le résultat : `hugo server`, puis http://localhost:1313/. La page se met à jour à chaque enregistrement ; en cas d'erreur, le terminal indique le fichier et la ligne.

### Règles de syntaxe (YAML)

- L'**indentation** compte : gardez les mêmes espaces que les lignes voisines, jamais de tabulation.
- Un texte contenant `:` ou `#` doit être entre guillemets : `title: "Qlik : les nouveautés"`.
- Un texte contenant des guillemets doubles s'entoure d'apostrophes simples, ou utilise les guillemets français « ».
- Une liste s'écrit `[a, b]` sur une ligne, ou avec des tirets sur plusieurs lignes.

### Champs communs à toutes les pages

| Champ | Rôle |
|---|---|
| `title` | Titre de la page (H1) et du lien dans les listes |
| `description` | Description pour les moteurs de recherche, 120 à 160 caractères |
| `summary` | Accroche affichée sur les cartes (facultative) |
| `date` | Date de publication, jamais dans le futur (sinon la page n'est pas publiée) |
| `weight` | Ordre d'affichage dans les listes (plus petit = en premier) |
| `image`, `imageAlt` | Image principale : nom d'un fichier placé **dans le dossier de la page** (ex. `cover.jpg`) et son texte alternatif, **obligatoire** (le build s'arrête sinon). Le site produit automatiquement les formats AVIF et WebP |
| `placeholder` | `true` tant que le contenu est provisoire |
| `seo.title`, `seo.noindex` | Titre différent pour les moteurs de recherche ; `noindex: true` pour exclure la page |
| `cta` | Appel à l'action en bas de page : `false` pour le retirer, ou un bloc `title`/`primary`/`secondary` pour le remplacer. Par défaut : celui de `config/_default/params.toml` |

## 2. Créer une page

Chaque rubrique a un modèle. Depuis la racine du projet :

```powershell
hugo new content --kind training    formations/mon-slug/index.md
hugo new content --kind solution    solutions/mon-slug/index.md
hugo new content --kind expertise   offre/expertise/mon-slug/index.md
hugo new content --kind case-study  cas-clients/mon-slug/index.md
hugo new content --kind article     actualites/mon-slug/index.md
hugo new content --kind event       evenements/mon-slug/index.md
hugo new content --kind job         recrutement/mon-slug/index.md
```

Le chemin est relatif à `content/fr/`. Le nom du dossier (`mon-slug`) devient l'adresse de la page : minuscules, sans accents, mots séparés par des tirets. Les images de la page se déposent dans ce même dossier.

## 3. Rubrique par rubrique

### Page d'accueil — `content/fr/_index.md`

Liste ordonnée `sections:` ; chaque bloc a un `type`. Réordonner, supprimer ou masquer (`hidden: true`) un bloc ne demande aucun autre réglage, les espacements s'ajustent seuls.

**Chaque information n'est saisie qu'une fois.** Les blocs « Expertises », « Cas clients », « Solutions » et « Prochaines formations » **lisent les fiches** : pour changer un nom, un résultat ou une accroche, modifiez la fiche, l'accueil suit. Dans ces blocs, on choisit seulement quoi afficher : rien (toutes les fiches, par ordre de `weight`), `items: ["/cas-clients/client-1", …]` (fiches choisies, dans cet ordre) et `limit` (nombre maximum). Champs de chaque type : `themes/excelcio/README.md`, tableau « Sections ». Les trois piliers sous le titre et la signature du footer sont dans `config/_default/params.toml`.

### Solutions — `content/fr/solutions/<solution>/index.md`

| Champ | Rôle |
|---|---|
| `partnerName` | Nom affiché de l'éditeur |
| `partnerLevel` | Badge de partenariat (ex. « Partenaire Elite ») ; **vide = pas de badge** |
| `tagline` | Promesse, affichée sous le titre |
| `features` | Liste `{ title, text }` : ce que permet la solution |
| `faq` | Liste `{ q, a }` |
| Texte libre | Bloc « Ce qu'Excelcio apporte » |

Le champ `visual` choisit l'illustration de la solution sur l'accueil (`bars`, `grid`, `line`, `kpi`, `search`, `table`, `report`). Le champ `menus` place la page dans le mega-menu et le footer : le libellé est le titre de la page, rien à recopier dans `menus.fr.toml`.

Les formations, cas clients et actualités de la solution s'affichent **automatiquement** : il suffit que ces pages citent le nom du dossier de la solution dans leur champ `solutions` (ex. `solutions: [qlik]`).

### Domaines d'expertise — `content/fr/offre/expertise/<domaine>/index.md`

`solutions` (badges), `benefits` (liste `{ title, text }`), `kpis` (liste de libellés), `faq`, texte libre = « Notre approche ». Les cas clients dont le champ `expertises` cite le domaine s'affichent automatiquement.

### Formations — `content/fr/formations/<formation>/index.md`

| Champ | Rôle |
|---|---|
| `code` | Code catalogue |
| `solutions` | Solution(s) concernée(s), ex. `[qlik]` : range la formation dans le catalogue (étiquette de filtre et groupe) et sur la page solution. Une solution sans page apparaît quand même au catalogue, avec un nom déduit du nom de dossier (`google-looker` → « Google Looker ») ; sans `solutions`, la formation est rangée dans « Autres formations » |
| `level`, `format` | Niveau et format (texte libre). Les filtres du catalogue apparaissent dès que **deux valeurs différentes** existent. Le filtre par solution s'affiche en étiquettes cliquables, avec le nombre de formations de chaque solution |
| `durationDays` | Durée en jours (`0` = « [Durée] ») |
| `price` | Tarif affiché ; vide = « Sur demande » |
| `objectives`, `audience`, `prerequisites` | Listes de puces |
| `program` | Liste `{ title, items: [...] }` : un module par ligne d'accordéon |
| `sessions` | Liste `{ start: 2026-10-01, end: 2026-10-02, city: "Paris", format: "Présentiel" }` (dates au format AAAA-MM-JJ, sans guillemets ; `end` facultatif ; heure possible : `2026-10-01T09:00:00+02:00`). Affichage : « 1 – 2 octobre 2026 · Paris · Présentiel ». Les dates de session s'affichent toujours, même si la fiche est encore `placeholder: true`. Une session reste visible jusqu'à la fin de son dernier jour ; seules les sessions futures s'affichent, sur la fiche et dans « Prochaines sessions ». Sur l'accueil, le bloc « Prochaines sessions » n'apparaît que s'il existe au moins une session à venir |
| `registration` | `{ type: external, url: "https://…" }` pour un outil d'inscription externe ; sinon, demande via la page contact |

Les 28 intitulés proviennent du catalogue public du site actuel ; les adresses reprennent les identifiants d'origine.

### Cas clients — `content/fr/cas-clients/<cas>/index.md`

`client` (**aucun nom réel sans accord écrit du client**), `sector` (secteur d'activité en clair, ex. `"Industrie"` : il crée l'étiquette de filtre de la page Cas clients ; écrivez-le à l'identique d'une fiche à l'autre ; le filtre n'apparaît qu'à partir de deux secteurs différents), `result` (titre de la carte), `solutions`, `expertises`, `context`, `challenge`, `solution` (Markdown accepté), `results` (liste `{ value, label }`), `quote` (`{ text, author, role }`), `image` et `imageAlt`. L'image de la fiche est **reprise automatiquement** sur les cartes de l'accueil et des listes ; sans image, la carte garde l'aplat de couleur.

### Actualités — `content/fr/actualites/<article>/index.md`

`authors`, `categories`, `tags`, `solutions`, `image`/`imageAlt`. Le texte s'écrit en Markdown ; les intertitres `##` et `###` alimentent le sommaire automatique. Le temps de lecture est calculé.

### Événements — `content/fr/evenements/<evenement>/index.md`

`start` (date et heure de l'événement), `end` (facultative), `online` (`true`/`false`), `city`, `venue`, `format`, `program` (liste `{ time, title, text }`), `speakers` (liste `{ name, role }`), `registration`. **`date` est la date de publication**, pas celle de l'événement. Un événement passe automatiquement dans « Événements passés » après sa date.

### Recrutement — `content/fr/recrutement/`

`_index.md` : présentation employeur. Chaque offre : **`active`** (`true` = annonce ouverte et listée ; `false` ou absent = poste fermé : l'offre disparaît de la liste et du plan du site, sa page reste accessible avec la mention « Ce poste n'est plus ouvert », sans bouton de candidature, et n'est pas indexée), `location`, `contract`, `remote`, `validThrough`, `missions`, `profile`, texte libre. Le bouton « Postuler » ouvre un e-mail vers l'adresse de recrutement (`config/_default/params.toml`). Si aucune offre n'est active, la page Recrutement l'indique et propose la candidature spontanée.

### Pages institutionnelles

`a-propos.md`, `contact.md`, `newsletter.md`, `mentions-legales.md`, `confidentialite.md`, `accessibilite.md` : texte libre en Markdown. Les adresses des bureaux sont dans `data/offices.yaml`, les réseaux sociaux dans `data/social.yaml`.

## 4. Mise en forme du texte (Markdown)

Tous les formats reconnus, avec leur syntaxe et leur rendu, sont présentés sur la page de test **http://localhost:1313/styleguide/markdown/** (développement uniquement). Rappel des syntaxes courantes :

| Rendu | Syntaxe |
|---|---|
| *italique*, **gras** | `*italique*`, `**gras**` |
| barré | `~~barré~~` |
| surligné, inséré | `==surligné==`, `++inséré++` |
| exposant, indice | `1^er^`, `m^2^` ; `H~2~O` (un seul tilde) |
| lien | `[texte](/formations/)` |
| image | `![texte alternatif obligatoire](photo.jpg)` |

Les guillemets droits `"…"` deviennent automatiquement des guillemets français « … ». Le HTML écrit dans le texte est supprimé (sécurité) : utiliser le Markdown ou les shortcodes ci-dessous.

## 5. Mise en forme dans le texte (shortcodes)

````markdown
{{< callout title="À retenir" >}}
Texte en **Markdown**.
{{< /callout >}}

{{< figure src="schema.png" alt="Description de l'image" caption="Légende" >}}

{{< video id="IDENTIFIANT_YOUTUBE" title="Titre de la vidéo" >}}

{{< button url="/contact/" >}}Nous contacter{{< /button >}}

{{< cta title="Un projet ?" url="/contact/" label="Nous contacter" >}}Texte court.{{< /cta >}}

{{< stats >}}
690+ | sessions de formation depuis 2018
{{< /stats >}}

{{< columns >}}
Première colonne
---col---
Deuxième colonne
{{< /columns >}}
````

La vidéo YouTube ne charge rien depuis YouTube tant que le visiteur n'a pas cliqué (respect de la vie privée).

## 6. Menus et pied de page

`config/_default/menus.fr.toml` : menu principal (mega-menu) et colonnes du footer. Voir les commentaires en tête du fichier.
