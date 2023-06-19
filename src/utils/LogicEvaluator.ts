import {
  EvaluateExpressionType,
  ResultType,
  VariablesType,
} from "@@types/expression";
import XRE from "xregexp";
import { getDataExpression, logicEvalMap } from "./resolveOperation";

export class LogicEvaluator {
  private expression: string;
  private separateExpression: string[];
  private variables: VariablesType;
  private result: ResultType = {
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

  constructor({ separateExpression, variables }: EvaluateExpressionType) {
    this.separateExpression = separateExpression;
    this.variables = variables;
    this.expression = separateExpression.at(-1) ?? "";
  }

  resolvePreposition(): ResultType {
    const separate = this.separateExpression;
    const variables = this.variables;
    const result = this.result;

    let valueMaxDec = 2 ** Object.keys(variables).length - 1;
    let binaryValues = [];

    const allVariables = [
      ...new Set(separate.flatMap((element) => element.match(/¬?\w+/g))),
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

    while (
      Object.keys(result.truthTable).length < separate.length &&
      separate.at(-1)?.length !== 1
    ) {
      securityWhileFlag++;
      if (securityWhileFlag > separate.length) {
        console.warn("WARN: WHILE LOOPING EXCEEDED!!!", separate);
        break;
      }

      const allowedOperationsRegex = /[¬∧·∨+⟶⟷⟹⟺⊕]/;
      const primaryOrderOperationsRegex = /[¬∧·∨+⊕]/;

      for (let i = allVariables.length; i < separate.length; i++) {
        const exp = separate[i];
        let evalExp = exp;
        let matchResult;

        while ((matchResult = evalExp.match(allowedOperationsRegex))) {
          let [op] = matchResult;
          const pos = evalExp.indexOf(op);

          let data1 = "";
          let data2 = "";

          const regexSecondary =
            XRE.matchRecursive(evalExp, "\\(", "\\)", "g").filter((match) =>
              XRE.test(match, /⟶/)
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

        result.truthTable[separate[i]] = evalResults;
      }
    }

    return result;
  }

  getPropositionalForm() {
    const result = this.result;
    const expression = this.expression;

    const tableResult = result.truthTable[expression];

    if (tableResult?.includes(1) && !tableResult.includes(0)) {
      return "Tautologia";
    } else if (tableResult?.includes(0) && !tableResult.includes(1)) {
      return "Contradição";
    } else {
      return "Contingência";
    }
  }
}
