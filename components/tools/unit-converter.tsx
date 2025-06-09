"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, ArrowUpDown } from "lucide-react"

interface UnitConverterProps {
  onBack: () => void
}

const conversions = {
  length: {
    name: "Length",
    units: {
      meter: { name: "Meter", factor: 1 },
      kilometer: { name: "Kilometer", factor: 1000 },
      centimeter: { name: "Centimeter", factor: 0.01 },
      millimeter: { name: "Millimeter", factor: 0.001 },
      inch: { name: "Inch", factor: 0.0254 },
      foot: { name: "Foot", factor: 0.3048 },
      yard: { name: "Yard", factor: 0.9144 },
      mile: { name: "Mile", factor: 1609.34 },
    },
  },
  weight: {
    name: "Weight",
    units: {
      kilogram: { name: "Kilogram", factor: 1 },
      gram: { name: "Gram", factor: 0.001 },
      pound: { name: "Pound", factor: 0.453592 },
      ounce: { name: "Ounce", factor: 0.0283495 },
      ton: { name: "Ton", factor: 1000 },
      stone: { name: "Stone", factor: 6.35029 },
    },
  },
  temperature: {
    name: "Temperature",
    units: {
      celsius: { name: "Celsius", factor: 1 },
      fahrenheit: { name: "Fahrenheit", factor: 1 },
      kelvin: { name: "Kelvin", factor: 1 },
    },
  },
  volume: {
    name: "Volume",
    units: {
      liter: { name: "Liter", factor: 1 },
      milliliter: { name: "Milliliter", factor: 0.001 },
      gallon: { name: "Gallon (US)", factor: 3.78541 },
      quart: { name: "Quart", factor: 0.946353 },
      pint: { name: "Pint", factor: 0.473176 },
      cup: { name: "Cup", factor: 0.236588 },
      fluidounce: { name: "Fluid Ounce", factor: 0.0295735 },
    },
  },
  area: {
    name: "Area",
    units: {
      squaremeter: { name: "Square Meter", factor: 1 },
      squarekilometer: { name: "Square Kilometer", factor: 1000000 },
      squarecentimeter: { name: "Square Centimeter", factor: 0.0001 },
      squareinch: { name: "Square Inch", factor: 0.00064516 },
      squarefoot: { name: "Square Foot", factor: 0.092903 },
      acre: { name: "Acre", factor: 4046.86 },
      hectare: { name: "Hectare", factor: 10000 },
    },
  },
}

export function UnitConverter({ onBack }: UnitConverterProps) {
  const [activeTab, setActiveTab] = useState("length")
  const [fromValue, setFromValue] = useState("")
  const [toValue, setToValue] = useState("")
  const [fromUnit, setFromUnit] = useState("")
  const [toUnit, setToUnit] = useState("")

  const convertTemperature = (value: number, from: string, to: string) => {
    let celsius = value

    // Convert to Celsius first
    if (from === "fahrenheit") {
      celsius = ((value - 32) * 5) / 9
    } else if (from === "kelvin") {
      celsius = value - 273.15
    }

    // Convert from Celsius to target
    if (to === "fahrenheit") {
      return (celsius * 9) / 5 + 32
    } else if (to === "kelvin") {
      return celsius + 273.15
    }

    return celsius
  }

  const convertValue = (value: string, from: string, to: string, category: string) => {
    if (!value || !from || !to || isNaN(Number(value))) return ""

    const numValue = Number(value)

    if (category === "temperature") {
      return convertTemperature(numValue, from, to)
        .toFixed(6)
        .replace(/\.?0+$/, "")
    }

    const categoryData = conversions[category as keyof typeof conversions]
    const fromFactor = categoryData.units[from as keyof typeof categoryData.units]?.factor
    const toFactor = categoryData.units[to as keyof typeof categoryData.units]?.factor

    if (!fromFactor || !toFactor) return ""

    const baseValue = numValue * fromFactor
    const result = baseValue / toFactor

    return result.toFixed(6).replace(/\.?0+$/, "")
  }

  const handleFromValueChange = (value: string) => {
    setFromValue(value)
    const converted = convertValue(value, fromUnit, toUnit, activeTab)
    setToValue(converted)
  }

  const handleToValueChange = (value: string) => {
    setToValue(value)
    const converted = convertValue(value, toUnit, fromUnit, activeTab)
    setFromValue(converted)
  }

  const swapUnits = () => {
    const tempUnit = fromUnit
    const tempValue = fromValue

    setFromUnit(toUnit)
    setToUnit(tempUnit)
    setFromValue(toValue)
    setToValue(tempValue)
  }

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    setFromValue("")
    setToValue("")
    setFromUnit("")
    setToUnit("")
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Tools
        </Button>
        <h1 className="text-3xl font-bold">Unit Converter</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Convert Between Units</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="length">Length</TabsTrigger>
              <TabsTrigger value="weight">Weight</TabsTrigger>
              <TabsTrigger value="temperature">Temperature</TabsTrigger>
              <TabsTrigger value="volume">Volume</TabsTrigger>
              <TabsTrigger value="area">Area</TabsTrigger>
            </TabsList>

            {Object.entries(conversions).map(([key, category]) => (
              <TabsContent key={key} value={key} className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="from-unit">From</Label>
                      <Select value={fromUnit} onValueChange={setFromUnit}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select unit" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(category.units).map(([unitKey, unit]) => (
                            <SelectItem key={unitKey} value={unitKey}>
                              {unit.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="from-value">Value</Label>
                      <Input
                        id="from-value"
                        type="number"
                        value={fromValue}
                        onChange={(e) => handleFromValueChange(e.target.value)}
                        placeholder="Enter value"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-center md:flex-col">
                    <Button variant="outline" size="icon" onClick={swapUnits} className="my-4">
                      <ArrowUpDown className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="to-unit">To</Label>
                      <Select value={toUnit} onValueChange={setToUnit}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select unit" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(category.units).map(([unitKey, unit]) => (
                            <SelectItem key={unitKey} value={unitKey}>
                              {unit.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="to-value">Value</Label>
                      <Input
                        id="to-value"
                        type="number"
                        value={toValue}
                        onChange={(e) => handleToValueChange(e.target.value)}
                        placeholder="Converted value"
                      />
                    </div>
                  </div>
                </div>

                {fromValue && toValue && fromUnit && toUnit && (
                  <div className="mt-6 p-4 bg-muted rounded-lg">
                    <p className="text-center text-lg">
                      <span className="font-semibold">{fromValue}</span>{" "}
                      {category.units[fromUnit as keyof typeof category.units]?.name} ={" "}
                      <span className="font-semibold">{toValue}</span>{" "}
                      {category.units[toUnit as keyof typeof category.units]?.name}
                    </p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
