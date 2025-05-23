export default function Loading() {
  return (
    <div className="container py-8 w-full mx-auto">
      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <div className="aspect-square bg-gray-200 rounded"></div>

          <div className="space-y-6">
            <div>
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-5 w-5 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>

            <div className="h-px bg-gray-200 my-6"></div>

            <div className="space-y-6">
              <div>
                <div className="h-6 bg-gray-200 rounded w-1/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-full mt-1"></div>
              </div>

              <div>
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="h-10 bg-gray-200 rounded"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              </div>

              <div>
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
                <div className="grid grid-cols-4 gap-2">
                  <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                  <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                  <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                  <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                </div>
              </div>

              <div className="h-8 bg-gray-200 rounded w-1/3"></div>

              <div className="flex space-x-3">
                <div className="h-12 bg-gray-200 rounded flex-1"></div>
                <div className="h-12 bg-gray-200 rounded flex-1"></div>
                <div className="h-12 w-12 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="flex justify-between py-2 border-b border-gray-100"
                >
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
              ))}
            </div>
            <div>
              <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="flex justify-between py-2 border-b border-gray-100"
                >
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
