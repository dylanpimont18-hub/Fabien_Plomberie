# DESIGN SYSTEM — Frémont Plomberie Services

> Version 1.0 — proposition soumise à validation avant tout code.
> Méthode : analyse produit → direction artistique → palette vérifiée WCAG → typographie → tokens → composants → motion → logotype → checklist UX.

---

## 0. Résumé en une page

| Axe | Décision |
|---|---|
| **Positionnement** | « Artisan d'excellence » : éditorial, sobre, haut de gamme. Le site d'un plombier qui se présente comme un architecte présenterait son agence. |
| **Signature** | Le **cuivre** (#B87333) : référence directe aux tuyaux en cuivre. Utilisé avec parcimonie, comme un métal précieux, jamais en aplats massifs. |
| **Fond** | Ivoire chaud (#F6F3EE) en page, bleu nuit (#0E1A2B) pour les sections « poids » (CTA final, manifeste, footer). |
| **Titres** | Fraunces (serif display, axes optiques « opsz » et « SOFT ») auto-hébergée en woff2. |
| **Texte** | Inter (sans-serif), auto-hébergée en woff2. |
| **Grille** | 12 colonnes, gouttière 24 px, largeur de lecture 68 ch, conteneur max 1280 px. |
| **Motion** | Lente et discrète : 240–700 ms, courbe « ease-out-quart ». Tout désactivé sous `prefers-reduced-motion`. |
| **Ce qu'on bannit** | Bleu criard, clipart de clé à molette, photo de stock de plombier souriant, dégradés arc-en-ciel, ombres portées lourdes, icônes pleines colorées, animations « wow » gratuites, pop-ups. |

---

## 1. Analyse produit (étape 1 de la méthode)

**Type de produit** : site vitrine d'artisan local, services à domicile, conversion par appel téléphonique ou formulaire de devis. Trafic majoritairement **mobile** (recherche locale « plombier Vierzon » depuis un téléphone, souvent en situation de stress : fuite, panne d'eau chaude).

**Deux publics, deux rythmes de lecture :**

1. **L'urgence** (fuite, plus d'eau chaude) : veut un numéro de téléphone en moins de 3 secondes. → Numéro visible dans le header, barre d'appel fixe sur mobile, bouton « Appeler » dans le hero.
2. **Le projet** (salle de bain, chauffe-eau à remplacer, cuisine) : compare plusieurs artisans, cherche de la confiance et du soin. → Image premium, méthode en 4 étapes, portrait, avis, réalisations, formulaire de devis en 3 écrans.

**Ce qui différencie Frémont Plomberie Services** (données réelles uniquement) : entreprise jeune (juillet 2024) portée par 7 ans d'expérience salariée, un interlocuteur unique du devis au chantier, valeurs d'écoute et de travail soigné, ancrage à Vignoux-sur-Barangeon avec un rayon de 50 km autour de Vierzon.

**Conclusion design** : un site qui respire (beaucoup de blanc ivoire), des titres serif qui donnent de la tenue, un seul accent chaud (le cuivre), des photos de chantier traitées comme des photos d'architecture. Le contraire d'un template d'artisan.

---

## 2. Direction artistique

### 2.1 Mots-clés
**Précis · Chaleureux · Patient · Discret · Durable.**

### 2.2 Références d'esprit (pas de copie)
- Sites d'architectes d'intérieur et d'ateliers d'artisanat haut de gamme : grandes marges, un titre serif par écran, photographie en pleine largeur, texte court.
- Marques premium d'équipement de la maison : palette neutre + un métal.
- Presse magazine (mise en page « manifeste ») : grande citation sur colonne étroite, filet fin, numérotation en petites capitales.

### 2.3 Principes de composition
1. **Un seul point chaud par écran.** Le cuivre apparaît une fois par section : un bouton, un filet, un chiffre, un monogramme. Jamais deux boutons cuivre côte à côte.
2. **Asymétrie contrôlée.** Hero en 7/5 colonnes, bento grid de services avec une carte dominante, portrait décalé par rapport à la grille. L'asymétrie fait « magazine », la symétrie fait « template ».
3. **Filets plutôt qu'ombres.** Les séparations se font par des filets de 1 px (ivoire-3 sur ivoire, nuit-2 sur nuit) et par la couleur de fond, pas par des ombres portées. Les ombres sont réservées aux éléments flottants (header opaque, barre mobile, slider).
4. **Rayons courts.** 4 à 12 px : des angles nets, légèrement adoucis, jamais de « pilule » sauf sur les badges.
5. **Texte court, hiérarchie forte.** Titres serif à l'échelle, paragraphe max 68 caractères par ligne, un seul H1.
6. **La photo est traitée, jamais brute.** Ratio imposé, voile ivoire ou bleu nuit à 8–12 %, léger grain, coin supérieur gauche marqué d'un filet cuivre (signature visuelle des photos de chantier).

### 2.4 Imagerie et placeholders (mode maquette)
Aucune photo de stock ne sera présentée comme un chantier de Fabien Frémont. Tant que les photos réelles manquent, un composant `.ph` (placeholder) applique **le traitement final** :
- fond : dégradé très doux ivoire-2 → ivoire-3 (ou nuit-2 → nuit-3 en section sombre) ;
- motif : fines lignes diagonales à 45° (opacité 6 %) rappelant une trame d'atelier ;
- mention centrée en petites capitales Inter 12 px, lettrage espacé : « PHOTO CHANTIER À FOURNIR » ;
- un filet cuivre de 2 px × 32 px dans le coin supérieur gauche ;
- ratio verrouillé : 4/5 (portrait), 3/2 (chantier), 16/9 (hero), 1/1 (vignette).

Quand la vraie photo arrive, on remplace le contenu de la boîte : rien d'autre ne bouge.

---

## 3. Palette (contrastes vérifiés)

### 3.1 Couleurs de marque

