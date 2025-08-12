"use client"

import type React from "react"

import { useState } from "react"
import { Check, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

interface AddToListDialogProps {
  movieId: number
  movieTitle: string
  trigger?: React.ReactNode
}

const userLists = [
  { id: 1, name: "Favorites", count: 12 },
  { id: 2, name: "Watch Later", count: 8 },
  { id: 3, name: "Best of 2023", count: 15 },
  { id: 4, name: "Oscar Winners", count: 24 },
  { id: 5, name: "Sci-Fi Movies", count: 18 },
]

export function AddToListDialog({ movieId, movieTitle, trigger }: AddToListDialogProps) {
  const [open, setOpen] = useState(false)
  const [selectedLists, setSelectedLists] = useState<number[]>([])
  const [newListName, setNewListName] = useState("")

  const handleAddToLists = () => {
    if (selectedLists.length === 0 && !newListName) {
      toast({
        title: "No list selected",
        description: "Please select a list or create a new one.",
        variant: "destructive",
      })
      return
    }

    // Handle adding to existing lists
    if (selectedLists.length > 0) {
      const listNames = selectedLists.map((id) => userLists.find((list) => list.id === id)?.name).filter(Boolean)

      toast({
        title: "Added to lists",
        description: `"${movieTitle}" has been added to ${listNames.join(", ")}`,
      })
    }

    // Handle creating a new list
    if (newListName) {
      toast({
        title: "New list created",
        description: `"${movieTitle}" has been added to your new list "${newListName}"`,
      })
      setNewListName("")
    }

    setSelectedLists([])
    setOpen(false)
  }

  const toggleList = (listId: number) => {
    setSelectedLists((prev) => (prev.includes(listId) ? prev.filter((id) => id !== listId) : [...prev, listId]))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <Plus className="mr-2 h-4 w-4" /> Add to List
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add to List</DialogTitle>
          <DialogDescription>Add "{movieTitle}" to one or more of your lists, or create a new list.</DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-4">
          <Command className="rounded-lg border shadow-md">
            <CommandInput placeholder="Search lists..." />
            <CommandList>
              <CommandEmpty>No lists found.</CommandEmpty>
              <CommandGroup heading="Your Lists">
                {userLists.map((list) => (
                  <CommandItem
                    key={list.id}
                    onSelect={() => toggleList(list.id)}
                    className="flex items-center justify-between"
                  >
                    <span>
                      {list.name} ({list.count})
                    </span>
                    {selectedLists.includes(list.id) && <Check className="h-4 w-4 text-primary" />}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>

          <div className="space-y-2">
            <Label htmlFor="new-list">Or create a new list</Label>
            <Input
              id="new-list"
              placeholder="Enter list name..."
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleAddToLists}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

