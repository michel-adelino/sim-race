export type UserRole = "user" | "admin" | "superuser"

export type SetupStatus = "approved" | "pending" | "rejected"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
}

export interface CarSetup {
  id: string
  name: string
  car: string
  track: string
  season: string
  week: number
  status: SetupStatus
  uploadedBy: string
  uploadedByName: string
  lastUpdated: Date
  notes?: string
  fileUrl?: string
  versions?: SetupVersion[]
}

export interface SetupVersion {
  id: string
  version: number
  uploadedBy: string
  uploadedByName: string
  uploadedAt: Date
  changes: string
  status: SetupStatus
}