| Token | Hex | Rôle |
|---|---|---|
| `--c-nuit` | **#0E1A2B** | Bleu nuit. Fond des sections fortes, texte de titre sur ivoire, texte sur bouton cuivre. |
| `--c-nuit-2` | #15243A | Surface relevée sur fond nuit (cartes, footer colonnes). |
| `--c-nuit-3` | #1F3350 | Bordures et filets sur fond nuit, états hover sombres. |
| `--c-cuivre` | **#B87333** | **Signature.** Boutons primaires, filets, monogramme, chiffres de la timeline. **Jamais pour du texte courant.** |
| `--c-cuivre-clair` | #D9A066 | Cuivre sur fond nuit (texte, liens, icônes), hover du bouton primaire. |
| `--c-cuivre-encre` | #8A5422 | Cuivre « encre » : texte, liens et labels cuivre sur fond ivoire. |
| `--c-ivoire` | **#F6F3EE** | Fond de page. |
| `--c-ivoire-2` | #EFEAE2 | Surface relevée sur ivoire (cartes de service, champs de formulaire). |
| `--c-ivoire-3` | #E6DFD4 | Bordures, filets, fond de placeholder. |
| `--c-anthracite` | **#1C1F24** | Texte courant. |
| `--c-gris` | #5A5E66 | Texte secondaire, légendes, méta. |
| `--c-gris-clair` | #B9BDC4 | Texte secondaire sur fond nuit. |
| `--c-blanc` | #FFFFFF | Fond des champs de formulaire actifs, header opaque. |

### 3.2 Couleurs fonctionnelles

| Token | Hex | Rôle |
|---|---|---|
| `--c-succes` | #2E6B4A | Validation de champ, message « merci ». |
| `--c-erreur` | #A8362C | Erreur de champ (toujours accompagnée d'un texte et d'une icône, jamais la couleur seule). |
| `--c-focus` | = `--c-cuivre` sur ivoire, `--c-cuivre-clair` sur nuit | Anneau de focus clavier, 3 px, décalé de 2 px. |

### 3.3 Table de contrastes (WCAG 2.1, calculée)

Seuils : AA texte courant ≥ 4,5 ; AA texte large (≥ 24 px ou ≥ 18,66 px gras) ≥ 3 ; composants UI et graphiques ≥ 3.

| Premier plan | Fond | Ratio | Verdict | Usage autorisé |
|---|---|---|---|---|
| Anthracite #1C1F24 | Ivoire #F6F3EE | **14,93** | AAA | Texte courant |
| Anthracite #1C1F24 | Ivoire-2 #EFEAE2 | 13,80 | AAA | Texte dans cartes |
| Nuit #0E1A2B | Ivoire #F6F3EE | **15,79** | AAA | Titres |
| Gris #5A5E66 | Ivoire #F6F3EE | 5,88 | AA | Texte secondaire, légendes |
| Gris #5A5E66 | Ivoire-2 #EFEAE2 | 5,43 | AA | Texte secondaire dans cartes |
| Cuivre-encre #8A5422 | Ivoire #F6F3EE | 5,63 | AA | Liens, labels, surtitres cuivre |
| Cuivre-encre #8A5422 | Ivoire-2 #EFEAE2 | 5,20 | AA | Idem dans cartes |
| **Cuivre #B87333** | Ivoire #F6F3EE | **3,43** | ✗ texte courant · ✓ texte large · ✓ UI | Titres ≥ 24 px, filets, icônes, bordures de bouton |
| Cuivre #B87333 | Ivoire-2 #EFEAE2 | 3,17 | ✓ UI seulement | Filets, icônes |
| **Nuit #0E1A2B** | **Cuivre #B87333** | **4,61** | AA | **Texte du bouton primaire** |
| Nuit #0E1A2B | Cuivre-clair #C27F3F (hover) | 5,33 | AA | Texte du bouton primaire au survol |
| Blanc #FFFFFF | Cuivre #B87333 | 3,79 | ✗ | **Interdit** (texte blanc sur cuivre) |
| Ivoire #F6F3EE | Nuit #0E1A2B | **15,79** | AAA | Texte sur sections sombres |
| Ivoire #F6F3EE | Nuit-2 #15243A | 14,10 | AAA | Texte dans cartes sombres |
| Cuivre-clair #D9A066 | Nuit #0E1A2B | **7,63** | AAA | Liens, chiffres, icônes sur nuit |
| Cuivre-clair #D9A066 | Nuit-2 #15243A | 6,82 | AA | Idem dans cartes sombres |
| Cuivre #B87333 | Nuit #0E1A2B | 4,61 | AA | Texte large et UI sur nuit (filets, focus) |
| Gris-clair #B9BDC4 | Nuit #0E1A2B | 9,27 | AAA | Texte secondaire sur nuit |
| Ivoire #F6F3EE | Cuivre-encre #8A5422 | 5,63 | AA | Badge ou étiquette cuivre foncé |
| Ivoire #F6F3EE | Succès #2E6B4A | 5,72 | AA | Message de succès inversé |
| Erreur #A8362C | Ivoire #F6F3EE | 5,88 | AA | Message d'erreur |
| Succès #2E6B4A | Ivoire #F6F3EE | 5,72 | AA | Message de succès |

**Décisions qui en découlent :**
- Le bouton primaire est **cuivre avec texte bleu nuit** (4,61), pas texte blanc. Au survol il **s'éclaircit** (#C27F3F, 5,33) : « le cuivre se polit », plutôt que de s'assombrir, ce qui ferait tomber le contraste à 3,83.
- Tout texte cuivre sur ivoire utilise `--c-cuivre-encre` ; le cuivre pur est réservé aux titres larges, aux filets, aux icônes et aux fonds de bouton.
- Sur fond nuit, le cuivre monte d'un cran (`--c-cuivre-clair`) pour rester lisible.

### 3.4 Mode sombre
Pas de thème sombre global : le site est un objet éditorial ivoire. Les sections bleu nuit apportent le contraste de rythme. `color-scheme: light` déclaré pour éviter l'inversion des contrôles natifs.

---

## 4. Typographie

### 4.1 Familles

