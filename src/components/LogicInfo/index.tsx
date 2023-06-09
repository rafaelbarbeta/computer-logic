import { useExpressionContext } from "@/contexts/ExpressionContext";

export function LogicInfo() {
  const { separateExpression, result } = useExpressionContext();

  return (
    <div className="min-w-[55%] flex flex-col gap-10">
      <table className=" text-center w-full text-gray-300 border border-slate-800 border-separate rounded-lg">
        <thead className="bg-slate-950/50">
          <tr>
            <th
              colSpan={Object.values(result.truthTable)[0]?.length}
              className="px-6 py-3 first:rounded-tl-lg last:rounded-tr-lg uppercase"
            >
              Resultado Lógico da Proposição
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className=" even:bg-slate-800/30 odd:bg-slate-800/50 border-slate-800">
            {result.truthTable[separateExpression.at(-1) ?? ""]?.map(
              (value, i) => (
                <td key={i} className="px-6 py-3 ">
                  {value}
                </td>
              )
            )}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
