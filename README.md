# Ce que la mer rend

Site litteraire immersif pour le roman **Ce que la mer rend**, une fiction medievale-fantastique situee sur l'ile sauvage de Brunehame, battue par les vents de l'Atlantique. Le recit suit Edrin, un chevalier blesse echoue sur le rivage, et Alma, une guerisseuse solitaire liee a la terre et aux plantes.

## Apercu

Le site plonge le visiteur dans l'univers du roman a travers une experience de lecture cinematique : falaises sombres, brume marine, lumieres d'ambre et typographie ancienne. Chaque section explore une facette de l'histoire -- les personnages, l'herbier d'Alma, l'equilibre entre destruction et reparation.

## Fonctionnalites

- **Page d'accueil immersive** -- Hero plein ecran avec parallaxe, preface avec lettrine, section personnages, herbier interactif, curseur d'equilibre thematique et inscription newsletter.
- **Lecture des chapitres** -- Table des matieres complete (`/chapitres`) et pages de lecture individuelles (`/chapitres/[id]`) avec navigation precedent/suivant. Les 30 chapitres sont extraits automatiquement du fichier source.
- **Herbier interactif** -- Quatre plantes medicinales (Consoude, Millepertuis, Bruyere, Lavande) avec descriptions, usages et liens narratifs.
- **Curseur d'equilibre** -- Interaction entre Destruction et Reparation qui revele differentes citations du roman.
- **Design adaptatif** -- Navigation responsive avec menu mobile, palette sombre (ardoise, bleu petrole, brun tourbe, ambre) et typographies Cinzel / Lora.

## Stack technique

| Outil | Version |
|---|---|
| Next.js (App Router) | 16 |
| React | 19 |
| Tailwind CSS | 3.4 |
| TypeScript | 5.7 |
| Lucide React | icons |
| shadcn/ui | composants |

## Structure du projet

```
app/
  layout.tsx              # Layout racine (polices Cinzel + Lora, metadata)
  page.tsx                # Page d'accueil (assemblage des sections)
  chapitres/
    page.tsx              # Table des matieres
    [id]/page.tsx         # Page de lecture d'un chapitre

components/
  navigation.tsx          # Barre de navigation fixe
  hero.tsx                # Section hero avec parallaxe
  preface.tsx             # Preface avec lettrine
  characters.tsx          # Profils d'Edrin et Alma
  herbarium.tsx           # Herbier interactif
  balance-slider.tsx      # Curseur Destruction / Reparation
  chapter-preview.tsx     # Apercu et lien vers les chapitres
  newsletter.tsx          # Formulaire d'inscription
  section-divider.tsx     # Separateur decoratif entre sections
  footer.tsx              # Pied de page

lib/
  chapters.ts             # Parseur du fichier texte en chapitres
  story-source.txt        # Texte integral du roman
```


Tous droits reserves. Le texte du roman et les illustrations sont la propriete de leur auteur.
