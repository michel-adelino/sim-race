"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, CheckCircle2 } from "lucide-react"
import { cars, tracks, seasons } from "@/lib/mock-data"
import type { CarSetup } from "@/lib/types"

export default function UploadPage() {
  const router = useRouter()
  const { currentUser, addSetup } = useStore()
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    car: "",
    track: "",
    season: "",
    week: "",
    notes: "",
    file: null as File | null,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newSetup: CarSetup = {
      id: Date.now().toString(),
      name: formData.name,
      car: formData.car,
      track: formData.track,
      season: formData.season,
      week: Number.parseInt(formData.week),
      status: "pending",
      uploadedBy: currentUser.id,
      uploadedByName: currentUser.name,
      lastUpdated: new Date(),
      notes: formData.notes,
      fileUrl: formData.file ? `/setups/${formData.file.name}` : undefined,
    }

    addSetup(newSetup)
    setSubmitted(true)

    // Reset form after 2 seconds and redirect
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        name: "",
        car: "",
        track: "",
        season: "",
        week: "",
        notes: "",
        file: null,
      })
      router.push("/my-submissions")
    }, 2000)
  }

  const isFormValid =
    formData.name && formData.car && formData.track && formData.season && formData.week && formData.file

  if (submitted) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center gap-4 pt-6">
            <div className="rounded-full bg-success/10 p-3">
              <CheckCircle2 className="h-12 w-12 text-success" />
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold">Setup Submitted!</h2>
              <p className="text-muted-foreground">Your setup has been submitted for review.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Upload Setup</h1>
        <p className="text-muted-foreground">Submit a new car setup for team review and approval.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Setup Details</CardTitle>
          <CardDescription>Fill in the information about your car setup.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Setup Name *</Label>
              <Input
                id="name"
                placeholder="e.g., Monza Qualifying Setup"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="car">Car *</Label>
                <Select value={formData.car} onValueChange={(value) => setFormData({ ...formData, car: value })}>
                  <SelectTrigger id="car">
                    <SelectValue placeholder="Select car" />
                  </SelectTrigger>
                  <SelectContent>
                    {cars.map((car) => (
                      <SelectItem key={car} value={car}>
                        {car}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="track">Track *</Label>
                <Select value={formData.track} onValueChange={(value) => setFormData({ ...formData, track: value })}>
                  <SelectTrigger id="track">
                    <SelectValue placeholder="Select track" />
                  </SelectTrigger>
                  <SelectContent>
                    {tracks.map((track) => (
                      <SelectItem key={track} value={track}>
                        {track}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="season">Season *</Label>
                <Select value={formData.season} onValueChange={(value) => setFormData({ ...formData, season: value })}>
                  <SelectTrigger id="season">
                    <SelectValue placeholder="Select season" />
                  </SelectTrigger>
                  <SelectContent>
                    {seasons.map((season) => (
                      <SelectItem key={season} value={season}>
                        {season}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="week">Week *</Label>
                <Select value={formData.week} onValueChange={(value) => setFormData({ ...formData, week: value })}>
                  <SelectTrigger id="week">
                    <SelectValue placeholder="Select week" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((week) => (
                      <SelectItem key={week} value={week.toString()}>
                        Week {week}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="file">Setup File *</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="file"
                  type="file"
                  accept=".sto,.json"
                  onChange={(e) => setFormData({ ...formData, file: e.target.files?.[0] || null })}
                  required
                />
              </div>
              <p className="text-xs text-muted-foreground">Upload your setup file (.sto or .json)</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                placeholder="Add any notes about this setup (e.g., conditions, tire wear, fuel load)"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={4}
              />
            </div>

            <div className="flex gap-3">
              <Button type="submit" disabled={!isFormValid} className="flex-1">
                <Upload className="mr-2 h-4 w-4" />
                Submit Setup
              </Button>
              <Button type="button" variant="outline" onClick={() => router.push("/")}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
