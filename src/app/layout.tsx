import { Menu } from "@components/Menu";
import { ExpressionContextProvider } from "@contexts/ExpressionContext";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Lógica Computacional",
  description: "Calculadora de lógica computacional",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <ExpressionContextProvider>
          <Menu />
          {children}
        </ExpressionContextProvider>
      </body>
    </html>
  );
}
