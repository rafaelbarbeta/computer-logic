export type PrecedenceOrderType = { [key: string]: RegExp };

export type ResultType = { [key: string]: number[] | null };

export type VariablesType = Record<string, number[]>;

export type MatchType = {
  data?: string;
  op?: string;
  str: string;
};

export type EvaluateExpressionType = {
  variables: VariablesType;
  separateExpression: string[];
};

export type ExpressionContextType = {
  resolveExpression: (expression: string) => Promise<void>;
  result: ResultType;
};
