"use client";

import { ExpressionContextType, ResultType } from "@@types/expression";
import { LogicEvaluator } from "@utils/LogicEvaluator";
import { evaluateExpression } from "@utils/evaluateExpression";
import { removeExternalParentheses } from "@utils/manipulateExpression";
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

  async function resolveLogic(expression: string) {
    const { variables, separateExpression } = evaluateExpression(expression);

    const logic = new LogicEvaluator({ variables, separateExpression });

    //? Solving preposition expression
    const result = logic.resolvePreposition();

    //? Getting propositional form
    result.propositionalForm = logic.getPropositionalForm();

    let delimitedExpression: string;

    //? Getting logical implications
    result.logicalImplication.implication =
      (expression.includes("⟶") || expression.includes("⟹")) &&
      result.propositionalForm === "Tautologia";

    const { expressionNoParentheses } = removeExternalParentheses(expression);

    const implicationsRegex = /(?<!\([^()⟶]*)[⟶⟹]/g;

    delimitedExpression = expressionNoParentheses.replaceAll(
      implicationsRegex,
      "_"
    );

    const implicationsExp = delimitedExpression.split("_");

    //? Reflexive property
    result.logicalImplication.properties.isReflexive = implicationsExp.every(
      (elemento) => elemento === implicationsExp[0]
    );

    //? Transitive property
    result.logicalImplication.properties.isTransitive =
      implicationsExp.length > 2;

    //? Anti-symmetric property
    result.logicalImplication.properties.isAntiSymmetric =
      implicationsExp.length === 3 && implicationsExp[0] === implicationsExp[2];

    //? Getting logical equivalence
    result.logicalEquivalence.equivalence =
      (expression.includes("⟷") || expression.includes("⟺")) &&
      result.propositionalForm === "Tautologia";

    const equivalencesRegex = /(?<!\([^()⟷]*)[⟷⟺]/g;

    delimitedExpression = expressionNoParentheses.replaceAll(
      equivalencesRegex,
      "_"
    );

    const equivalencesExp = delimitedExpression.split("_");

    //? Reflexive property
    result.logicalEquivalence.properties.isReflexive = equivalencesExp.every(
      (elemento) => elemento === equivalencesExp[0]
    );

    //? Transitive property
    result.logicalEquivalence.properties.isTransitive =
      equivalencesExp.length > 2;

    //? Symmetric property
    result.logicalEquivalence.properties.isSymmetric =
      result.logicalEquivalence.equivalence;

    //? Condicional propositions
    if (implicationsExp.length === 2) {
      let { expressionNoParentheses: A, wasRemoved: wasRemovedA } =
        removeExternalParentheses(implicationsExp[0]);
      let { expressionNoParentheses: B, wasRemoved: wasRemovedB } =
        removeExternalParentheses(implicationsExp[1]);

      if (wasRemovedA && implicationsExp[0][0] === "¬") A = implicationsExp[0];
      if (wasRemovedB && implicationsExp[1][0] === "¬") B = implicationsExp[1];

      result.conditionalPropositions.reciprocal = `${implicationsExp[1]}⟶${implicationsExp[0]}`;
      result.conditionalPropositions.contrary = `¬(${A})⟶¬(${B})`;
      result.conditionalPropositions.contrapositive = `¬(${B})⟶¬(${A})`;
    }

    // //? Is FND
    let expressionFlat = expression;
    const regexInternal = /\([^()]*[)][^()]*(?=\))/g;

    while (expressionFlat.match(regexInternal)) {
      expressionFlat = expressionFlat.replace(regexInternal, (match) =>
        match.slice(1, -1)
      );
    }

    const FNDRegex =
      /^(?:\([^()⟶⟷⟹⟺∨]+(?:∧[^()⟶⟷⟹⟺∨]+)*\))(?:∨(?:\([^()⟶⟷⟹⟺∨]+(?:∧[^()⟶⟷⟹⟺∨]+)*\)))*$/gm;

    result.normalForm.fnd.isFND = FNDRegex.test(expressionFlat);

    //? Transforming in FND
    if (!result.normalForm.fnd.isFND) {
      let trueValues: Array<number[]> = [];
      const varValues = Object.values(variables);

      varValues.forEach(() => trueValues.push([]));

      result.truthTable[expression]?.forEach((value, i) => {
        if (value === 1) {
          varValues.forEach((variable, x) => trueValues[x].push(variable[i]));
        }
      });

      const fndVars = trueValues[0].map((_, colIndex) =>
        trueValues.map((row, i) => {
          const variable = Object.keys(variables)[i];
          return row[colIndex] ? variable : `¬${variable}`;
        })
      );

      const fndExp = fndVars.map((values) => `(${values.join("∧")})`).join("∨");
      result.normalForm.fnd.proposition = fndExp;
    }

    //? is FNC
    expressionFlat = expression;

    while (expressionFlat.match(regexInternal)) {
      expressionFlat = expressionFlat.replace(regexInternal, (match) =>
        match.slice(1, -1)
      );
    }

    const FNCRegex =
      /^(?:\([^()⟶⟷⟹⟺∧]+(?:∨[^()⟶⟷⟹⟺∧]+)*\))(?:∧(?:\([^()⟶⟷⟹⟺∧]+(?:∨[^()⟶⟷⟹∧]+)*\)))*$/gm;

    result.normalForm.fnc.isFNC = FNCRegex.test(expressionFlat);

    //? Transforming in FNC
    let trueValues: Array<number[]> = [];
    const varValues = Object.values(variables);

    varValues.forEach(() => trueValues.push([]));

    result.truthTable[expression]?.forEach((value, i) => {
      if (value === 0) {
        varValues.forEach((variable, x) => trueValues[x].push(variable[i]));
      }
    });

    const fncVars = trueValues[0].map((_, colIndex) =>
      trueValues.map((row, i) => {
        const variable = Object.keys(variables)[i];
        return !row[colIndex] ? variable : `¬${variable}`;
      })
    );

    const fncExp = fncVars.map((values) => `(${values.join("∨")})`).join("∧");
    result.normalForm.fnc.proposition = fncExp;

    setResult(result);
    setSeparateExpression(separateExpression);
  }

  return (
    <ExpressionContext.Provider
      value={{
        resolveLogic,
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
