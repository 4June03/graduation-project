import { Skeleton } from "@/components/ui/skeleton"

export default function ProductLoading() {
  return (
    <div className="container py-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Skeleton className="h-6 w-64" />
      </div>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Gallery */}
        <div>
          <Skeleton className="aspect-square w-full rounded-lg" />
          <div className="mt-4 grid grid-cols-6 gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square w-full rounded-md" />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <Skeleton className="h-8 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/4 mb-4" />
            <div className="flex space-x-1 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-4 w-4" />
              ))}
              <Skeleton className="h-4 w-24 ml-2" />
            </div>
            <Skeleton className="h-8 w-1/3 mb-2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full mt-1" />
            <Skeleton className="h-4 w-3/4 mt-1" />
          </div>

          <Skeleton className="h-px w-full" />

          {/* Color selector */}
          <div>
            <Skeleton className="h-5 w-20 mb-3" />
            <div className="flex space-x-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-10 rounded-full" />
              ))}
            </div>
          </div>

          {/* Quantity selector */}
          <div>
            <Skeleton className="h-5 w-24 mb-3" />
            <div className="flex h-10 w-32">
              <Skeleton className="h-full w-full rounded-md" />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex space-x-3">
            <Skeleton className="h-12 flex-1 rounded-md" />
            <Skeleton className="h-12 flex-1 rounded-md" />
            <Skeleton className="h-12 w-12 rounded-md" />
          </div>

          {/* Shipping info */}
          <Skeleton className="h-24 w-full rounded-lg" />
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-12">
        <div className="border-b border-gray-200 mb-6">
          <div className="flex space-x-8">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="grid grid-cols-2 py-2 border-b">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Related products */}
      <div className="mt-12">
        <Skeleton className="h-8 w-64 mb-6" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-lg border border-gray-200 overflow-hidden">
              <Skeleton className="aspect-square w-full" />
              <div className="p-4 space-y-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <div className="flex justify-between items-center">
                  <Skeleton className="h-5 w-1/3" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
