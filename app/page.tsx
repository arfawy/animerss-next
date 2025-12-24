import { getWatchlist, Anime } from "../lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react"; // Icône
import Link from "next/link";

export default async function Home() {
  let animes: Anime[] = [];
  try {
    animes = await getWatchlist();
  } catch (e) {
    console.error(e);
  }

  return (
    <main className="min-h-screen bg-background p-4 pb-20">
      <header className="flex justify-between items-center mb-6 pt-2">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Mes Animes
          </h1>
          <p className="text-muted-foreground text-sm">
            {animes.length} séries suivies
          </p>
        </div>
        {/* Exemple d'utilisation du Button Shadcn */}
        <Button asChild size="icon" className="rounded-full h-10 w-10">
          <Link href="/add">
            <Plus className="h-5 w-5" />
          </Link>
        </Button>
      </header>

      <div className="grid gap-4">
        {animes.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-muted-foreground">Aucun anime suivi.</p>
            <Button asChild variant="outline" className="mt-4">
              <Link href="/add">Ajouter le premier</Link>
            </Button>
          </div>
        ) : (
          animes.map((anime) => (
            <Card key={anime.id} className="overflow-hidden border-border/50">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-lg leading-none">
                  {anime.keyword}
                </CardTitle>
                <CardDescription className="truncate text-xs mt-1">
                  {anime.url || "Source inconnue"}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                {/* On pourra mettre des badges ici plus tard */}
                <div className="flex gap-2 mt-2">
                  <div className="text-xs px-2 py-1 rounded bg-secondary text-secondary-foreground">
                    En cours
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </main>
  );
}