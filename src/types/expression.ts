import { Dispatch, SetStateAction } from "react";

export type PrecedenceOrderType = { [key: string]: RegExp };

export type ResultType = {
  truthTable: { [key: string]: number[] | null };
  propositionalForm: "Tautologia" | "Contradição" | "Contingência";
  logicalImplication: {
    implication: boolean;
    properties: {
      isReflexive: boolean;
      isAntiSymmetric: boolean;
      isTransitive: boolean;
    };
  };
  logicalEquivalence: {
    equivalence: boolean;
    properties: {
      isReflexive: boolean;
      isSymmetric: boolean;
      isTransitive: boolean;
    };
  };
  conditionalPropositions: {
    reciprocal: string[];
    contrary: string[];
    contrapositive: string[];
  };
  normalForm: string | undefined;
};

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
  setResult: Dispatch<SetStateAction<ResultType>>;
  separateExpression: string[];
};
