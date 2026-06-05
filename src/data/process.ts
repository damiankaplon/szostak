// Etapy współpracy — sekcja "Proces" na stronie głównej.

export interface ProcessStep {
  title: string;
  text: string;
  tag: string;
}

export const processSteps: ProcessStep[] = [
  {
    title: "Rozmowa i analiza potrzeb",
    text: "Omawiamy Twoje oczekiwania, analizujemy działkę, przepisy i możliwości zabudowy.",
    tag: "Start",
  },
  {
    title: "Koncepcja projektowa",
    text: "Opracowujemy układ funkcjonalny, bryłę i stylistykę — wspólnie dopracowujemy wygląd obiektu.",
    tag: "Koncepcja",
  },
  {
    title: "Projekt budowlany",
    text: "Pełna dokumentacja do pozwolenia: konstrukcja, instalacje, charakterystyka energetyczna.",
    tag: "Dokumentacja",
  },
  {
    title: "Uzgodnienia i formalności",
    text: "Składamy dokumenty do urzędów, uzgadniamy projekt i prowadzimy Cię przez pozwolenie na budowę.",
    tag: "Urzędy",
  },
  {
    title: "Projekt wykonawczy i nadzór",
    text: "Przygotowujemy projekt techniczny i możemy pełnić nadzór autorski nad realizacją.",
    tag: "Realizacja",
  },
];
