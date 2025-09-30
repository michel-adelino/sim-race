"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useStore } from "@/lib/store"
import { RoleSelector } from "./role-selector"
import { LayoutDashboard, Upload, FileText, Shield, Users, Flag } from "lucide-react"

export function Nav() {
  const pathname = usePathname()
  const { currentUser } = useStore()

  const navItems = [
    { href: "/", label: "Dashboard", icon: LayoutDashboard, roles: ["user", "admin", "superuser"] },
    { href: "/upload", label: "Upload Setup", icon: Upload, roles: ["user", "admin", "superuser"] },
    {
      href: "/my-submissions",
      label: "My Submissions",
      icon: FileText,
      roles: ["user", "admin", "superuser"],
    },
    { href: "/admin", label: "Admin Review", icon: Shield, roles: ["admin", "superuser"] },
    { href: "/roles", label: "Role Management", icon: Users, roles: ["superuser"] },
  ]

  const visibleItems = navItems.filter((item) => item.roles.includes(currentUser.role))

  return (
    <nav className="border-b border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 text-lg font-bold">
              <Flag className="h-6 w-6 text-primary" />
              <span>RaceSetups</span>
            </Link>
            <div className="flex gap-1">
              {visibleItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      pathname === item.href
                        ? "bg-secondary text-foreground"
                        : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>
          <RoleSelector />
        </div>
      </div>
    </nav>
  )
}
