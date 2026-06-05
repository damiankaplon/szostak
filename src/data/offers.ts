// Zakres usług — wiersze oferty na stronie /oferta.

export interface Offer {
  title: string;
  tags: string[];
  text: string;
}

export const offers: Offer[] = [
  {
    title: "Domy jednorodzinne",
    tags: ["Projekt indywidualny", "Adaptacje", "Rozbudowy"],
    text: "Projekty domów szyte na miarę — dopasowane do działki, budżetu i stylu życia. Funkcjonalne układy, świadoma bryła, nowoczesna estetyka.",
  },
  {
    title: "Budynki usługowe i przemysłowe",
    tags: ["Biura", "Hale", "Konstrukcja stalowa"],
    text: "Obiekty, które pracują na Twój biznes — przemyślana logistyka, ekonomia budowy i rozwiązania zgodne z aktualnymi normami.",
  },
  {
    title: "Obiekty użyteczności publicznej",
    tags: ["Żłobki", "Moduły", "Przestrzeń wspólna"],
    text: "Od modułowych żłobków po obiekty rekreacyjne — projektujemy przestrzenie służące lokalnym społecznościom, bezpieczne i przyjazne.",
  },
  {
    title: "Turystyka i rekreacja",
    tags: ["Domki letniskowe", "Zabudowa szeregowa", "Tężnie"],
    text: "Obiekty turystyczne z charakterem — łączące walory inwestycyjne z atrakcyjną architekturą i wpisaniem w krajobraz.",
  },
  {
    title: "Inwestycje deweloperskie",
    tags: ["Analiza chłonności", "Koncepcja", "Realizacja"],
    text: "Prowadzimy własne inwestycje — dlatego rozumiemy proces od strony inwestora i potrafimy doradzić, co realnie się opłaca.",
  },
  {
    title: "Nadzór autorski i formalności",
    tags: ["Pozwolenia", "Uzgodnienia", "Nadzór"],
    text: "Przeprowadzimy Cię przez urzędy i dopilnujemy, by realizacja przebiegała zgodnie z projektem — od pozwolenia po odbiór.",
  },
];
