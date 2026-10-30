---
title: "Formats Markdown"
description: "Page de test : tous les formats Markdown reconnus par le site, avec leur syntaxe et leur rendu. Page de développement, jamais publiée en production."
sitemapHide: true
search: false
cta: false
seo:
  noindex: true
---

Cette page de test présente tous les formats Markdown reconnus par le site (moteur **Goldmark**, intégré à Hugo), avec pour chacun la syntaxe à écrire et le rendu obtenu. Elle n'existe qu'en développement (`hugo server`) et n'est jamais publiée.

Les éléments propres au site (encadrés, vidéos, chiffres clés…) sont des *shortcodes*, décrits dans `docs/CONTENU.md`, § 5.

## Paragraphes et retours à la ligne

Une ligne vide sépare deux paragraphes. Un simple retour à la ligne dans le fichier est ignoré ; pour forcer un retour à la ligne, terminer la ligne par une barre oblique inverse `\`.

{{< md-example >}}
Premier paragraphe, écrit
sur deux lignes dans le fichier.

Second paragraphe.\
Avec un retour à la ligne forcé.
{{< /md-example >}}

## Intertitres

`##` pour un intertitre principal, `###` et `####` pour les niveaux inférieurs. Le titre de la page (`#`) est réservé au champ `title` : ne pas l'utiliser dans le texte. Chaque intertitre reçoit une ancre automatique, utilisée par le sommaire des articles ; on peut la choisir avec `{#nom}`.

{{< md-example >}}
### Intertitre de niveau 3

#### Intertitre de niveau 4

### Intertitre avec ancre choisie {#mon-ancre}
{{< /md-example >}}

## Mise en valeur

{{< md-example >}}
Texte en *italique*, en **gras**, en ***gras italique***,
~~barré~~, et du `code en ligne`.
{{< /md-example >}}

## Listes

Tirets (ou astérisques) pour une liste à puces, chiffres suivis d'un point pour une liste numérotée. Indenter de 2 espaces (puces) ou 3 espaces (numéros) pour imbriquer.

{{< md-example >}}
- Qlik
- Power BI
  - Power BI Designer
  - Power BI Developer
- Tableau

1. Choisir la solution
2. Déployer
3. Former les équipes
{{< /md-example >}}

## Listes de tâches

{{< md-example >}}
- [x] Rédiger le titre
- [x] Rédiger la description
- [ ] Ajouter une image
{{< /md-example >}}

## Liens

Les liens internes s'écrivent avec l'adresse de la page (ou son chemin dans `content/fr/`) : le site vérifie qu'elle existe. Les liens externes reçoivent automatiquement `rel="noopener"`. Une adresse web écrite telle quelle devient cliquable.

{{< md-example >}}
Voir le [catalogue des formations](/formations/) ou la
[page Qlik](/solutions/qlik/ "Titre au survol").

