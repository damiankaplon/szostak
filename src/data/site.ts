// Globalne dane witryny — nawigacja, kontakt, social.
// Zmiana treści w jednym miejscu propaguje się na wszystkie strony.

export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "O nas", href: "/#o-nas" },
  { label: "Oferta", href: "/oferta" },
  { label: "Projekty", href: "/projekty" },
  { label: "Proces", href: "/#proces" },
  { label: "Kontakt", href: "/kontakt" },
];

export const contact = {
  phones: ["+48 517 337 672", "+48 781 224 549"],
  email: "jarek@szostak.net.pl",
  city: "Koszalin, Polska",
};

export interface SocialLink {
  label: string;
  href: string;
  icon: "instagram" | "facebook" | "google";
}

export const socials: SocialLink[] = [
  { label: "Instagram", href: "https://www.instagram.com/szostak.projekt", icon: "instagram" },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61582135311955", icon: "facebook" },
  { label: "Opinie Google", href: "https://www.google.com/maps/place/Szostak+Projekt", icon: "google" },
];

// Linki kolumny "Co projektujemy" w stopce.
export const footerServices: NavLink[] = [
  { label: "Budynki mieszkalne", href: "/projekty" },
  { label: "Użyteczności publicznej", href: "/projekty" },
  { label: "Turystyczno-rekreacyjne", href: "/projekty" },
  { label: "Inwestycje deweloperskie", href: "/oferta" },
];

// Rodzaje inwestycji — opcje formularza wyceny.
export const investmentTypes: string[] = [
  "Dom jednorodzinny",
  "Budynek usługowy / biurowy",
  "Obiekt publiczny",
  "Hala / przemysł",
  "Turystyka i rekreacja",
  "Inwestycja deweloperska",
];
