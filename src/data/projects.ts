// Realizacje — dane kart portfolio.
// Używane w dwóch galeriach: wyróżnione na stronie głównej oraz pełna
// lista na /projekty. Filtr kategorii działa po polu `category`.

export type ProjectCategory = "mieszkalne" | "publiczne" | "turystyka";

// Rozmiar kafelka w siatce (mapuje się na klasy .s-* z arkusza stylów).
export type ProjectSize = "wide" | "tall" | "sq" | "half";

export interface Project {
  title: string;
  // Slug kategorii używany do filtrowania (data-cat). Na stronie głównej są to
  // wartości z `ProjectCategory`, a na /projekty slugi wyliczone z danych Strapi.
  category: string;
  size: ProjectSize;
  image: string;
  // Slug realizacji — link do strony szczegółów /projekty/[slug].
  slug: string;
  // Etykieta wyświetlana na karcie. Gdy pusta, używana jest mapa `categoryLabels`.
  categoryLabel?: string;
}

// Etykiety kategorii wyświetlane na kartach.
export const categoryLabels: Record<ProjectCategory, string> = {
  mieszkalne: "Mieszkalne",
  publiczne: "Publiczne",
  turystyka: "Turystyczno-rekreacyjne",
};

// Przyciski filtra (kolejność ma znaczenie — "all" zawsze pierwszy).
export interface ProjectFilter {
  value: "all" | string;
  label: string;
}

// Domyślne filtry — używane, gdy komponent nie dostanie listy wyliczonej ze
// Strapi. Realizacje pochodzą obecnie z CMS (src/lib/strapi.ts), więc karty
// portfolio nie są już zaszyte na sztywno w tym pliku.
export const projectFilters: ProjectFilter[] = [
  { value: "all", label: "Wszystkie" },
  { value: "mieszkalne", label: "Mieszkalne" },
  { value: "publiczne", label: "Publiczne" },
  { value: "turystyka", label: "Turystyczno-rekreacyjne" },
];
