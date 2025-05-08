import Link from "next/link"

interface BreadcrumbItem {
  label: string
  href?: string
}

interface PageHeaderProps {
  title: string
  breadcrumbs: BreadcrumbItem[]
}

export function PageHeader({ title, breadcrumbs }: PageHeaderProps) {
  return (
    <div className="bg-muted/30 py-6">
      <div className="container">
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        {breadcrumbs.length > 0 && (
          <div className="flex items-center text-sm text-muted-foreground">
            {breadcrumbs.map((item, index) => (
              <div key={index} className="flex items-center">
                {index > 0 && <span className="mx-2">/</span>}
                {item.href ? (
                  <Link href={item.href} className="hover:text-foreground">
                    {item.label}
                  </Link>
                ) : (
                  <span>{item.label}</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
