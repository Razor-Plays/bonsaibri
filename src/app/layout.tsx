import type { Metadata } from "next"
import { Inter, Noto_Serif } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  variable: "--font-noto-serif",
})

export const metadata: Metadata = {
  title: "Bonsai Bri - Handcrafted Pottery",
  description: "Hand-made pottery for bonsai, holidays & the slow life. Artisan ceramics from Northern Ontario.",
  keywords: "bonsai pots, handcrafted pottery, christmas ornaments, smoking accessories, northern ontario",
  icons: {
    icon: "browser-icon.png",
    shortcut: "browser-icon.png",
    apple: "browser-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="browser-icon.png" />
        <link rel="shortcut icon" href="browser-icon.png" />
        <link rel="apple-touch-icon" href="browser-icon.png" />
      </head>
      <body
        className={`${inter.variable} ${notoSerif.variable} font-sans antialiased min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
