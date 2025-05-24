import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="bg-muted/30 py-6">
        <div className="container">
          <Skeleton className="h-8 w-32 mb-2" />
          <Skeleton className="h-4 w-48" />
        </div>
      </div>

      <div className="container py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Cart Items Skeleton */}
          <div className="md:col-span-2 space-y-6">
            <div className="flex justify-between items-center">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-8 w-20" />
            </div>

            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <Skeleton className="h-24 w-24 rounded-md" />
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div className="space-y-2">
                            <Skeleton className="h-4 w-48" />
                            <Skeleton className="h-3 w-32" />
                          </div>
                          <Skeleton className="h-8 w-8" />
                        </div>
                        <div className="flex justify-between items-end mt-4">
                          <Skeleton className="h-3 w-20" />
                          <Skeleton className="h-4 w-24" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Order Summary Skeleton */}
          <div>
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <Skeleton className="h-6 w-40 mb-4" />
                <div className="space-y-4">
                  <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex justify-between">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                    ))}
                  </div>
                  <Skeleton className="h-px w-full" />
                  <div className="flex justify-between">
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-5 w-28" />
                  </div>
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-8 w-full" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