| Rôle | Police | Graisses | Format | Fallback |
|---|---|---|---|---|
| Display / titres | **Fraunces** (variable : `opsz` 9–144, `wght` 300–700, `SOFT` 0–100) | 300 (hero), 400 (titres), 500 (sous-titres) | woff2 auto-hébergé, `font-display: swap`, preload | Georgia, "Times New Roman", serif |
| Texte / UI | **Inter** (variable : `wght` 400–700) | 400, 500, 600 | woff2 auto-hébergé, preload | system-ui, -apple-system, "Segoe UI", sans-serif |

Pourquoi Fraunces : ses axes optiques permettent un hero à 300 avec `SOFT` ≈ 50 (empattements arrondis, chaleur) et des titres de carte plus fermes à 400 `SOFT` 0. Une seule famille, deux personnalités. Alternative acceptable si problème de licence ou de poids : **Newsreader** (Google Fonts, OFL) ou **Playfair Display** (plus classique, moins chaleureuse).

Sous-ensemble latin (les accents français sont dans la plage U+0000-00FF) ; axes restreints à l'usage réel (Fraunces : `wght` 300–600, `opsz` 9–144, `SOFT` figé à 30 ; Inter : `wght` 400–700, `opsz` figé). Les deux fichiers woff2 pèsent ≈ 62 ko + 50 ko. `size-adjust` et `ascent-override` définis sur les fallbacks pour limiter le CLS pendant le swap.

### 4.2 Échelle fluide (clamp)
Base : 16 px mobile → 18 px desktop pour le corps. Ratio ≈ 1,25 mobile, 1,333 desktop.

| Token | clamp() | Mobile ≈ | Desktop ≈ | Usage |
|---|---|---|---|---|
| `--fs-display` | `clamp(2.75rem, 1.8rem + 4.2vw, 5.5rem)` | 44 px | 88 px | H1 hero |
| `--fs-h1` | `clamp(2.25rem, 1.6rem + 2.8vw, 4rem)` | 36 px | 64 px | H1 pages intérieures |
| `--fs-h2` | `clamp(1.75rem, 1.3rem + 1.8vw, 2.75rem)` | 28 px | 44 px | Titres de section |
| `--fs-h3` | `clamp(1.375rem, 1.15rem + 0.9vw, 1.875rem)` | 22 px | 30 px | Titres de carte |
| `--fs-h4` | `clamp(1.125rem, 1.05rem + 0.3vw, 1.25rem)` | 18 px | 20 px | Sous-titres |
| `--fs-quote` | `clamp(1.75rem, 1.2rem + 2.4vw, 3.25rem)` | 28 px | 52 px | Citation manifeste |
| `--fs-lead` | `clamp(1.125rem, 1.05rem + 0.4vw, 1.375rem)` | 18 px | 22 px | Chapô, sous-titre hero |
| `--fs-body` | `clamp(1rem, 0.95rem + 0.25vw, 1.125rem)` | 16 px | 18 px | Texte courant |
| `--fs-small` | `clamp(0.875rem, 0.85rem + 0.1vw, 0.9375rem)` | 14 px | 15 px | Méta, légendes, footer |
| `--fs-eyebrow` | `0.75rem` | 12 px | 12 px | Surtitres en petites capitales, lettrage 0,14 em |

### 4.3 Règles de composition
- Interlignage : titres 1,05–1,15 ; corps 1,6 ; petites capitales 1,4.
- Titres Fraunces : `letter-spacing: -0.01em`, `font-variation-settings: "opsz" 144`. Pas de gras lourd : 400 max au-dessus de 36 px.
- Surtitres (« eyebrow ») : Inter 600, 12 px, capitales, `letter-spacing: 0.14em`, couleur cuivre-encre, précédés d'un filet cuivre de 24 px.
- Mesure : `max-width: 68ch` pour tout bloc de texte ; 40ch pour les chapôs de hero.
- Chiffres : `font-variant-numeric: tabular-nums` dans la timeline et les listes de prix (le jour où il y en aura).
- Césure : `hyphens: auto` + `lang="fr"` sur les paragraphes longs uniquement (articles conseils).
- Le téléphone s'écrit toujours « 06 46 39 61 06 » avec des espaces insécables.

---

## 5. Tokens

Tous exposés en variables CSS sur `:root` (fichier `src/assets/css/tokens.css`, inliné dans le CSS critique).

### 5.1 Espacements (base 8 px)

| Token | Valeur | Usage |
|---|---|---|
| `--sp-1` | 0.25rem (4) | Micro-gaps (icône/texte) |
| `--sp-2` | 0.5rem (8) | Gap intérieur de badge |
| `--sp-3` | 0.75rem (12) | Padding vertical de bouton |
| `--sp-4` | 1rem (16) | Gouttière mobile, padding de champ |
| `--sp-5` | 1.5rem (24) | Gouttière desktop, padding de carte |
| `--sp-6` | 2rem (32) | Écart entre éléments d'une section |
| `--sp-7` | 3rem (48) | Écart titre → contenu |
| `--sp-8` | 4rem (64) | Marge interne de section mobile |
| `--sp-9` | 6rem (96) | Marge interne de section desktop |
| `--sp-10` | 8rem (128) | Hero, CTA final |
| `--section-y` | `clamp(var(--sp-8), 6vw + 1rem, var(--sp-9))` | Padding vertical fluide des sections |
| `--gutter` | `clamp(var(--sp-4), 4vw, var(--sp-5))` | Marge latérale |

### 5.2 Mise en page

| Token | Valeur |
|---|---|
| `--container` | 80rem (1280 px) |
| `--container-narrow` | 46rem (736 px) — articles, mentions légales |
| `--measure` | 68ch |
| `--grid-cols` | 12 |
| `--grid-gap` | var(--sp-5) |
| `--header-h` | 4.5rem (72 px) ; 4rem mobile |
| `--mobile-bar-h` | 3.75rem (60 px) |

### 5.3 Rayons

