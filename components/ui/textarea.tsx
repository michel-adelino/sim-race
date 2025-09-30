import * as React from 'react'

import { cn } from '@/lib/utils'

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'placeholder:text-muted-foreground',
        'flex field-sizing-content min-h-16 w-full rounded-md border-2 border-input/50 bg-input/30 backdrop-blur-sm px-3 py-2 text-base',
        'shadow-md transition-all duration-300 outline-none',
        'disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'focus-visible:border-primary/70 focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:bg-input/50',
        'hover:border-input/70 hover:bg-input/40',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        className,
      )}
      {...props}
    />
  )
}

export { Textarea }
