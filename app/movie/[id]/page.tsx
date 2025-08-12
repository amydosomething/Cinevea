import { MovieDetails } from "@/components/movie-details"
import { CommentsSection } from "@/components/comments-section"
import Link from "next/link"

export default function MoviePage({ params }: { params: { id: string } }) {
  // This would normally fetch data from an API
  const movie = {
    id: Number.parseInt(params.id),
    title: "Inception",
    poster: "https://image.tmdb.org/t/p/w500/8IB2e4r4oVhHnANbnm7O3Tj6tF8.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
    year: 2010,
    runtime: 148,
    director: "Christopher Nolan",
    cast: [
      "Leonardo DiCaprio",
      "Joseph Gordon-Levitt",
      "Elliot Page",
      "Tom Hardy",
      "Ken Watanabe",
      "Dileep Rao",
      "Cillian Murphy",
      "Tom Berenger",
      "Marion Cotillard",
      "Michael Caine",
    ],
    genres: ["Action", "Adventure", "Sci-Fi", "Thriller"],
    plot: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    rating: {
      imdb: 8.8,
      rt: 87,
      metacritic: 74,
    },
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

      <MovieDetails movie={movie} />

      <div className="container py-8">
        <CommentsSection entityId={movie.id} entityType="movie" />
      </div>
    </div>
  )
}

