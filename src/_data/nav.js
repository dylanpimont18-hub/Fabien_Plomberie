module.exports = {
  main: [
    { label: "Accueil", url: "/" },
    { label: "Services", url: "/services/depannage-plomberie/", children: "services" },
    { label: "Zones", url: "/zones/plombier-vierzon/", children: "zones" },
    { label: "Conseils", url: "/conseils/" },
    { label: "À propos", url: "/a-propos/" },
    { label: "Contact", url: "/contact/" },
  ],
  steps: [
    {
      title: "Vous m'appelez ou décrivez votre besoin",
      text: "Par téléphone, par le formulaire de devis ou avec une photo du problème. Je vous réponds personnellement.",
    },
    {
      title: "Je me déplace et j'établis un devis gratuit",
      text: "Je regarde l'installation, je vous explique ce que je propose et pourquoi, puis je vous remets un devis détaillé.",
    },
    {
      title: "J'interviens proprement, à la date convenue",
      text: "Je protège les lieux, je travaille avec du matériel que je connais, et je laisse l'endroit propre.",
    },
    {
      title: "Je vérifie avec vous et je reste joignable",
      text: "On contrôle ensemble le résultat. Si une question se pose après mon passage, vous avez mon numéro.",
    },
  ],
  reassurance: [
    { icon: "maison", label: "Artisan local", sub: "Vignoux-sur-Barangeon" },
    { icon: "devis", label: "Devis gratuit", sub: "Détaillé, sans engagement" },
    { icon: "personne", label: "Interlocuteur unique", sub: "Fabien, du devis au chantier" },
    { icon: "bouclier", label: "[À COMPLÉTER : décennale]", sub: "Assurance à renseigner", todo: true },
  ],
};
