"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MovieCard } from "@/components/movie-card"
import { Bot, Send, Mic, ArrowRight } from "lucide-react"

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

const suggestedPrompts = [
  "Recommend me a sci-fi movie from the 90s",
  "What are the best comedy movies of 2023?",
  "I'm in the mood for a thriller with a twist ending",
  "Show me movies similar to Inception",
  "What should I watch if I liked The Shawshank Redemption?",
  "Recommend a movie for date night",
  "What are some underrated horror movies?",
  "I want to watch something with great cinematography",
]

export default function ChatbotPage() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "👋 Hi there! I'm CineBot, your movie recommendation assistant. How can I help you today?",
      sender: "bot",
    },
  ])

  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  const handleSend = (text = input) => {
    if (!text.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: text,
      sender: "user",
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // Simulate bot response
    setTimeout(() => {
      let botResponse: Message

      if (
        text.toLowerCase().includes("recommend") ||
        text.toLowerCase().includes("suggestion") ||
        text.toLowerCase().includes("similar")
      ) {
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

  const handlePromptClick = (prompt: string) => {
    handleSend(prompt)
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
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

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              <span className="font-medium">CineBot</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 container py-6 flex flex-col">
        <div className="flex-1 flex flex-col md:flex-row gap-6">
          <div className="md:w-3/4 flex flex-col">
            <ScrollArea className="flex-1 h-[calc(100vh-16rem)] border rounded-lg p-4">
              <div className="space-y-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.sender === "bot" && (
                      <Avatar className="h-10 w-10 mr-3 mt-1">
                        <AvatarImage src="/placeholder.svg?height=40&width=40" />
                        <AvatarFallback>CB</AvatarFallback>
                      </Avatar>
                    )}

                    <div
                      className={`max-w-[80%] rounded-lg p-4 ${
                        message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      <p>{message.content}</p>

                      {message.recommendations && (
                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                          {message.recommendations.map((movie) => (
                            <MovieCard key={movie.id} {...movie} />
                          ))}
                        </div>
                      )}
                    </div>

                    {message.sender === "user" && (
                      <Avatar className="h-10 w-10 ml-3 mt-1">
                        <AvatarImage src="/placeholder.svg?height=40&width=40" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            <div className="mt-4 flex gap-2">
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
              <Button size="icon" className="shrink-0" onClick={() => handleSend()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="md:w-1/4">
            <div className="border rounded-lg p-4 space-y-4">
              <h3 className="font-medium">Suggested Prompts</h3>
              <div className="space-y-2">
                {suggestedPrompts.map((prompt, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-between text-sm h-auto py-2"
                    onClick={() => handlePromptClick(prompt)}
                  >
                    <span className="text-left">{prompt}</span>
                    <ArrowRight className="h-4 w-4 ml-2 shrink-0" />
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

