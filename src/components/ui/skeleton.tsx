import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted/80 dark:bg-muted/50", className)} // Adjusted opacity/color for better visibility
      {...props}
    />
  )
}

export { Skeleton }
