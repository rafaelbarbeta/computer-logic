import {
  IMPLICIT_AND,
  INCOMPLETE_NOT_OP,
  LEFT_INCOMPLETE_OP,
  ONLY_OP,
  PARENTHESES_OP,
  RIGHT_INCOMPLETE_OP,
} from "@constants/regex";

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

  const MALFORMED_EXPRESSION_REGEX = new RegExp(
    `${ONLY_OP}|${RIGHT_INCOMPLETE_OP}|${LEFT_INCOMPLETE_OP}|${INCOMPLETE_NOT_OP}|${IMPLICIT_AND}|${PARENTHESES_OP}`,
    "g"
  );

  if (
    (expressionHasParentheses && parenthesesNotMatch) ||
    MALFORMED_EXPRESSION_REGEX.test(expression)
  ) {
    return false;
  }

  return true;
}

export { removeExternalParentheses, isValidExpression };
