import { MatchType, ResultType, VariablesType } from "@@types/expression";

export function resolveOperation(
  result: ResultType,
  auxExpressions: string[],
  variables: VariablesType
) {
  function resolveUnaryOperations(info: MatchType) {
    const { data, op, str } = info;

    if (!data) return;

    if (!op) {
      const dataIndex = auxExpressions.indexOf(data);
      const variablesCount = Object.keys(variables).length;

      result[data] = variables[data];

      for (let i = variablesCount; i < auxExpressions.length; i++) {
        auxExpressions[i] = auxExpressions[i].replaceAll(
          data,
          `[${dataIndex}]`
        );
      }
    } else {
      const dataLetter = auxExpressions[Number(data)];
      result[`${op}${dataLetter}`] = variables[dataLetter].map((variable) =>
        variable === 0 ? 1 : 0
      );

      const strIndex = auxExpressions.indexOf(str);

      for (let i = strIndex; i < auxExpressions.length; i++) {
        auxExpressions[i] = auxExpressions[i].replaceAll(
          str,
          i === strIndex ? `${op}${dataLetter}` : `[${strIndex}]`
        );
      }
    }
  }

  function resolveBinaryOperations(info: MatchType) {
    const { op, str } = info;

    const datas = str.split(op!).map((str) => str.replace(/\D/g, ""));
    const dataExps = datas.map((data) => auxExpressions[Number(data)]);

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

    const strIndex = auxExpressions.indexOf(str);

    for (let i = strIndex; i < auxExpressions.length; i++) {
      auxExpressions[i] = auxExpressions[i].replace(
        str,
        i === strIndex ? `${strFinal}` : `[${strIndex}]`
      );
    }

    result[strFinal] = res;
  }

  function resolveParenthesisOperations(info: MatchType) {
    const { data, op, str } = info;

    const dataExp = auxExpressions[Number(data)];

    let dataIndex = Number(data);

    if (op) {
      result[`${op}(${dataExp})`] = result[dataExp]!.map((variable) =>
        variable === 0 ? 1 : 0
      );

      dataIndex = auxExpressions.indexOf(str);
    }

    for (let i = dataIndex; i < auxExpressions.length; i++) {
      const isFirstOccurrence = i === dataIndex && op === "¬";
      const changeValue = isFirstOccurrence
        ? `${op}(${dataExp})`
        : `[${dataIndex}]`;

      auxExpressions[i] = auxExpressions[i].replaceAll(str, changeValue);
    }
  }

  function resolveUniqueIndexOperations(info: MatchType) {
    const { data } = info;

    const dataExp = auxExpressions[Number(data)];

    auxExpressions[Number(data) + 1] = `(${dataExp})`;
    result[`(${dataExp})`] = result[dataExp];
  }

  return {
    unaryOp: resolveUnaryOperations,
    binaryOp: resolveBinaryOperations,
    parenthesisOp: resolveParenthesisOperations,
    uniqueOp: resolveUniqueIndexOperations,
  };
}
