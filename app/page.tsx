import Link from "next/link"
import { MovieHero } from "@/components/movie-hero"
import { MovieSearch } from "@/components/movie-search"
import { TopPicks } from "@/components/top-picks"
import { TrendingMovies } from "@/components/trending-movies"
import { PersonalizedRecommendations } from "@/components/personalized-recommendations"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Button } from "@/components/ui/button"
import { UserNav } from "@/components/user-nav"
import { Toaster } from "@/components/toaster"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative h-8 w-8">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 to-purple-700"></div>
              <div className="absolute inset-[2px] rounded-full bg-background flex items-center justify-center text-lg font-bold">
                C
              </div>
            </div>
            <span className="text-xl font-bold">Cinevea</span>
          </div>
          <div className="hidden md:flex md:flex-1 md:justify-center">
            <MovieSearch minimal />
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/chatbot">
              <Button variant="ghost" size="sm" className="hidden md:inline-flex">
                CineBot
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button variant="default" size="sm" className="hidden md:inline-flex">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/sign-up">
              <Button variant="outline" size="sm" className="hidden md:inline-flex">
                Sign Up
              </Button>
            </Link>
            <UserNav />
          </div>
        </div>
      </header>

      <main className="container pb-16">
        <MovieHero />

        <div className="md:hidden my-6">
          <MovieSearch />
        </div>

        <section className="my-12">
          <h2 className="text-3xl font-bold tracking-tight mb-6">Top Picks For You</h2>
          <TopPicks />
        </section>

        <section className="my-12">
          <h2 className="text-3xl font-bold tracking-tight mb-6">Personalized Recommendations For You</h2>
          <PersonalizedRecommendations />
        </section>

        <section className="my-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold tracking-tight">Trending Now</h2>
            <Link href="/search">
              <Button variant="ghost" size="sm">
                View all
              </Button>
            </Link>
          </div>
          <TrendingMovies />
        </section>

        <section className="my-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-700/20 p-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Get Personalized Recommendations</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Sign up today to receive AI-powered movie suggestions tailored to your taste. Discover new favorites and
            never miss a great film again.
          </p>
          <Link href="/auth/sign-up">
            <Button
              size="lg"
              className="bg-gradient-to-r from-indigo-500 to-purple-700 hover:from-indigo-600 hover:to-purple-800"
            >
              Sign Up Now
            </Button>
          </Link>
        </section>
      </main>

      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 Cinevea. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <a href="#" className="hover:underline">
              Terms
            </a>
            <a href="#" className="hover:underline">
              Privacy
            </a>
            <a href="#" className="hover:underline">
              About
            </a>
            <a href="#" className="hover:underline">
              Contact
            </a>
          </div>
        </div>
      </footer>

      <Toaster />
    </div>
  )
}

