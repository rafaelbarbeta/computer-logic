import { ResultType } from "@@types/expression";
import { useExpressionContext } from "@contexts/ExpressionContext";
import { useEffect } from "react";

export function TruthTable() {
  const { result, setResult, separateExpression } = useExpressionContext();

  useEffect(() => {
    setResult({ truthTable: {} } as ResultType);
  }, [setResult]);

  return (
    <>
      {Object.keys(result.truthTable).length > 0 && (
        <table className="min-w-[50%] mb-80 text-center text-gray-300 border border-slate-800 border-separate rounded-lg">
          <thead className="bg-slate-950/50 uppercase">
            <tr>
              {separateExpression.map((exp) => (
                <th
                  key={exp}
                  className="px-6 py-3 first:rounded-tl-lg last:rounded-tr-lg"
                >
                  {exp}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {result?.truthTable[separateExpression[0]]?.map((_, rowIndex) => (
              <tr
                key={rowIndex}
                className=" even:bg-slate-800/30 odd:bg-slate-800/50 border-slate-800"
              >
                {separateExpression.map((exp, colIndex) => (
                  <td
                    key={`${rowIndex}-${colIndex}`}
                    className={`px-6 py-3 text-gray-400 last:text-gray-200 last:bg-slate-900/50 ${
                      rowIndex === result.truthTable[exp]?.length &&
                      "first:rounded-bl-lg last:rounded-br-lg"
                    }`}
                  >
                    {result.truthTable[exp]![rowIndex]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
