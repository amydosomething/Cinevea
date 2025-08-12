"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MovieCard } from "@/components/movie-card"

const topPicksData = [
  {
    id: 1,
    title: "The Shawshank Redemption",
    poster: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    year: 1994,
    rating: { imdb: 9.3, rt: 91, metacritic: 80 },
    genres: ["Drama"],
  },
  {
    id: 2,
    title: "The Godfather",
    poster: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    year: 1972,
    rating: { imdb: 9.2, rt: 97, metacritic: 100 },
    genres: ["Crime", "Drama"],
  },
  {
    id: 3,
    title: "The Dark Knight",
    poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    year: 2008,
    rating: { imdb: 9.0, rt: 94, metacritic: 84 },
    genres: ["Action", "Crime", "Drama"],
  },
  {
    id: 4,
    title: "Pulp Fiction",
    poster: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    year: 1994,
    rating: { imdb: 8.9, rt: 92, metacritic: 94 },
    genres: ["Crime", "Drama"],
  },
  {
    id: 5,
    title: "Fight Club",
    poster: "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    year: 1999,
    rating: { imdb: 8.8, rt: 79, metacritic: 66 },
    genres: ["Drama"],
  },
  {
    id: 6,
    title: "Inception",
    poster: "https://image.tmdb.org/t/p/w500/8IB2e4r4oVhHnANbnm7O3Tj6tF8.jpg",
    year: 2010,
    rating: { imdb: 8.8, rt: 87, metacritic: 74 },
    genres: ["Action", "Adventure", "Sci-Fi"],
  },
  {
    id: 7,
    title: "The Matrix",
    poster: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    year: 1999,
    rating: { imdb: 8.7, rt: 88, metacritic: 73 },
    genres: ["Action", "Sci-Fi"],
  },
  {
    id: 8,
    title: "Goodfellas",
    poster: "https://image.tmdb.org/t/p/w500/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg",
    year: 1990,
    rating: { imdb: 8.7, rt: 96, metacritic: 90 },
    genres: ["Biography", "Crime", "Drama"],
  },
]

export function TopPicks() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef
      const scrollAmount = direction === "left" ? -current.clientWidth : current.clientWidth
      current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  return (
    <div className="relative">
      <div className="absolute -left-4 top-1/2 z-10 -translate-y-1/2">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full bg-background/80 shadow-md backdrop-blur-sm"
          onClick={() => scroll("left")}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Scroll left</span>
        </Button>
      </div>

      <div ref={scrollContainerRef} className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {topPicksData.map((movie) => (
          <div key={movie.id} className="flex-shrink-0 w-[220px]">
            <MovieCard {...movie} />
          </div>
        ))}
      </div>

      <div className="absolute -right-4 top-1/2 z-10 -translate-y-1/2">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full bg-background/80 shadow-md backdrop-blur-sm"
          onClick={() => scroll("right")}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Scroll right</span>
        </Button>
      </div>
    </div>
  )
}

