"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calculator, Shuffle, Type, Zap, Hash, Clock, Palette, QrCode, DollarSign } from "lucide-react"
import { CalculatorTool } from "@/components/tools/calculator-tool"
import { PasswordGenerator } from "@/components/tools/password-generator"
import { WordCounter } from "@/components/tools/word-counter"
import { ColorPicker } from "@/components/tools/color-picker"
import { UnitConverter } from "@/components/tools/unit-converter"
import { CurrencyConverter } from "@/components/tools/currency-converter"

const toolCategories = [
  {
    id: "calculators",
    title: "Calculators",
    description: "Mathematical and financial calculators",
    tools: [
      {
        id: "basic-calculator",
        name: "Basic Calculator",
        description: "Simple arithmetic calculator",
        icon: Calculator,
        component: CalculatorTool,
      },
      {
        id: "tip-calculator",
        name: "Tip Calculator",
        description: "Calculate tips and split bills",
        icon: Hash,
        component: null,
      },
    ],
  },
  {
    id: "converters",
    title: "Converters",
    description: "Convert between different units and currencies",
    tools: [
      {
        id: "unit-converter",
        name: "Unit Converter",
        description: "Convert between different units of measurement",
        icon: Shuffle,
        component: UnitConverter,
      },
      {
        id: "currency-converter",
        name: "Currency Converter",
        description: "Convert between different currencies",
        icon: DollarSign,
        component: CurrencyConverter,
      },
    ],
  },
  {
    id: "generators",
    title: "Generators",
    description: "Generate passwords, QR codes, and more",
    tools: [
      {
        id: "password-generator",
        name: "Password Generator",
        description: "Generate secure passwords",
        icon: Shuffle,
        component: PasswordGenerator,
      },
      {
        id: "qr-generator",
        name: "QR Code Generator",
        description: "Create QR codes instantly",
        icon: QrCode,
        component: null,
      },
    ],
  },
  {
    id: "text-tools",
    title: "Text Tools",
    description: "Text manipulation and analysis tools",
    tools: [
      {
        id: "word-counter",
        name: "Word Counter",
        description: "Count words, characters, and paragraphs",
        icon: Type,
        component: WordCounter,
      },
      {
        id: "case-converter",
        name: "Case Converter",
        description: "Convert text case formats",
        icon: Type,
        component: null,
      },
    ],
  },
  {
    id: "utilities",
    title: "Utilities",
    description: "Useful everyday utilities",
    tools: [
      {
        id: "color-picker",
        name: "Color Picker",
        description: "Pick and convert colors",
        icon: Palette,
        component: ColorPicker,
      },
      {
        id: "timestamp-converter",
        name: "Timestamp Converter",
        description: "Convert timestamps and dates",
        icon: Clock,
        component: null,
      },
    ],
  },
]

export function ToolGrid() {
  const [selectedTool, setSelectedTool] = useState<any>(null)

  if (selectedTool) {
    const ToolComponent = selectedTool.component
    return (
      <div className="container py-12">
        <ToolComponent onBack={() => setSelectedTool(null)} />
      </div>
    )
  }

  return (
    <section className="py-12 px-4">
      <div className="container">
        {toolCategories.map((category) => (
          <div key={category.id} id={category.id} className="mb-16">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2">{category.title}</h2>
              <p className="text-muted-foreground">{category.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.tools.map((tool) => {
                const Icon = tool.icon
                return (
                  <Card
                    key={tool.id}
                    className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
                    onClick={() => tool.component && setSelectedTool(tool)}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Icon className="h-8 w-8 text-primary" />
                        {tool.component && <Badge variant="secondary">Available</Badge>}
                      </div>
                      <CardTitle className="text-xl">{tool.name}</CardTitle>
                      <CardDescription>{tool.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Zap className="h-4 w-4 mr-1" />
                        Instant results
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
