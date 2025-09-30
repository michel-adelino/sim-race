"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"
import { cars, tracks, seasons } from "@/lib/mock-data"

interface SetupFiltersProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  selectedCar: string
  setSelectedCar: (car: string) => void
  selectedTrack: string
  setSelectedTrack: (track: string) => void
  selectedSeason: string
  setSelectedSeason: (season: string) => void
  selectedWeek: string
  setSelectedWeek: (week: string) => void
  sortBy: string
  setSortBy: (sort: string) => void
  onClearFilters: () => void
}

export function SetupFilters({
  searchQuery,
  setSearchQuery,
  selectedCar,
  setSelectedCar,
  selectedTrack,
  setSelectedTrack,
  selectedSeason,
  setSelectedSeason,
  selectedWeek,
  setSelectedWeek,
  sortBy,
  setSortBy,
  onClearFilters,
}: SetupFiltersProps) {
  const hasActiveFilters =
    searchQuery ||
    selectedCar !== "all" ||
    selectedTrack !== "all" ||
    selectedSeason !== "all" ||
    selectedWeek !== "all"

  return (
    <div className="space-y-4 rounded-lg border border-border bg-card p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filters</h2>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onClearFilters} className="h-8 gap-2">
            <X className="h-4 w-4" />
            Clear All
          </Button>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="relative sm:col-span-2 lg:col-span-3">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search setups..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        <Select value={selectedCar} onValueChange={setSelectedCar}>
          <SelectTrigger>
            <SelectValue placeholder="All Cars" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Cars</SelectItem>
            {cars.map((car) => (
              <SelectItem key={car} value={car}>
                {car}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedTrack} onValueChange={setSelectedTrack}>
          <SelectTrigger>
            <SelectValue placeholder="All Tracks" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Tracks</SelectItem>
            {tracks.map((track) => (
              <SelectItem key={track} value={track}>
                {track}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedSeason} onValueChange={setSelectedSeason}>
          <SelectTrigger>
            <SelectValue placeholder="All Seasons" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Seasons</SelectItem>
            {seasons.map((season) => (
              <SelectItem key={season} value={season}>
                {season}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedWeek} onValueChange={setSelectedWeek}>
          <SelectTrigger>
            <SelectValue placeholder="All Weeks" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Weeks</SelectItem>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((week) => (
              <SelectItem key={week} value={week.toString()}>
                Week {week}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date-desc">Newest First</SelectItem>
            <SelectItem value="date-asc">Oldest First</SelectItem>
            <SelectItem value="car">Car (A-Z)</SelectItem>
            <SelectItem value="track">Track (A-Z)</SelectItem>
            <SelectItem value="status">Status</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