| Token | Valeur | Usage |
|---|---|---|
| `--r-xs` | 2px | Filets, barre de progression |
| `--r-sm` | 4px | Boutons, champs |
| `--r-md` | 8px | Cartes de service |
| `--r-lg` | 12px | Bento dominante, visuels |
| `--r-pill` | 999px | Badges de réassurance, puces de commune sur la carte |

### 5.4 Ombres (réservées aux éléments flottants)

| Token | Valeur |
|---|---|
| `--sh-1` | `0 1px 2px rgb(14 26 43 / .06), 0 1px 1px rgb(14 26 43 / .04)` — cartes au survol |
| `--sh-2` | `0 8px 24px -8px rgb(14 26 43 / .18)` — header opaque, slider |
| `--sh-3` | `0 -4px 20px -6px rgb(14 26 43 / .22)` — barre d'appel mobile |
| `--sh-cuivre` | `0 8px 24px -10px rgb(184 115 51 / .45)` — bouton primaire au survol |

### 5.5 Bordures

| Token | Valeur |
|---|---|
| `--bd` | `1px solid var(--c-ivoire-3)` |
| `--bd-nuit` | `1px solid var(--c-nuit-3)` |
| `--bd-cuivre` | `1px solid var(--c-cuivre)` |
| `--focus` | `0 0 0 3px var(--c-ivoire), 0 0 0 6px var(--c-cuivre)` (sur nuit : `var(--c-nuit)` puis `var(--c-cuivre-clair)`) |

### 5.6 Motion

| Token | Valeur | Usage |
|---|---|---|
| `--d-fast` | 160ms | Hover de lien, focus |
| `--d-base` | 240ms | Boutons, cartes, header |
| `--d-slow` | 480ms | Révélation au scroll |
| `--d-reveal` | 700ms | Titres ligne par ligne, hero |
| `--e-out` | `cubic-bezier(0.22, 1, 0.36, 1)` (ease-out-quart) | Entrées, révélations |
| `--e-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` | Accordéon, slider |
| `--e-std` | `cubic-bezier(0.4, 0, 0.2, 1)` | Hover |
| `--reveal-y` | 16px | Décalage vertical des entrées |
| `--stagger` | 60ms | Écart entre cartes d'une même grille |

### 5.7 Breakpoints (mobile-first) et container queries

| Nom | Media query | Notes |
|---|---|---|
| `sm` | `min-width: 36em` (576) | 2 colonnes de badges |
| `md` | `min-width: 48em` (768) | Nav desktop, bento 2 colonnes, timeline horizontale |
| `lg` | `min-width: 64em` (1024) | Hero 7/5, bento 4 colonnes, barre mobile masquée |
| `xl` | `min-width: 80em` (1280) | Conteneur plein |

Les cartes de service et le bloc portrait utilisent `container-type: inline-size` : elles passent en disposition horizontale à partir de `@container (min-width: 28rem)`, indépendamment du viewport.

### 5.8 Z-index

`--z-header: 50 · --z-mobile-bar: 60 · --z-demo-banner: 70 · --z-menu: 80 · --z-skip: 100`

---

## 6. Composants

Chaque composant : anatomie, variantes, états, accessibilité.

### 6.1 Boutons

| Variante | Fond | Texte | Bordure | Hover | Usage |
|---|---|---|---|---|---|
| **Primaire** `.btn--primary` | cuivre | nuit (600) | aucune | fond #C27F3F, `--sh-cuivre`, translation Y −1 px | Appeler, Demander un devis, Envoyer |
| **Secondaire** `.btn--secondary` | transparent | nuit | 1 px nuit | fond nuit, texte ivoire | Second choix (ex. « Voir les services ») |
| **Secondaire sur nuit** `.btn--secondary.on-dark` | transparent | ivoire | 1 px ivoire à 40 % | fond ivoire, texte nuit | Sections sombres |
| **Lien** `.btn--link` | aucun | cuivre-encre (sur nuit : cuivre-clair) | soulignement 1 px à 60 %, décalé 4 px | soulignement 100 %, flèche → glisse de 4 px | « En savoir plus », liens de carte |

Anatomie : hauteur 48 px (44 min mobile), padding `12px 24px`, Inter 600 15–16 px, rayon `--r-sm`, lettrage 0,01 em, icône optionnelle 20 px à droite (flèche fine) ou à gauche (combiné). Icône téléphone + numéro dans le header : variante primaire, padding réduit.

États : `:focus-visible` → `--focus` ; `:disabled` → opacité 0,5, curseur `not-allowed` ; `[aria-busy]` → spinner 16 px remplaçant l'icône, libellé « Envoi… ».

### 6.2 Carte de service `.card-service`

Anatomie : surface ivoire-2 · rayon `--r-md` · padding `--sp-5` · pictogramme 32 px trait 1,5 px cuivre (goutte, flamme, douche, radiateur, évier) · H3 Fraunces · description 2 lignes · lien « Découvrir → ». Toute la carte est cliquable (`<a>` englobant, texte accessible = titre).

Hover (desktop, pointer fin) : fond → blanc, `--sh-1`, filet supérieur cuivre 2 px qui se déploie de 0 à 100 % en `--d-base`, flèche glisse de 4 px. Pas de zoom, pas de rotation.

### 6.3 Bento grid `.bento`

Desktop : 4 colonnes × 2 rangées, `grid-template-areas` :
```
"dep dep ce  reno"
"dep dep cuis chauf"
```
Dépannage occupe 2 × 2 (carte dominante, fond nuit, texte ivoire, pictogramme cuivre-clair, mention « Intervention rapide »). Les 4 autres : ivoire-2. Tablette : 2 colonnes (dépannage pleine largeur). Mobile : 1 colonne.

Révélation au scroll avec `--stagger` 60 ms entre cartes.

### 6.4 Badges de réassurance `.badge`

Pilule ivoire-2, bordure ivoire-3, padding `8px 16px`, icône 18 px cuivre, texte Inter 500 14 px anthracite. Contenu réel uniquement : « Artisan local · Vignoux-sur-Barangeon », « Devis gratuit », « Interlocuteur unique », « [À COMPLÉTER : assurance décennale] » (le placeholder est stylé en italique gris avec bordure pointillée pour qu'on ne l'oublie pas).

