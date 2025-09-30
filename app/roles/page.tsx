"use client"

import { useStore } from "@/lib/store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Crown, Shield, User, AlertTriangle } from "lucide-react"
import type { UserRole } from "@/lib/types"

export default function RolesPage() {
  const { currentUser, users, updateUserRole } = useStore()

  // Check if user has superuser access
  if (currentUser.role !== "superuser") {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Alert className="max-w-md" variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>Only superusers can access role management.</AlertDescription>
        </Alert>
      </div>
    )
  }

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case "superuser":
        return <Crown className="h-4 w-4" />
      case "admin":
        return <Shield className="h-4 w-4" />
      case "user":
        return <User className="h-4 w-4" />
    }
  }

  const getRoleBadgeVariant = (role: UserRole) => {
    switch (role) {
      case "superuser":
        return "default"
      case "admin":
        return "secondary"
      case "user":
        return "outline"
    }
  }

  const handleRoleChange = (userId: string, newRole: UserRole) => {
    updateUserRole(userId, newRole)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-primary/10 p-2">
          <Crown className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Role Management</h1>
          <p className="text-muted-foreground">Manage user roles and permissions.</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Users</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.filter((u) => u.role === "user").length}</div>
            <p className="text-xs text-muted-foreground">Can browse and upload setups</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Admins</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.filter((u) => u.role === "admin").length}</div>
            <p className="text-xs text-muted-foreground">Can approve and reject setups</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Superusers</CardTitle>
            <Crown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.filter((u) => u.role === "superuser").length}</div>
            <p className="text-xs text-muted-foreground">Full system access</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>Manage roles and permissions for all team members.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Current Role</TableHead>
                <TableHead className="text-right">Change Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell className="text-muted-foreground">{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={getRoleBadgeVariant(user.role)} className="gap-1">
                      {getRoleIcon(user.role)}
                      <span className="capitalize">{user.role}</span>
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Select
                      value={user.role}
                      onValueChange={(value) => handleRoleChange(user.id, value as UserRole)}
                      disabled={user.id === currentUser.id}
                    >
                      <SelectTrigger className="w-[140px] ml-auto">
                        <SelectValue />
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
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Role Permissions:</strong> Users can browse approved setups and upload new ones. Admins can also
          review and approve/reject submissions. Superusers have full access including role management.
        </AlertDescription>
      </Alert>
    </div>
  )
}
