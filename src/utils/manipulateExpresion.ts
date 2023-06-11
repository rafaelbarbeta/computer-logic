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

export { checkParenthesesMatching };