Bandeau : flex, wrap, centré, `gap: var(--sp-3)`, défilement horizontal à inertie sur mobile (`scroll-snap`), sans masquer la barre de scroll (visible et fine).

### 6.5 Accordéon FAQ `.faq`

`<details>` natif + `<summary>` : question Fraunces 500 20 px, icône « + » qui pivote en « × » (rotation 45°, `--d-base`). Filet inférieur ivoire-3. Animation d'ouverture via `grid-template-rows: 0fr → 1fr` sur le contenu (fonctionne sans JS pour l'état, JS uniquement pour l'animation ; sous reduced-motion : aucune animation). `name="faq"` pour n'en garder qu'une ouverte. Balisage `FAQPage` en JSON-LD.

### 6.6 Slider avant/après `.ba`

- Deux images superposées, ratio 3/2, la « après » rognée via `clip-path: inset(0 0 0 var(--pos))`.
- Poignée : trait vertical 2 px ivoire + bouton rond 44 px fond cuivre, icône ‹ › nuit.
- Contrôle : `<input type="range" min="0" max="100" aria-label="Comparer avant et après">` invisible mais au-dessus (opacité 0, pleine surface) : clavier (flèches, Home/End), tactile et souris gratuits et natifs. `aria-valuetext="Avant 40 % / Après 60 %"`.
- Étiquettes « Avant » / « Après » en petites capitales dans les coins.
- Carrousel de plusieurs paires : liste `scroll-snap-type: x mandatory`, boutons précédent/suivant, `aria-live="polite"` pour l'index « 1 / 3 ».
- Placeholders avec le traitement §2.4, teinte différente avant (gris chaud) / après (ivoire).

### 6.7 Formulaire de devis `.form-devis` (3 écrans)

- Conteneur : carte ivoire-2, rayon `--r-lg`, padding `--sp-6`.
- Barre de progression : 3 segments de 4 px, rayon `--r-xs`, cuivre pour les étapes faites/courante, ivoire-3 pour les suivantes ; `<ol>` d'étapes sous-jacent avec `aria-current="step"` et texte « Étape 2 sur 3 ».
- Écran 1 « Votre besoin » : 5 grandes cartes radio (pictogramme + libellé), `<fieldset><legend>` ; sélection = bordure cuivre 2 px + coche.
- Écran 2 « Où et quand » : champ commune avec `<datalist>` des communes des pages zones, puis radio « Urgent (fuite, plus d'eau chaude) / Dans la semaine / Projet à planifier ».
- Écran 3 « Vos coordonnées » : nom, téléphone (`type="tel"`, `inputmode="tel"`, `autocomplete="tel"`), email facultatif, message, case RGPD obligatoire, honeypot (`<input name="site" tabindex="-1" autocomplete="off" aria-hidden>` masqué en CSS hors écran).
- Champs : hauteur 52 px, fond blanc, bordure ivoire-3, focus bordure cuivre + `--focus`, libellé **toujours visible au-dessus** (pas de placeholder-libellé), aide en gris sous le champ, erreur en rouge avec icône et `aria-describedby`, `aria-invalid="true"`.
- Navigation : « Retour » (lien) / « Continuer » (primaire) ; dernier écran « Envoyer ma demande ». Validation à la soumission de chaque écran, focus déplacé sur le premier champ en erreur ou sur le titre de l'écran suivant.
- Sans JS : le formulaire s'affiche en une seule colonne complète et s'envoie normalement (amélioration progressive).
- Envoi : POST Formspree `[ID À COMPLÉTER]`, champ `_next` → `/merci/`.

### 6.8 Barre d'appel mobile `.mobile-bar`

Fixe en bas, `< lg` uniquement, hauteur 60 px + `env(safe-area-inset-bottom)`. Deux boutons égaux : « Appeler » (primaire, icône combiné) et « Devis » (secondaire sur ivoire). Fond ivoire 92 % + `backdrop-filter: blur(12px)`, `--sh-3`. Le `<body>` reçoit un `padding-bottom` équivalent pour que le footer reste atteignable. Masquée quand le formulaire de devis est visible à l'écran (IntersectionObserver) pour ne pas doubler l'appel à l'action.

### 6.9 Header `.header`

- Sur le hero : transparent, logo et liens en ivoire, bouton téléphone cuivre.
- Après 24 px de scroll (classe `.is-scrolled` posée par un IntersectionObserver sur une sentinelle, pas d'écouteur `scroll`) : fond ivoire 96 % + blur, `--sh-2`, logo et liens en nuit, hauteur réduite de 72 → 64 px. Transition `--d-base`.
- Pages intérieures : opaque dès le départ.
- Navigation desktop : Accueil · Services (menu déroulant au clic, `aria-expanded`, liste des 5 services) · Zones · Conseils · À propos · Contact · [bouton 06 46 39 61 06].
- Mobile : bouton « Menu » (`aria-controls`, `aria-expanded`), panneau plein écran bleu nuit, liens Fraunces 32 px, animation de glissement 240 ms, fermeture Échap, focus piégé, scroll du body verrouillé.
- Lien d'évitement « Aller au contenu » en première position.

### 6.10 Footer `.footer`

Fond nuit, texte ivoire / gris-clair, liens cuivre-clair au survol. 4 colonnes desktop (1 mobile) : 1) logo + NAP (nom, adresse de la commune, téléphone, email placeholder) + horaires placeholder ; 2) Services ; 3) Zones ; 4) Conseils + À propos + Contact + Mentions légales. Ligne basse : « © 2026 Frémont Plomberie Services · EI · SIREN 932 403 280 · Site réalisé par [MA MARQUE] ». Le NAP est identique au caractère près à celui du JSON-LD et de la page contact.

### 6.11 Timeline « Méthode en 4 étapes » `.steps`

