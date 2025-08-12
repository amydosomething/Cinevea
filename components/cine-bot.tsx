"use client"

import { useState } from "react"
import { Bot, X, Send, Mic, Film, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MovieCard } from "@/components/movie-card"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  recommendations?: {
    id: number
    title: string
    poster: string
    year: number
    rating: { imdb: number }
    genres: string[]
  }[]
}

export function CineBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "👋 Hi there! I'm CineBot, your movie recommendation assistant. How can I help you today?",
      sender: "bot",
    },
  ])

  const handleSend = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // Simulate bot response
    setTimeout(() => {
      let botResponse: Message

      if (input.toLowerCase().includes("recommend") || input.toLowerCase().includes("suggestion")) {
        botResponse = {
          id: (Date.now() + 1).toString(),
          content: "Based on your preferences, here are some movies you might enjoy:",
          sender: "bot",
          recommendations: [
            {
              id: 1,
              title: "Inception",
              poster: "https://image.tmdb.org/t/p/w500/8IB2e4r4oVhHnANbnm7O3Tj6tF8.jpg",
              year: 2010,
              rating: { imdb: 8.8 },
              genres: ["Action", "Sci-Fi"],
            },
            {
              id: 2,
              title: "The Shawshank Redemption",
              poster: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
              year: 1994,
              rating: { imdb: 9.3 },
              genres: ["Drama"],
            },
            {
              id: 3,
              title: "Parasite",
              poster: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
              year: 2019,
              rating: { imdb: 8.5 },
              genres: ["Drama", "Thriller"],
            },
          ],
        }
      } else {
        botResponse = {
          id: (Date.now() + 1).toString(),
          content:
            "I can help you discover new movies, provide information about films, or suggest what to watch based on your mood. Just let me know what you're looking for!",
          sender: "bot",
        }
      }

      setMessages((prev) => [...prev, botResponse])
    }, 1000)
  }

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 h-14 w-14 rounded-full shadow-lg bg-gradient-to-r from-indigo-500 to-purple-700 hover:from-indigo-600 hover:to-purple-800"
        size="icon"
      >
        <Bot className="h-6 w-6" />
      </Button>

      {isOpen && (
        <div className="fixed bottom-4 right-4 z-50 w-[90vw] max-w-[400px] rounded-xl border bg-background shadow-xl">
          <div className="flex items-center justify-between border-b p-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-700">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">CineBot</h3>
                <p className="text-xs text-muted-foreground">Your movie assistant</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <ScrollArea className="h-[400px] p-4">
            <div className="flex flex-col gap-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>

                    {message.recommendations && (
                      <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
                        {message.recommendations.map((movie) => (
                          <MovieCard key={movie.id} {...movie} compact />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="border-t p-4">
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="shrink-0">
                <Mic className="h-4 w-4" />
              </Button>
              <Input
                placeholder="Ask about movies..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1"
              />
              <Button size="icon" className="shrink-0" onClick={handleSend}>
                <Send className="h-4 w-4" />
              </Button>
            </div>

            <div className="mt-2 flex gap-2">
              <Button variant="ghost" size="sm" className="h-auto py-1 text-xs">
                <Film className="mr-1 h-3 w-3" /> Recommend a movie
              </Button>
              <Button variant="ghost" size="sm" className="h-auto py-1 text-xs">
                <MessageSquare className="mr-1 h-3 w-3" /> What's popular now?
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

