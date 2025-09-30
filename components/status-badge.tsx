import type { SetupStatus } from "@/lib/types"
import { cn } from "@/lib/utils"

interface StatusBadgeProps {
  status: SetupStatus
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        {
          "bg-success/10 text-success": status === "approved",
          "bg-warning/10 text-warning": status === "pending",
          "bg-destructive/10 text-destructive": status === "rejected",
        },
        className,
      )}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}