Horizontale ≥ md : 4 colonnes, un filet ivoire-3 continu derrière des pastilles numérotées (Fraunces 400, 28 px, cuivre, cercle 56 px bordure cuivre). Au scroll, un filet cuivre se « remplit » de gauche à droite (`scale-x` 0 → 1, `--d-reveal`), puis chaque étape apparaît en décalé. Verticale < md : filet à gauche, pastilles alignées, contenu à droite. Étapes (sans chiffre inventé) : 1 Vous m'appelez ou décrivez votre besoin · 2 Je me déplace et j'établis un devis gratuit · 3 J'interviens proprement, à la date convenue · 4 Je vérifie avec vous et je reste joignable.

### 6.12 Manifeste `.manifesto`

Fond nuit, pleine largeur. Grille 12 : surtitre cuivre-clair col 2–4, citation Fraunces 300 `--fs-quote` col 2–10 avec guillemets français « » en cuivre-clair à 50 %, signature « Fabien Frémont, plombier » en petites capitales col 7–11. Les lignes de la citation se révèlent une par une (`clip-path` + translation, `--d-reveal`, décalage 90 ms).

### 6.13 Carte SVG de la zone `.map`

SVG stylisé (pas de fond de carte réaliste) : cercle d'intervention en pointillé cuivre centré sur Vierzon, les 6 communes comme pastilles (point cuivre 10 px + libellé Inter 500) placées en coordonnées approximatives relatives, un repère « maison » à Vignoux-sur-Barangeon (monogramme F), rivières Cher et Yèvre comme deux traits fins nuit-3. Chaque commune est un `<a xlink:href>` avec `<title>`, hover : pastille 14 px + libellé cuivre-encre. Liste HTML des mêmes liens sous la carte (navigation redondante et indexable).

### 6.14 Avis `.review`

Une seule carte, centrée, surtitre « Ils m'ont fait confiance », 5 étoiles en trait cuivre (SVG, `aria-label="5 sur 5"`), texte paraphrasé de l'avis réel en Fraunces 400 24 px, méta « Raccordement d'un lave-vaisselle · juillet 2026 · avis Google » en gris, bouton secondaire « Laisser un avis Google » `[lien À COMPLÉTER]`. Pas de carrousel : un seul avis réel, on ne le duplique pas.

### 6.15 Bandeau démo `.demo-banner`

Affiché si `SITE_MODE=demo` : barre fine (36 px) en haut, fond cuivre, texte nuit Inter 500 13 px : « Proposition de site réalisée pour Frémont Plomberie Services — maquette non indexée ». Bouton « ✕ » pour le replier (état en `sessionStorage`). Décale le header d'autant.

### 6.16 Placeholders de contenu `[À COMPLÉTER]`

Inline : `<mark class="todo">[À COMPLÉTER : horaires]</mark>` → fond ivoire-3, bordure pointillée cuivre, texte cuivre-encre italique. Visible, non ambigu, facile à chercher dans le code (`grep "À COMPLÉTER"`).

---

## 7. Motion

### 7.1 Principes
- **Aucune animation gratuite.** Chaque mouvement explique une relation (ceci apparaît parce que vous êtes arrivé ici ; ceci répond à votre survol).
- **Lent et court.** Déplacements ≤ 16 px, durées 240–700 ms, courbes ease-out. Jamais de rebond, jamais d'élastique.
- **Une seule fois.** Les révélations au scroll ne se rejouent pas en remontant.
- **Reduced motion = zéro mouvement.** Sous `prefers-reduced-motion: reduce` : tout est visible d'emblée, transitions limitées à l'opacité et aux couleurs (≤ 160 ms), parallaxe et révélation ligne par ligne désactivées, slider sans transition.

### 7.2 Catalogue

| Nom | Déclencheur | Mécanique | Durée / courbe |
|---|---|---|---|
| Reveal | entrée dans le viewport à 15 % (IntersectionObserver, `once`) | opacité 0 → 1, translateY 16 px → 0 | 480 ms `--e-out` |
| Reveal-lines | idem, sur titres H1/H2 et citation | chaque ligne (découpée en `<span>` par un script au chargement, ou en `<br>` manuels pour le hero) : `clip-path: inset(0 0 100% 0)` → `inset(0)` + translateY 100 % → 0, décalage 90 ms | 700 ms `--e-out` |
| Stagger | grilles de cartes, badges, étapes | Reveal avec `transition-delay: calc(var(--i) * var(--stagger))` | — |
| Hero-parallax | scroll, desktop et pointer fin seulement | visuel du hero `translateY` entre 0 et −24 px via `animation-timeline: scroll()` (CSS natif, avec repli : rien) | linéaire sur 100 vh |
| Header-solid | sentinelle sortie du viewport | fond, couleur, hauteur | 240 ms `--e-std` |
| Card-hover | `:hover` pointer fin | fond, ombre, filet cuivre `scale-x`, flèche | 240 ms `--e-std` |
| Accordion | `toggle` sur `<details>` | `grid-template-rows` 0fr → 1fr, icône 45° | 240 ms `--e-in-out` |
| Timeline-fill | entrée dans le viewport | filet cuivre `scale-x` 0 → 1 puis stagger des étapes | 700 ms `--e-out` |
| Form-step | changement d'écran | écran sortant opacité 1 → 0 (120 ms), entrant translateX 12 px → 0 + opacité (240 ms) ; barre de progression `width` | `--e-out` |
| Menu mobile | ouverture | panneau opacité + translateY 8 px, liens stagger 40 ms | 240 ms |

### 7.3 Implémentation
- Tout en CSS ; le JS ne fait que poser des classes (`.is-visible`, `.is-scrolled`, `.is-open`).
- `will-change` uniquement sur le hero pendant la parallaxe.
- Les éléments animés ne sont jamais masqués sans JS : la classe `.js` sur `<html>` conditionne l'état initial caché (sans JS, tout est visible).

---

## 8. Logotype

