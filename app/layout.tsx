import type React from "react"
import type { Metadata } from "next"
import { Eczar, Mulish } from "next/font/google"
import "./globals.css"
import { MessageCircle } from "lucide-react"

const eczar = Eczar({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-eczar",
  weight: ["400", "500", "600", "700", "800"],
})

const mulish = Mulish({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mulish",
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "The Salad Bar® - Cocina Mediterránea Contemporánea",
  description:
    "Experiencia culinaria mediterránea única con ingredientes frescos y ambiente sofisticado",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="es"
      className={`${eczar.variable} ${mulish.variable} antialiased`}
    >
      <body>{children}
      <a
          href="https://wa.me/5493872521137" 
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-300"
        >
          <MessageCircle className="h-6 w-6" />
        </a>
      </body>
    </html>
  )
}
