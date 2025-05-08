import { Skeleton } from "@/components/ui/skeleton"

export default function BrandLoading() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="bg-muted/30 py-6">
        <div className="container">
          <Skeleton className="h-10 w-64 mb-2" />
          <Skeleton className="h-5 w-40" />
        </div>
      </div>

      <div className="container py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Filter Sidebar Skeleton */}
          <div className="hidden lg:block">
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-8 w-20" />
              </div>
              <div className="space-y-6">
                <div>
                  <Skeleton className="h-5 w-32 mb-4" />
                  <Skeleton className="h-4 w-full mb-6" />
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>
                <div>
                  <Skeleton className="h-5 w-32 mb-4" />
                  <div className="space-y-2">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Skeleton className="h-4 w-4 rounded-sm" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <Skeleton className="h-5 w-32 mb-4" />
                  <div className="flex flex-wrap gap-3">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <Skeleton key={index} className="h-8 w-8 rounded-full" />
                    ))}
                  </div>
                </div>
                <Skeleton className="h-9 w-full" />
              </div>
            </div>
          </div>

          {/* Product Grid Skeleton */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-10 w-32" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {Array.from({ length: 9 }).map((_, index) => (
                <div key={index} className="border rounded-lg overflow-hidden">
                  <Skeleton className="h-48 w-full" />
                  <div className="p-4">
                    <Skeleton className="h-4 w-16 mb-1" />
                    <Skeleton className="h-6 w-full mb-2" />
                    <Skeleton className="h-5 w-24 mb-4" />
                    <div className="flex gap-2">
                      <Skeleton className="h-9 w-full" />
                      <Skeleton className="h-9 w-20" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-8">
              <div className="flex gap-2">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Skeleton key={index} className="h-10 w-10 rounded-md" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
