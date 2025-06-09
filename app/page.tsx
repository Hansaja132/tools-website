import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { ToolGrid } from "@/components/tool-grid"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <ToolGrid />
      <Footer />
    </div>
  )
}
