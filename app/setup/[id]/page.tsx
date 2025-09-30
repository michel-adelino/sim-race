"use client"

import { use } from "react"
import { useRouter } from "next/navigation"
import { useStore } from "@/lib/store"
import { StatusBadge } from "@/components/status-badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Download, Calendar, User, Car, MapPin, AlertTriangle } from "lucide-react"
import { format } from "date-fns"

export default function SetupDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const { setups } = useStore()

  const setup = setups.find((s) => s.id === id)

  if (!setup) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Alert className="max-w-md" variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>Setup not found.</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
          <span className="sr-only">Go back</span>
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">{setup.name}</h1>
          <p className="text-muted-foreground">Detailed information about this setup.</p>
        </div>
        <StatusBadge status={setup.status} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Setup Information</CardTitle>
              <CardDescription>Core details about this car setup.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-muted p-2">
                    <Car className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Car</p>
                    <p className="text-base font-semibold">{setup.car}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-muted p-2">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Track</p>
                    <p className="text-base font-semibold">{setup.track}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-muted p-2">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Season & Week</p>
                    <p className="text-base font-semibold">
                      {setup.season}, Week {setup.week}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-muted p-2">
                    <User className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Uploaded By</p>
                    <p className="text-base font-semibold">{setup.uploadedByName}</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Notes</p>
                <p className="text-sm leading-relaxed">{setup.notes || "No notes provided."}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Version History</CardTitle>
              <CardDescription>Track changes and updates to this setup.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {setup.versions && setup.versions.length > 0 ? (
                  setup.versions.map((version) => (
                    <div key={version.id} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="rounded-full bg-primary p-1">
                          <div className="h-2 w-2 rounded-full bg-primary-foreground" />
                        </div>
                        <div className="h-full w-px bg-border" />
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline">Version {version.version}</Badge>
                          <StatusBadge status={version.status} />
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{version.changes}</p>
                        <p className="text-xs text-muted-foreground">
                          {version.uploadedByName} • {format(version.uploadedAt, "MMM d, yyyy 'at' h:mm a")}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="rounded-full bg-primary p-1">
                        <div className="h-2 w-2 rounded-full bg-primary-foreground" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline">Version 1</Badge>
                        <StatusBadge status={setup.status} />
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">Initial upload</p>
                      <p className="text-xs text-muted-foreground">
                        {setup.uploadedByName} • {format(setup.lastUpdated, "MMM d, yyyy 'at' h:mm a")}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Download</CardTitle>
              <CardDescription>Get the setup file for your sim.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {setup.fileUrl ? (
                <>
                  <Button className="w-full" disabled={setup.status !== "approved"}>
                    <Download className="mr-2 h-4 w-4" />
                    Download Setup
                  </Button>
                  {setup.status !== "approved" && (
                    <p className="text-xs text-muted-foreground text-center">
                      Setup must be approved before downloading
                    </p>
                  )}
                </>
              ) : (
                <p className="text-sm text-muted-foreground text-center">No file available</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Metadata</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Setup ID</span>
                <span className="font-mono text-xs">{setup.id}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Updated</span>
                <span>{format(setup.lastUpdated, "MMM d, yyyy")}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status</span>
                <StatusBadge status={setup.status} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
