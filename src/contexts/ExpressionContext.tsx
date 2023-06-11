"use client";

import { ExpressionContextType, ResultType } from "@@types/expression";
import { evaluateExpression } from "@utils/evaluateExpression";
import { removeExternalParentheses } from "@utils/manipulateExpression";
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
  } as ResultType);

  const [separateExpression, setSeparateExpression] = useState([""]);
  const [expression, setExpression] = useState("");

  async function resolveExpression(expression: string) {
    const { variables, separateExpression } = evaluateExpression(expression);

    const result: ResultType = {
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
        reciprocal: "",
        contrary: "",
        contrapositive: "",
      },
      normalForm: "",
    };

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

    //? Solving preposition expression
    while (
      Object.keys(result.truthTable).length < separateExpression.length &&
      separateExpression.at(-1)?.length !== 1
    ) {
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

          const replaceExp =
            op === "¬" ? `${op}${data2}` : `${data1}${op}${data2}`;

          evalExp = evalExp.replaceAll(replaceExp, result);
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

    //? Getting propositional form
    const tableResult = result.truthTable[separateExpression.at(-1) ?? ""];
    if (tableResult?.includes(1) && !tableResult.includes(0))
      result.propositionalForm = "Tautologia";
    if (tableResult?.includes(0) && !tableResult.includes(1))
      result.propositionalForm = "Contradição";
    if (tableResult?.includes(1) && tableResult.includes(0))
      result.propositionalForm = "Contingência";

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
