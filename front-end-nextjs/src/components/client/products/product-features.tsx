import { Check } from "lucide-react"

interface Feature {
  id: string
  title: string
  description: string
}

interface ProductFeaturesProps {
  features: Feature[]
}

export function ProductFeatures({ features }: ProductFeaturesProps) {
  if (!features || features.length === 0) {
    return <div className="py-4 text-center text-gray-500">No features available</div>
  }

  return (
    <div className="space-y-6">
      {features.map((feature) => (
        <div key={feature.id} className="flex space-x-3">
          <div className="flex-shrink-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
              <Check className="h-5 w-5 text-green-600" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium">{feature.title}</h3>
            <p className="mt-1 text-gray-600">{feature.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
