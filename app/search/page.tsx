"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { MovieSearch } from "@/components/movie-search"
import { MovieCard } from "@/components/movie-card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const searchResults = [
  {
    id: 1,
    title: "Inception",
    poster: "https://image.tmdb.org/t/p/w500/8IB2e4r4oVhHnANbnm7O3Tj6tF8.jpg",
    year: 2010,
    rating: { imdb: 8.8, rt: 87, metacritic: 74 },
    genres: ["Action", "Adventure", "Sci-Fi"],
  },
  {
    id: 2,
    title: "Interstellar",
    poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    year: 2014,
    rating: { imdb: 8.6, rt: 72, metacritic: 74 },
    genres: ["Adventure", "Drama", "Sci-Fi"],
  },
  {
    id: 3,
    title: "The Prestige",
    poster: "https://image.tmdb.org/t/p/w500/5MlvT4DZIdkpb7A9t375HVoiJ1v.jpg",
    year: 2006,
    rating: { imdb: 8.5, rt: 76, metacritic: 66 },
    genres: ["Drama", "Mystery", "Sci-Fi"],
  },
  {
    id: 4,
    title: "Memento",
    poster: "https://image.tmdb.org/t/p/w500/yuNs09hvpHVU1cBTCAk9zxsL2oW.jpg",
    year: 2000,
    rating: { imdb: 8.4, rt: 93, metacritic: 80 },
    genres: ["Mystery", "Thriller"],
  },
  {
    id: 5,
    title: "Tenet",
    poster: "https://image.tmdb.org/t/p/w500/aCIFMriQh8rvhxpN1IWGgvH0Tlg.jpg",
    year: 2020,
    rating: { imdb: 7.3, rt: 69, metacritic: 69 },
    genres: ["Action", "Sci-Fi", "Thriller"],
  },
  {
    id: 6,
    title: "Dunkirk",
    poster: "https://image.tmdb.org/t/p/w500/ebSnODDg9lbsMIaWg2uAbjn7TO5.jpg",
    year: 2017,
    rating: { imdb: 7.8, rt: 92, metacritic: 94 },
    genres: ["Action", "Drama", "History"],
  },
  {
    id: 7,
    title: "The Dark Knight",
    poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    year: 2008,
    rating: { imdb: 9.0, rt: 94, metacritic: 84 },
    genres: ["Action", "Crime", "Drama"],
  },
  {
    id: 8,
    title: "Batman Begins",
    poster: "https://image.tmdb.org/t/p/w500/4MpN4kIEqUjW8OPtOQJXlTdHiJV.jpg",
    year: 2005,
    rating: { imdb: 8.2, rt: 84, metacritic: 70 },
    genres: ["Action", "Adventure"],
  },
]

export default function SearchPage() {
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState("all")
  const [isSearching, setIsSearching] = useState(false)

  // Get the query parameter from the URL
  const query = searchParams.get("q") || ""

  useEffect(() => {
    // Simulate a search when the query changes
    if (query) {
      setIsSearching(true)
      // In a real app, you would fetch search results based on the query
      const timer = setTimeout(() => {
        setIsSearching(false)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [query])

  const filteredResults =
    activeTab === "all"
      ? searchResults
      : searchResults.filter((movie) => {
          // Add filtering logic here based on activeTab
          // For example, if activeTab is "movies", return only movies
          return true // Placeholder - replace with actual filtering logic
        })

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-8 w-8">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 to-purple-700"></div>
              <div className="absolute inset-[2px] rounded-full bg-background flex items-center justify-center text-lg font-bold">
                C
              </div>
            </div>
            <span className="text-xl font-bold">Cinevea</span>
          </Link>
        </div>
      </header>

      <main className="container py-8">
        <h1 className="text-3xl font-bold mb-6">{query ? `Search Results for "${query}"` : "Search Results"}</h1>

        <div className="mb-8">
          <MovieSearch />
        </div>

        <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="movies">Movies</TabsTrigger>
            <TabsTrigger value="tvshows">TV Shows</TabsTrigger>
            <TabsTrigger value="people">People</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex justify-between items-center mb-4">
          <p className="text-muted-foreground">
            {isSearching
              ? "Searching..."
              : query
                ? `Showing ${filteredResults.length} results for "${query}"`
                : `Showing ${filteredResults.length} results`}
          </p>
          <Button variant="outline">Filter & Sort</Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filteredResults.map((movie) => (
            <MovieCard key={movie.id} {...movie} />
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Button variant="outline">Load More</Button>
        </div>
      </main>
    </div>
  )
}

