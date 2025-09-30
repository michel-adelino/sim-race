"use client"

import { useMemo } from "react"
import { useRouter } from "next/navigation"
import { useStore } from "@/lib/store"
import { EditSetupDialog } from "@/components/edit-setup-dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2, XCircle, Shield, AlertTriangle } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import type { CarSetup } from "@/lib/types"

export default function AdminPage() {
  const router = useRouter()
  const { currentUser, setups, updateSetup } = useStore()

  const pendingSetups = useMemo(() => {
    return setups
      .filter((setup) => setup.status === "pending")
      .sort((a, b) => b.lastUpdated.getTime() - a.lastUpdated.getTime())
  }, [setups])

  // Check if user has admin access
  if (currentUser.role !== "admin" && currentUser.role !== "superuser") {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Alert className="max-w-md" variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>You don't have permission to access this page.</AlertDescription>
        </Alert>
      </div>
    )
  }

  const handleApprove = (setupId: string) => {
    updateSetup(setupId, { status: "approved", lastUpdated: new Date() })
  }

  const handleReject = (setupId: string) => {
    updateSetup(setupId, { status: "rejected", lastUpdated: new Date() })
  }

  const handleEdit = (setupId: string, updates: Partial<CarSetup>) => {
    updateSetup(setupId, updates)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-primary/10 p-2">
          <Shield className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Review</h1>
          <p className="text-muted-foreground">Review and manage pending setup submissions.</p>
        </div>
      </div>

      {pendingSetups.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-4 py-12">
            <CheckCircle2 className="h-12 w-12 text-success" />
            <div className="text-center">
              <h3 className="text-lg font-semibold">All caught up!</h3>
              <p className="text-sm text-muted-foreground">There are no pending setups to review.</p>
            </div>
            <Button onClick={() => router.push("/")}>Back to Dashboard</Button>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Mobile Card View */}
          <div className="lg:hidden space-y-4">
            {pendingSetups.map((setup) => (
              <Card key={setup.id} className="card-hover">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-medium text-foreground">{setup.name}</h3>
                      <p className="text-sm text-muted-foreground">{setup.car} • {setup.track}</p>
                      {setup.notes && (
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{setup.notes}</p>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Week {setup.week}</span>
                      <span>{formatDistanceToNow(setup.lastUpdated, { addSuffix: true })}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">By {setup.uploadedByName}</span>
                      <div className="flex items-center gap-2">
                        <EditSetupDialog setup={setup} onSave={(updates) => handleEdit(setup.id, updates)} />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleApprove(setup.id)}
                          className="text-success hover:text-success"
                        >
                          <CheckCircle2 className="h-4 w-4" />
                          <span className="sr-only">Approve</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleReject(setup.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <XCircle className="h-4 w-4" />
                          <span className="sr-only">Reject</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Desktop Table View */}
          <Card className="hidden lg:block">
            <CardHeader>
              <CardTitle>Pending Setups ({pendingSetups.length})</CardTitle>
              <CardDescription>Review and approve or reject submitted setups.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Setup Name</TableHead>
                    <TableHead>Car</TableHead>
                    <TableHead>Track</TableHead>
                    <TableHead>Week</TableHead>
                    <TableHead>Submitted By</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingSetups.map((setup) => (
                    <TableRow key={setup.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{setup.name}</div>
                          {setup.notes && <div className="text-xs text-muted-foreground line-clamp-1">{setup.notes}</div>}
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{setup.car}</TableCell>
                      <TableCell className="text-muted-foreground">{setup.track}</TableCell>
                      <TableCell className="text-muted-foreground">Week {setup.week}</TableCell>
                      <TableCell className="text-muted-foreground">{setup.uploadedByName}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatDistanceToNow(setup.lastUpdated, { addSuffix: true })}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end gap-1">
                          <EditSetupDialog setup={setup} onSave={(updates) => handleEdit(setup.id, updates)} />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleApprove(setup.id)}
                            className="text-success hover:text-success"
                          >
                            <CheckCircle2 className="h-4 w-4" />
                            <span className="sr-only">Approve</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleReject(setup.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <XCircle className="h-4 w-4" />
                            <span className="sr-only">Reject</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
