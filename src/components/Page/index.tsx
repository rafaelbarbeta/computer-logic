import { HTMLAttributes, ReactNode } from "react"

type PageProps = {
  children: ReactNode
} & HTMLAttributes<HTMLDivElement>

export function Page({ children, className }: PageProps) {
  return (
    <main className={`md:ml-24 m-h-full flex-col ${className}`}>
      {children}
    </main>
  )
}
