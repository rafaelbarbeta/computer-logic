import { AnimatedTitle } from "@components/AnimatedTitle"
import { Card } from "@components/Card"
import { Page } from "@components/Page"

import { Fira_Code } from "next/font/google"
import Image from "next/image"
import Link from "next/link"

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
})

export default function HomePage() {
  return (
    <Page>
      <div
        className={`${firaCode.className} h-[40vh] bg-slate-950 flex flex-col justify-center items-center gap-5 relative`}
      >
        <AnimatedTitle className="xl:text-6xl md:text-5xl min-[420px]:text-3xl text-xl text-center font-bold flex flex-row">
          Lógica Computacional
        </AnimatedTitle>

        <p className="text-center">Simplificando a lógica, do 0 ao 1...</p>

        <section className="flex justify-center flex-wrap items-center gap-10 absolute max-sm:px-7 top-[90%]">
          <Card
            title="Tabela-Verdade"
            image={{
              bgColor: "bg-green-500",
              src: "/illustrations/calculator.svg",
            }}
          >
            Forneça expressões lógicas e veja qual é sua tabela-verdade, sua
            forma proposicional e outras informações.
          </Card>
          <Card
            title="Linguagem Natural"
            image={{
              bgColor: "bg-cyan-500",
              src: "/illustrations/natural language.svg",
            }}
          >
            Forneça frases usando a linguagem natural humana e converta-as para
            expressões lógicas.
          </Card>
          <Card
            title="Ajuda"
            image={{
              bgColor: "bg-red-400",
              src: "/illustrations/help.svg",
            }}
          >
            Precisa de ajuda? Conheça um pouco da teoria por trás do assunto e
            entenda o que cada ferramenta faz.
          </Card>
          <Card
            title="Configurações"
            image={{
              bgColor: "bg-yellow-500 ",
              src: "/illustrations/settings.svg",
            }}
          >
            Configure algumas opções do sistema de acordo com a sua preferência
            ou necessidade.
          </Card>
        </section>
      </div>
      <section className="xl:mt-72 lg:mt-[50rem] md:mt-[90rem] min-[420px]:mt-[95rem] mt-[100rem]"></section>
      <footer className="flex justify-center items-center bg-slate-950 h-60 mt-[40rem]">
        <Link
          href="https://erikgabriel.vercel.app"
          className="flex flex-col gap-5 justify-center items-center"
        >
          <Image
            src="/erik_logo.svg"
            alt="Erik Gabriel Logo"
            width={50}
            height={50}
            style={{ width: 80, height: 80 }}
          />
          <p className="">Erik Gabriel &copy; 2023</p>
        </Link>
      </footer>
    </Page>
  )
}
