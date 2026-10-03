# Frémont Plomberie Services — site vitrine

Maquette de site vitrine haut de gamme pour un artisan plombier (Vignoux-sur-Barangeon, Cher), pensée pour le référencement local. Générée avec [Eleventy](https://www.11ty.dev/) en HTML/CSS/JS statique pur, sans framework côté client.

- Design system : [`DESIGN.md`](DESIGN.md)
- Éléments à récupérer auprès de l'artisan : [`CHECKLIST-CLIENT.md`](CHECKLIST-CLIENT.md)
- Plan SEO hors site (fiche Google, annuaires, avis) : [`SEO-HORS-SITE.md`](SEO-HORS-SITE.md)

## Installation

Prérequis : Node.js 20 ou plus récent.

```bash
npm install
```

## Développement

```bash
npm run dev
```

Lance Eleventy en mode serveur avec rechargement automatique sur `http://localhost:8080`, en mode démo (bandeau de proposition, `noindex`).

## Construction

```bash
npm run build:demo   # maquette : bandeau démo + noindex + robots.txt Disallow
npm run build:prod   # production : indexable, sitemap référencé dans robots.txt
```

Le site est généré dans `_site/`. Variables d'environnement reconnues :

| Variable | Valeurs | Rôle |
|---|---|---|
| `SITE_MODE` | `demo` (défaut) ou `prod` | Bandeau de démonstration, balise `noindex`, `robots.txt` |
| `SITE_URL` | URL absolue sans slash final | Canonical, Open Graph, sitemap, JSON-LD |
| `PATH_PREFIX` | `/` (défaut) ou `/Nom_Du_Depot/` | Préfixe des liens pour un site de projet GitHub Pages |
| `LINK_MODE` | `absolute` (défaut) ou `relative` | `relative` produit des liens relatifs terminés par `index.html`, pour ouvrir la maquette depuis un dossier local ou un hébergement sans réécriture d'URL |

Exemple de build prêt pour un domaine personnalisé :

```bash
SITE_MODE=prod SITE_URL=https://www.fremont-plomberie.fr PATH_PREFIX=/ npm run build
```

## Audit Lighthouse

```bash
npm run build:prod && npm run lighthouse
```

Sert `_site/` localement et audite cinq pages types en mobile (performance, accessibilité, bonnes pratiques, SEO). Nécessite Chrome ou Chromium (`CHROME_PATH` si besoin).

## Déploiement GitHub Pages

Le workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) construit et publie le site à chaque push sur `main` (ou `master`), et à la demande via « Run workflow ».

1. Dans le dépôt GitHub : **Settings → Pages → Build and deployment → Source : GitHub Actions**.
2. Pousser sur `main`. Le site est publié sur `https://<utilisateur>.github.io/<depot>/`. Le workflow calcule lui-même `SITE_URL` et `PATH_PREFIX` (avec ou sans domaine personnalisé) grâce à `actions/configure-pages`.
3. Pour un domaine personnalisé : **Settings → Pages → Custom domain**, puis chez le registrar un `CNAME` `www` vers `<utilisateur>.github.io` et les quatre enregistrements `A` de GitHub Pages pour l'apex. Cocher **Enforce HTTPS**.

## Passer de la démo à la production

