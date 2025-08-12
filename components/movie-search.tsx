"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

const genres = [
  "Action",
  "Adventure",
  "Animation",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Fantasy",
  "Horror",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Thriller",
]

export function MovieSearch({ minimal = false }: { minimal?: boolean }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState("")
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [yearRange, setYearRange] = useState([1970, 2025])
  const [ratingRange, setRatingRange] = useState([5, 10])

  // Initialize query from URL params when component mounts
  useEffect(() => {
    const queryParam = searchParams.get("q")
    if (queryParam) {
      setQuery(queryParam)
    }
  }, [searchParams])

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) => (prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]))
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`)
    }
  }

  if (minimal) {
    return (
      <form onSubmit={handleSearch} className="relative w-full max-w-md">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search movies, directors, actors..."
          className="w-full pl-9 rounded-full bg-muted"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
    )
  }

  return (
    <form onSubmit={handleSearch} className="w-full space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search movies, directors, actors..."
          className="w-full pl-10 py-6 text-lg"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm">
              Genres {selectedGenres.length > 0 && `(${selectedGenres.length})`}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-4">
              <h4 className="font-medium">Select Genres</h4>
              <div className="grid grid-cols-2 gap-2">
                {genres.map((genre) => (
                  <div key={genre} className="flex items-center space-x-2">
                    <Checkbox
                      id={`genre-${genre}`}
                      checked={selectedGenres.includes(genre)}
                      onCheckedChange={() => toggleGenre(genre)}
                    />
                    <label htmlFor={`genre-${genre}`} className="text-sm">
                      {genre}
                    </label>
                  </div>
                ))}
              </div>
              <div className="flex justify-between">
                <Button variant="ghost" size="sm" onClick={() => setSelectedGenres([])}>
                  Clear
                </Button>
                <Button size="sm" onClick={() => setSelectedGenres(genres)}>
                  Select All
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm">
              Year: {yearRange[0]} - {yearRange[1]}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-4">
              <h4 className="font-medium">Release Year</h4>
              <Slider
                defaultValue={yearRange}
                min={1920}
                max={2025}
                step={1}
                onValueChange={(value) => setYearRange(value as number[])}
              />
              <div className="flex justify-between">
                <div className="text-sm">{yearRange[0]}</div>
                <div className="text-sm">{yearRange[1]}</div>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm">
              Rating: {ratingRange[0]} - {ratingRange[1]}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-4">
              <h4 className="font-medium">IMDb Rating</h4>
              <Slider
                defaultValue={ratingRange}
                min={0}
                max={10}
                step={0.1}
                onValueChange={(value) => setRatingRange(value as number[])}
              />
              <div className="flex justify-between">
                <div className="text-sm">{ratingRange[0]}</div>
                <div className="text-sm">{ratingRange[1]}</div>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              Sort By
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Sort Results</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>Popularity (Descending)</DropdownMenuItem>
              <DropdownMenuItem>Popularity (Ascending)</DropdownMenuItem>
              <DropdownMenuItem>Rating (Descending)</DropdownMenuItem>
              <DropdownMenuItem>Rating (Ascending)</DropdownMenuItem>
              <DropdownMenuItem>Release Date (Newest)</DropdownMenuItem>
              <DropdownMenuItem>Release Date (Oldest)</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        {selectedGenres.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {selectedGenres.map((genre) => (
              <Badge key={genre} variant="secondary" className="cursor-pointer" onClick={() => toggleGenre(genre)}>
                {genre} ×
              </Badge>
            ))}
          </div>
        )}
      </div>
    </form>
  )
}

