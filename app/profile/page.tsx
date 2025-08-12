import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MovieCard } from "@/components/movie-card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Edit, Settings, BarChart } from "lucide-react"
import Link from "next/link"

const watchlistMovies = [
  {
    id: 1,
    title: "Dune: Part Two",
    poster: "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg",
    year: 2024,
    rating: { imdb: 8.7 },
    genres: ["Sci-Fi", "Adventure"],
  },
  {
    id: 2,
    title: "Oppenheimer",
    poster: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    year: 2023,
    rating: { imdb: 8.5 },
    genres: ["Biography", "Drama"],
  },
  {
    id: 3,
    title: "Poor Things",
    poster: "https://image.tmdb.org/t/p/w500/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg",
    year: 2023,
    rating: { imdb: 8.3 },
    genres: ["Comedy", "Drama"],
  },
  {
    id: 4,
    title: "The Holdovers",
    poster: "https://image.tmdb.org/t/p/w500/mfvq6V78wkFsAYsY4dF4WUKdtKX.jpg",
    year: 2023,
    rating: { imdb: 8.0 },
    genres: ["Comedy", "Drama"],
  },
]

const favoriteMovies = [
  {
    id: 5,
    title: "The Shawshank Redemption",
    poster: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    year: 1994,
    rating: { imdb: 9.3 },
    genres: ["Drama"],
  },
  {
    id: 6,
    title: "The Godfather",
    poster: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    year: 1972,
    rating: { imdb: 9.2 },
    genres: ["Crime", "Drama"],
  },
  {
    id: 7,
    title: "The Dark Knight",
    poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    year: 2008,
    rating: { imdb: 9.0 },
    genres: ["Action", "Crime"],
  },
  {
    id: 8,
    title: "Pulp Fiction",
    poster: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    year: 1994,
    rating: { imdb: 8.9 },
    genres: ["Crime", "Drama"],
  },
]

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-8 w-8">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 to-purple-700"></div>
              <div className="absolute inset-[2px] rounded-full bg-background flex items-center justify-center text-lg font-bold">
                C
              </div>
            </div>
            <span className="text-xl font-bold">Cinevea</span>
          </Link>
          <Link href="/settings">
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </header>

      <main className="container py-8">
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className="md:w-1/3">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-32 w-32 mb-4">
                <AvatarImage src="https://i.pravatar.cc/300?img=68" alt="User Avatar" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <h1 className="text-2xl font-bold mb-2">John Doe</h1>
              <p className="text-muted-foreground mb-4">@johndoe</p>
              <Button variant="outline" className="mb-4">
                <Edit className="mr-2 h-4 w-4" /> Edit Profile
              </Button>
              <div className="flex gap-4 text-center">
                <div>
                  <p className="font-bold">250</p>
                  <p className="text-sm text-muted-foreground">Reviews</p>
                </div>
                <div>
                  <p className="font-bold">1.2k</p>
                  <p className="text-sm text-muted-foreground">Watched</p>
                </div>
                <div>
                  <p className="font-bold">15</p>
                  <p className="text-sm text-muted-foreground">Lists</p>
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-2/3">
            <Tabs defaultValue="watchlist">
              <TabsList className="mb-6">
                <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
                <TabsTrigger value="favorites">Favorites</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="lists">Lists</TabsTrigger>
                <TabsTrigger value="insights" asChild>
                  <Link href="/insights">
                    <div className="flex items-center">
                      <BarChart className="mr-2 h-4 w-4" />
                      Insights & Trends
                    </div>
                  </Link>
                </TabsTrigger>
              </TabsList>
              <TabsContent value="watchlist">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {watchlistMovies.map((movie) => (
                    <MovieCard key={movie.id} {...movie} />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="favorites">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {favoriteMovies.map((movie) => (
                    <MovieCard key={movie.id} {...movie} />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="reviews">
                <p>Your reviews will be displayed here.</p>
              </TabsContent>
              <TabsContent value="lists">
                <p>Your movie lists will be displayed here.</p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}

