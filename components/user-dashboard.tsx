import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MovieCard } from "@/components/movie-card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Star, Film, Heart, List, Settings, Users } from "lucide-react"
import Image from "next/image"

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

const recentActivity = [
  {
    id: 1,
    type: "review",
    movie: "Dune: Part Two",
    date: "2 days ago",
    content: "Visually stunning and narratively compelling. Denis Villeneuve has crafted a sci-fi masterpiece.",
    rating: 4.5,
  },
  {
    id: 2,
    type: "watchlist",
    movie: "Poor Things",
    date: "1 week ago",
    content: "Added to watchlist",
  },
  {
    id: 3,
    type: "rating",
    movie: "Oppenheimer",
    date: "2 weeks ago",
    content: "Rated 5 stars",
    rating: 5,
  },
]

export function UserDashboard() {
  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="md:w-1/4">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder.svg?height=96&width=96" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </div>
              <CardTitle>John Doe</CardTitle>
              <CardDescription>@johndoe</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center gap-6 mb-6">
                <div className="text-center">
                  <p className="text-2xl font-bold">42</p>
                  <p className="text-xs text-muted-foreground">Reviews</p>
                </div>
                <Separator orientation="vertical" className="h-12" />
                <div className="text-center">
                  <p className="text-2xl font-bold">128</p>
                  <p className="text-xs text-muted-foreground">Watched</p>
                </div>
                <Separator orientation="vertical" className="h-12" />
                <div className="text-center">
                  <p className="text-2xl font-bold">16</p>
                  <p className="text-xs text-muted-foreground">Lists</p>
                </div>
              </div>

              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Film className="mr-2 h-4 w-4" /> Watchlist
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Heart className="mr-2 h-4 w-4" /> Favorites
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <List className="mr-2 h-4 w-4" /> My Lists
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="mr-2 h-4 w-4" /> Friends
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="mr-2 h-4 w-4" /> Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:w-3/4">
          <Tabs defaultValue="watchlist">
            <TabsList className="mb-6">
              <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
              <TabsTrigger value="activity">Recent Activity</TabsTrigger>
              <TabsTrigger value="recommendations">For You</TabsTrigger>
            </TabsList>

            <TabsContent value="watchlist">
              <h2 className="text-2xl font-bold mb-6">Your Watchlist</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {watchlistMovies.map((movie) => (
                  <MovieCard key={movie.id} {...movie} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="favorites">
              <h2 className="text-2xl font-bold mb-6">Your Favorites</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {favoriteMovies.map((movie) => (
                  <MovieCard key={movie.id} {...movie} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="activity">
              <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <Card key={activity.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="relative h-16 w-12 flex-shrink-0 overflow-hidden rounded-md">
                          <Image
                            src={
                              activity.type === "review"
                                ? "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg"
                                : activity.type === "watchlist"
                                  ? "https://image.tmdb.org/t/p/w500/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg"
                                  : "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg"
                            }
                            alt={activity.movie}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium">{activity.movie}</h3>
                            <span className="text-xs text-muted-foreground">{activity.date}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{activity.content}</p>
                          {activity.rating && (
                            <div className="mt-1 flex items-center">
                              {Array(5)
                                .fill(0)
                                .map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-3 w-3 ${
                                      i < Math.floor(activity.rating)
                                        ? "fill-yellow-400 text-yellow-400"
                                        : i < activity.rating
                                          ? "fill-yellow-400/50 text-yellow-400/50"
                                          : "text-muted-foreground"
                                    }`}
                                  />
                                ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="recommendations">
              <h2 className="text-2xl font-bold mb-6">Recommended For You</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {[...favoriteMovies, ...watchlistMovies]
                  .sort(() => Math.random() - 0.5)
                  .slice(0, 4)
                  .map((movie) => (
                    <MovieCard key={movie.id} {...movie} />
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

