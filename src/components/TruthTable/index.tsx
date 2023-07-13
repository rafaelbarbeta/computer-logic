import { ConfigType } from "@@types/config"
import { TruthTableType } from "@@types/expression"
import { CONFIG_DEFAULT } from "@constants/config"
import { useExpressionContext } from "@contexts/ExpressionContext"
import { useEffect, useState } from "react"

export function TruthTable() {
  const [truthTable, setTruthTable] = useState<TruthTableType>()

  const { result, separateExpression } = useExpressionContext()

  useEffect(() => {
    const config: ConfigType = JSON.parse(
      localStorage.getItem("@logic:config") ?? JSON.stringify(CONFIG_DEFAULT)
    )

    const table: TruthTableType = { ...result.truthTable }

    if (config.tableValue === "letter") {
      for (const key in result.truthTable) {
        table[key] = result.truthTable[key]!.map((value) => (value ? "V" : "F"))
      }
    }

    setTruthTable(table)
  }, [result.truthTable])

  return (
    <div className="overflow-auto max-w-[85%] min-w-[55%] rounded-lg">
      <table className="w-full text-center text-gray-300 border border-slate-800 border-separate rounded-lg">
        <thead className="bg-slate-950/50 uppercase w-full">
          <tr>
            {separateExpression.map((exp, i) => (
              <th
                key={`${exp}-${i}`}
                className="px-6 py-3 first:rounded-tl-lg last:rounded-tr-lg"
              >
                {exp}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {truthTable?.[separateExpression[0]]?.map((_, rowIndex) => (
            <tr
              key={rowIndex}
              className=" even:bg-slate-800/30 odd:bg-slate-800/50 border-slate-800"
            >
              {separateExpression.map((exp, colIndex) => (
                <td
                  key={`${rowIndex}-${colIndex}`}
                  className={`px-6 py-3 text-gray-400 last:text-gray-200 last:bg-slate-900/50 ${
                    rowIndex === truthTable?.[exp]?.length &&
                    "first:rounded-bl-lg last:rounded-br-lg"
                  }`}
                >
                  {truthTable?.[exp]?.[rowIndex]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
