function checkParenthesesMatching(expression: string) {
  const stack = [];
  for (let char of expression) {
    if (char === "(" || char === "¬(") stack.push("(");
    else if (char === ")") {
      if (stack.length === 0) return false;
      stack.pop();
    }
  }

  return stack.length === 0;
}

function removeExternalParentheses(expression: string) {
  let expressionNoParentheses = expression.replace(/^¬?\(|\)$/g, "");

  const isMatched = checkParenthesesMatching(expressionNoParentheses);
  let wasRemoved = false;

  if (isMatched) {
    expressionNoParentheses = expressionNoParentheses;
    wasRemoved = true;
  } else {
    expressionNoParentheses = expression;
    wasRemoved = false;
  }

  return { expressionNoParentheses, wasRemoved };
}

function isValidExpression(expression: string) {
  const expressionHasParentheses = /[()]/.test(expression);
  const parenthesesNotMatch = !checkParenthesesMatching(expression);

  if (
    (expressionHasParentheses && parenthesesNotMatch) ||
    /[A-Z)]+[¬∧·∨+⟶⟷⟹⟺⊕](?=[^A-Z0-1¬]+|$)|¬[^A-Z0-1¬(]|^¬$|(¬?[A-Z]){2,}|[A-Z]\(|\)[A-Z]/g.test(
      expression
    ) === true
  ) {
    return false;
  }

  return true;
}

export { removeExternalParentheses, isValidExpression };
