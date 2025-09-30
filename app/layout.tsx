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
    <html lang="en">
      <body className="antialiased">
        <Sidebar />
        <main className="ml-64 min-h-screen bg-background p-8">{children}</main>
      </body>
    </html>
  )
}
