export const ALLOWED_OPERATIONS_REGEX = /[¬∧·∨+⟶⟷⟹⟺⊕]/;

export const PRIMARY_ORDER_OPERATIONS_REGEX = /[¬∧·∨+⊕]/;

export const IMPLICATIONS_REGEX = /(?<!\([^()⟶]*)[⟶⟹]/g;

export const EQUIVALENCES_REGEX = /(?<!\([^()⟷]*)[⟷⟺]/g;

export const IMPL_EQUIV_REGEX = /(?<!\([^()⟶⟷]*)[⟶⟹⟷⟺]/g;

export const INTERNAL_PARENTHESES_REGEX = /\([^()]*[)][^()]*(?=\))/g;

export const FND_REGEX =
  /^(?:\([^()⟶⟷⟹⟺∨]+(?:∧[^()⟶⟷⟹⟺∨]+)*\))(?:∨(?:\([^()⟶⟷⟹⟺∨]+(?:∧[^()⟶⟷⟹⟺∨]+)*\)))*$/gm;

export const FNC_REGEX =
  /^(?:\([^()⟶⟷⟹⟺∧]+(?:∨[^()⟶⟷⟹⟺∧]+)*\))(?:∧(?:\([^()⟶⟷⟹⟺∧]+(?:∨[^()⟶⟷⟹∧]+)*\)))*$/gm;

// Malformed expression regex parts
export const ONLY_OP = "^[¬∧·∨+⟶⟷⟹⟺⊕]$";
export const RIGHT_INCOMPLETE_OP = "[A-Z)][∧·∨+⟶⟷⟹⟺⊕](?=[^A-Z¬(]+|$)";
export const LEFT_INCOMPLETE_OP = "(?<=[^A-Z)]+|^)[∧·∨+⟶⟷⟹⟺⊕][¬A-Z(]";
export const INCOMPLETE_NOT_OP = "¬([^A-Z¬(]|$)";
export const IMPLICIT_AND = "(¬?[A-Z]){2,}";
export const PARENTHESES_OP = "[A-Z]\\(|\\)¬?[A-Z]|\\(\\)";
