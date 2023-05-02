import { MatchType, PrecedenceOrderType, ResultType } from "@@types/expression";
import { evaluateExpression } from "./evaluateExpression";
import { resolveOperation } from "./resolveOperation";

type useExpressionProps = {
  expression: string;
};

export function resolveExpression({ expression }: useExpressionProps) {
  const precedenceOrder = {
    "[A-Z]": /^(?<data>[A-Z])$/,
    "¬x": /^(?<op>¬)\[?(?<data>[\w])\]?$/,
    "x.x": /([\w]+[\w])/g, //! TODO: Tratar erro de exceções como ¬xx ou ¬x¬x, dizendo para não omitir AND
    "∧": /(?<=\(|^)(?:¬?\[?\w+\]?\]?)(?:(?<op>[∧·])¬?\[?\w+\]?\]?)+(?=\)|$)/g,
    "∨": /∨/g,
    "+": /\+/g,
    "⊕": /⊕/g,
    "→": /→/g,
    "⇒": /⇒/g,
    "⟷": /⟷/g,
    "⇔": /⇔/g,
    "¬(x)|(x)": /(?<op>¬)?\((?:\[?(?<data>[^()\[\]]*)\]?)\)/g,
    "[0-9]": /^\[?(?<data>[\d])\]?$/g,
  } as PrecedenceOrderType;

  const { variables, separateExpression } = evaluateExpression(expression);
  const result: ResultType = {};

  let valueMaxDec = 2 ** Object.keys(variables).length - 1;
  let binaryValues = [];

  const { unaryOp, binaryOp, parenthesisOp, uniqueOp } = resolveOperation(
    result,
    separateExpression,
    variables
  );

  for (let i = 0; i <= valueMaxDec; i++) {
    binaryValues.push(
      (i >>> 0).toString(2).padStart(Object.keys(variables).length, "0")
    );
  }

  binaryValues.reverse();

  for (const [variable, values] of Object.entries(variables)) {
    const i = Object.keys(variables).indexOf(variable);
    values.push(...binaryValues.map((binaryValue) => parseInt(binaryValue[i])));
  }

  let securityWhileFlag = 0;
  while (Object.keys(result).length < separateExpression.length) {
    securityWhileFlag++;
    if (securityWhileFlag > separateExpression.length) {
      console.warn("WARN: WHILE LOOPING EXCEEDED!!!", separateExpression);
      break;
    }

    for (const [operation, regex] of Object.entries(precedenceOrder)) {
      separateExpression.forEach((exp, i) => {
        const matches = regex.exec(exp);

        if (matches) {
          const match = { ...matches.groups, str: matches[0] } as MatchType;

          if (!result[match.str]) {
            switch (operation) {
              case "[A-Z]":
              case "¬x":
                unaryOp(match);
                break;
              case "∧":
                binaryOp(match);
                break;
              case "¬(x)|(x)":
                parenthesisOp(match);
                break;
              case "[0-9]":
                uniqueOp(match);
                break;
            }
          }
        }
      });
    }
  }

  return { result };
}
