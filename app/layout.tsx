import type { Metadata } from "next"
import { Inter, Pirata_One } from "next/font/google"
import "./globals.css"
import { ChatButton } from "@/components/chat/ChatButton"
import { Footer } from "@/components/layout/Footer"

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans",
})

const pirataOne = Pirata_One({ 
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pirate",
})

export const metadata: Metadata = {
  title: "Skull King Score Keeper",
  description: "Compteur de points pour le jeu de cartes Skull King",
  manifest: "/manifest.json",
}

export function generateViewport() {
  return {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    themeColor: "#D4AF37",
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${pirataOne.variable}`}>
      <body className="font-sans antialiased flex flex-col h-screen overflow-hidden">
        <main className="flex-1 min-h-0 overflow-y-auto">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}

