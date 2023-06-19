import { ResultType } from "@@types/expression";

const DEFAULT_RESULT: ResultType = {
  truthTable: {},
  propositionalForm: "Contingência",
  logicalImplication: {
    implication: false,
    properties: {
      isReflexive: false,
      isAntiSymmetric: false,
      isTransitive: false,
    },
  },
  logicalEquivalence: {
    equivalence: false,
    properties: {
      isReflexive: false,
      isSymmetric: false,
      isTransitive: false,
    },
  },
  conditionalPropositions: {
    reciprocal: "",
    contrary: "",
    contrapositive: "",
  },
  normalForm: {
    fnd: {
      isFND: false,
      proposition: "",
    },
    fnc: {
      isFNC: false,
      proposition: "",
    },
  },
};

export { DEFAULT_RESULT };
