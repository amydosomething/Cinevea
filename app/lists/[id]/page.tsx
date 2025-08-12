import Link from "next/link"
import { CollaborativeList } from "@/components/collaborative-list"
import { CommentsSection } from "@/components/comments-section"

export default function ListPage({ params }: { params: { id: string } }) {
  const listId = Number.parseInt(params.id)

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
          <Link href="/lists" className="text-primary hover:underline">
            ← Back to Lists
          </Link>
        </div>

        <CollaborativeList id={listId} />

        <div className="mt-12">
          <CommentsSection entityId={listId} entityType="list" />
        </div>
      </main>
    </div>
  )
}

