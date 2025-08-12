"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Plus, Star } from "lucide-react"

const heroMovies = [
  {
    id: 1,
    title: "Dune: Part Two",
    backdrop: "https://image.tmdb.org/t/p/original/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg",
    poster: "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg",
    year: 2024,
    rating: 8.7,
    genre: ["Sci-Fi", "Adventure"],
    description:
      "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
  },
  {
    id: 2,
    title: "Oppenheimer",
    backdrop: "https://image.tmdb.org/t/p/original/rLb2cwF3Pazuxaj0sRXQ037tGI1.jpg",
    poster: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    year: 2023,
    rating: 8.5,
    genre: ["Biography", "Drama", "History"],
    description:
      "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
  },
  {
    id: 3,
    title: "Barbie",
    backdrop: "https://image.tmdb.org/t/p/original/ctMserH8g2SeOAnCw5gFjdQF8mo.jpg",
    poster: "https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg",
    year: 2023,
    rating: 7.0,
    genre: ["Comedy", "Adventure", "Fantasy"],
    description:
      "Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land. However, when they get a chance to go to the real world, they soon discover the joys and perils of living among humans.",
  },
]

export function MovieHero() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const currentMovie = heroMovies[currentIndex]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroMovies.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative mt-6 h-[70vh] min-h-[500px] w-full overflow-hidden rounded-xl">
      <div className="absolute inset-0 bg-black/50 z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-20"></div>

      {heroMovies.map((movie, index) => (
        <div
          key={movie.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentIndex ? "opacity-100" : "opacity-0"}`}
        >
          <Image
            src={movie.backdrop || "/placeholder.svg"}
            alt={movie.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
        </div>
      ))}

      <div className="absolute bottom-0 left-0 right-0 z-30 p-6 md:p-10">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="hidden md:block relative h-[200px] w-[133px] overflow-hidden rounded-lg shadow-lg">
            <Image
              src={currentMovie.poster || "/placeholder.svg"}
              alt={currentMovie.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex-1">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{currentMovie.title}</h1>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-white/90">{currentMovie.year}</span>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-white/90">{currentMovie.rating}</span>
              </div>
              <div className="flex gap-2">
                {currentMovie.genre.map((g) => (
                  <Badge key={g} variant="secondary" className="bg-white/10 hover:bg-white/20">
                    {g}
                  </Badge>
                ))}
              </div>
            </div>
            <p className="text-white/80 max-w-2xl mb-6 line-clamp-2 md:line-clamp-3">{currentMovie.description}</p>
            <div className="flex gap-3">
              <Button className="bg-primary hover:bg-primary/90">
                <Play className="mr-2 h-4 w-4" /> Watch Trailer
              </Button>
              <Button
                variant="outline"
                className="border-white/20 text-black hover:bg-white/10 dark:border-white/20 dark:text-white"
              >
                <Plus className="mr-2 h-4 w-4" /> Add to Watchlist
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 flex gap-2">
          {heroMovies.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 w-6 rounded-full transition-all ${index === currentIndex ? "bg-white" : "bg-white/30"}`}
              aria-label={`View slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

