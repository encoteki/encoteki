import Link from 'next/link'

interface Breadcrumbs {
  index: number
  page: string
  link: string
}

export default function DAOBreadcrumb({ items }: { items: Breadcrumbs[] }) {
  return (
    <div className="flex gap-2">
      {items.map((item, index) => {
        return (
          <div key={index} className="flex gap-2 text-lg">
            <Link href={item.link}>
              <span
                className={`transition-colors duration-300 hover:text-neutral-10 ${index != items.length - 1 ? 'text-neutral-40' : 'text-neutral-10'} `}
              >
                {item.page}
              </span>
            </Link>

            {index != items.length - 1 && <p className="text-neutral-40">/</p>}
          </div>
        )
      })}
    </div>
  )
}
