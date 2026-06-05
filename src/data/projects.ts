// Realizacje — dane kart portfolio.
// Używane w dwóch galeriach: wyróżnione na stronie głównej oraz pełna
// lista na /projekty. Filtr kategorii działa po polu `category`.

export type ProjectCategory = "mieszkalne" | "publiczne" | "turystyka";

// Rozmiar kafelka w siatce (mapuje się na klasy .s-* z arkusza stylów).
export type ProjectSize = "wide" | "tall" | "sq" | "half";

export interface Project {
  title: string;
  category: ProjectCategory;
  size: ProjectSize;
  image: string;
}

// Etykiety kategorii wyświetlane na kartach.
export const categoryLabels: Record<ProjectCategory, string> = {
  mieszkalne: "Mieszkalne",
  publiczne: "Publiczne",
  turystyka: "Turystyczno-rekreacyjne",
};

// Przyciski filtra (kolejność ma znaczenie — "all" zawsze pierwszy).
export interface ProjectFilter {
  value: "all" | ProjectCategory;
  label: string;
}

export const projectFilters: ProjectFilter[] = [
  { value: "all", label: "Wszystkie" },
  { value: "mieszkalne", label: "Mieszkalne" },
  { value: "publiczne", label: "Publiczne" },
  { value: "turystyka", label: "Turystyczno-rekreacyjne" },
];

// Wyróżnione realizacje — strona główna (sekcja "Wybrane projekty").
export const featuredProjects: Project[] = [
  { title: "Budynek mieszkalny z częścią biurową", category: "mieszkalne", size: "wide", image: "/img/proj-biurowy.webp" },
  { title: "Modułowy żłobek w drewnie", category: "publiczne", size: "tall", image: "/img/proj-zlobek.jpg" },
  { title: "Dom na skarpie", category: "mieszkalne", size: "sq", image: "/img/proj-skarpa.webp" },
  { title: "Nowoczesne domki letniskowe", category: "turystyka", size: "half", image: "/img/proj-domki.webp" },
  { title: "Hala w konstrukcji stalowej", category: "publiczne", size: "half", image: "/img/proj-hala.webp" },
  { title: "Tężnia solankowa", category: "turystyka", size: "half", image: "/img/proj-teznia.jpg" },
  { title: "Dom w układzie dwubryłowym", category: "mieszkalne", size: "half", image: "/img/proj-dwubryl.webp" },
];

// Pełna lista realizacji — strona /projekty.
export const allProjects: Project[] = [
  { title: "Bliźniak — nie taki jak wszystkie", category: "mieszkalne", size: "half", image: "/img/homepage-carousel-1.webp" },
  { title: "Budynek mieszkalny z częścią biurową", category: "mieszkalne", size: "half", image: "/img/proj-biurowy.webp" },
  { title: "Dom na skarpie", category: "mieszkalne", size: "tall", image: "/img/card-dom-na-skarpie.webp" },
  { title: "Dom z ogrodem zimowym", category: "mieszkalne", size: "sq", image: "/img/homepage-carousel-2.webp" },
  { title: "Nowoczesny dom parterowy", category: "mieszkalne", size: "sq", image: "/img/card-nowoczesny-dom-parterowy.webp" },
  { title: "Modułowy żłobek w drewnie", category: "publiczne", size: "wide", image: "/img/card-modulowy-zlobek-drewniany.jpg" },
  { title: "Biura z kontenerów — Lotnisko", category: "publiczne", size: "tall", image: "/img/homepage-carousel-3.webp" },
  { title: "Hala w konstrukcji stalowej", category: "publiczne", size: "sq", image: "/img/card-hala-magazynowa-w-konstrukcji-stalowej.webp" },
  { title: "Tężnia solankowa", category: "turystyka", size: "half", image: "/img/card-teznia-solankowa.jpg" },
  { title: "Nowoczesne domki letniskowe", category: "turystyka", size: "half", image: "/img/card-nowoczesne-domki-letniskowe.webp" },
  { title: "Turystyczny szereg", category: "turystyka", size: "wide", image: "/img/proj-domki.webp" },
  { title: "Dom dwubryłowy", category: "mieszkalne", size: "sq", image: "/img/card-dom-w-ukladzie-dwu-brylowym.webp" },
];
