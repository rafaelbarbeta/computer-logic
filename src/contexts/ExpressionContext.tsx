"use client";

import { ExpressionContextType, ResultType } from "@@types/expression";
import { evaluateExpression } from "@utils/evaluateExpression";
import { removeExternalParentheses } from "@utils/manipulateExpression";
import { getDataExpression, logicEvalMap } from "@utils/resolveOperation";
import { ReactNode, createContext, useContext, useState } from "react";
import XRegExp from "xregexp";

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
      normalForm: {
        fnd: {
          isFND: false,
          proposition: "",
        },
        fnc: {
          isFNC: false,
          proposition: "",
        },
      },
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
      const secondaryOrderOperationsRegex = /\([^()]*?([⟶⟷⟹⟺])[^()]*?\)/;

      let auxSeparateExpression = separateExpression;

      for (let i = allVariables.length; i < separateExpression.length; i++) {
        const exp = separateExpression[i];
        let evalExp = exp;
        let matchResult;

        while ((matchResult = evalExp.match(allowedOperationsRegex))) {
          let [op] = matchResult;
          const pos = evalExp.indexOf(op);

          let data1 = "";
          let data2 = "";

          const regexSecondary =
            XRegExp.matchRecursive(evalExp, "\\(", "\\)", "g").filter((match) =>
              XRegExp.test(match, /⟶/)
            )[0] ?? "";

          if (regexSecondary) {
            const parenthesesMatch = regexSecondary.match(/[⟶]/);
            const parenthesesExp = parenthesesMatch?.input ?? "";
            const pos = parenthesesMatch?.index ?? 0;
            op = parenthesesMatch?.[0] ?? "";

            [data1, data2] = [
              parenthesesExp.substring(0, pos),
              parenthesesExp.substring(pos + 1),
            ];
          } else if (primaryOrderOperationsRegex.test(op)) {
            [data1, data2] = [
              getDataExpression(evalExp, pos - 1, "backward"),
              getDataExpression(evalExp, pos + 1, "forward"),
            ];
          } else {
            [data1, data2] = [
              evalExp.substring(0, pos),
              evalExp.substring(pos + 1),
            ];
          }

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

        result.truthTable[separateExpression[i]] = evalResults;
      }
    }

    //? Getting propositional form
    const tableResult = result.truthTable[expression];
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
