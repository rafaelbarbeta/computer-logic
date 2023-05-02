import { EvaluateExpressionType, VariablesType } from "@@types/expression";

export function evaluateExpression(expression: string): EvaluateExpressionType {
  const separateExpression: Array<string> = [];
  const regex = /¬?\((.*)\)/;

  let match;
  let exp = expression;

  while ((match = regex.exec(exp)) !== null) {
    const totalExp = match[0];
    exp = match[1];

    if (totalExp[0] == "¬") separateExpression.unshift(totalExp);
    separateExpression.unshift(exp);
  }

  if (!separateExpression.includes(expression)) {
    separateExpression.push(expression);
  }

  const negatedVariables = [...new Set(expression.match(/¬[A-Z]/g))].sort();
  const variables: VariablesType = Array.from(
    new Set(expression.match(/[A-Z]/g) ?? [])
  )
    .sort()
    .reduce((obj, variable) => ({ ...obj, [variable]: [] }), {});

  separateExpression.unshift(...negatedVariables);
  separateExpression.unshift(...Object.keys(variables));

  return { variables, separateExpression };
}
