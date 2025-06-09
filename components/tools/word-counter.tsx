"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"

interface WordCounterProps {
  onBack: () => void
}

export function WordCounter({ onBack }: WordCounterProps) {
  const [text, setText] = useState("")

  const stats = useMemo(() => {
    const characters = text.length
    const charactersNoSpaces = text.replace(/\s/g, "").length
    const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length
    const paragraphs = text.trim() === "" ? 0 : text.split(/\n\s*\n/).length
    const sentences = text.trim() === "" ? 0 : text.split(/[.!?]+/).filter((s) => s.trim().length > 0).length
    const readingTime = Math.ceil(words / 200) // Average reading speed: 200 words per minute

    return {
      characters,
      charactersNoSpaces,
      words,
      paragraphs,
      sentences,
      readingTime,
    }
  }, [text])

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Tools
        </Button>
        <h1 className="text-3xl font-bold">Word Counter</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Enter Your Text</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Start typing or paste your text here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="min-h-[400px] resize-none"
              />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Characters:</span>
                <span className="font-semibold">{stats.characters.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Characters (no spaces):</span>
                <span className="font-semibold">{stats.charactersNoSpaces.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Words:</span>
                <span className="font-semibold">{stats.words.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sentences:</span>
                <span className="font-semibold">{stats.sentences.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Paragraphs:</span>
                <span className="font-semibold">{stats.paragraphs.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Reading time:</span>
                <span className="font-semibold">{stats.readingTime} min</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full" onClick={() => setText("")}>
                Clear Text
              </Button>
              <Button variant="outline" className="w-full" onClick={() => setText(text.toUpperCase())}>
                UPPERCASE
              </Button>
              <Button variant="outline" className="w-full" onClick={() => setText(text.toLowerCase())}>
                lowercase
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setText(text.replace(/\b\w/g, (l) => l.toUpperCase()))}
              >
                Title Case
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
