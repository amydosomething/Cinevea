"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Star, Heart, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { AddToListDialog } from "@/components/add-to-list-dialog"
import { toast } from "@/components/ui/use-toast"

interface MovieCardProps {
  id: number
  title: string
  poster: string
  year: number
  rating: {
    imdb: number
    rt?: number
    metacritic?: number
  }
  genres: string[]
  compact?: boolean
}

export function MovieCard({ id, title, poster, year, rating, genres, compact = false }: MovieCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  const handleAddToWatchlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    toast({
      title: "Added to watchlist",
      description: `"${title}" has been added to your watchlist.`,
    })
  }

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    setIsFavorite(!isFavorite)

    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: `"${title}" has been ${isFavorite ? "removed from" : "added to"} your favorites.`,
    })
  }

  return (
    <div
      className={`group relative overflow-hidden rounded-lg transition-all duration-300 ${
        compact ? "w-[160px]" : "w-full"
      }`}
    >
      <Link href={`/movie/${id}`} className="block">
        <div className={`relative ${compact ? "h-[240px]" : "aspect-[2/3]"} overflow-hidden rounded-lg`}>
          <Image
            src={poster || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

          <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
            <div className="flex justify-between">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 rounded-full bg-black/50 text-white hover:bg-black/70"
                      onClick={handleAddToWatchlist}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Add to Watchlist</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon"
                      variant="ghost"
                      className={`h-8 w-8 rounded-full bg-black/50 text-white hover:bg-black/70 ${
                        isFavorite ? "text-red-500 hover:text-red-600" : ""
                      }`}
                      onClick={handleToggleFavorite}
                    >
                      <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{isFavorite ? "Remove from Favorites" : "Add to Favorites"}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </Link>

      {!compact && (
        <div className="absolute -top-2 -right-2 flex items-center justify-center">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-background blur-sm"></div>
            <div className="relative flex items-center gap-1 rounded-full bg-background px-2 py-1 text-xs font-medium">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              {rating.imdb}
            </div>
          </div>
        </div>
      )}

      <div className={`mt-2 ${compact ? "px-1" : ""}`}>
        <Link href={`/movie/${id}`} className="block">
          <h3 className={`font-medium line-clamp-1 ${compact ? "text-sm" : ""}`}>{title}</h3>
        </Link>

        <div className="flex items-center justify-between mt-1">
          <span className="text-xs text-muted-foreground">{year}</span>

          {!compact && (
            <div className="flex gap-1">
              {genres.slice(0, 2).map((genre) => (
                <Badge key={genre} variant="outline" className="text-[10px] px-1 py-0 h-4">
                  {genre}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {!compact && (
          <div className="mt-2 flex items-center gap-3">
            {rating.rt && (
              <div className="flex items-center gap-1">
                <span className="text-xs font-medium text-red-500">RT</span>
                <span className="text-xs">{rating.rt}%</span>
              </div>
            )}

            {rating.metacritic && (
              <div className="flex items-center gap-1">
                <span className="text-xs font-medium text-blue-500">MC</span>
                <span className="text-xs">{rating.metacritic}</span>
              </div>
            )}

            <div className="ml-auto">
              <AddToListDialog
                movieId={id}
                movieTitle={title}
                trigger={
                  <Button variant="ghost" size="sm" className="h-7 text-xs">
                    <Plus className="mr-1 h-3 w-3" /> List
                  </Button>
                }
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

