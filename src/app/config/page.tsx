"use client";

import { RadioButton } from "@/components/RadioButton";
import { ToggleButton } from "@/components/ToggleButton";
import { ConfigType } from "@@types/config";
import { ConfigItem } from "@components/ConfigItem";
import { Page } from "@components/Page";
import { CONFIG_DEFAULT } from "@constants/config";
import { useEffect, useState } from "react";

export default function ConfigPage() {
  const [config, setConfig] = useState<ConfigType>();

  useEffect(() => {
    const config = JSON.parse(
      localStorage.getItem("@logic:config") ?? JSON.stringify(CONFIG_DEFAULT)
    ) as ConfigType;

    if (config) setConfig(config);
  }, []);

  return (
    <Page className="flex gap-10 h-full pt-20 px-20">
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
            <RadioButton
              id="number"
              name="tableValue"
              checked={config?.tableValue === "number"}
            >
              0 / 1
            </RadioButton>
            <RadioButton
              id="letter"
              name="tableValue"
              checked={config?.tableValue === "letter"}
            >
              F / V
            </RadioButton>
          </div>
        </ConfigItem>
        <ConfigItem
          title="Resultado automático"
          description="Calcular resultado de uma expressão válida automaticamente"
        >
          <div className="flex gap-10 items-center">
            <ToggleButton name="automatic" on={config?.automatic} />
          </div>
        </ConfigItem>
      </div>
    </Page>
  );
}