Lien externe : [Hugo](https://gohugo.io/).
Adresse écrite telle quelle : https://gohugo.io/
Adresse électronique : <contact@excelcio.com>

Lien par référence : [la documentation][doc].

[doc]: https://gohugo.io/documentation/
{{< /md-example >}}

## Images

Le texte entre crochets est le **texte alternatif, obligatoire** (le site refuse de se construire sans). L'image est un fichier placé dans le dossier de la page, ou dans `assets/images/`. Les photos sont converties automatiquement en AVIF et WebP, en plusieurs tailles.

{{< md-example >}}
![Logo d'Excelcio](images/logo.svg)
{{< /md-example >}}

## Citations

{{< md-example >}}
> Une citation, qui peut tenir
> sur plusieurs lignes.
>
> > Et contenir une citation imbriquée.
{{< /md-example >}}

## Code

Code en ligne entre accents graves (`` ` ``). Bloc de code entre trois accents graves, avec le nom du langage pour la coloration syntaxique (`yaml`, `powershell`, `html`, `css`, `js`, `sql`…).

{{< md-example >}}
```yaml
sessions:
  - { start: 2026-10-01, city: "Paris" }
```

```powershell
hugo server
```

```
Bloc sans langage : pas de coloration.
```
{{< /md-example >}}

## Tableaux

La ligne de tirets sépare l'en-tête ; les deux-points règlent l'alignement (`:---` à gauche, `:---:` centré, `---:` à droite).

{{< md-example >}}
| Solution | Formations | Niveau de partenariat |
|:---------|:----------:|----------------------:|
| Qlik     | 20         | Partenaire Elite      |
| Jedox    | 2          | Partenaire certifié   |
| Tableau  | 3          | —                     |
{{< /md-example >}}

## Notes de bas de page

{{< md-example >}}
Le catalogue compte plus de 690 sessions depuis 2018[^1].

[^1]: Chiffre du site actuel d'Excelcio.
{{< /md-example >}}

## Listes de définitions

{{< md-example >}}
Formation inter-entreprises
: Session ouverte à plusieurs entreprises, dans nos locaux ou à distance.

Formation intra-entreprise
: Session organisée pour une seule entreprise, dans ses locaux.
{{< /md-example >}}

## Ligne de séparation

{{< md-example >}}
Avant la ligne.

---

Après la ligne.
{{< /md-example >}}

## Typographie automatique

Le site remplace automatiquement certains caractères : guillemets droits, tirets doubles et triples, points de suspension, apostrophes.

{{< md-example >}}
"Guillemets droits", l'apostrophe, 10--20 personnes,
une incise --- comme celle-ci --- et des points de suspension...
{{< /md-example >}}

Les guillemets droits deviennent des guillemets français, avec une espace fine insécable. On peut aussi saisir directement « et ».

## Classes sur un bloc

Une ligne `{.classe}` placée juste après un paragraphe lui applique un style du thème, par exemple `.lead` pour un chapeau.

{{< md-example >}}
Paragraphe mis en valeur comme un chapeau.
{.lead}
{{< /md-example >}}

## Échapper un caractère

Une barre oblique inverse devant un caractère Markdown l'affiche tel quel.

{{< md-example >}}
\*pas en italique\* et 1\. pas une liste
{{< /md-example >}}

## HTML brut : désactivé

Par sécurité, le HTML écrit dans le texte est supprimé : dans l'exemple ci-dessous, seul « Texte ? » s'afficherait. Hugo signale alors un avertissement (« Raw HTML omitted ») en indiquant le fichier concerné. Utiliser le Markdown ou les shortcodes.

```html
Texte <span style="color: red">en rouge</span> ?
```

## Surligné, inséré, indice, exposant

Extensions activées pour le site. Le barré garde la syntaxe `~~…~~` ; un **tilde simple** produit un indice.

{{< md-example >}}
Texte ==surligné==, texte ++inséré++, texte ~~supprimé~~.

Indice : H~2~O, CO~2~. Exposant : m^2^, 1^er^ janvier, 10^6^.
{{< /md-example >}}

## Formulaire Google (shortcode)

Shortcode `google-form` (voir `docs/CONTENU.md`, § 5) : rien n'est chargé depuis Google avant le clic sur « Afficher le formulaire ». Formulaire de test fourni par Excelcio.

```text
{{</* google-form url="https://docs.google.com/forms/d/e/1FAIpQLSdQVG3jwob9AEu_HOGityK7ZIkifE0mlJip_fQ5DJ5AnAa1uQ/viewform" title="Formulaire de test" height="1311" */>}}
Texte d'introduction facultatif, en **Markdown**.
{{</* /google-form */>}}
```

{{< google-form url="https://docs.google.com/forms/d/e/1FAIpQLSdQVG3jwob9AEu_HOGityK7ZIkifE0mlJip_fQ5DJ5AnAa1uQ/viewform?embedded=true" title="Formulaire de test" height="1311" >}}
Texte d'introduction facultatif, en **Markdown**.
{{< /google-form >}}
