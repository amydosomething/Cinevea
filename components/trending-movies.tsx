import { MovieCard } from "@/components/movie-card"

const trendingMoviesData = [
  {
    id: 1,
    title: "Dune: Part Two",
    poster: "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg",
    year: 2024,
    rating: { imdb: 8.7, rt: 92, metacritic: 79 },
    genres: ["Sci-Fi", "Adventure"],
  },
  {
    id: 2,
    title: "Oppenheimer",
    poster: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    year: 2023,
    rating: { imdb: 8.5, rt: 93, metacritic: 88 },
    genres: ["Biography", "Drama", "History"],
  },
  {
    id: 3,
    title: "Barbie",
    poster: "https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg",
    year: 2023,
    rating: { imdb: 7.0, rt: 88, metacritic: 80 },
    genres: ["Comedy", "Adventure", "Fantasy"],
  },
  {
    id: 4,
    title: "The Batman",
    poster: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    year: 2022,
    rating: { imdb: 7.8, rt: 85, metacritic: 72 },
    genres: ["Action", "Crime", "Drama"],
  },
  {
    id: 5,
    title: "Killers of the Flower Moon",
    poster: "https://image.tmdb.org/t/p/w500/dB6Krk806zeqd0YNp2ngQ9zXteH.jpg",
    year: 2023,
    rating: { imdb: 7.7, rt: 93, metacritic: 89 },
    genres: ["Crime", "Drama", "History"],
  },
  {
    id: 6,
    title: "Everything Everywhere All at Once",
    poster: "https://image.tmdb.org/t/p/w500/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg",
    year: 2022,
    rating: { imdb: 7.8, rt: 93, metacritic: 81 },
    genres: ["Action", "Adventure", "Comedy"],
  },
  {
    id: 7,
    title: "Past Lives",
    poster: "https://image.tmdb.org/t/p/w500/k3waqVXSnvCZWfJYNtdamTgTtTA.jpg",
    year: 2023,
    rating: { imdb: 7.9, rt: 96, metacritic: 91 },
    genres: ["Drama", "Romance"],
  },
  {
    id: 8,
    title: "Top Gun: Maverick",
    poster: "https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg",
    year: 2022,
    rating: { imdb: 8.3, rt: 96, metacritic: 78 },
    genres: ["Action", "Drama"],
  },
]

export function TrendingMovies() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {trendingMoviesData.map((movie) => (
        <MovieCard key={movie.id} {...movie} />
      ))}
    </div>
  )
}

