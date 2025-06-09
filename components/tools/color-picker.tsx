"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Copy } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ColorPickerProps {
  onBack: () => void
}

export function ColorPicker({ onBack }: ColorPickerProps) {
  const [color, setColor] = useState("#3b82f6")
  const { toast } = useToast()

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? {
          r: Number.parseInt(result[1], 16),
          g: Number.parseInt(result[2], 16),
          b: Number.parseInt(result[3], 16),
        }
      : null
  }

  const hexToHsl = (hex: string) => {
    const rgb = hexToRgb(hex)
    if (!rgb) return null

    const r = rgb.r / 255
    const g = rgb.g / 255
    const b = rgb.b / 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0,
      s = 0,
      l = (max + min) / 2

    if (max !== min) {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0)
          break
        case g:
          h = (b - r) / d + 2
          break
        case b:
          h = (r - g) / d + 4
          break
      }
      h /= 6
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    }
  }

  const rgb = hexToRgb(color)
  const hsl = hexToHsl(color)

  const copyToClipboard = async (value: string, format: string) => {
    await navigator.clipboard.writeText(value)
    toast({
      title: "Copied!",
      description: `${format} value copied to clipboard`,
    })
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Tools
        </Button>
        <h1 className="text-3xl font-bold">Color Picker</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Color Selector</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="color-input">Pick a Color</Label>
              <input
                id="color-input"
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full h-20 rounded-lg border cursor-pointer"
              />
            </div>

            <div>
              <Label htmlFor="hex-input">Hex Value</Label>
              <Input id="hex-input" value={color} onChange={(e) => setColor(e.target.value)} placeholder="#000000" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Color Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full h-32 rounded-lg border mb-4" style={{ backgroundColor: color }} />

            <div className="space-y-3">
              <div className="flex items-center justify-between p-2 bg-muted rounded">
                <div>
                  <div className="font-medium">HEX</div>
                  <div className="text-sm text-muted-foreground">{color.toUpperCase()}</div>
                </div>
                <Button size="sm" variant="outline" onClick={() => copyToClipboard(color.toUpperCase(), "HEX")}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>

              {rgb && (
                <div className="flex items-center justify-between p-2 bg-muted rounded">
                  <div>
                    <div className="font-medium">RGB</div>
                    <div className="text-sm text-muted-foreground">{`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`}</div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, "RGB")}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              )}

              {hsl && (
                <div className="flex items-center justify-between p-2 bg-muted rounded">
                  <div>
                    <div className="font-medium">HSL</div>
                    <div className="text-sm text-muted-foreground">{`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`}</div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`, "HSL")}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
