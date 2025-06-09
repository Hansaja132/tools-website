import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export function Hero() {
  return (
    <section className="py-20 px-4 text-center bg-gradient-to-b from-background to-muted/20">
      <div className="container max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          All-in-One Tool Collection
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Access hundreds of useful tools and utilities in one place. From calculators to converters, we've got
          everything you need.
        </p>

        <div className="flex max-w-md mx-auto gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input placeholder="Search tools..." className="pl-10" />
          </div>
          <Button>Search</Button>
        </div>
      </div>
    </section>
  )
}
