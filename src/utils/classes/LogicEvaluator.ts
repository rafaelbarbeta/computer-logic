import {
  EvaluateExpressionType,
  ResultType,
  VariablesType,
} from "@@types/expression";
import {
  ALLOWED_OPERATIONS_REGEX,
  EQUIVALENCES_REGEX,
  FNC_REGEX,
  FND_REGEX,
  IMPLICATIONS_REGEX,
  INTERNAL_PARENTHESES_REGEX,
  PRIMARY_ORDER_OPERATIONS_REGEX,
} from "@constants/regex";
import { removeExternalParentheses } from "@functions/manipulateExpression";
import { getDataExpression, logicEvalMap } from "@functions/resolveOperation";
import XRE from "xregexp";

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

      let auxExpression = [...separate];

      for (let i = allVariables.length; i < separate.length; i++) {
        const exp = auxExpression[i];
        let evalExp = exp;
        let matchResult;

        while ((matchResult = evalExp.match(ALLOWED_OPERATIONS_REGEX))) {
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
          } else if (PRIMARY_ORDER_OPERATIONS_REGEX.test(op)) {
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

        for (let i = 0; i < auxExpression.length; i++) {
          auxExpression[i] = auxExpression[i].replaceAll(exp, evalExp);
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

  propositionalForm() {
    const result = this.result;
    const expression = this.expression;

    const tableResult = result.truthTable[expression];

    if (tableResult?.includes(1) && !tableResult.includes(0))
      result.propositionalForm = "Tautologia";
    if (tableResult?.includes(0) && !tableResult.includes(1))
      result.propositionalForm = "Contradição";
    if (tableResult?.includes(1) && tableResult.includes(0))
      result.propositionalForm = "Contingência";
  }

  implications(): string[] {
    const result = this.result;
    const expression = this.expression;

    let delimitedExpression: string;

    result.logicalImplication.implication =
      (expression.includes("⟶") || expression.includes("⟹")) &&
      result.propositionalForm === "Tautologia";

    const { expressionNoParentheses } = removeExternalParentheses(expression);

    delimitedExpression = expressionNoParentheses.replaceAll(
      IMPLICATIONS_REGEX,
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

    return implicationsExp;
  }

  equivalences(): string[] {
    const result = this.result;
    const expression = this.expression;

    let delimitedExpression: string;

    result.logicalEquivalence.equivalence =
      (expression.includes("⟷") || expression.includes("⟺")) &&
      result.propositionalForm === "Tautologia";

    const { expressionNoParentheses } = removeExternalParentheses(expression);

    delimitedExpression = expressionNoParentheses.replaceAll(
      EQUIVALENCES_REGEX,
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

    return equivalencesExp;
  }

  conditionalPropositions(implications: string[]) {
    const result = this.result;

    if (implications.length === 2) {
      let { expressionNoParentheses: A, wasRemoved: wasRemovedA } =
        removeExternalParentheses(implications[0]);
      let { expressionNoParentheses: B, wasRemoved: wasRemovedB } =
        removeExternalParentheses(implications[1]);

      if (wasRemovedA && implications[0][0] === "¬") A = implications[0];
      if (wasRemovedB && implications[1][0] === "¬") B = implications[1];

      result.conditionalPropositions.reciprocal = `${implications[1]}⟶${implications[0]}`;
      result.conditionalPropositions.contrary = `¬(${A})⟶¬(${B})`;
      result.conditionalPropositions.contrapositive = `¬(${B})⟶¬(${A})`;
    }
  }

  normalForm(form: "FND" | "FNC") {
    let expressionFlat = this.expression;
    const result = this.result;
    const variables = this.variables;

    while (expressionFlat.match(INTERNAL_PARENTHESES_REGEX)) {
      expressionFlat = expressionFlat.replace(
        INTERNAL_PARENTHESES_REGEX,
        (match) => match.slice(1, -1)
      );
    }

    //? Is FND/FNC
    form === "FND"
      ? (result.normalForm.fnd.isFND = FND_REGEX.test(expressionFlat))
      : (result.normalForm.fnc.isFNC = FNC_REGEX.test(expressionFlat));

    //? Transforming in FND/FNC
    let trueValues: Array<number[]> = [];
    const varValues = Object.values(variables);

    varValues.forEach(() => trueValues.push([]));

    result.truthTable[this.expression]?.forEach((value, i) => {
      if ((form === "FND" && value === 1) || (form === "FNC" && value === 0)) {
        varValues.forEach((variable, x) => trueValues[x].push(variable[i]));
      }
    });

    const formVars = trueValues[0].map((_, colIndex) =>
      trueValues.map((row, i) => {
        const variable = Object.keys(variables)[i];
        const trulyValue = form === "FND" ? row[colIndex] : !row[colIndex];
        return trulyValue ? variable : `¬${variable}`;
      })
    );

    const joinChr = form === "FND" ? ["∧", "∨"] : ["∨", "∧"];
    const formExp = formVars
      .map((values) => `(${values.join(joinChr[0])})`)
      .join(joinChr[1]);

    form === "FND"
      ? (result.normalForm.fnd.proposition = formExp)
      : (result.normalForm.fnc.proposition = formExp);
  }
}