1. Remplir toutes les informations manquantes dans `src/_data/site.js` (email, horaires, assurance, identifiant Formspree, lien d'avis Google, mesure d'audience, nom de l'agence) et dans les contenus : `grep -rn "À COMPLÉTER" src/` doit ne rien renvoyer.
2. Remplacer les placeholders photo (`<div class="ph …">`) par de vraies images via le shortcode `{% image "src/assets/img/photo.jpg", "texte alternatif", "(min-width: 64em) 50vw, 100vw" %}`, qui génère AVIF, WebP et JPEG en plusieurs largeurs avec `srcset`.
3. Déposer le logo haute définition de l'artisan dans `src/assets/img/logo-original.png` (ou remplacer le logotype proposé dans `src/_includes/partials/logo.njk` et `src/favicon.svg`).
4. Passer le mode en production : soit **Settings → Secrets and variables → Actions → Variables → `SITE_MODE` = `prod`**, soit lancer le workflow manuellement avec `site_mode = prod`.
5. Vérifier : `https://<domaine>/robots.txt` autorise l'indexation, `sitemap.xml` est référencé, aucune balise `noindex` dans le code source de l'accueil.
6. Déclarer le site dans Google Search Console et Bing Webmaster Tools, puis suivre `SEO-HORS-SITE.md`.

## Structure

```
src/
  _data/            site.js (NAP, source unique), services.json, zones.json, faq.json, nav.js
  _includes/
    layouts/        base, page, service, zone, article
    partials/       header, footer, mobile-bar, demo-banner, jsonld, faq, form-devis, map, logo, icons, cta…
  assets/
    css/            tokens.css, base.css, components.css, pages.css, motion3d.css (concaténés, minifiés, inlinés)
    js/main.js      header, menu, révélations, animations 3D, FAQ, slider avant/après, formulaire 3 écrans, mesure
    fonts/          Fraunces et Inter (woff2, sous-ensemble latin, axes restreints)
    img/            image OG, icônes, logo original (placeholder)
  index.njk         accueil
  services.njk      pages /services/* générées depuis services.json
  zones.njk         pages /zones/* générées depuis zones.json
  conseils/         index + articles Markdown
  a-propos.njk, contact.njk, mentions-legales.njk, merci.njk, 404.njk
  sitemap.njk, robots.njk, manifest.njk, favicon.svg
.eleventy.js        configuration, filtres, transformations (minification, liens relatifs)
.github/workflows/  déploiement GitHub Pages
scripts/            audit Lighthouse
```

## Choix techniques

- **CSS inliné** : la feuille complète (≈ 40 ko minifiés, ≈ 9 ko compressés) est inlinée dans chaque page : aucune requête CSS bloquante, pas de flash de contenu non stylé.
- **Polices auto-hébergées** : Fraunces (variable, axes `opsz` 9–144 et `wght` 300–600, axe `SOFT` figé à 30) et Inter (variable, `wght` 400–700, `opsz` figé), sous-ensemble latin, ≈ 62 ko + 50 ko, préchargées, avec polices de repli calibrées (`size-adjust`, `ascent-override`) pour limiter le décalage de mise en page. Les fichiers sont produits avec `pyftsubset` et `fonttools varLib.instancer`.
- **Animations 3D sans bibliothèque** (`motion3d.css`) : globe de cuivre en 3D dans le héros qui suit la souris, révélations en profondeur au défilement, cartes qui s'inclinent au survol avec reflet, numéros d'étapes et étoiles qui pivotent, carte de zone qui se redresse, carrousel avant/après en cylindre. Uniquement des transformations CSS accélérées par le GPU ; tout est figé avec `prefers-reduced-motion` et à l'impression, et l'inclinaison au pointeur est réservée aux souris.
- **JS différé et minimal** (≈ 9 ko) : aucune dépendance, chaque module se désactive si son élément est absent ; le site reste entièrement utilisable sans JavaScript (formulaire en une colonne, accordéons natifs).
- **Accessibilité** : un seul `h1` par page, lien d'évitement, focus visible, menu mobile avec piège de focus et Échap, slider avant/après pilotable au clavier (`input type="range"`), `prefers-reduced-motion` respecté, contrastes AA vérifiés (voir `DESIGN.md`).
- **SEO** : titres et descriptions uniques, canonical, Open Graph et Twitter Cards, JSON-LD `Plumber` + `WebSite` sur toutes les pages, `Service`, `FAQPage`, `BreadcrumbList`, `Article` selon la page, sitemap et robots générés, pages de zones au contenu réellement distinct.
- **Aucun cookie** : pas de bandeau de consentement ; emplacement prévu pour Plausible ou Umami (sans cookie) avec suivi des clics `tel:`, des envois de formulaire et des clics WhatsApp.

## Licence des polices

Fraunces et Inter sont distribuées sous SIL Open Font License 1.1.
