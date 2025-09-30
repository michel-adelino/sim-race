"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useStore } from "@/lib/store"
import { RoleSelector } from "./role-selector"
import { LayoutDashboard, Upload, FileText, Shield, Users, Flag } from "lucide-react"

export function Sidebar() {
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
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-sidebar-border bg-sidebar backdrop-blur-xl">
      <div className="flex h-full flex-col">
        {/* Logo/Brand */}
        <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-6 bg-gradient-to-r from-sidebar-primary/10 to-transparent">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-sidebar-primary to-sidebar-primary/80 shadow-lg">
            <Flag className="h-5 w-5 text-sidebar-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-sidebar-foreground">RaceSetups</span>
            <span className="text-xs text-muted-foreground">Setup Manager</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {visibleItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-300 hover:scale-[1.02]",
                  isActive
                    ? "bg-gradient-to-r from-sidebar-primary/20 to-sidebar-accent text-sidebar-accent-foreground shadow-lg shadow-sidebar-primary/20 border border-sidebar-primary/30"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground hover:shadow-md",
                )}
              >
                <Icon className={cn(
                  "h-5 w-5 shrink-0 transition-all duration-300",
                  isActive ? "text-sidebar-primary" : "group-hover:scale-110"
                )} />
                <span className="relative">
                  {item.label}
                  {isActive && (
                    <div className="absolute -bottom-1 left-0 h-0.5 w-full bg-gradient-to-r from-sidebar-primary to-transparent rounded-full" />
                  )}
                </span>
              </Link>
            )
          })}
        </nav>

        {/* User/Role Section */}
        <div className="border-t border-sidebar-border p-4 bg-gradient-to-t from-sidebar-accent/20 to-transparent">
          <RoleSelector />
        </div>
      </div>
    </aside>
  )
}
