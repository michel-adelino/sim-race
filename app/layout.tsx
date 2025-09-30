import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { Sidebar } from "@/components/sidebar"


export const metadata: Metadata = {
  title: "RaceSetups - Sim Racing Setup Manager",
  description: "Manage and share car setups for your sim racing team",
    generator: 'RaceSetups'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        <Sidebar />
        <main className="ml-0 lg:ml-64 min-h-screen bg-background p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8 transition-all duration-300">{children}</main>
      </body>
    </html>
  )
}
