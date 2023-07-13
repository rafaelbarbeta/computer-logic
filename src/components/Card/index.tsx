import Image from "next/image"
import Link from "next/link"

import { ReactNode } from "react"

interface CardProps {
  children: ReactNode
  title: string
  image: {
    bgColor: string
    src: string
  }
  link: string
}

export function Card({ children, title, image, link }: CardProps) {
  return (
    <Link
      href={link}
      className="xl:w-1/5 lg:w-[40%] md:w-4/6 w-full cursor-pointer hover:scale-[1.05] transition-all duration-300"
    >
      <div
        className={`${image.bgColor} h-2/3 flex justify-center items-center rounded-lg`}
      >
        <Image
          src={image.src}
          alt="Calculator illustration"
          width={0}
          height={0}
          className="w-full h-40"
          priority
        />
      </div>
      <div className="flex flex-col text-center gap-5 py-5 px-2">
        <h2 className="text-2xl text-gray-200 font-bold">{title}</h2>
        <p className="text-gray-300">{children}</p>
      </div>
    </Link>
  )
}
