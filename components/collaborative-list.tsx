"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { MovieCard } from "@/components/movie-card"
import { Plus, Users, Lock, Globe, UserPlus, Trash2, Edit, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "@/components/ui/use-toast"

interface Collaborator {
  id: number
  name: string
  avatar?: string
  role: "owner" | "editor" | "viewer"
}

interface ListMovie {
  id: number
  title: string
  poster: string
  year: number
  rating: { imdb: number }
  genres: string[]
  addedBy: {
    id: number
    name: string
  }
  addedAt: string
}

interface CollaborativeListProps {
  id?: number
  isEditing?: boolean
}

const sampleCollaborators: Collaborator[] = [
  {
    id: 1,
    name: "John Doe",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "owner",
  },
  {
    id: 2,
    name: "Jane Smith",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "editor",
  },
  {
    id: 3,
    name: "Mike Johnson",
    role: "viewer",
  },
]

const sampleMovies: ListMovie[] = [
  {
    id: 1,
    title: "Inception",
    poster: "https://image.tmdb.org/t/p/w500/8IB2e4r4oVhHnANbnm7O3Tj6tF8.jpg",
    year: 2010,
    rating: { imdb: 8.8 },
    genres: ["Action", "Sci-Fi"],
    addedBy: {
      id: 1,
      name: "John Doe",
    },
    addedAt: "2 days ago",
  },
  {
    id: 2,
    title: "The Dark Knight",
    poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    year: 2008,
    rating: { imdb: 9.0 },
    genres: ["Action", "Crime", "Drama"],
    addedBy: {
      id: 2,
      name: "Jane Smith",
    },
    addedAt: "1 week ago",
  },
  {
    id: 3,
    title: "Interstellar",
    poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    year: 2014,
    rating: { imdb: 8.6 },
    genres: ["Adventure", "Drama", "Sci-Fi"],
    addedBy: {
      id: 1,
      name: "John Doe",
    },
    addedAt: "3 days ago",
  },
  {
    id: 4,
    title: "Parasite",
    poster: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    year: 2019,
    rating: { imdb: 8.5 },
    genres: ["Drama", "Thriller"],
    addedBy: {
      id: 3,
      name: "Mike Johnson",
    },
    addedAt: "5 days ago",
  },
]

export function CollaborativeList({ id, isEditing = false }: CollaborativeListProps) {
  const [listTitle, setListTitle] = useState(id ? "Best Movies of All Time" : "")
  const [listDescription, setListDescription] = useState(
    id ? "A collaborative list of what we consider to be the greatest films ever made." : "",
  )
  const [listVisibility, setListVisibility] = useState<"public" | "private" | "friends">(id ? "public" : "private")
  const [collaborators, setCollaborators] = useState<Collaborator[]>(id ? sampleCollaborators : [])
  const [movies, setMovies] = useState<ListMovie[]>(id ? sampleMovies : [])
  const [inviteEmail, setInviteEmail] = useState("")
  const [inviteRole, setInviteRole] = useState<"editor" | "viewer">("viewer")
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false)

  const handleSaveList = () => {
    if (!listTitle.trim()) {
      toast({
        title: "List title required",
        description: "Please enter a title for your list.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: id ? "List updated" : "List created",
      description: id ? `Your list "${listTitle}" has been updated.` : `Your new list "${listTitle}" has been created.`,
    })

    // In a real app, we would save to the database here
    // and then redirect to the list page
  }

  const handleInviteCollaborator = () => {
    if (!inviteEmail.trim()) {
      toast({
        title: "Email required",
        description: "Please enter an email address to invite a collaborator.",
        variant: "destructive",
      })
      return
    }

    // In a real app, we would send an invitation email
    toast({
      title: "Invitation sent",
      description: `An invitation has been sent to ${inviteEmail}.`,
    })

    // Add a placeholder collaborator
    const newCollaborator: Collaborator = {
      id: Date.now(),
      name: inviteEmail.split("@")[0],
      role: inviteRole,
    }

    setCollaborators([...collaborators, newCollaborator])
    setInviteEmail("")
    setInviteDialogOpen(false)
  }

  const handleRemoveCollaborator = (collaboratorId: number) => {
    setCollaborators((prev) => prev.filter((c) => c.id !== collaboratorId))

    toast({
      title: "Collaborator removed",
      description: "The collaborator has been removed from this list.",
    })
  }

  const handleChangeRole = (collaboratorId: number, newRole: "owner" | "editor" | "viewer") => {
    setCollaborators((prev) => prev.map((c) => (c.id === collaboratorId ? { ...c, role: newRole } : c)))

    toast({
      title: "Role updated",
      description: "The collaborator's role has been updated.",
    })
  }

  const handleRemoveMovie = (movieId: number) => {
    setMovies((prev) => prev.filter((m) => m.id !== movieId))

    toast({
      title: "Movie removed",
      description: "The movie has been removed from this list.",
    })
  }

  const getVisibilityIcon = () => {
    switch (listVisibility) {
      case "public":
        return <Globe className="h-4 w-4" />
      case "private":
        return <Lock className="h-4 w-4" />
      case "friends":
        return <Users className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-8">
      {isEditing ? (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="list-title">List Title</Label>
            <Input
              id="list-title"
              value={listTitle}
              onChange={(e) => setListTitle(e.target.value)}
              placeholder="Enter a title for your list..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="list-description">Description</Label>
            <Textarea
              id="list-description"
              value={listDescription}
              onChange={(e) => setListDescription(e.target.value)}
              placeholder="Describe what this list is about..."
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="list-visibility">Visibility</Label>
            <Select value={listVisibility} onValueChange={(value) => setListVisibility(value as any)}>
              <SelectTrigger id="list-visibility">
                <SelectValue placeholder="Select visibility" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">
                  <div className="flex items-center">
                    <Globe className="mr-2 h-4 w-4" />
                    <span>Public (Anyone can view)</span>
                  </div>
                </SelectItem>
                <SelectItem value="friends">
                  <div className="flex items-center">
                    <Users className="mr-2 h-4 w-4" />
                    <span>Friends Only</span>
                  </div>
                </SelectItem>
                <SelectItem value="private">
                  <div className="flex items-center">
                    <Lock className="mr-2 h-4 w-4" />
                    <span>Private (Only collaborators)</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline">Cancel</Button>
            <Button onClick={handleSaveList}>{id ? "Save Changes" : "Create List"}</Button>
          </div>
        </div>
      ) : id ? (
        <div>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">{listTitle}</h1>
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" /> Edit List
            </Button>
          </div>
          <p className="mt-2 text-muted-foreground">{listDescription}</p>
          <div className="mt-4 flex items-center gap-4">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              {getVisibilityIcon()}
              <span>
                {listVisibility === "public" ? "Public" : listVisibility === "private" ? "Private" : "Friends Only"}
              </span>
            </div>
            <div className="text-sm text-muted-foreground">{movies.length} movies</div>
          </div>
        </div>
      ) : null}

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Collaborators</h2>
          <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <UserPlus className="mr-2 h-4 w-4" /> Invite
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Invite Collaborator</DialogTitle>
                <DialogDescription>Invite someone to collaborate on this list.</DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    placeholder="Enter email address..."
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select value={inviteRole} onValueChange={(value) => setInviteRole(value as any)}>
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="editor">Editor (Can add/remove movies)</SelectItem>
                      <SelectItem value="viewer">Viewer (Can only view)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setInviteDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleInviteCollaborator}>Send Invitation</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-2">
          {collaborators.map((collaborator) => (
            <div key={collaborator.id} className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={collaborator.avatar} />
                  <AvatarFallback>{collaborator.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{collaborator.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{collaborator.role}</p>
                </div>
              </div>

              {collaborator.role !== "owner" && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleChangeRole(collaborator.id, "editor")}>
                      Make Editor
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleChangeRole(collaborator.id, "viewer")}>
                      Make Viewer
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => handleRemoveCollaborator(collaborator.id)}
                      className="text-destructive"
                    >
                      <Trash2 className="mr-2 h-4 w-4" /> Remove
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Movies</h2>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" /> Add Movie
          </Button>
        </div>

        {movies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {movies.map((movie) => (
              <div key={movie.id} className="relative">
                <MovieCard {...movie} />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-3">
                  <div className="flex items-center justify-between text-xs">
                    <div className="text-muted-foreground">Added by {movie.addedBy.name}</div>
                    <div className="text-muted-foreground">{movie.addedAt}</div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8 rounded-full bg-background/50 backdrop-blur-sm"
                  onClick={() => handleRemoveMovie(movie.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8">
            <p className="text-center text-muted-foreground">
              This list doesn't have any movies yet. Click "Add Movie" to get started.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

