"use client"

import { create } from "zustand"
import type { UserRole, CarSetup, User } from "./types"
import { mockUsers, mockSetups } from "./mock-data"

interface AppState {
  currentUser: User
  setCurrentUser: (user: User) => void
  setUserRole: (role: UserRole) => void
  setups: CarSetup[]
  addSetup: (setup: CarSetup) => void
  updateSetup: (id: string, updates: Partial<CarSetup>) => void
  users: User[]
  updateUserRole: (userId: string, role: UserRole) => void
}

export const useStore = create<AppState>((set) => ({
  currentUser: mockUsers[0], // Default to superuser for demo
  setCurrentUser: (user) => set({ currentUser: user }),
  setUserRole: (role) =>
    set((state) => ({
      currentUser: { ...state.currentUser, role },
    })),
  setups: mockSetups,
  addSetup: (setup) =>
    set((state) => ({
      setups: [setup, ...state.setups],
    })),
  updateSetup: (id, updates) =>
    set((state) => ({
      setups: state.setups.map((s) => (s.id === id ? { ...s, ...updates } : s)),
    })),
  users: mockUsers,
  updateUserRole: (userId, role) =>
    set((state) => ({
      users: state.users.map((u) => (u.id === userId ? { ...u, role } : u)),
    })),
}))
