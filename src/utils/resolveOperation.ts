import { MatchType, ResultType, VariablesType } from "@@types/expression";

export function resolveOperation(
  result: ResultType,
  separateExpression: string[],
  variables: VariablesType
) {
  function resolveUnaryOperations(info: MatchType) {
    const { data, op, str } = info;

    if (!data) return;

    if (!op) {
      const dataIndex = separateExpression.indexOf(data);
      const variablesCount = Object.keys(variables).length;

      result[data] = variables[data];

      for (let i = variablesCount; i < separateExpression.length; i++) {
        separateExpression[i] = separateExpression[i].replaceAll(
          data,
          `[${dataIndex}]`
        );
      }
    } else {
      const dataLetter = separateExpression[Number(data)];
      result[`${op}${dataLetter}`] = variables[dataLetter].map((variable) =>
        variable === 0 ? 1 : 0
      );

      const strIndex = separateExpression.indexOf(str);

      for (let i = strIndex; i < separateExpression.length; i++) {
        separateExpression[i] = separateExpression[i].replaceAll(
          str,
          i === strIndex ? `${op}${dataLetter}` : `[${strIndex}]`
        );
      }
    }
  }

  function resolveBinaryOperations(info: MatchType) {
    const { op, str } = info;

    const datas = str.split(op!).map((str) => str.replace(/\D/g, ""));
    const dataExps = datas.map((data) => separateExpression[Number(data)]);

    const strFinal = dataExps.join(op);

    const values = result[dataExps[0]]!;

    const res = new Array(values.length).fill(1);

    for (let i = 0; i < values.length; i++) {
      for (let j = 0; j < dataExps.length; j++) {
        const data = dataExps[j];
        const value = result[data]!;

        if (value[i] != undefined) res[i] &= value[i];
      }
    }

    const strIndex = separateExpression.indexOf(str);

    for (let i = strIndex; i < separateExpression.length; i++) {
      separateExpression[i] = separateExpression[i].replace(
        str,
        i === strIndex ? `${strFinal}` : `[${strIndex}]`
      );
    }

    result[strFinal] = res;
  }

  function resolveParenthesisOperations(info: MatchType) {
    const { data, op, str } = info;

    const dataExp = separateExpression[Number(data)];

    let dataIndex = Number(data);

    if (op) {
      result[`${op}(${dataExp})`] = result[dataExp]!.map((variable) =>
        variable === 0 ? 1 : 0
      );

      dataIndex = separateExpression.indexOf(str);
    }

    for (let i = dataIndex; i < separateExpression.length; i++) {
      const isFirstOccurrence = i === dataIndex && op === "¬";
      const changeValue = isFirstOccurrence
        ? `${op}(${dataExp})`
        : `[${dataIndex}]`;

      separateExpression[i] = separateExpression[i].replaceAll(
        str,
        changeValue
      );
    }
  }

  function resolveUniqueIndexOperations(info: MatchType) {
    const { data } = info;

    const dataExp = separateExpression[Number(data)];

    separateExpression[Number(data) + 1] = `(${dataExp})`;
    result[`(${dataExp})`] = result[dataExp];
  }

  return {
    unaryOp: resolveUnaryOperations,
    binaryOp: resolveBinaryOperations,
    parenthesisOp: resolveParenthesisOperations,
    uniqueOp: resolveUniqueIndexOperations,
  };
}
