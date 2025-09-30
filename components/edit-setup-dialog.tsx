"use client"

import { useState } from "react"
import type { CarSetup } from "@/lib/types"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Edit } from "lucide-react"
import { cars, tracks, seasons } from "@/lib/mock-data"

interface EditSetupDialogProps {
  setup: CarSetup
  onSave: (updates: Partial<CarSetup>) => void
}

export function EditSetupDialog({ setup, onSave }: EditSetupDialogProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: setup.name,
    car: setup.car,
    track: setup.track,
    season: setup.season,
    week: setup.week.toString(),
    notes: setup.notes || "",
  })

  const handleSave = () => {
    onSave({
      name: formData.name,
      car: formData.car,
      track: formData.track,
      season: formData.season,
      week: Number.parseInt(formData.week),
      notes: formData.notes,
      lastUpdated: new Date(),
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Edit className="h-4 w-4" />
          <span className="sr-only">Edit setup</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Setup</DialogTitle>
          <DialogDescription>Make changes to the setup details.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="edit-name">Setup Name</Label>
            <Input
              id="edit-name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="edit-car">Car</Label>
              <Select value={formData.car} onValueChange={(value) => setFormData({ ...formData, car: value })}>
                <SelectTrigger id="edit-car">
                  <SelectValue />
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
              <Label htmlFor="edit-track">Track</Label>
              <Select value={formData.track} onValueChange={(value) => setFormData({ ...formData, track: value })}>
                <SelectTrigger id="edit-track">
                  <SelectValue />
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
              <Label htmlFor="edit-season">Season</Label>
              <Select value={formData.season} onValueChange={(value) => setFormData({ ...formData, season: value })}>
                <SelectTrigger id="edit-season">
                  <SelectValue />
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
              <Label htmlFor="edit-week">Week</Label>
              <Select value={formData.week} onValueChange={(value) => setFormData({ ...formData, week: value })}>
                <SelectTrigger id="edit-week">
                  <SelectValue />
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
            <Label htmlFor="edit-notes">Notes</Label>
            <Textarea
              id="edit-notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={4}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
