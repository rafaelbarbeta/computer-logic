function logicEvalMap(A: string, B: string, op: string): string {
  switch (op) {
    case "¬":
      return `!${B}`;
    case "∧":
    case "·":
      return `${A}&&${B}`;
    case "∨":
    case "+":
      return `${A}|${B}`;
    case "⟶":
    case "⟹":
      return `!(${A})|(${B})`;
    case "⟷":
    case "⟺":
      return `( ${A} ) == ( ${B} )`;
    case "⊕":
      return `( ${A} ) ^ ( ${B} )`;
    default:
      return "Erro, não foi possível converter a expressão lógica";
  }
}

function getDataExpression(
  expression: string,
  firstParenthesisPos: number,
  direction: "forward" | "backward" = "forward"
) {
  let parenthesisCount = direction === "forward" ? 0 : 1;
  let internalExpression = "";
  let i = firstParenthesisPos;

  const condition = direction === "forward" ? i < expression.length : i >= 0;

  for (
    i;
    parenthesisCount >= 0 && condition;
    direction === "forward" ? i++ : i--
  ) {
    const chr = expression[i];

    if (chr === undefined) break;
    if (chr === "(") parenthesisCount++;
    if (chr === ")") parenthesisCount--;
    internalExpression += chr;
    if (
      (direction === "forward" && parenthesisCount === 0 && chr !== "¬") ||
      (direction === "backward" && parenthesisCount === 1 && chr !== "¬")
    )
      break;
  }

  if (direction === "backward")
    internalExpression = internalExpression.split("").reverse().join("");

  return internalExpression;
}

export { logicEvalMap, getDataExpression };
