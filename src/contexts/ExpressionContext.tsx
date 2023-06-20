"use client";

import { ExpressionContextType, ResultType } from "@@types/expression";
import { LogicEvaluator } from "@classes/LogicEvaluator";
import { evaluateExpression } from "@functions/evaluateExpression";
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
  } as ResultType);

  const [separateExpression, setSeparateExpression] = useState([""]);
  const [expression, setExpression] = useState("");

  async function resolveExpression(expression: string) {
    const { variables, separateExpression } = evaluateExpression(expression);

    const logic = new LogicEvaluator({ variables, separateExpression });

    //? Solving preposition expression
    const result = logic.resolvePreposition();

    //? Setting propositional form
    logic.propositionalForm();

    //? Setting logical implications
    const implications = logic.implications();

    //? Setting logical equivalence
    logic.equivalences();

    //? Setting condicional propositions
    logic.conditionalPropositions(implications);

    //? Setting FND
    logic.normalForm("FND");

    //? Setting FNC
    logic.normalForm("FNC");

    setResult(result);
    setSeparateExpression(separateExpression);
  }

  return (
    <ExpressionContext.Provider
      value={{
        resolveExpression,
        result,
        setResult,
        expression,
        setExpression,
        separateExpression,
      }}
    >
      {children}
    </ExpressionContext.Provider>
  );
}

export const useExpressionContext = () => useContext(ExpressionContext);
