"use client"

import { useMemo } from "react"
import Link from "next/link"
import { useStore } from "@/lib/store"
import { StatusBadge } from "@/components/status-badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ExternalLink, Upload, FileText } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

export default function MySubmissionsPage() {
  const { setups, currentUser } = useStore()

  const mySetups = useMemo(() => {
    return setups
      .filter((setup) => setup.uploadedBy === currentUser.id)
      .sort((a, b) => b.lastUpdated.getTime() - a.lastUpdated.getTime())
  }, [setups, currentUser.id])

  const stats = useMemo(() => {
    return {
      total: mySetups.length,
      approved: mySetups.filter((s) => s.status === "approved").length,
      pending: mySetups.filter((s) => s.status === "pending").length,
      rejected: mySetups.filter((s) => s.status === "rejected").length,
    }
  }, [mySetups])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Submissions</h1>
          <p className="text-muted-foreground">Track the status of your uploaded setups.</p>
        </div>
        <Button asChild>
          <Link href="/upload">
            <Upload className="mr-2 h-4 w-4" />
            Upload New Setup
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <div className="h-3 w-3 rounded-full bg-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.approved}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <div className="h-3 w-3 rounded-full bg-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pending}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <div className="h-3 w-3 rounded-full bg-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.rejected}</div>
          </CardContent>
        </Card>
      </div>

      {mySetups.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-4 py-12">
            <FileText className="h-12 w-12 text-muted-foreground" />
            <div className="text-center">
              <h3 className="text-lg font-semibold">No submissions yet</h3>
              <p className="text-sm text-muted-foreground">Upload your first setup to get started.</p>
            </div>
            <Button asChild>
              <Link href="/upload">
                <Upload className="mr-2 h-4 w-4" />
                Upload Setup
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Your Setups</CardTitle>
            <CardDescription>All setups you've uploaded to the team.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Setup Name</TableHead>
                  <TableHead>Car</TableHead>
                  <TableHead>Track</TableHead>
                  <TableHead className="hidden sm:table-cell">Week</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden lg:table-cell">Submitted</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mySetups.map((setup) => (
                  <TableRow key={setup.id}>
                    <TableCell className="font-medium">{setup.name}</TableCell>
                    <TableCell className="text-muted-foreground">{setup.car}</TableCell>
                    <TableCell className="text-muted-foreground">{setup.track}</TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground">Week {setup.week}</TableCell>
                    <TableCell>
                      <StatusBadge status={setup.status} />
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-muted-foreground">
                      {formatDistanceToNow(setup.lastUpdated, { addSuffix: true })}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/setup/${setup.id}`}>
                          <ExternalLink className="h-4 w-4" />
                          <span className="sr-only">View details</span>
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
