"use client"

import Link from "next/link"
import type { CarSetup } from "@/lib/types"
import { StatusBadge } from "./status-badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface SetupsTableProps {
  setups: CarSetup[]
}

export function SetupsTable({ setups }: SetupsTableProps) {
  if (setups.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-12 text-center">
        <p className="text-muted-foreground">No setups found matching your filters.</p>
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Setup Name</TableHead>
            <TableHead>Car</TableHead>
            <TableHead>Track</TableHead>
            <TableHead className="hidden sm:table-cell">Week</TableHead>
            <TableHead className="hidden md:table-cell">Season</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="hidden lg:table-cell">Last Updated</TableHead>
            <TableHead className="hidden xl:table-cell">Uploaded By</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {setups.map((setup) => (
            <TableRow key={setup.id}>
              <TableCell className="font-medium">{setup.name}</TableCell>
              <TableCell className="text-muted-foreground">{setup.car}</TableCell>
              <TableCell className="text-muted-foreground">{setup.track}</TableCell>
              <TableCell className="hidden sm:table-cell text-muted-foreground">Week {setup.week}</TableCell>
              <TableCell className="hidden md:table-cell text-muted-foreground">{setup.season}</TableCell>
              <TableCell>
                <StatusBadge status={setup.status} />
              </TableCell>
              <TableCell className="hidden lg:table-cell text-muted-foreground">
                {formatDistanceToNow(setup.lastUpdated, { addSuffix: true })}
              </TableCell>
              <TableCell className="hidden xl:table-cell text-muted-foreground">{setup.uploadedByName}</TableCell>
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
    </div>
  )
}
