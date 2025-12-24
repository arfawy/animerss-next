// lib/api.ts

// 1. Définition des Types (On pourra les bouger dans types/ plus tard)
export interface Anime {
  id: string;
  keyword: string;
  url: string;
  imageUrl?: string; // Optionnel
}

// 2. Configuration
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const USER = process.env.NEXT_PUBLIC_API_USER;
const PASS = process.env.NEXT_PUBLIC_API_PASSWORD;

if (!API_URL) console.warn("⚠️ ATTENTION : NEXT_PUBLIC_API_URL n'est pas défini");

// 3. Générateur de Headers (Compatible Server & Client)
const getAuthHeaders = () => {
  // Encodage Base64 pour Basic Auth
  const token = Buffer.from(`${USER}:${PASS}`).toString('base64');
  return {
    Authorization: `Basic ${token}`,
    "Content-Type": "application/json",
  };
};

// 4. Fonction Fetcher Générique (Gestion d'erreur centralisée)
async function fetchAPI<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_URL}${endpoint}`;
  
  const res = await fetch(url, {
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...options.headers,
    },
    // Next.js 16 : Par défaut, pas de cache pour les données dynamiques
    // Mais on peut le forcer si besoin avec : cache: 'no-store'
  });

  if (!res.ok) {
    // On log l'erreur côté serveur pour vous aider à débugger
    console.error(`❌ Erreur API [${res.status}] ${url}`);
    throw new Error(`Erreur API: ${res.statusText}`);
  }

  return res.json();
}

// 5. Vos méthodes Métier
export async function getWatchlist(): Promise<Anime[]> {
  return fetchAPI<Anime[]>('/watchlist');
}

// Exemple pour plus tard (Ajouter)
export async function addAnime(animeData: Partial<Anime>) {
  return fetchAPI('/watchlist', {
    method: 'POST',
    body: JSON.stringify(animeData),
  });
}