import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Wrench } from "lucide-react"

export function Header() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Wrench className="h-6 w-6" />
          <span className="font-bold text-xl">ToolBox</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link href="#calculators" className="text-sm font-medium hover:text-primary transition-colors">
            Calculators
          </Link>
          <Link href="#converters" className="text-sm font-medium hover:text-primary transition-colors">
            Converters
          </Link>
          <Link href="#generators" className="text-sm font-medium hover:text-primary transition-colors">
            Generators
          </Link>
          <Link href="#text-tools" className="text-sm font-medium hover:text-primary transition-colors">
            Text Tools
          </Link>
        </nav>

        <Button variant="outline" size="sm">
          Favorites
        </Button>
      </div>
    </header>
  )
}
