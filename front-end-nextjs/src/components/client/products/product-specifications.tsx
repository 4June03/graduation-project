interface Specification {
  name: string;
  value: string;
}

interface ProductSpecificationsProps {
  specifications: Specification[];
}

export function ProductSpecifications({
  specifications,
}: ProductSpecificationsProps) {
  if (!specifications || specifications.length === 0) {
    return (
      <div className="py-4 text-center text-gray-500">
        No specifications available
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <tbody className="divide-y divide-gray-200">
          {specifications.map((spec, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
            >
              <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900">
                {spec.name}
              </td>
              <td className="whitespace-normal px-4 py-3 text-sm text-gray-500">
                {spec.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
