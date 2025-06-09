"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

interface CalculatorToolProps {
  onBack: () => void
}

export function CalculatorTool({ onBack }: CalculatorToolProps) {
  const [display, setDisplay] = useState("0")
  const [previousValue, setPreviousValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num)
      setWaitingForOperand(false)
    } else {
      setDisplay(display === "0" ? num : display + num)
    }
  }

  const inputOperation = (nextOperation: string) => {
    const inputValue = Number.parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      const newValue = calculate(currentValue, inputValue, operation)

      setDisplay(String(newValue))
      setPreviousValue(newValue)
    }

    setWaitingForOperand(true)
    setOperation(nextOperation)
  }

  const calculate = (firstValue: number, secondValue: number, operation: string) => {
    switch (operation) {
      case "+":
        return firstValue + secondValue
      case "-":
        return firstValue - secondValue
      case "×":
        return firstValue * secondValue
      case "÷":
        return firstValue / secondValue
      case "=":
        return secondValue
      default:
        return secondValue
    }
  }

  const performCalculation = () => {
    const inputValue = Number.parseFloat(display)

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation)
      setDisplay(String(newValue))
      setPreviousValue(null)
      setOperation(null)
      setWaitingForOperand(true)
    }
  }

  const clear = () => {
    setDisplay("0")
    setPreviousValue(null)
    setOperation(null)
    setWaitingForOperand(false)
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-6">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Tools
        </Button>
        <h1 className="text-3xl font-bold">Basic Calculator</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <div className="text-right text-3xl font-mono">{display}</div>
          </div>

          <div className="grid grid-cols-4 gap-2">
            <Button variant="outline" onClick={clear} className="col-span-2">
              Clear
            </Button>
            <Button variant="outline" onClick={() => inputOperation("÷")}>
              ÷
            </Button>
            <Button variant="outline" onClick={() => inputOperation("×")}>
              ×
            </Button>

            <Button variant="outline" onClick={() => inputNumber("7")}>
              7
            </Button>
            <Button variant="outline" onClick={() => inputNumber("8")}>
              8
            </Button>
            <Button variant="outline" onClick={() => inputNumber("9")}>
              9
            </Button>
            <Button variant="outline" onClick={() => inputOperation("-")}>
              -
            </Button>

            <Button variant="outline" onClick={() => inputNumber("4")}>
              4
            </Button>
            <Button variant="outline" onClick={() => inputNumber("5")}>
              5
            </Button>
            <Button variant="outline" onClick={() => inputNumber("6")}>
              6
            </Button>
            <Button variant="outline" onClick={() => inputOperation("+")}>
              +
            </Button>

            <Button variant="outline" onClick={() => inputNumber("1")}>
              1
            </Button>
            <Button variant="outline" onClick={() => inputNumber("2")}>
              2
            </Button>
            <Button variant="outline" onClick={() => inputNumber("3")}>
              3
            </Button>
            <Button variant="default" onClick={performCalculation} className="row-span-2">
              =
            </Button>

            <Button variant="outline" onClick={() => inputNumber("0")} className="col-span-2">
              0
            </Button>
            <Button variant="outline" onClick={() => inputNumber(".")}>
              .
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
