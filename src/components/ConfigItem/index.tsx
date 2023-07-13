import { ReactNode } from "react"

interface ConfigItemProps {
  children: ReactNode
  title: string
  description: string
}

export function ConfigItem({ children, title, description }: ConfigItemProps) {
  return (
    <div className="flex items-center flex-wrap">
      <div className="max-sm:w-full w-2/5">
        <h2 className="text-lg text-slate-300">{title}</h2>
        <p className="text-gray-400 pb-5">{description}</p>
      </div>
      {children}
    </div>
  )
}
