// Integracja z self-hosted Strapi CMS.
// Realizacje pobierane są raz, podczas budowania, i mapowane na:
//  • karty portfolio (`Project`) — siatka na stronie głównej i /projekty,
//  • pełne szczegóły (`ProjectDetail`) — dedykowana strona /projekty/[slug].
// Kategorie nie są zaszyte na sztywno — wyliczane są z pola `Kategoria`.

import type { Project, ProjectFilter, ProjectSize } from "../data/projects";

const STRAPI_URL = import.meta.env.STRAPI_URL ?? "https://cms.damiankaplon.site";
const STRAPI_API_TOKEN = import.meta.env.STRAPI_API_TOKEN;

// --- Kształt odpowiedzi Strapi (tylko pola, których faktycznie używamy) ---

interface StrapiImage {
  url: string;
  width: number | null;
  height: number | null;
  alternativeText: string | null;
}

interface StrapiRealizacja {
  id: number;
  documentId: string;
  Nazwa: string | null;
  Kategoria: string | null;
  Lokalizacja: string | null;
  Rodzaj: string | null;
  Konstrukcja: string | null;
  Parametry: string | null;
  Info: string | null;
  zdjecia: StrapiImage[] | null;
}

interface StrapiResponse {
  data: StrapiRealizacja[];
}

// --- Modele używane przez stronę ---

export interface ProjectImage {
  src: string; // pełny URL oryginału (najlepsza jakość)
  alt: string;
  width: number | null;
  height: number | null;
}

// Pełne dane pojedynczej realizacji dla strony /projekty/[slug].
export interface ProjectDetail {
  slug: string;
  title: string;
  category: string; // slug kategorii
  categoryLabel: string;
  location: string | null;
  rodzaj: string | null;
  konstrukcja: string | null;
  parametry: string | null;
  info: string | null;
  images: ProjectImage[];
}

export interface PortfolioData {
  projects: Project[];
  filters: ProjectFilter[];
}

// Cykliczny wzór rozmiarów kafelków — każdy „wiersz" sumuje się do 12 kolumn
// (7+5, 4+4+4, 6+6), dzięki czemu siatka zachowuje urozmaicony, modułowy układ
// niezależnie od liczby realizacji.
const SIZE_PATTERN: ProjectSize[] = ["wide", "tall", "sq", "sq", "sq", "half", "half"];

// Zamiana tekstu na slug (np. "Dom na skarpie" → "dom-na-skarpie").
// Polskie znaki sprowadzane do ASCII.
function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/ł/g, "l")
    .replace(/Ł/g, "L")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Strapi zwraca ścieżki względne (/uploads/...). Używamy oryginału (pełna
// jakość) — galeria potrzebuje ostrych zdjęć, a kafelek i tak skaluje obraz.
function toProjectImage(img: StrapiImage): ProjectImage | null {
  if (!img.url) return null;
  return {
    src: `${STRAPI_URL}${img.url}`,
    alt: img.alternativeText?.trim() || "",
    width: img.width ?? null,
    height: img.height ?? null,
  };
}

let cache: ProjectDetail[] | null = null;

// Pobiera i mapuje wszystkie realizacje ze Strapi. Wynik jest pamiętany na czas
// budowania, więc wszystkie strony współdzielą jedno zapytanie.
async function fetchRealizacje(): Promise<ProjectDetail[]> {
  if (cache) return cache;

  const res = await fetch(`${STRAPI_URL}/api/Realizacje?populate=*`, {
    headers: STRAPI_API_TOKEN ? { Authorization: `Bearer ${STRAPI_API_TOKEN}` } : {},
  });

  if (!res.ok) {
    throw new Error(`Strapi: nie udało się pobrać realizacji (${res.status} ${res.statusText})`);
  }

  const json = (await res.json()) as StrapiResponse;

  const usedSlugs = new Map<string, number>();
  const details: ProjectDetail[] = [];

  for (const item of json.data) {
    const images = (item.zdjecia ?? [])
      .map(toProjectImage)
      .filter((img): img is ProjectImage => img !== null);
    if (images.length === 0) continue; // bez zdjęć nie ma czego pokazać

    const label = (item.Kategoria ?? "Inne").trim() || "Inne";
    const title =
      item.Nazwa?.trim() || item.Rodzaj?.trim() || item.Lokalizacja?.trim() || "Realizacja";

    // Slug z nazwy; przy kolizji dopinamy kolejny numer, by trasy były unikalne.
    let slug = slugify(title) || "realizacja";
    const seen = usedSlugs.get(slug) ?? 0;
    usedSlugs.set(slug, seen + 1);
    if (seen > 0) slug = `${slug}-${seen + 1}`;

    details.push({
      slug,
      title,
      category: slugify(label) || "inne",
      categoryLabel: label,
      location: item.Lokalizacja?.trim() || null,
      rodzaj: item.Rodzaj?.trim() || null,
      konstrukcja: item.Konstrukcja?.trim() || null,
      parametry: item.Parametry?.trim() || null,
      info: item.Info?.trim() || null,
      images,
    });
  }

  cache = details;
  return details;
}

// Realizacja jako karta siatki (bez rozmiaru — ten nadajemy na finalnej liście).
type RawProject = Omit<Project, "size">;

function toCard(detail: ProjectDetail): RawProject {
  return {
    title: detail.title,
    category: detail.category,
    categoryLabel: detail.categoryLabel,
    image: detail.images[0].src,
    slug: detail.slug,
  };
}

// Nadaje kafelkom rozmiary wg cyklicznego wzoru, według pozycji na liście.
function withSizes(raw: RawProject[]): Project[] {
  return raw.map((p, i) => ({ ...p, size: SIZE_PATTERN[i % SIZE_PATTERN.length] }));
}

// Buduje listę filtrów z kategorii występujących na przekazanej liście,
// zachowując kolejność ich pierwszego pojawienia się.
function buildFilters(projects: RawProject[]): ProjectFilter[] {
  const categories = new Map<string, string>();
  for (const p of projects) categories.set(p.category, p.categoryLabel ?? p.category);
  return [
    { value: "all", label: "Wszystkie" },
    ...[...categories.entries()].map(([value, label]) => ({ value, label })),
  ];
}

// Pełne portfolio (/projekty): wszystkie realizacje + dynamiczne filtry.
export async function getPortfolioProjects(): Promise<PortfolioData> {
  const cards = (await fetchRealizacje()).map(toCard);
  return { projects: withSizes(cards), filters: buildFilters(cards) };
}

// Wyróżnione realizacje (strona główna): dwie pierwsze z każdej kategorii,
// w kolejności pojawienia się kategorii w danych.
export async function getFeaturedProjects(): Promise<PortfolioData> {
  const byCategory = new Map<string, RawProject[]>();
  for (const detail of await fetchRealizacje()) {
    const list = byCategory.get(detail.category) ?? [];
    if (list.length < 2) list.push(toCard(detail));
    byCategory.set(detail.category, list);
  }

  const featured = [...byCategory.values()].flat();
  return { projects: withSizes(featured), filters: buildFilters(featured) };
}

// Pełne szczegóły wszystkich realizacji — dla getStaticPaths /projekty/[slug].
export async function getProjectDetails(): Promise<ProjectDetail[]> {
  return fetchRealizacje();
}
