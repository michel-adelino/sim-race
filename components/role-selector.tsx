"use client"

import type { UserRole } from "@/lib/types"
import { useStore } from "@/lib/store"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, Shield, Crown } from "lucide-react"

export function RoleSelector() {
  const { currentUser, setUserRole } = useStore()

  const roleIcons = {
    user: User,
    admin: Shield,
    superuser: Crown,
  }

  const Icon = roleIcons[currentUser.role]

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 px-1">
        <Icon className="h-4 w-4 text-muted-foreground" />
        <span className="text-xs font-medium text-muted-foreground">Current Role</span>
      </div>
      <Select value={currentUser.role} onValueChange={(value) => setUserRole(value as UserRole)}>
        <SelectTrigger className="w-full">
          <SelectValue>
            <span className="capitalize">{currentUser.role}</span>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="user">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>User</span>
            </div>
          </SelectItem>
          <SelectItem value="admin">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Admin</span>
            </div>
          </SelectItem>
          <SelectItem value="superuser">
            <div className="flex items-center gap-2">
              <Crown className="h-4 w-4" />
              <span>Superuser</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
