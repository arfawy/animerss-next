import { getWatchlist, Anime } from "@/lib/api";

export default async function Home() {
  // Appel direct (Server Component)
  let animes: Anime[] = [];
  try {
    animes = await getWatchlist();
  } catch (e) {
    console.error(e);
    // On garde une liste vide si erreur, ou on affiche un message
  }

  return (
    <main className="min-h-screen bg-gray-950 text-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-500">
        Nyaa RSS
      </h1>

      <div className="grid gap-4">
        {animes.length === 0 ? (
          <p className="text-gray-500 italic">Aucun anime ou erreur de connexion...</p>
        ) : (
          animes.map((anime) => (
            <div 
              key={anime.id} 
              className="p-4 bg-gray-900 border border-gray-800 rounded-xl shadow-sm"
            >
              <h2 className="font-semibold text-lg">{anime.keyword}</h2>
              <p className="text-xs text-gray-500 truncate mt-1">{anime.url || "Aucun lien disponible"}</p>
            </div>
          ))
        )}
      </div>
    </main>
  );
}