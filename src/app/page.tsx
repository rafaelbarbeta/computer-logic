import { AnimatedTitle } from "@components/AnimatedTitle";
import { Page } from "@components/Page";

import { Fira_Code } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
});

export default function HomePage() {
  return (
    <Page>
      <div
        className={`${firaCode.className} h-[40vh] bg-slate-950 flex flex-col justify-center items-center gap-5 relative`}
      >
        <AnimatedTitle className="text-6xl text-center font-bold flex flex-row">
          Lógica Computacional
        </AnimatedTitle>

        <p>Simplificando a lógica, do 0 ao 1...</p>

        <section className="flex justify-center items-center gap-10 absolute -bottom-[80%]">
          <Link
            href="/table"
            className="w-1/5 min-h-max cursor-pointer hover:scale-[1.05] transition-all duration-300"
          >
            <div className="bg-green-500 h-2/3 flex justify-center items-center rounded-lg">
              <Image
                src="/illustrations/calculator.svg"
                alt="Calculator illustration"
                width={0}
                height={0}
                className="w-full h-40"
                priority
              />
            </div>
            <div className="flex flex-col text-center gap-5 py-5 px-2">
              <h2 className="text-2xl text-gray-200 font-bold">
                Tabela-Verdade
              </h2>
              <p className="text-gray-300">
                Forneça expressões lógicas e veja qual é sua tabela-verdade, sua
                forma proposicional e outras informações.
              </p>
            </div>
          </Link>
          <Link
            href="language"
            className="w-1/5 min-h-max cursor-pointer hover:scale-[1.05] transition-all duration-300"
          >
            <div className="bg-cyan-500 h-2/3 flex justify-center items-center rounded-lg">
              <Image
                src="/illustrations/natural language.svg"
                alt="Talk illustration"
                width={0}
                height={0}
                className="w-full h-40"
                priority
              />
            </div>
            <div className="flex flex-col text-center gap-5 py-5 px-2">
              <h2 className="text-2xl text-gray-200 font-bold">
                Linguagem Natural
              </h2>
              <p className="text-gray-300">
                Forneça frases usando a linguagem natural humana e converta-as
                para expressões lógicas.
              </p>
            </div>
          </Link>
          <Link
            href="help"
            className="w-1/5 min-h-max cursor-pointer hover:scale-[1.05] transition-all duration-300"
          >
            <div className="bg-red-400 h-2/3 flex justify-center items-center rounded-lg">
              <Image
                src="/illustrations/help.svg"
                alt="Help illustration"
                width={0}
                height={0}
                className="w-full h-40"
                priority
              />
            </div>
            <div className="flex flex-col text-center gap-5 py-5 px-2">
              <h2 className="text-2xl text-gray-200 font-bold">Ajuda</h2>
              <p className="text-gray-300">
                Precisa de ajuda? Conheça um pouco da teoria por trás do assunto
                e entenda o que cada ferramenta faz.
              </p>
            </div>
          </Link>
          <Link
            href="config"
            className="w-1/5 min-h-max cursor-pointer hover:scale-[1.05] transition-all duration-300"
          >
            <div className="bg-yellow-500 h-2/3 flex justify-center items-center rounded-lg">
              <Image
                src="/illustrations/settings.svg"
                alt="Config illustration"
                width={0}
                height={0}
                className="w-full h-40"
                priority
              />
            </div>
            <div className="flex flex-col text-center gap-5 py-5 px-2">
              <h2 className="text-2xl text-gray-200 font-bold">
                Configurações
              </h2>
              <p className="text-gray-300">
                Configure algumas opções do sistema de acordo com a sua
                preferência ou necessidade.
              </p>
            </div>
          </Link>
        </section>
      </div>
      <section className="mt-80"></section>
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
  );
}
