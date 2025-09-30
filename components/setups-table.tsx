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
    <>
      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {setups.map((setup) => (
          <div key={setup.id} className="rounded-lg border border-border bg-card p-4 card-hover">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-foreground truncate">{setup.name}</h3>
                <p className="text-sm text-muted-foreground">{setup.car} • {setup.track}</p>
              </div>
              <StatusBadge status={setup.status} />
            </div>
            
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
              <span>Week {setup.week}</span>
              <span>{setup.season}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="text-xs text-muted-foreground">
                <p>Updated {formatDistanceToNow(setup.lastUpdated, { addSuffix: true })}</p>
                <p>By {setup.uploadedByName}</p>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/setup/${setup.id}`}>
                  <ExternalLink className="h-4 w-4" />
                  <span className="sr-only">View details</span>
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Setup Name</TableHead>
              <TableHead>Car</TableHead>
              <TableHead>Track</TableHead>
              <TableHead>Week</TableHead>
              <TableHead>Season</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead>Uploaded By</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {setups.map((setup) => (
              <TableRow key={setup.id}>
                <TableCell className="font-medium">{setup.name}</TableCell>
                <TableCell className="text-muted-foreground">{setup.car}</TableCell>
                <TableCell className="text-muted-foreground">{setup.track}</TableCell>
                <TableCell className="text-muted-foreground">Week {setup.week}</TableCell>
                <TableCell className="text-muted-foreground">{setup.season}</TableCell>
                <TableCell>
                  <StatusBadge status={setup.status} />
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatDistanceToNow(setup.lastUpdated, { addSuffix: true })}
                </TableCell>
                <TableCell className="text-muted-foreground">{setup.uploadedByName}</TableCell>
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
    </>
  )
}
