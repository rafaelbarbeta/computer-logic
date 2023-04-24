"use client";

import { useRouter } from "next/navigation";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = {
  children: ReactNode;
  onlyIcon?: boolean;
  href?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  children,
  onlyIcon = false,
  href,
  className,
  ...props
}: ButtonProps) {
  const router = useRouter();

  return (
    <button
      className={twMerge(
        ` p-2 px-5 rounded-md ${
          onlyIcon
            ? "hover:text-white transition-all hover:scale-110"
            : "bg-slate-800 transition hover:bg-slate-700 "
        } ${className}`
      )}
      onClick={() => href && router.push(href)}
      {...props}
    >
      {children}
    </button>
  );
}