### 8.1 Concept
Monogramme **« F »** construit comme un **raccord de plomberie** : le fût vertical est un tube, les deux barres horizontales sont des départs de tube terminés par une bague de raccord ; une **goutte** se détache de la barre inférieure. Trait de 2,5 unités, extrémités arrondies, en cuivre. Le lettrage « FRÉMONT » en Fraunces 500 petites capitales, lettrage 0,22 em ; « Plomberie Services » en Inter 500, 0,16 em, taille 40 % du nom.

### 8.2 Déclinaisons
1. **Horizontal** (header, footer) : monogramme à gauche, deux lignes de texte à droite.
2. **Empilé** (image OG, favicon étendu, impression) : monogramme centré au-dessus du texte.
3. **Monogramme seul** (favicon, badge, apple-touch-icon, repère sur la carte SVG).
4. Couleurs : monogramme cuivre + texte nuit sur ivoire ; monogramme cuivre-clair + texte ivoire sur nuit ; monochrome nuit ; monochrome ivoire.
5. Zone de protection : la hauteur d'une bague de raccord tout autour. Taille minimale : 24 px de haut pour le monogramme, 120 px de large pour la version horizontale.

### 8.3 SVG source (version horizontale, 240 × 64)

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 64" role="img" aria-labelledby="logo-t">
  <title id="logo-t">Frémont Plomberie Services</title>
  <!-- Monogramme F « raccord » -->
  <g fill="none" stroke="#B87333" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
    <!-- fût vertical (tube) -->
    <path d="M14 10 V54"/>
    <!-- bague de raccord supérieure -->
    <path d="M9 10 H19"/>
    <!-- départ supérieur -->
    <path d="M14 18 H40"/>
    <path d="M40 13 V23"/>
    <!-- départ médian -->
    <path d="M14 34 H32"/>
    <path d="M32 29 V39"/>
  </g>
  <!-- goutte de cuivre qui se détache du départ médian -->
  <path fill="#B87333" d="M32 44c-3.2 4.3-4.8 7-4.8 9.2a4.8 4.8 0 0 0 9.6 0c0-2.2-1.6-4.9-4.8-9.2z"/>
  <!-- Lettrage -->
  <text x="60" y="33" font-family="Fraunces, Georgia, serif" font-weight="500" font-size="22" letter-spacing="4.8" fill="#0E1A2B">FRÉMONT</text>
  <text x="60" y="50" font-family="Inter, system-ui, sans-serif" font-weight="500" font-size="9" letter-spacing="1.5" fill="#5A5E66">PLOMBERIE SERVICES</text>
