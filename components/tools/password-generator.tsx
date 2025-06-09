"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { ArrowLeft, Copy, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface PasswordGeneratorProps {
  onBack: () => void
}

export function PasswordGenerator({ onBack }: PasswordGeneratorProps) {
  const [password, setPassword] = useState("")
  const [length, setLength] = useState([12])
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(false)
  const { toast } = useToast()

  const generatePassword = () => {
    let charset = ""
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz"
    if (includeNumbers) charset += "0123456789"
    if (includeSymbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?"

    if (charset === "") {
      toast({
        title: "Error",
        description: "Please select at least one character type",
        variant: "destructive",
      })
      return
    }

    let newPassword = ""
    for (let i = 0; i < length[0]; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length))
    }
    setPassword(newPassword)
  }

  const copyToClipboard = async () => {
    if (password) {
      await navigator.clipboard.writeText(password)
      toast({
        title: "Copied!",
        description: "Password copied to clipboard",
      })
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-6">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Tools
        </Button>
        <h1 className="text-3xl font-bold">Password Generator</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Generate Secure Password</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="password-output">Generated Password</Label>
            <div className="flex gap-2 mt-2">
              <Input
                id="password-output"
                value={password}
                readOnly
                placeholder="Click generate to create password"
                className="font-mono"
              />
              <Button variant="outline" size="icon" onClick={copyToClipboard} disabled={!password}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <Label>Password Length: {length[0]}</Label>
            <Slider value={length} onValueChange={setLength} max={50} min={4} step={1} className="mt-2" />
          </div>

          <div className="space-y-4">
            <Label className="text-base font-medium">Character Types</Label>

            <div className="flex items-center space-x-2">
              <Checkbox id="uppercase" checked={includeUppercase} onCheckedChange={setIncludeUppercase} />
              <Label htmlFor="uppercase">Uppercase Letters (A-Z)</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="lowercase" checked={includeLowercase} onCheckedChange={setIncludeLowercase} />
              <Label htmlFor="lowercase">Lowercase Letters (a-z)</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="numbers" checked={includeNumbers} onCheckedChange={setIncludeNumbers} />
              <Label htmlFor="numbers">Numbers (0-9)</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="symbols" checked={includeSymbols} onCheckedChange={setIncludeSymbols} />
              <Label htmlFor="symbols">Symbols (!@#$%^&*)</Label>
            </div>
          </div>

          <Button onClick={generatePassword} className="w-full">
            <RefreshCw className="h-4 w-4 mr-2" />
            Generate Password
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
