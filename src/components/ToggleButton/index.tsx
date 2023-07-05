import { ConfigType } from "@@types/config"
import { CONFIG_DEFAULT } from "@constants/config"
import { ReactNode, useEffect, useState } from "react"

interface ToggleButtonProps {
  children?: ReactNode
  name: string
}

export function ToggleButton({ children, name }: ToggleButtonProps) {
  const [isOn, setIsOn] = useState(true)

  useEffect(() => {
    const config: ConfigType = JSON.parse(
      localStorage.getItem("@logic:config") ?? JSON.stringify(CONFIG_DEFAULT)
    )

    setIsOn(config.automatic)
  }, [])

  function handleInputChange() {
    const config: ConfigType = JSON.parse(
      localStorage.getItem("@logic:config") ?? JSON.stringify(CONFIG_DEFAULT)
    )

    setIsOn(!isOn)
    config[name] = !isOn
    localStorage.setItem(`@logic:config`, JSON.stringify(config))
  }

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        onChange={handleInputChange}
        name={name}
        checked={isOn}
      />
      <div className="w-11 h-6 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-slate-800 rounded-full peer bg-gray-400 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all border-gray-600 peer-checked:bg-slate-700"></div>
      <span className="ml-3 font-bold text-gray-300">{children}</span>
    </label>
  )
}
