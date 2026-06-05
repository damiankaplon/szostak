// Atuty biura ("Dlaczego my") — siatka kart na stronie głównej.
// `icon` odpowiada nazwie ścieżki SVG w komponencie FeatureCard.

export interface Feature {
  icon: "complex" | "speed" | "individual" | "modern" | "trust" | "open";
  title: string;
  text: string;
}

export const features: Feature[] = [
  {
    icon: "complex",
    title: "Kompleksowe podejście",
    text: "Prowadzimy inwestycję od analizy działki po gotowy, kompletny projekt — bez przerzucania Cię między biurami.",
  },
  {
    icon: "speed",
    title: "Szybkie tempo pracy",
    text: "Sprawnie reagujemy i dotrzymujemy terminów. Wiesz, na czym stoisz, na każdym etapie.",
  },
  {
    icon: "individual",
    title: "Indywidualne podejście",
    text: "Każdy projekt dostosowujemy do potrzeb, budżetu i oczekiwań inwestora — nie do gotowego szablonu.",
  },
  {
    icon: "modern",
    title: "Nowoczesne rozwiązania",
    text: "Łączymy funkcjonalność z estetyką oraz aktualnymi standardami technicznymi i energetycznymi.",
  },
  {
    icon: "trust",
    title: "Zaufanie klientów",
    text: "Dobre opinie i stałe współprace potwierdzają jakość naszych usług i sposób, w jaki pracujemy.",
  },
  {
    icon: "open",
    title: "Otwartość na wyzwania",
    text: "Chętnie podejmujemy się nowych, nietypowych tematów projektowych, których inni unikają.",
  },
];
