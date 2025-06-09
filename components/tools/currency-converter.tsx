"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, ArrowUpDown, RefreshCw, TrendingUp } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface CurrencyConverterProps {
  onBack: () => void
}

// Popular currencies with their symbols
const currencies = {
  USD: { name: "US Dollar", symbol: "$", flag: "🇺🇸" },
  EUR: { name: "Euro", symbol: "€", flag: "🇪🇺" },
  GBP: { name: "British Pound", symbol: "£", flag: "🇬🇧" },
  JPY: { name: "Japanese Yen", symbol: "¥", flag: "🇯🇵" },
  AUD: { name: "Australian Dollar", symbol: "A$", flag: "🇦🇺" },
  CAD: { name: "Canadian Dollar", symbol: "C$", flag: "🇨🇦" },
  CHF: { name: "Swiss Franc", symbol: "CHF", flag: "🇨🇭" },
  CNY: { name: "Chinese Yuan", symbol: "¥", flag: "🇨🇳" },
  SEK: { name: "Swedish Krona", symbol: "kr", flag: "🇸🇪" },
  NZD: { name: "New Zealand Dollar", symbol: "NZ$", flag: "🇳🇿" },
  MXN: { name: "Mexican Peso", symbol: "$", flag: "🇲🇽" },
  SGD: { name: "Singapore Dollar", symbol: "S$", flag: "🇸🇬" },
  HKD: { name: "Hong Kong Dollar", symbol: "HK$", flag: "🇭🇰" },
  NOK: { name: "Norwegian Krone", symbol: "kr", flag: "🇳🇴" },
  INR: { name: "Indian Rupee", symbol: "₹", flag: "🇮🇳" },
  KRW: { name: "South Korean Won", symbol: "₩", flag: "🇰🇷" },
  RUB: { name: "Russian Ruble", symbol: "₽", flag: "🇷🇺" },
  BRL: { name: "Brazilian Real", symbol: "R$", flag: "🇧🇷" },
  ZAR: { name: "South African Rand", symbol: "R", flag: "🇿🇦" },
  TRY: { name: "Turkish Lira", symbol: "₺", flag: "🇹🇷" },
}

export function CurrencyConverter({ onBack }: CurrencyConverterProps) {
  const [amount, setAmount] = useState("1")
  const [fromCurrency, setFromCurrency] = useState("USD")
  const [toCurrency, setToCurrency] = useState("EUR")
  const [convertedAmount, setConvertedAmount] = useState("")
  const [exchangeRate, setExchangeRate] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const { toast } = useToast()

  // Mock exchange rates - replace with real API call
  const mockExchangeRates: Record<string, Record<string, number>> = {
    USD: { EUR: 0.85, GBP: 0.73, JPY: 110, AUD: 1.35, CAD: 1.25, CHF: 0.92, CNY: 6.45, INR: 74.5 },
    EUR: { USD: 1.18, GBP: 0.86, JPY: 129, AUD: 1.59, CAD: 1.47, CHF: 1.08, CNY: 7.59, INR: 87.8 },
    GBP: { USD: 1.37, EUR: 1.16, JPY: 150, AUD: 1.85, CAD: 1.71, CHF: 1.26, CNY: 8.83, INR: 102 },
    // Add more mock rates as needed
  }

  const fetchExchangeRate = async () => {
    if (fromCurrency === toCurrency) {
      setExchangeRate(1)
      setConvertedAmount(amount)
      return
    }

    setLoading(true)
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Use mock data for now - replace with real API call
      const rate =
        mockExchangeRates[fromCurrency]?.[toCurrency] ||
        (mockExchangeRates[toCurrency]?.[fromCurrency] ? 1 / mockExchangeRates[toCurrency][fromCurrency] : 1)

      setExchangeRate(rate)
      setConvertedAmount((Number(amount) * rate).toFixed(2))
      setLastUpdated(new Date())

      // TODO: Replace with real API call
      // const response = await fetch(`YOUR_API_ENDPOINT?from=${fromCurrency}&to=${toCurrency}`)
      // const data = await response.json()
      // setExchangeRate(data.rate)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch exchange rate. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (amount && fromCurrency && toCurrency) {
      fetchExchangeRate()
    }
  }, [amount, fromCurrency, toCurrency])

  const swapCurrencies = () => {
    const tempCurrency = fromCurrency
    setFromCurrency(toCurrency)
    setToCurrency(tempCurrency)
  }

  const formatCurrency = (value: string, currencyCode: string) => {
    const currency = currencies[currencyCode as keyof typeof currencies]
    return `${currency.symbol}${value}`
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Tools
        </Button>
        <h1 className="text-3xl font-bold">Currency Converter</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Convert Currencies
            <Button variant="outline" size="sm" onClick={fetchExchangeRate} disabled={loading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  min="0"
                  step="0.01"
                />
              </div>
              <div>
                <Label htmlFor="from-currency">From</Label>
                <Select value={fromCurrency} onValueChange={setFromCurrency}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(currencies).map(([code, currency]) => (
                      <SelectItem key={code} value={code}>
                        <div className="flex items-center gap-2">
                          <span>{currency.flag}</span>
                          <span>{code}</span>
                          <span className="text-muted-foreground">- {currency.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center justify-center md:flex-col">
              <Button variant="outline" size="icon" onClick={swapCurrencies} className="my-4">
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="converted-amount">Converted Amount</Label>
                <div className="relative">
                  <Input
                    id="converted-amount"
                    value={convertedAmount}
                    readOnly
                    placeholder="Converted amount"
                    className="pr-12"
                  />
                  {loading && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <RefreshCw className="h-4 w-4 animate-spin" />
                    </div>
                  )}
                </div>
              </div>
              <div>
                <Label htmlFor="to-currency">To</Label>
                <Select value={toCurrency} onValueChange={setToCurrency}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(currencies).map(([code, currency]) => (
                      <SelectItem key={code} value={code}>
                        <div className="flex items-center gap-2">
                          <span>{currency.flag}</span>
                          <span>{code}</span>
                          <span className="text-muted-foreground">- {currency.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {exchangeRate && amount && convertedAmount && (
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-center">
                  <p className="text-2xl font-bold">
                    {formatCurrency(amount, fromCurrency)} = {formatCurrency(convertedAmount, toCurrency)}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  <span>Exchange Rate</span>
                </div>
                {lastUpdated && <span>Updated: {lastUpdated.toLocaleTimeString()}</span>}
              </div>
            </div>
          )}

          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> Currently using demo exchange rates. To get real-time rates, please provide your
              preferred currency API (like Fixer.io, CurrencyAPI, or ExchangeRate-API).
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
