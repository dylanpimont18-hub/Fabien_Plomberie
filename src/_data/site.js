/**
 * Données de l'entreprise — SOURCE UNIQUE DE VÉRITÉ pour le NAP.
 * Tout ce qui est marqué `null` ou [À COMPLÉTER] n'a pas été fourni par l'artisan.
 * Ne rien inventer : remplir uniquement avec les informations qu'il transmet.
 */
const mode = (process.env.SITE_MODE || "demo").toLowerCase();
const url = (process.env.SITE_URL || "https://dylanpimont18-hub.github.io/Fabien_Plomberie").replace(/\/$/, "");

module.exports = {
  mode,                              // "demo" | "prod"
  isDemo: mode !== "prod",
  url,                               // origine absolue, sans slash final
  lang: "fr",
  locale: "fr_FR",

  name: "Frémont Plomberie Services",
  shortName: "Frémont Plomberie",
  tagline: "Plombier à Vierzon et dans le Cher",
  legalForm: "Entrepreneur individuel (EI)",
  owner: "Fabien Frémont",
  ownerFirstName: "Fabien",
  siren: "932 403 280",
  sirenCompact: "932403280",
  founded: "2024-07",                // juillet 2024
  foundedLabel: "juillet 2024",
  experienceYears: 7,                // 7 ans comme plombier salarié avant la création
  vatNotice: "TVA non applicable, art. 293 B du CGI",

  phone: "06 46 39 61 06",
  phoneIntl: "+33646396106",
  phoneHref: "tel:+33646396106",
  email: null,                       // [À COMPLÉTER]
  hours: null,                       // [À COMPLÉTER] — ex. { "Lundi–Vendredi": "8h–18h" }

  address: {
    street: "417 route du Moulin du Sein",   // uniquement mentions légales + JSON-LD
    postalCode: "18500",
    city: "Vignoux-sur-Barangeon",
    department: "Cher",
    region: "Centre-Val de Loire",
    country: "FR",
  },
  // Coordonnées approximatives du centre de la commune (à affiner avec l'adresse exacte).
  geo: { lat: 47.1994, lng: 2.1711 },

  hub: "Vierzon",
  radiusKm: 50,

  values: ["écoute", "réactivité", "travail soigné", "honnêteté", "proximité", "solutions durables"],

  /* Avis réel unique (5/5, juillet 2026) — paraphrasé, jamais dupliqué. */
  review: {
    rating: 5,
    date: "2026-07",
    dateLabel: "juillet 2026",
    service: "Raccordement d'un lave-vaisselle",
    paraphrase:
      "Intervention pour raccorder un lave-vaisselle : le client a salué le sérieux de Fabien et l'effort fourni pour mener le travail à bien malgré la forte chaleur ce jour-là.",
    source: "Avis Google",
  },
  googleReviewUrl: null,             // [À COMPLÉTER : lien « Laisser un avis Google »]

  /* Conversion */
  formspreeId: null,                 // [À COMPLÉTER : ID Formspree] ex. "xqkrabcd"
  whatsappEnabled: false,            // [À activer si l'artisan accepte]
  whatsappNumber: "33646396106",
  whatsappMessage: "Bonjour, je vous envoie une photo de mon problème de plomberie. Ma commune : ",

  /* Mesure sans cookie : Plausible ou Umami — [À COMPLÉTER] */
  analytics: {
    provider: null,                  // "plausible" | "umami" | null
    plausibleDomain: null,           // ex. "fremont-plomberie.fr"
    umamiSrc: null,                  // ex. "https://cloud.umami.is/script.js"
    umamiWebsiteId: null,
  },

  madeBy: { name: "[MA MARQUE]", url: null },
  hostName: "GitHub Inc.",
  hostAddress: "88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, États-Unis",
  hostUrl: "https://github.com",

  insurance: {
    decennale: null,                 // [À COMPLÉTER : assureur, n° de contrat, couverture géographique]
    rcPro: null,                     // [À COMPLÉTER]
  },

  placeholders: {
    email: "[À COMPLÉTER : adresse email]",
    hours: "[À COMPLÉTER : horaires]",
    decennale: "[À COMPLÉTER : assurance décennale]",
    reviewLink: "[lien À COMPLÉTER]",
    formspree: "[ID Formspree À COMPLÉTER]",
    analytics: "[À COMPLÉTER : Plausible ou Umami]",
  },
};
