import { HTMLAttributes, ReactNode } from "react";

type PageProps = {
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export function Page({ children, className }: PageProps) {
  return (
    <main className={`ml-24 pt-20 m-h-full flex-col ${className}`}>
      {children}
    </main>
  );
}