</svg>
```

En production, le lettrage est **vectorisé** (texte converti en tracés) pour ne pas dépendre du chargement des polices dans le SVG ; dans le HTML, le logo est inliné (pas de requête) avec `currentColor` sur le texte pour basculer ivoire/nuit avec le header.

### 8.4 Logo actuel de l'artisan
Emplacement réservé `/src/assets/img/logo-original.png` (affiché dans la page À propos, encadré « Mon logo historique », et dans les mentions légales si souhaité). S'il est fourni en haute définition, on pourra en tirer la version vectorisée définitive et remplacer le logotype proposé.

---

## 9. Iconographie et motifs

- **Icônes** : jeu de 12 pictogrammes au trait (1,5 px, extrémités arrondies, grille 24) dessinés dans le même esprit que le monogramme : goutte, robinet, chauffe-eau, flamme, flocon, douche, évier, lave-vaisselle, téléphone (combiné), flèche, check, plus. Fournis en sprite SVG inliné `<symbol>`, coloré par `currentColor`. **Aucune icône pleine colorée, aucun clipart.**
- **Motif de trame** : lignes diagonales 45°, 1 px, pas 8 px, opacité 6 % : fond des placeholders et du bandeau de réassurance.
- **Filet cuivre** : signature récurrente (surtitres, coin des photos, dessus des cartes au survol, barre de progression).

---

## 10. Accessibilité (WCAG 2.1 AA, règles figées)

1. Contrastes selon §3.3 ; jamais de texte blanc sur cuivre ; cuivre pur réservé au texte ≥ 24 px.
2. Un seul `<h1>` par page, hiérarchie sans saut, `<main>`, `<nav aria-label>`, `<footer>`, lien d'évitement.
3. Toute cible tactile ≥ 44 × 44 px (boutons 48, pastilles de carte 44 avec zone cliquable élargie).
4. Focus visible partout (`--focus`), jamais `outline: none` sans remplacement.
5. Formulaire : libellés visibles, erreurs textuelles, `aria-describedby`, `autocomplete`, `inputmode`, pas de validation uniquement par la couleur.
6. Menu mobile et menu Services : `aria-expanded`, `aria-controls`, Échap, focus piégé puis rendu.
7. Slider avant/après pilotable au clavier via le `<input type="range">`.
8. Accordéon natif `<details>`.
9. `prefers-reduced-motion` respecté (§7.1) ; `prefers-contrast: more` → bordures de carte passent en nuit.
10. Images : `alt` descriptif ou vide si décoratif ; placeholders : `role="img" aria-label="Photo de chantier à fournir"`.
11. Langue `lang="fr"`, titres de page uniques, liens explicites (pas de « cliquez ici »).
12. Zoom 200 % sans perte de contenu, pas de `user-scalable=no`.

---

## 11. Checklist UX anti-patterns (ce que le site ne fera pas)

- Pas de bandeau cookies (aucun cookie).
- Pas de pop-up, pas de chat flottant, pas de compteur « 1 254 clients satisfaits » (chiffre inventé).
- Pas de faux avis, pas de logos de certification non fournies (RGE, Qualibat).
- Pas de prix « à partir de » inventé.
- Pas de carrousel automatique dans le hero.
- Pas de texte sur photo sans voile de contraste.
- Pas d'icône « clé à molette », pas de bleu électrique, pas de dégradé.
- Pas de bouton « Urgence 24h/24 » tant que les horaires ne sont pas confirmés par l'artisan.
- Pas de Google Maps embarquée (performance et RGPD) : carte SVG maison + lien « Itinéraire » sortant.

---

## 12. Bloc de tokens CSS (référence d'implémentation)

```css
:root {
  color-scheme: light;

  /* Couleurs */
  --c-nuit: #0E1A2B;        --c-nuit-2: #15243A;      --c-nuit-3: #1F3350;
  --c-cuivre: #B87333;      --c-cuivre-clair: #D9A066; --c-cuivre-encre: #8A5422;
  --c-cuivre-hover: #C27F3F;
  --c-ivoire: #F6F3EE;      --c-ivoire-2: #EFEAE2;    --c-ivoire-3: #E6DFD4;
  --c-anthracite: #1C1F24;  --c-gris: #5A5E66;        --c-gris-clair: #B9BDC4;
  --c-blanc: #FFFFFF;       --c-succes: #2E6B4A;      --c-erreur: #A8362C;

  /* Rôles sémantiques (contexte clair par défaut) */
  --bg: var(--c-ivoire);    --bg-2: var(--c-ivoire-2);  --bd-c: var(--c-ivoire-3);
  --fg: var(--c-anthracite); --fg-2: var(--c-gris);     --fg-title: var(--c-nuit);
  --accent: var(--c-cuivre); --accent-text: var(--c-cuivre-encre);
  --focus-ring: var(--c-cuivre);

  /* Typo */
  --ff-display: "Fraunces", Georgia, "Times New Roman", serif;
  --ff-body: "Inter", system-ui, -apple-system, "Segoe UI", sans-serif;
  --fs-display: clamp(2.75rem, 1.8rem + 4.2vw, 5.5rem);
  --fs-h1: clamp(2.25rem, 1.6rem + 2.8vw, 4rem);
  --fs-h2: clamp(1.75rem, 1.3rem + 1.8vw, 2.75rem);
  --fs-h3: clamp(1.375rem, 1.15rem + 0.9vw, 1.875rem);
  --fs-h4: clamp(1.125rem, 1.05rem + 0.3vw, 1.25rem);
  --fs-quote: clamp(1.75rem, 1.2rem + 2.4vw, 3.25rem);
  --fs-lead: clamp(1.125rem, 1.05rem + 0.4vw, 1.375rem);
  --fs-body: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
  --fs-small: clamp(0.875rem, 0.85rem + 0.1vw, 0.9375rem);
  --fs-eyebrow: 0.75rem;
  --lh-tight: 1.1; --lh-body: 1.6; --measure: 68ch;

  /* Espacements */
  --sp-1: .25rem; --sp-2: .5rem; --sp-3: .75rem; --sp-4: 1rem; --sp-5: 1.5rem;
  --sp-6: 2rem; --sp-7: 3rem; --sp-8: 4rem; --sp-9: 6rem; --sp-10: 8rem;
  --section-y: clamp(var(--sp-8), 6vw + 1rem, var(--sp-9));
  --gutter: clamp(var(--sp-4), 4vw, var(--sp-5));
  --container: 80rem; --container-narrow: 46rem; --grid-gap: var(--sp-5);
  --header-h: 4.5rem; --mobile-bar-h: 3.75rem;

  /* Rayons, ombres, bordures */
  --r-xs: 2px; --r-sm: 4px; --r-md: 8px; --r-lg: 12px; --r-pill: 999px;
  --sh-1: 0 1px 2px rgb(14 26 43 / .06), 0 1px 1px rgb(14 26 43 / .04);
  --sh-2: 0 8px 24px -8px rgb(14 26 43 / .18);
  --sh-3: 0 -4px 20px -6px rgb(14 26 43 / .22);
  --sh-cuivre: 0 8px 24px -10px rgb(184 115 51 / .45);
  --bd: 1px solid var(--bd-c);
  --focus: 0 0 0 3px var(--bg), 0 0 0 6px var(--focus-ring);

  /* Motion */
  --d-fast: 160ms; --d-base: 240ms; --d-slow: 480ms; --d-reveal: 700ms;
  --e-out: cubic-bezier(.22, 1, .36, 1);
  --e-in-out: cubic-bezier(.65, 0, .35, 1);
  --e-std: cubic-bezier(.4, 0, .2, 1);
  --reveal-y: 16px; --stagger: 60ms;

  /* Z */
  --z-header: 50; --z-mobile-bar: 60; --z-demo-banner: 70; --z-menu: 80; --z-skip: 100;
}

/* Contexte sombre : on ne change que les rôles */
.on-dark, .section--nuit {
  --bg: var(--c-nuit); --bg-2: var(--c-nuit-2); --bd-c: var(--c-nuit-3);
  --fg: var(--c-ivoire); --fg-2: var(--c-gris-clair); --fg-title: var(--c-ivoire);
  --accent: var(--c-cuivre-clair); --accent-text: var(--c-cuivre-clair);
  --focus-ring: var(--c-cuivre-clair);
}

@media (prefers-reduced-motion: reduce) {
  :root { --d-fast: 0ms; --d-base: 0ms; --d-slow: 0ms; --d-reveal: 0ms; --reveal-y: 0px; --stagger: 0ms; }
}
```

---

## 13. Points à valider

1. **Bouton primaire** : cuivre avec texte bleu nuit (seule combinaison AA avec le cuivre pur). Alternative : fond cuivre-encre #8A5422 avec texte ivoire (5,63), plus sombre et moins « cuivre ». Je recommande la première.
2. **Fraunces** avec axe SOFT (chaleur) vs Newsreader (plus strict). Je recommande Fraunces.
3. **Carte dominante du bento = Dépannage** (fond nuit). Alternative : Rénovation de salle de bain si l'artisan veut privilégier les projets à plus forte valeur.
4. **Logotype** : monogramme « F raccord + goutte ». Alternative : « F » dont la barre inférieure se termine en goutte seule, sans bagues de raccord (plus minimal, moins « métier »).
5. **Pas de thème sombre global** : les sections nuit apportent le rythme.

Une fois validé (ou amendé), je code l'intégralité : Eleventy, CSS, JS, données, pages, SEO, workflow GitHub Pages, README.
