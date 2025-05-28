import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function OrderSuccessLoading() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="bg-muted/30 py-6">
        <div className="container">
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>
      </div>

      <div className="container py-8">
        <div className="max-w-4xl mx-auto">
          {/* Success Message Skeleton */}
          <div className="text-center mb-8">
            <Skeleton className="w-20 h-20 rounded-full mx-auto mb-6" />
            <Skeleton className="h-8 w-64 mx-auto mb-2" />
            <Skeleton className="h-6 w-96 mx-auto mb-4" />
            <Skeleton className="h-12 w-48 mx-auto" />
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Order Details Skeleton */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-32" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2].map((i) => (
                      <div key={i} className="flex gap-4 p-4 border rounded-lg">
                        <Skeleton className="h-20 w-20 rounded-md" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-5 w-48" />
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-4 w-24" />
                          <div className="flex justify-between">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-5 w-24" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-40" />
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="space-y-1">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-5 w-32" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary Skeleton */}
            <div>
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-32" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="flex justify-between">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-20" />
                      </div>
                    ))}
                  </div>
                  <div className="space-y-3">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
