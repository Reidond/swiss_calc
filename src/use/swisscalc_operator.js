export const ARITY_NULLARY = 0;
export const ARITY_UNARY = 1;
export const ARITY_BINARY = 2;
export const ASSOCIATIVITY_NONE = 0;
export const ASSOCIATIVITY_RIGHT = 1;
export const ASSOCIATIVITY_LEFT = 2;

export function degreesToRadians(degrees) {
  return degrees * (Math.PI / 180.0);
}

export function radiansToDegrees(radians) {
  return radians * (180.0 / Math.PI);
}

export function useSwissCalcOperator(
  arity,
  associativity,
  precedence,
  numOperands,
  isOpenParen,
  isCloseParen,
  evaluate
) {
  // Returns true if precedence is higher than given operator
  const isHigherPrecedence = (operator) => {
    if (precedence.value == operator.Precedence)
      return associativity.value == ASSOCIATIVITY_LEFT;
    return precedence.value > operator.Precedence;
  };

  return {
    Arity: arity,
    Associativity: associativity,
    Precedence: precedence,
    NumOperands: numOperands,
    IsOpenParen: isOpenParen,
    IsCloseParen: isCloseParen,
    evaluate,
    isHigherPrecedence,
  };
}
