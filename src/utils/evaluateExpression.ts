import { EvaluateExpressionType, VariablesType } from "@@types/expression";

export function evaluateExpression(expression: string): EvaluateExpressionType {
  const separateExpression: Array<string> = [];
  const regex = /¬?\(([^()]*)\)/;

  let exp = expression;

  while (regex.test(exp)) {
    exp = exp.replace(regex, (totalExp: string, innerExp: string) => {
      const mapping = { "[": "(", "]": ")", "(": "[", ")": "]" } as {
        [key: string]: string;
      };

      totalExp = totalExp.replace(/\[|\]/g, (match) => mapping[match]);
      innerExp = innerExp.replace(/\[|\]/g, (match) => mapping[match]);

      separateExpression.push(innerExp);
      if (totalExp[0] == "¬") separateExpression.push(totalExp);

      totalExp = totalExp.replace(/\(|\)/g, (match) => mapping[match]);

      return totalExp;
    });
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

  separateExpression.filter(
    (value, index) => separateExpression.indexOf(value) === index
  );

  // Removendo elementos repetidos do array
  for (let i = separateExpression.length - 1; i >= 0; i--) {
    if (separateExpression.indexOf(separateExpression[i]) < i) {
      separateExpression.splice(i, 1);
    }
  }

  return { variables, separateExpression };
}
