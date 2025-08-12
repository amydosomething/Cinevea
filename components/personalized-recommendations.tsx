"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Plus, Info } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { toast } from "@/components/ui/use-toast"

// Replace the recommendedMovies array with this updated version to fix broken links:

const recommendedMovies = [
  {
    id: 1,
    title: "Blade Runner 2049",
    poster: "https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg",
    year: 2017,
    genres: ["Sci-Fi", "Drama", "Mystery"],
    reason: "Based on your love for Sci-Fi",
  },
  {
    id: 2,
    title: "Mad Max: Fury Road",
    poster: "https://www.themoviedb.org/t/p/w1280/hA2ple9q4qnwxp3hKVNhroipsir.jpg",
    year: 2015,
    genres: ["Action", "Adventure", "Sci-Fi"],
    reason: "Because you enjoyed Dune",
  },
  {
    id: 3,
    title: "The Royal Tenenbaums",
    poster: "https://www.themoviedb.org/t/p/w1280/syaECBy6irxSgeF0m5ltGPNTWXL.jpg",
    year: 2001,
    genres: ["Comedy", "Drama"],
    reason: "Matches your mood: Whimsical",
  },
  {
    id: 4,
    title: "Arrival",
    poster: "https://image.tmdb.org/t/p/w500/x2FJsf1ElAgr63Y3PNPtJrcmpoe.jpg",
    year: 2016,
    genres: ["Sci-Fi", "Drama"],
    reason: "Based on your watch history",
  },
  {
    id: 5,
    title: "Knives Out",
    poster: "https://image.tmdb.org/t/p/w500/pThyQovXQrw2m0s9x82twj48Jq4.jpg",
    year: 2019,
    genres: ["Mystery", "Comedy", "Crime"],
    reason: "Trending in your favorite genres",
  },
]

export function PersonalizedRecommendations() {
  const [addedToWatchlist, setAddedToWatchlist] = useState<number[]>([])

  const handleAddToWatchlist = (movieId: number, movieTitle: string) => {
    if (addedToWatchlist.includes(movieId)) {
      return
    }

    setAddedToWatchlist((prev) => [...prev, movieId])

    toast({
      title: "Added to watchlist",
      description: `"${movieTitle}" has been added to your watchlist.`,
    })
  }

  return (
    <div className="relative">
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {recommendedMovies.map((movie) => (
          <div key={movie.id} className="flex-shrink-0 w-[220px]">
            <div className="group relative overflow-hidden rounded-lg border bg-card transition-all duration-300">
              <div className="absolute top-2 right-2 z-10">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="icon"
                        variant="ghost"
                        className={`h-8 w-8 rounded-full bg-black/50 text-white hover:bg-black/70 ${
                          addedToWatchlist.includes(movie.id) ? "bg-primary/80 hover:bg-primary" : ""
                        }`}
                        onClick={() => handleAddToWatchlist(movie.id, movie.title)}
                        disabled={addedToWatchlist.includes(movie.id)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      {addedToWatchlist.includes(movie.id) ? "Added to Watchlist" : "Add to Watchlist"}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <Link href={`/movie/${movie.id}`} className="block">
                <div className="relative aspect-[2/3] overflow-hidden rounded-t-lg">
                  <Image
                    src={movie.poster || "/placeholder.svg?height=600&width=400"}
                    alt={movie.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </Link>

              <div className="p-3">
                <Link href={`/movie/${movie.id}`} className="block">
                  <h3 className="font-medium line-clamp-1">{movie.title}</h3>
                </Link>

                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-muted-foreground">{movie.year}</span>
                  <div className="flex gap-1">
                    {movie.genres.slice(0, 2).map((genre) => (
                      <Badge key={genre} variant="outline" className="text-[10px] px-1 py-0 h-4">
                        {genre}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mt-2 flex items-center gap-1 bg-muted/50 rounded-full px-2 py-1">
                  <Info className="h-3 w-3 text-primary" />
                  <p className="text-xs text-muted-foreground">{movie.reason}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

