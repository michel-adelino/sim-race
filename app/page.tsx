"use client"

import { useState, useMemo } from "react"
import { useStore } from "@/lib/store"
import { SetupFilters } from "@/components/setup-filters"
import { SetupsTable } from "@/components/setups-table"
import { PageHeader } from "@/components/page-header"

export default function DashboardPage() {
  const { setups, currentUser } = useStore()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCar, setSelectedCar] = useState("all")
  const [selectedTrack, setSelectedTrack] = useState("all")
  const [selectedSeason, setSelectedSeason] = useState("all")
  const [selectedWeek, setSelectedWeek] = useState("all")
  const [sortBy, setSortBy] = useState("date-desc")

  const filteredAndSortedSetups = useMemo(() => {
    let filtered = setups

    // Only show approved setups for regular users
    if (currentUser.role === "user") {
      filtered = filtered.filter((s) => s.status === "approved")
    }

    // Apply filters
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (s) =>
          s.name.toLowerCase().includes(query) ||
          s.car.toLowerCase().includes(query) ||
          s.track.toLowerCase().includes(query) ||
          s.notes?.toLowerCase().includes(query),
      )
    }

    if (selectedCar !== "all") {
      filtered = filtered.filter((s) => s.car === selectedCar)
    }

    if (selectedTrack !== "all") {
      filtered = filtered.filter((s) => s.track === selectedTrack)
    }

    if (selectedSeason !== "all") {
      filtered = filtered.filter((s) => s.season === selectedSeason)
    }

    if (selectedWeek !== "all") {
      filtered = filtered.filter((s) => s.week === Number.parseInt(selectedWeek))
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "date-desc":
          return b.lastUpdated.getTime() - a.lastUpdated.getTime()
        case "date-asc":
          return a.lastUpdated.getTime() - b.lastUpdated.getTime()
        case "car":
          return a.car.localeCompare(b.car)
        case "track":
          return a.track.localeCompare(b.track)
        case "status":
          return a.status.localeCompare(b.status)
        default:
          return 0
      }
    })

    return sorted
  }, [setups, searchQuery, selectedCar, selectedTrack, selectedSeason, selectedWeek, sortBy, currentUser.role])

  const handleClearFilters = () => {
    setSearchQuery("")
    setSelectedCar("all")
    setSelectedTrack("all")
    setSelectedSeason("all")
    setSelectedWeek("all")
  }

  return (
    <div className="space-y-6 lg:space-y-8 relative">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
      
      <div className="relative z-10">
        <PageHeader
          title="Car Setups"
          description={`Browse and manage car setups for your team. ${filteredAndSortedSetups.length} setup${filteredAndSortedSetups.length !== 1 ? "s" : ""} found.`}
        />
      </div>

      <div className="relative z-10">
        <SetupFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCar={selectedCar}
          setSelectedCar={setSelectedCar}
          selectedTrack={selectedTrack}
          setSelectedTrack={setSelectedTrack}
          selectedSeason={selectedSeason}
          setSelectedSeason={setSelectedSeason}
          selectedWeek={selectedWeek}
          setSelectedWeek={setSelectedWeek}
          sortBy={sortBy}
          setSortBy={setSortBy}
          onClearFilters={handleClearFilters}
        />
      </div>

      <div className="relative z-10">
        <SetupsTable setups={filteredAndSortedSetups} />
      </div>
    </div>
  )
}
