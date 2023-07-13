"use client"

import { RadioButtonGroup } from "@/components/RadioButtonGroup"
import { ToggleButton } from "@/components/ToggleButton"
import { ConfigItem } from "@components/ConfigItem"
import { Page } from "@components/Page"

export default function ConfigPage() {
  return (
    <Page className="flex gap-10 h-full pt-20 px-20 max-sm:px-10">
      <h1 className="text-2xl font-bold">Configurações</h1>
      <div className="flex flex-col gap-5 ">
        <div className="flex flex-col gap-3 divide-y divide-y-reverse divide-slate-400/25">
          <h2 className="text-xl text-gray-100">Tabela-Verdade</h2>
          <p className="text-gray-400 pb-5">
            Mude as configurações relacionadas a tabela-verdade.
          </p>
        </div>
        <ConfigItem
          title="Valores Lógicos"
          description="Mudar a representação dos valores lógicos na tabela."
        >
          <div className="flex gap-10 items-center">
            <RadioButtonGroup
              radiosId={["number", "letter"]}
              labels={["0 / 1", "F / V"]}
              name="tableValue"
            />
          </div>
        </ConfigItem>
        <ConfigItem
          title="Resultado automático"
          description="Calcular resultado de uma expressão válida automaticamente"
        >
          <div className="flex gap-10 items-center">
            <ToggleButton name="automatic" />
          </div>
        </ConfigItem>
      </div>
    </Page>
  )
}
