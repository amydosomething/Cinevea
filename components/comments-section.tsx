"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ThumbsUp, ThumbsDown, Flag, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"

interface Comment {
  id: number
  user: {
    id: number
    name: string
    avatar?: string
  }
  content: string
  createdAt: string
  likes: number
  dislikes: number
  replies?: Comment[]
}

interface CommentsProps {
  entityId: number
  entityType: "movie" | "list"
  comments?: Comment[]
}

const sampleComments: Comment[] = [
  {
    id: 1,
    user: {
      id: 1,
      name: "John Doe",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    content:
      "This movie was absolutely incredible! The cinematography and acting were top-notch, and the story kept me engaged from beginning to end.",
    createdAt: "2 days ago",
    likes: 24,
    dislikes: 2,
    replies: [
      {
        id: 3,
        user: {
          id: 3,
          name: "Sarah Johnson",
          avatar: "https://i.pravatar.cc/150?img=5",
        },
        content: "I completely agree! The director really outdid themselves with this one.",
        createdAt: "1 day ago",
        likes: 8,
        dislikes: 0,
      },
    ],
  },
  {
    id: 2,
    user: {
      id: 2,
      name: "Jane Smith",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
    content:
      "I had mixed feelings about this one. While the visuals were stunning, I felt the plot had some holes that weren't addressed.",
    createdAt: "1 week ago",
    likes: 15,
    dislikes: 7,
  },
  {
    id: 4,
    user: {
      id: 4,
      name: "Michael Brown",
      avatar: "https://i.pravatar.cc/150?img=4",
    },
    content: "Does anyone know if they're planning a sequel? The ending definitely left room for one!",
    createdAt: "3 days ago",
    likes: 12,
    dislikes: 1,
  },
]

export function CommentsSection({ entityId, entityType, comments = sampleComments }: CommentsProps) {
  const [commentText, setCommentText] = useState("")
  const [allComments, setAllComments] = useState<Comment[]>(comments)
  const [replyingTo, setReplyingTo] = useState<number | null>(null)
  const [replyText, setReplyText] = useState("")

  const handleAddComment = () => {
    if (!commentText.trim()) return

    const newComment: Comment = {
      id: Date.now(),
      user: {
        id: 999, // Current user ID would come from auth
        name: "You",
        avatar: "https://i.pravatar.cc/150?img=68",
      },
      content: commentText,
      createdAt: "Just now",
      likes: 0,
      dislikes: 0,
    }

    setAllComments([newComment, ...allComments])
    setCommentText("")
  }

  const handleAddReply = (commentId: number) => {
    if (!replyText.trim()) return

    const newReply: Comment = {
      id: Date.now(),
      user: {
        id: 999, // Current user ID would come from auth
        name: "You",
        avatar: "https://i.pravatar.cc/150?img=68",
      },
      content: replyText,
      createdAt: "Just now",
      likes: 0,
      dislikes: 0,
    }

    setAllComments((prev) =>
      prev.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), newReply],
          }
        }
        return comment
      }),
    )

    setReplyingTo(null)
    setReplyText("")
  }

  const handleLike = (commentId: number) => {
    setAllComments((prev) =>
      prev.map((comment) => {
        if (comment.id === commentId) {
          return { ...comment, likes: comment.likes + 1 }
        }

        if (comment.replies) {
          return {
            ...comment,
            replies: comment.replies.map((reply) =>
              reply.id === commentId ? { ...reply, likes: reply.likes + 1 } : reply,
            ),
          }
        }

        return comment
      }),
    )
  }

  const handleDislike = (commentId: number) => {
    setAllComments((prev) =>
      prev.map((comment) => {
        if (comment.id === commentId) {
          return { ...comment, dislikes: comment.dislikes + 1 }
        }

        if (comment.replies) {
          return {
            ...comment,
            replies: comment.replies.map((reply) =>
              reply.id === commentId ? { ...reply, dislikes: reply.dislikes + 1 } : reply,
            ),
          }
        }

        return comment
      }),
    )
  }

  const renderComment = (comment: Comment, isReply = false) => (
    <div key={comment.id} className={`${isReply ? "ml-12 mt-4" : "mb-6 border-b pb-6"}`}>
      <div className="flex gap-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src={comment.user.avatar} />
          <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{comment.user.name}</p>
              <p className="text-xs text-muted-foreground">{comment.createdAt}</p>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Flag className="mr-2 h-4 w-4" /> Report
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <p className="mt-2 text-sm">{comment.content}</p>

          <div className="mt-2 flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 gap-1 text-muted-foreground"
              onClick={() => handleLike(comment.id)}
            >
              <ThumbsUp className="h-4 w-4" />
              <span>{comment.likes}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="h-8 gap-1 text-muted-foreground"
              onClick={() => handleDislike(comment.id)}
            >
              <ThumbsDown className="h-4 w-4" />
              <span>{comment.dislikes}</span>
            </Button>

            {!isReply && (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 text-muted-foreground"
                onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
              >
                Reply
              </Button>
            )}
          </div>

          {replyingTo === comment.id && (
            <div className="mt-4 flex gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://i.pravatar.cc/150?img=68" />
                <AvatarFallback>Y</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Textarea
                  placeholder="Write a reply..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="min-h-[80px] resize-none"
                />
                <div className="mt-2 flex justify-end gap-2">
                  <Button variant="outline" size="sm" onClick={() => setReplyingTo(null)}>
                    Cancel
                  </Button>
                  <Button size="sm" onClick={() => handleAddReply(comment.id)}>
                    Reply
                  </Button>
                </div>
              </div>
            </div>
          )}

          {comment.replies && comment.replies.map((reply) => renderComment(reply, true))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Comments ({allComments.length})</h2>

      <div className="flex gap-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src="https://i.pravatar.cc/150?img=68" />
          <AvatarFallback>Y</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <Textarea
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="min-h-[100px] resize-none"
          />
          <div className="mt-2 flex justify-end">
            <Button onClick={handleAddComment}>Comment</Button>
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-2">{allComments.map((comment) => renderComment(comment))}</div>
    </div>
  )
}

