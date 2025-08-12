"use client"

import { useState } from "react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Edit, Trash2, Filter, ArrowLeft } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "@/components/ui/use-toast"

// Sample review data
const userReviews = [
  {
    id: 1,
    movieId: 101,
    movieTitle: "Dune: Part Two",
    moviePoster: "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg",
    rating: 4.5,
    content:
      "Visually stunning and narratively compelling. Denis Villeneuve has crafted a sci-fi masterpiece that expands on the first film in every way.",
    date: "March 15, 2024",
    likes: 24,
  },
  {
    id: 2,
    movieId: 102,
    movieTitle: "Oppenheimer",
    moviePoster: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    rating: 5,
    content:
      "Christopher Nolan delivers a masterclass in filmmaking with this biographical thriller. Cillian Murphy's performance is nothing short of extraordinary.",
    date: "February 20, 2024",
    likes: 42,
  },
  {
    id: 3,
    movieId: 103,
    movieTitle: "Poor Things",
    moviePoster: "https://image.tmdb.org/t/p/w500/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg",
    rating: 4,
    content:
      "A bizarre and beautiful film with an incredible performance by Emma Stone. Yorgos Lanthimos creates a unique world that's both disturbing and fascinating.",
    date: "January 10, 2024",
    likes: 18,
  },
  {
    id: 4,
    movieId: 104,
    movieTitle: "The Holdovers",
    moviePoster: "https://image.tmdb.org/t/p/w500/mfvq6V78wkFsAYsY4dF4WUKdtKX.jpg",
    rating: 4.5,
    content:
      "A heartwarming and melancholic film with excellent performances. Alexander Payne returns to form with this touching story set during Christmas break at a boarding school.",
    date: "December 25, 2023",
    likes: 31,
  },
]

export default function ReviewsPage() {
  const [reviews, setReviews] = useState(userReviews)
  const [activeTab, setActiveTab] = useState("all")

  const handleDeleteReview = (reviewId: number) => {
    setReviews(reviews.filter((review) => review.id !== reviewId))
    toast({
      title: "Review deleted",
      description: "Your review has been successfully deleted.",
    })
  }

  const filterReviews = (tab: string) => {
    setActiveTab(tab)
    // In a real app, we would filter reviews based on the tab
    // For now, we'll just show all reviews regardless of the tab
  }

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
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-primary hover:underline mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">My Reviews</h1>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => filterReviews("recent")}>Most Recent</DropdownMenuItem>
                <DropdownMenuItem onClick={() => filterReviews("highest")}>Highest Rated</DropdownMenuItem>
                <DropdownMenuItem onClick={() => filterReviews("lowest")}>Lowest Rated</DropdownMenuItem>
                <DropdownMenuItem onClick={() => filterReviews("popular")}>Most Popular</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <Tabs defaultValue="all" className="mb-6" onValueChange={filterReviews}>
          <TabsList>
            <TabsTrigger value="all">All Reviews</TabsTrigger>
            <TabsTrigger value="movies">Movies</TabsTrigger>
            <TabsTrigger value="tvshows">TV Shows</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid gap-6">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <Card key={review.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="relative h-48 md:h-auto md:w-48 flex-shrink-0">
                      <Link href={`/movie/${review.movieId}`}>
                        <img
                          src={review.moviePoster || "/placeholder.svg"}
                          alt={review.movieTitle}
                          className="h-full w-full object-cover"
                        />
                      </Link>
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex items-center justify-between mb-2">
                        <Link href={`/movie/${review.movieId}`} className="hover:underline">
                          <h2 className="text-xl font-bold">{review.movieTitle}</h2>
                        </Link>
                        <div className="flex items-center gap-1">
                          {Array(5)
                            .fill(0)
                            .map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(review.rating)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : i < review.rating
                                      ? "fill-yellow-400/50 text-yellow-400/50"
                                      : "text-muted-foreground"
                                }`}
                              />
                            ))}
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-4">{review.content}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder.svg?height=32&width=32" />
                            <AvatarFallback>JD</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">John Doe</p>
                            <p className="text-xs text-muted-foreground">{review.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive"
                            onClick={() => handleDeleteReview(review.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No reviews yet</h3>
              <p className="text-muted-foreground mb-6">You haven't written any reviews yet.</p>
              <Button>Write Your First Review</Button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

