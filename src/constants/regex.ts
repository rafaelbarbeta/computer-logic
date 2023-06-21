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
