import Image from "next/image"
import { Star, Clock, Calendar, Award, ThumbsUp, ThumbsDown, Share2, Plus, Heart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MovieCard } from "@/components/movie-card"

interface MovieDetailsProps {
  movie: {
    id: number
    title: string
    poster: string
    backdrop: string
    year: number
    runtime: number
    director: string
    cast: string[]
    genres: string[]
    plot: string
    rating: {
      imdb: number
      rt: number
      metacritic: number
    }
  }
}

export function MovieDetails({ movie }: MovieDetailsProps) {
  const similarMovies = [
    {
      id: 1,
      title: "Inception",
      poster: "https://image.tmdb.org/t/p/w500/8IB2e4r4oVhHnANbnm7O3Tj6tF8.jpg",
      year: 2010,
      rating: { imdb: 8.8 },
      genres: ["Action", "Sci-Fi"],
    },
    {
      id: 2,
      title: "Interstellar",
      poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
      year: 2014,
      rating: { imdb: 8.6 },
      genres: ["Adventure", "Drama", "Sci-Fi"],
    },
    {
      id: 3,
      title: "The Prestige",
      poster: "https://image.tmdb.org/t/p/w500/5MlvT4DZIdkpb7A9t375HVoiJ1v.jpg",
      year: 2006,
      rating: { imdb: 8.5 },
      genres: ["Drama", "Mystery", "Sci-Fi"],
    },
    {
      id: 4,
      title: "Memento",
      poster: "https://image.tmdb.org/t/p/w500/yuNs09hvpHVU1cBTCAk9zxsL2oW.jpg",
      year: 2000,
      rating: { imdb: 8.4 },
      genres: ["Mystery", "Thriller"],
    },
  ]

  return (
    <div className="min-h-screen">
      <div className="relative h-[50vh] md:h-[70vh]">
        <Image src={movie.backdrop || "/placeholder.svg"} alt={movie.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20"></div>

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="container">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="hidden md:block relative h-[300px] w-[200px] overflow-hidden rounded-lg shadow-lg">
                <Image src={movie.poster || "/placeholder.svg"} alt={movie.title} fill className="object-cover" />
              </div>

              <div className="flex-1">
                <h1 className="text-3xl md:text-5xl font-bold mb-2">{movie.title}</h1>
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="text-muted-foreground">{movie.year}</span>
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Clock className="h-4 w-4" /> {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                  </span>
                  <div className="flex gap-2">
                    {movie.genres.map((g) => (
                      <Badge key={g} variant="secondary">
                        {g}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-6 mb-6">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-1 mb-1">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="text-lg font-bold">{movie.rating.imdb}</span>
                      <span className="text-sm text-muted-foreground">/10</span>
                    </div>
                    <span className="text-xs text-muted-foreground">IMDb</span>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="relative h-10 w-10 mb-1">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-sm font-bold">{movie.rating.rt}%</span>
                      </div>
                      <svg viewBox="0 0 36 36" className="h-10 w-10">
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#E50914"
                          strokeWidth="3"
                          strokeDasharray={`${movie.rating.rt}, 100`}
                        />
                      </svg>
                    </div>
                    <span className="text-xs text-muted-foreground">Rotten Tomatoes</span>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="h-10 w-10 flex items-center justify-center border border-blue-500 mb-1">
                      <span className="text-sm font-bold">{movie.rating.metacritic}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">Metacritic</span>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6 max-w-2xl">{movie.plot}</p>

                <div className="flex flex-wrap gap-3">
                  <Button className="bg-primary hover:bg-primary/90">
                    <Plus className="mr-2 h-4 w-4" /> Add to Watchlist
                  </Button>
                  <Button variant="outline">
                    <Heart className="mr-2 h-4 w-4" /> Favorite
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <Tabs defaultValue="overview">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="similar">Similar Movies</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Synopsis</h2>
                  <p className="text-muted-foreground">
                    {movie.plot}
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies
                    tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget
                    ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">Cast & Crew</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {movie.cast.map((actor, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={`https://i.pravatar.cc/150?img=${index + 10}`} />
                          <AvatarFallback>
                            {actor
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{actor}</p>
                          <p className="text-xs text-muted-foreground">Character {index + 1}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Director</h3>
                  <p>{movie.director}</p>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-2">Release Date</h3>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <p>January 1, {movie.year}</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-2">Runtime</h3>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <p>
                      {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                    </p>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-2">Genres</h3>
                  <div className="flex flex-wrap gap-2">
                    {movie.genres.map((genre) => (
                      <Badge key={genre} variant="outline">
                        {genre}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-2">Awards</h3>
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-muted-foreground" />
                    <p>3 Oscars, 45 wins & 132 nominations</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reviews">
            <div className="space-y-8">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <h2 className="text-2xl font-bold mb-6">User Reviews</h2>

                  <div className="space-y-6">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="border rounded-lg p-4">
                        <div className="flex justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Avatar>
                              <AvatarImage src={`https://i.pravatar.cc/150?img=${i + 20}`} />
                              <AvatarFallback>U{i}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">User {i}</p>
                              <div className="flex items-center gap-1">
                                {Array(5)
                                  .fill(0)
                                  .map((_, j) => (
                                    <Star
                                      key={j}
                                      className={`h-3 w-3 ${j < 5 - (i % 2) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                                    />
                                  ))}
                              </div>
                            </div>
                          </div>
                          <span className="text-xs text-muted-foreground">March {i}, 2024</span>
                        </div>

                        <p className="text-sm text-muted-foreground mb-3">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies
                          tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.
                        </p>

                        <div className="flex items-center gap-4">
                          <Button variant="ghost" size="sm" className="h-8 gap-1">
                            <ThumbsUp className="h-3 w-3" />
                            <span className="text-xs">{42 + i * 10}</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 gap-1">
                            <ThumbsDown className="h-3 w-3" />
                            <span className="text-xs">{5 + i}</span>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">Rating Distribution</h3>

                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center gap-2">
                        <div className="flex items-center gap-1 w-12">
                          {rating} <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        </div>
                        <Progress value={100 - rating * 15} className="h-2" />
                        <span className="text-xs w-10 text-right">{rating * 100}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6">
                    <h3 className="font-semibold mb-4">Critics Consensus</h3>
                    <p className="text-sm text-muted-foreground">
                      "Critics agree that {movie.title} is a masterful film that combines stunning visuals with a
                      compelling narrative, though some found the pacing to be uneven at times."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="similar">
            <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {similarMovies.map((movie) => (
                <MovieCard key={movie.id} {...movie} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

