"use client";

import { ExpressionContextType, ResultType } from "@@types/expression";
import { evaluateExpression } from "@utils/evaluateExpression";
import { getDataExpression, logicEvalMap } from "@utils/resolveOperation";
import { ReactNode, createContext, useContext, useState } from "react";

type ExpressionContextProviderProps = {
  children: ReactNode;
};

const ExpressionContext = createContext({} as ExpressionContextType);

export function ExpressionContextProvider({
  children,
}: ExpressionContextProviderProps) {
  const [result, setResult] = useState<ResultType>({
    truthTable: {},
    propositionalForm: "Contingência",
    logicalImplication: {
      implication: false,
      properties: {
        isReflexive: false,
        isAntiSymmetric: false,
        isTransitive: false,
      },
    },
    logicalEquivalence: {
      equivalence: false,
      properties: {
        isReflexive: false,
        isSymmetric: false,
        isTransitive: false,
      },
    },
    conditionalPropositions: {
      reciprocal: [],
      contrary: [],
      contrapositive: [],
    },
    normalForm: "",
  });

  const [separateExpression, setSeparateExpression] = useState([""]);

  async function resolveExpression(expression: string) {
    const { variables, separateExpression } = evaluateExpression(expression);
    const result: ResultType = {
      truthTable: {},
    } as ResultType;

    let valueMaxDec = 2 ** Object.keys(variables).length - 1;
    let binaryValues = [];

    const allVariables = [
      ...new Set(
        separateExpression.flatMap((element) => element.match(/¬?\w+/g))
      ),
    ] as string[];

    for (let i = 0; i <= valueMaxDec; i++) {
      binaryValues.push(
        (i >>> 0).toString(2).padStart(Object.keys(variables).length, "0")
      );
    }

    binaryValues.reverse();

    for (const [variable, values] of Object.entries(variables)) {
      const i = Object.keys(variables).indexOf(variable);
      values.push(
        ...binaryValues.map((binaryValue) => parseInt(binaryValue[i]))
      );
    }

    let securityWhileFlag = 0;

    allVariables.forEach((_var) => {
      const variable = _var.replace(/^¬/, "");
      result.truthTable[_var] = variables[variable].map((value) =>
        _var[0] === "¬" ? (value ? 0 : 1) : value
      );
    });

    while (Object.keys(result).length < separateExpression.length) {
      securityWhileFlag++;
      if (securityWhileFlag > separateExpression.length) {
        console.warn("WARN: WHILE LOOPING EXCEEDED!!!", separateExpression);
        break;
      }

      const allowedOperationsRegex = /[¬∧·∨+⟶⟷⟹⟺⊕]/;
      const primaryOrderOperationsRegex = /[¬∧·∨+⊕]/;

      for (let i = allVariables.length; i < separateExpression.length; i++) {
        const exp = separateExpression[i];
        let evalExp = exp;
        let matchResult;

        while ((matchResult = evalExp.match(allowedOperationsRegex))) {
          const [op] = matchResult;
          const pos = evalExp.indexOf(op);
          const [data1, data2] = primaryOrderOperationsRegex.test(op)
            ? [
                getDataExpression(evalExp, pos - 1, "backward"),
                getDataExpression(evalExp, pos + 1, "forward"),
              ]
            : [evalExp.substring(0, pos), evalExp.substring(pos + 1)];

          const result = logicEvalMap(data1, data2, op);

          evalExp = evalExp.replace(`${data1}${op}${data2}`, result);
        }

        const evalResults = [];
        const letters = evalExp.match(/\w/g) ?? [];
        const regex = new RegExp(letters.join("|"), "g");

        for (let i = 0; i < valueMaxDec + 1; i++) {
          const evalExpFormat = evalExp.replaceAll(regex, (match) => {
            return String(result.truthTable[match]![i]);
          });

          evalResults.push(Number(eval(evalExpFormat)));
        }

        result.truthTable[exp] = evalResults;
      }
    }

    setResult(result);
    setSeparateExpression(separateExpression);
  }

  return (
    <ExpressionContext.Provider
      value={{ resolveExpression, result, setResult, separateExpression }}
    >
      {children}
    </ExpressionContext.Provider>
  );
}

export const useExpressionContext = () => useContext(ExpressionContext);
