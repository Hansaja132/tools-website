import Link from "next/link"
import { Wrench } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Wrench className="h-6 w-6" />
              <span className="font-bold text-xl">ToolBox</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your one-stop destination for useful online tools and utilities.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Calculators</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-primary">
                  Basic Calculator
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Tip Calculator
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Mortgage Calculator
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Generators</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-primary">
                  Password Generator
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  QR Code Generator
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Lorem Ipsum
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Text Tools</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-primary">
                  Word Counter
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Case Converter
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Text Formatter
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Converters</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-primary">
                  Unit Converter
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Currency Converter
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Temperature Converter
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 ToolBox. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
