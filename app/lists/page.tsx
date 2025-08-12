import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Users, Lock, Globe } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// Add import for Image component
import Image from "next/image"

const personalLists = [
  {
    id: 1,
    title: "Best Movies of All Time",
    description: "My personal collection of the greatest films ever made.",
    movieCount: 25,
    visibility: "public",
    lastUpdated: "2 days ago",
  },
  {
    id: 2,
    title: "Movies to Watch in 2024",
    description: "Upcoming releases I'm excited about.",
    movieCount: 12,
    visibility: "private",
    lastUpdated: "1 week ago",
  },
]

const collaborativeLists = [
  {
    id: 3,
    title: "Oscar Winners Collection",
    description: "All Best Picture winners from the last 20 years.",
    movieCount: 20,
    collaborators: 2,
    visibility: "friends",
    lastUpdated: "3 days ago",
  },
  {
    id: 4,
    title: "Sci-Fi Masterpieces",
    description: "The most groundbreaking science fiction films.",
    movieCount: 18,
    collaborators: 4,
    visibility: "public",
    lastUpdated: "5 days ago",
  },
]

export default function ListsPage() {
  const getVisibilityIcon = (visibility: string) => {
    switch (visibility) {
      case "public":
        return <Globe className="h-4 w-4" />
      case "private":
        return <Lock className="h-4 w-4" />
      case "friends":
        return <Users className="h-4 w-4" />
      default:
        return null
    }
  }

  // Update the renderListCard function to include movie posters
  const renderListCard = (list: any, isCollaborative = false) => (
    <Link key={list.id} href={`/lists/${list.id}`} className="block">
      <div className="border rounded-lg p-6 h-full hover:border-primary transition-colors">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold">{list.title}</h2>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            {getVisibilityIcon(list.visibility)}
            <span className="capitalize">{list.visibility}</span>
          </div>
        </div>

        <div className="relative h-32 w-full mb-4 overflow-hidden rounded-md">
          <Image
            src={
              list.id % 2 === 0
                ? "https://image.tmdb.org/t/p/w500/8IB2e4r4oVhHnANbnm7O3Tj6tF8.jpg"
                : "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg"
            }
            alt={list.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-2">
            <p className="text-white text-sm">{list.movieCount} movies</p>
          </div>
        </div>

        <p className="text-muted-foreground mb-4 line-clamp-2">{list.description}</p>

        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">Updated {list.lastUpdated}</div>

          {isCollaborative && (
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {Array(Math.min(list.collaborators, 3))
                  .fill(0)
                  .map((_, i) => (
                    <Avatar key={i} className="h-6 w-6 border-2 border-background">
                      <AvatarImage src={`https://i.pravatar.cc/150?img=${i + 10}`} />
                      <AvatarFallback>U{i + 1}</AvatarFallback>
                    </Avatar>
                  ))}
              </div>
              {list.collaborators > 3 && (
                <span className="text-xs text-muted-foreground">+{list.collaborators - 3} more</span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  )

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
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
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Your Movie Lists</h1>
          <Link href="/lists/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Create New List
            </Button>
          </Link>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Lists</TabsTrigger>
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="collaborative">Collaborative</TabsTrigger>
            <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {personalLists.map((list) => renderListCard(list))}
              {collaborativeLists.map((list) => renderListCard(list, true))}
            </div>
          </TabsContent>

          <TabsContent value="personal">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {personalLists.map((list) => renderListCard(list))}
            </div>
          </TabsContent>

          <TabsContent value="collaborative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {collaborativeLists.map((list) => renderListCard(list, true))}
            </div>
          </TabsContent>

          <TabsContent value="watchlist">
            <p>Your watchlist will be displayed here.</p>
          </TabsContent>

          <TabsContent value="favorites">
            <p>Your favorites list will be displayed here.</p>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

