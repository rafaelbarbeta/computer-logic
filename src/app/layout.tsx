import { Menu } from "@components/Menu"
import { ExpressionContextProvider } from "@contexts/ExpressionContext"
import { Inter } from "next/font/google"
import Head from "next/head"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Lógica Computacional",
  description: "Calculadora de lógica computacional",
  icons: {
    icon: "/teste/favicon.svg",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <Head>
        <link rel="icon" href="/teste/favicon.svg" />
      </Head>
      <body className={inter.className}>
        <ExpressionContextProvider>
          <Menu />
          {children}
        </ExpressionContextProvider>
      </body>
    </html>
  )
}
