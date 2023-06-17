import { useExpressionContext } from "@contexts/ExpressionContext";
import { removeExternalParentheses } from "@utils/manipulateExpression";
import { useEffect, useState } from "react";

export function LogicInfo() {
  const { separateExpression, result } = useExpressionContext();

  const [proposition, setProposition] = useState("");
  const [implication, setImplication] = useState("");
  const [equivalence, setEquivalence] = useState("");

  useEffect(() => {
    let proposition = separateExpression.at(-1) ?? "";
    setProposition(proposition);

    const parenthesis: string[] = [];
    proposition =
      removeExternalParentheses(proposition).expressionNoParentheses;

    if (parenthesis.length === 0) parenthesis.push("", "");

    const implication = proposition?.replaceAll(/(?<!\([^()⟶]*)[⟶⟹]/g, "⟹");
    setImplication(`${parenthesis[0]}${implication}${parenthesis[1]}`);

    const equivalence = proposition?.replaceAll(/(?<!\([^()⟷]*)[⟷⟺]/g, "⟺");
    setEquivalence(`${parenthesis[0]}${equivalence}${parenthesis[1]}`);
  }, [separateExpression]);

  return (
    <div className="w-[55%] flex flex-col gap-10">
      <table className="text-center w-full text-gray-300 border border-slate-800 border-separate rounded-lg">
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
          <tr className="even:bg-slate-800/30 odd:bg-slate-800/50 border-slate-800">
            {result.truthTable[proposition]?.map((value, i) => (
              <td key={i} className="py-3">
                {value}
              </td>
            ))}
          </tr>
        </tbody>
      </table>

      <table className="text-center w-full text-gray-300 border border-slate-800 border-separate rounded-lg">
        <thead className="bg-slate-950/50">
          <tr>
            <th className="px-6 py-3 first:rounded-tl-lg last:rounded-tr-lg uppercase">
              Forma Proposicional
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="even:bg-slate-800/30 odd:bg-slate-800/50 border-slate-800">
            <td className="px-6 py-3 ">
              A proposição {proposition} é uma{" "}
              <span className="font-bold">{result.propositionalForm}</span>
            </td>
          </tr>
        </tbody>
      </table>
      {/(?<!\([^()⟶⟷]*)[⟶⟹⟷⟺]/g.test(proposition) && (
        <div className="flex flex-wrap gap-10">
          {/(?<!\([^()⟶]*)[⟶⟹]/g.test(proposition) && (
            <table className="text-center w-full text-gray-300 border border-slate-800 border-separate rounded-lg">
              <thead className="bg-slate-950/50">
                <tr>
                  <th
                    className="px-6 py-3 first:rounded-tl-lg last:rounded-tr-lg uppercase"
                    colSpan={2}
                  >
                    Implicação Lógica
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="even:bg-slate-800/30 odd:bg-slate-800/50 border-slate-800">
                  <td className="px-6 py-3" colSpan={2}>
                    A implicação lógica {implication} é{" "}
                    <span className="font-bold">
                      {result.logicalImplication.implication
                        ? "válida"
                        : "inválida"}
                    </span>
                  </td>
                </tr>
                {result.logicalImplication.implication && (
                  <>
                    {!Object.values(result.logicalImplication.properties).every(
                      (valor) => !valor
                    ) && (
                      <tr className="bg-slate-950/30 border-slate-800">
                        <td
                          className="px-6 py-2 uppercase font-bold "
                          colSpan={2}
                        >
                          Propriedades
                        </td>
                      </tr>
                    )}
                    {result.logicalImplication.properties.isReflexive && (
                      <tr className="bg-slate-800/50 border-slate-800">
                        <td className="px-6 py-3 bg-slate-900/50">Reflexiva</td>
                        <td className="px-6 py-3">
                          A implicação é <b>reflexiva</b>. <br />
                          <span className="italic">Ex.: A⟹A</span>
                        </td>
                      </tr>
                    )}
                    {result.logicalImplication.properties.isTransitive && (
                      <tr className="bg-slate-800/50 border-slate-800">
                        <td className="px-6 py-3 bg-slate-900/50">
                          Transitiva
                        </td>
                        <td className="px-6 py-3">
                          A implicação é <b>transitiva</b>. <br />
                          <span className="italic">Ex.: A⟹B⟹C ∴ A⟹C</span>
                        </td>
                      </tr>
                    )}
                    {result.logicalImplication.properties.isAntiSymmetric && (
                      <tr className="bg-slate-800/50 border-slate-800">
                        <td className="px-6 py-3 bg-slate-900/50">
                          Anti-simétrica
                        </td>
                        <td className="px-6 py-3">
                          A implicação é <b>anti-simétrica</b>. <br />
                          <span className="italic">Ex.: A⟹B e B⟹A ∴ A⟺B</span>
                        </td>
                      </tr>
                    )}
                  </>
                )}
              </tbody>
            </table>
          )}
          {/(?<!\([^()⟷]*)[⟷⟺]/g.test(proposition) && (
            <table className="text-center w-full text-gray-300 border border-slate-800 border-separate rounded-lg">
              <thead className="bg-slate-950/50">
                <tr>
                  <th
                    className="px-6 py-3 first:rounded-tl-lg last:rounded-tr-lg uppercase"
                    colSpan={2}
                  >
                    Equivalência Lógica
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="even:bg-slate-800/30 odd:bg-slate-800/50 border-slate-800">
                  <td className="px-6 py-3" colSpan={2}>
                    A equivalência lógica {equivalence} é{" "}
                    <span className="font-bold">
                      {result.logicalEquivalence.equivalence
                        ? "válida"
                        : "inválida"}
                    </span>
                  </td>
                </tr>
                {result.logicalEquivalence.equivalence && (
                  <>
                    {!Object.values(result.logicalEquivalence.properties).every(
                      (valor) => !valor
                    ) && (
                      <tr className="bg-slate-950/30 border-slate-800">
                        <td
                          className="px-6 py-2 uppercase font-bold "
                          colSpan={2}
                        >
                          Propriedades
                        </td>
                      </tr>
                    )}

                    {result.logicalEquivalence.properties.isReflexive && (
                      <tr className="bg-slate-800/50 border-slate-800">
                        <td className="px-6 py-3 bg-slate-900/50">Reflexiva</td>
                        <td className="px-6 py-3">
                          A equivalência é <b>reflexiva</b>. <br />
                          <span className="italic">Ex.: A⟺A</span>
                        </td>
                      </tr>
                    )}
                    {result.logicalEquivalence.properties.isTransitive && (
                      <tr className="bg-slate-800/50 border-slate-800">
                        <td className="px-6 py-3 bg-slate-900/50">
                          Transitiva
                        </td>
                        <td className="px-6 py-3">
                          A equivalência é <b>transitiva</b>. <br />
                          <span className="italic">Ex.: A⟺B⟺C ∴ A⟺C</span>
                        </td>
                      </tr>
                    )}
                    {result.logicalEquivalence.properties.isSymmetric && (
                      <tr className="bg-slate-800/50 border-slate-800">
                        <td className="px-6 py-3 bg-slate-900/50">Simétrica</td>
                        <td className="px-6 py-3">
                          A equivalência é <b>simétrica</b>. <br />
                          <span className="italic">Ex.: A⟺B ∴ B⟺A</span>
                        </td>
                      </tr>
                    )}
                  </>
                )}
              </tbody>
            </table>
          )}
        </div>
      )}

      {result.conditionalPropositions.reciprocal && (
        <table className="text-center w-full text-gray-300 border border-slate-800 border-separate rounded-lg">
          <thead className="bg-slate-950/50">
            <tr>
              <th
                className="px-6 py-3 first:rounded-tl-lg last:rounded-tr-lg uppercase"
                colSpan={2}
              >
                Proposições Condicionais
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-slate-800/50 border-slate-800">
              <td className="px-6 py-3 bg-slate-900/50">Recíproca</td>
              <td className="px-6 py-3">
                A proposição <b>recíproca</b> de <i>{proposition}</i> é <br />
                <span className="font-bold">
                  {result.conditionalPropositions.reciprocal}
                </span>
              </td>
            </tr>

            <tr className="bg-slate-800/50 border-slate-800">
              <td className="px-6 py-3 bg-slate-900/50">Contrária</td>
              <td className="px-6 py-3">
                A proposição <b>contrária</b> de <i>{proposition}</i> é <br />
                <span className="font-bold">
                  {result.conditionalPropositions.contrary}
                </span>
              </td>
            </tr>

            <tr className="bg-slate-800/50 border-slate-800">
              <td className="px-6 py-3 bg-slate-900/50">
                Contra-positiva ou recíproca da contraria
              </td>
              <td className="px-6 py-3">
                A proposição <b>contra-positiva</b> de <i>{proposition}</i> é{" "}
                <br />
                <span className="font-bold">
                  {result.conditionalPropositions.contrapositive}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      )}

      <div className="flex w-full flex-wrap text-ellipsis gap-10">
        <table className="text-center w-full text-gray-300 border border-slate-800 border-separate rounded-lg">
          <thead className="bg-slate-950/50">
            <tr>
              <th
                className="px-6 py-3 first:rounded-tl-lg last:rounded-tr-lg uppercase"
                colSpan={2}
              >
                Forma normal disjuntiva (FND)
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="even:bg-slate-800/30 odd:bg-slate-800/50 border-slate-800">
              <td className="px-6 py-3" colSpan={2}>
                A proposição {proposition}{" "}
                <span className="font-bold">
                  {result.normalForm.fnd.isFND ? "está " : "não está "}
                </span>
                na FND
              </td>
            </tr>

            {!result.normalForm.fnd.isFND && (
              <>
                <tr className="bg-slate-950/30 border-slate-800">
                  <td className="px-6 py-2 uppercase font-bold " colSpan={2}>
                    Conversão para a FND
                  </td>
                </tr>
                <tr className="bg-slate-800/50 border-slate-800">
                  <td className="px-6 py-3 truncate max-w-0">
                    {result.normalForm.fnd.proposition ||
                      "Impossível converter para a FND"}
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>
        <table className="text-center w-full  text-gray-300 border border-slate-800 border-separate rounded-lg">
          <thead className="bg-slate-950/50">
            <tr>
              <th
                className="px-6 py-3 first:rounded-tl-lg last:rounded-tr-lg uppercase"
                colSpan={2}
              >
                Forma normal conjuntiva (FNC)
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="even:bg-slate-800/30 odd:bg-slate-800/50 border-slate-800">
              <td className="px-6 py-3" colSpan={2}>
                A proposição {proposition}{" "}
                <span className="font-bold">
                  {result.normalForm.fnc.isFNC ? "está " : "não está "}
                </span>
                na FNC
              </td>
            </tr>
            {!result.normalForm.fnc.isFNC && (
              <>
                <tr className="bg-slate-950/30 border-slate-800">
                  <td className="px-6 py-2 uppercase font-bold " colSpan={2}>
                    Conversão para a FNC
                  </td>
                </tr>
                <tr className="bg-slate-800/50 border-slate-800">
                  <td className="px-6 py-3 truncate max-w-0">
                    {result.normalForm.fnc.proposition ||
                      "Impossível converter para a FNC"}
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
