import { Skeleton } from "@/components/ui/skeleton"

export default function ProductListSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="border rounded-lg p-4">
          <Skeleton className="h-40 w-full mb-4" />
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-1/2 mb-4" />
          <Skeleton className="h-10 w-full" />
        </div>
      ))}
    </div>
  )
}
