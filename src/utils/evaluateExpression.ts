import { EvaluateExpressionType, VariablesType } from "@@types/expression";

export function evaluateExpression(expression: string): EvaluateExpressionType {
  const separateExpression: Array<string> = [];
  const regex = /¬?\(([^()]+)\)/gm;

  let match;
  let exp = expression;

  while ((match = regex.exec(exp)) !== null) {
    console.log(match);
    const totalExp = match[0];
    const sepExp = match[1];

    if (totalExp[0] == "¬") separateExpression.unshift(totalExp);
    separateExpression.unshift(sepExp);
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
