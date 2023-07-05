import { ConfigType } from "@@types/config"
import { CONFIG_DEFAULT } from "@constants/config"
import { ChangeEvent, useEffect, useState } from "react"

type RadioButtonGroupProps = {
  radiosId: string[]
  labels: string[]
  name: string
}

export function RadioButtonGroup({
  radiosId,
  name,

  labels,
}: RadioButtonGroupProps) {
  const [checkedRadioId, setCheckedRadioId] = useState<string>("")

  useEffect(() => {
    const config: ConfigType = JSON.parse(
      localStorage.getItem("@logic:config") ?? JSON.stringify(CONFIG_DEFAULT)
    )

    setCheckedRadioId(config.tableValue)
  }, [])

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const config: ConfigType = JSON.parse(
      localStorage.getItem("@logic:config") ?? JSON.stringify(CONFIG_DEFAULT)
    )

    setCheckedRadioId(e.target.id)
    config[name] = e.target.id
    localStorage.setItem("@logic:config", JSON.stringify(config))
  }

  return (
    <div className="flex gap-5">
      {radiosId.map((id, i) => (
        <div className="flex items-center gap-1" key={i}>
          <input
            id={id}
            type="radio"
            name={name}
            className="w-10 h-10 accent-slate-700 rounded-full focus:bg-red-50"
            onChange={(e) => handleInputChange(e)}
            checked={checkedRadioId === id}
          />
          <label htmlFor={id} className="w-full py-4 ml-2 font-bold">
            {labels[i]}
          </label>
        </div>
      ))}
    </div>
  )
}
