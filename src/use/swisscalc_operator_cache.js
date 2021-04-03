import {
  ARITY_BINARY,
  ARITY_NULLARY,
  ARITY_UNARY,
  ASSOCIATIVITY_LEFT,
  ASSOCIATIVITY_NONE,
  ASSOCIATIVITY_RIGHT,
  degreesToRadians,
  radiansToDegrees,
  useSwissCalcOperator,
} from "./swisscalc_operator";

export function useAdditionOperator() {
  return useSwissCalcOperator(
    ARITY_BINARY,
    ASSOCIATIVITY_LEFT,
    2,
    2,
    false,
    false,
    (sy) => {
      const op1 = sy.popOperand();
      const op2 = sy.popOperand();
      return op1 + op2;
    }
  );
}

export function useSubtractionOperator() {
  return useSwissCalcOperator(
    ARITY_BINARY,
    ASSOCIATIVITY_LEFT,
    2,
    2,
    false,
    false,
    (sy) => {
      const op1 = sy.popOperand();
      const op2 = sy.popOperand();
      return op2 - op1;
    }
  );
}

export function useMultiplicationOperator() {
  return useSwissCalcOperator(
    ARITY_BINARY,
    ASSOCIATIVITY_LEFT,
    3,
    2,
    false,
    false,
    (sy) => {
      const op1 = sy.popOperand();
      const op2 = sy.popOperand();
      return op1 * op2;
    }
  );
}

export function useDivisionOperator() {
  return useSwissCalcOperator(
    ARITY_BINARY,
    ASSOCIATIVITY_LEFT,
    3,
    2,
    false,
    false,
    (sy) => {
      const op1 = sy.popOperand();
      const op2 = sy.popOperand();
      return op2 / op1;
    }
  );
}

export function useModulusOperator() {
  return useSwissCalcOperator(
    ARITY_BINARY,
    ASSOCIATIVITY_LEFT,
    3,
    2,
    false,
    false,
    (sy) => {
      const op1 = sy.popOperand();
      const op2 = sy.popOperand();
      return op2 % op1;
    }
  );
}

export function useExponentialOperator() {
  return useSwissCalcOperator(
    ARITY_BINARY,
    ASSOCIATIVITY_RIGHT,
    4,
    2,
    false,
    false,
    (sy) => {
      const op1 = sy.popOperand();
      const op2 = sy.popOperand();
      return Math.pow(op2, op1);
    }
  );
}

export function useRootOperator() {
  return useSwissCalcOperator(
    ARITY_BINARY,
    ASSOCIATIVITY_RIGHT,
    4,
    2,
    false,
    false,
    (sy) => {
      const op1 = sy.popOperand();
      const op2 = sy.popOperand();
      return Math.pow(op2, 1.0 / op1);
    }
  );
}

export function useEEOperator() {
  return useSwissCalcOperator(
    ARITY_BINARY,
    ASSOCIATIVITY_RIGHT,
    10,
    2,
    false,
    false,
    (sy) => {
      const op1 = sy.popOperand();
      const op2 = sy.popOperand();
      return op2 * Math.pow(10.0, op1);
    }
  );
}

export function usePiOperator() {
  return useSwissCalcOperator(
    ARITY_NULLARY,
    ASSOCIATIVITY_NONE,
    0,
    0,
    false,
    false,
    (sy) => {
      return Math.PI;
    }
  );
}

export function useEOperator() {
  return useSwissCalcOperator(
    ARITY_NULLARY,
    ASSOCIATIVITY_NONE,
    0,
    0,
    false,
    false,
    (sy) => {
      return Math.E;
    }
  );
}

export function useRandomOperator() {
  return useSwissCalcOperator(
    ARITY_NULLARY,
    ASSOCIATIVITY_NONE,
    0,
    0,
    false,
    false,
    (sy) => {
      return Math.random();
    }
  );
}

export function useNegateOperator() {
  return useSwissCalcOperator(
    ARITY_UNARY,
    ASSOCIATIVITY_NONE,
    0,
    1,
    false,
    false,
    (sy) => {
      const op = sy.popOperand();
      return -1.0 * op;
    }
  );
}

export function useInverseOperator() {
  return useSwissCalcOperator(
    ARITY_UNARY,
    ASSOCIATIVITY_NONE,
    0,
    1,
    false,
    false,
    (sy) => {
      const op = sy.popOperand();
      return 1.0 / op;
    }
  );
}

export function useEExponentialOperator() {
  return useSwissCalcOperator(
    ARITY_UNARY,
    ASSOCIATIVITY_NONE,
    0,
    1,
    false,
    false,
    (sy) => {
      const op = sy.popOperand();
      return Math.pow(Math.E, op);
    }
  );
}

export function useTenExponentialOperator() {
  return useSwissCalcOperator(
    ARITY_UNARY,
    ASSOCIATIVITY_NONE,
    0,
    1,
    false,
    false,
    (sy) => {
      const op = sy.popOperand();
      return Math.pow(10.0, op);
    }
  );
}

export function useSquareRootOperator() {
  return useSwissCalcOperator(
    ARITY_UNARY,
    ASSOCIATIVITY_NONE,
    0,
    1,
    false,
    false,
    (sy) => {
      const op = sy.popOperand();
      return Math.sqrt(op);
    }
  );
}

export function useCubeRootOperator() {
  return useSwissCalcOperator(
    ARITY_UNARY,
    ASSOCIATIVITY_NONE,
    0,
    1,
    false,
    false,
    (sy) => {
      const op = sy.popOperand();
      return Math.cbrt(op);
    }
  );
}

export function useXSquaredOperator() {
  return useSwissCalcOperator(
    ARITY_UNARY,
    ASSOCIATIVITY_NONE,
    0,
    1,
    false,
    false,
    (sy) => {
      const op = sy.popOperand();
      return op * op;
    }
  );
}

export function useXCubedOperator() {
  return useSwissCalcOperator(
    ARITY_UNARY,
    ASSOCIATIVITY_NONE,
    0,
    1,
    false,
    false,
    (sy) => {
      const op = sy.popOperand();
      return Math.pow(op, 3);
    }
  );
}

export function usePercentOperator() {
  return useSwissCalcOperator(
    ARITY_UNARY,
    ASSOCIATIVITY_NONE,
    0,
    1,
    false,
    false,
    (sy) => {
      const op = sy.popOperand();
      return op / 100.0;
    }
  );
}

export function useLogBase10Operator() {
  return useSwissCalcOperator(
    ARITY_UNARY,
    ASSOCIATIVITY_NONE,
    0,
    1,
    false,
    false,
    (sy) => {
      const op = sy.popOperand();
      return Math.log(op) / Math.LN10;
    }
  );
}

export function useNaturalLogOperator() {
  return useSwissCalcOperator(
    ARITY_UNARY,
    ASSOCIATIVITY_NONE,
    0,
    1,
    false,
    false,
    (sy) => {
      const op = sy.popOperand();
      return Math.log(op);
    }
  );
}

export function useSineOperator() {
  return useSwissCalcOperator(
    ARITY_UNARY,
    ASSOCIATIVITY_NONE,
    0,
    1,
    false,
    false,
    (sy) => {
      const op = sy.popOperand();
      return Math.sin(op);
    }
  );
}

export function useCosineOperator() {
  return useSwissCalcOperator(
    ARITY_UNARY,
    ASSOCIATIVITY_NONE,
    0,
    1,
    false,
    false,
    (sy) => {
      const op = sy.popOperand();
      return Math.cos(op);
    }
  );
}

export function useTangentOperator() {
  return useSwissCalcOperator(
    ARITY_UNARY,
    ASSOCIATIVITY_NONE,
    0,
    1,
    false,
    false,
    (sy) => {
      const op = sy.popOperand();
      return Math.tan(op);
    }
  );
}

export function useArcSineOperator() {
  return useSwissCalcOperator(
    ARITY_UNARY,
    ASSOCIATIVITY_NONE,
    0,
    1,
    false,
    false,
    (sy) => {
      const op = sy.popOperand();
      return Math.asin(op);
    }
  );
}

export function useArcCosineOperator() {
  return useSwissCalcOperator(
    ARITY_UNARY,
    ASSOCIATIVITY_NONE,
    0,
    1,
    false,
    false,
    (sy) => {
      const op = sy.popOperand();
      return Math.acos(op);
    }
  );
}

export function useArcTangentOperator() {
  return useSwissCalcOperator(
    ARITY_UNARY,
    ASSOCIATIVITY_NONE,
    0,
    1,
    false,
    false,
    (sy) => {
      const op = sy.popOperand();
      return Math.atan(op);
    }
  );
}

export function useSineDegreesOperator() {
  return useSwissCalcOperator(
    ARITY_UNARY,
    ASSOCIATIVITY_NONE,
    0,
    1,
    false,
    false,
    (sy) => {
      const op = sy.popOperand();
      return Math.sin(degreesToRadians(op));
    }
  );
}

export function useCosineDegreesOperator() {
  return useSwissCalcOperator(
    ARITY_UNARY,
    ASSOCIATIVITY_NONE,
    0,
    1,
    false,
    false,
    (sy) => {
      const op = sy.popOperand();
      return Math.cos(degreesToRadians(op));
    }
  );
}

export function useTangentDegreesOperator() {
  return useSwissCalcOperator(
    ARITY_UNARY,
    ASSOCIATIVITY_NONE,
    0,
    1,
    false,
    false,
    (sy) => {
      const op = sy.popOperand();
      return Math.tan(degreesToRadians(op));
    }
  );
}

export function useArcSineDegreesOperator() {
  return useSwissCalcOperator(
    ARITY_UNARY,
    ASSOCIATIVITY_NONE,
    0,
    1,
    false,
    false,
    (sy) => {
      const op = sy.popOperand();
      return radiansToDegrees(Math.asin(op));
    }
  );
}

export function useArcCosineDegreesOperator() {
  return useSwissCalcOperator(
    ARITY_UNARY,
    ASSOCIATIVITY_NONE,
    0,
    1,
    false,
    false,
    (sy) => {
      const op = sy.popOperand();
      return radiansToDegrees(Math.acos(op));
    }
  );
}

export function useArcTangentDegreesOperator() {
  return useSwissCalcOperator(
    ARITY_UNARY,
    ASSOCIATIVITY_NONE,
    0,
    1,
    false,
    false,
    (sy) => {
      const op = sy.popOperand();
      return radiansToDegrees(Math.atan(op));
    }
  );
}

export function useHyperbolicSineOperator() {
  return useSwissCalcOperator(
    ARITY_UNARY,
    ASSOCIATIVITY_NONE,
    0,
    1,
    false,
    false,
    (sy) => {
      const op = sy.popOperand();
      return 0.5 * (Math.pow(Math.E, op) - Math.pow(Math.E, -1.0 * op));
    }
  );
}

export function useHyperbolicCosineOperator() {
  return useSwissCalcOperator(
    ARITY_UNARY,
    ASSOCIATIVITY_NONE,
    0,
    1,
    false,
    false,
    (sy) => {
      const op = sy.popOperand();
      return 0.5 * (Math.pow(Math.E, op) + Math.pow(Math.E, -1.0 * op));
    }
  );
}

export function useHyperbolicTangentOperator() {
  return useSwissCalcOperator(
    ARITY_UNARY,
    ASSOCIATIVITY_NONE,
    0,
    1,
    false,
    false,
    (sy) => {
      const op = sy.popOperand();
      return (
        (1 - Math.pow(Math.E, -2.0 * op)) / (1 + Math.pow(Math.E, -2.0 * op))
      );
    }
  );
}

export function useInverseHyperbolicSineOperator() {
  return useSwissCalcOperator(
    ARITY_UNARY,
    ASSOCIATIVITY_NONE,
    0,
    1,
    false,
    false,
    (sy) => {
      const op = sy.popOperand();
      return Math.log(op + Math.sqrt(op * op + 1));
    }
  );
}

export function useInverseHyperbolicCosineOperator() {
  return useSwissCalcOperator(
    ARITY_UNARY,
    ASSOCIATIVITY_NONE,
    0,
    1,
    false,
    false,
    (sy) => {
      const op = sy.popOperand();
      return Math.log(op + Math.sqrt(op * op - 1));
    }
  );
}

export function useInverseHyperbolicTangentOperator() {
  return useSwissCalcOperator(
    ARITY_UNARY,
    ASSOCIATIVITY_NONE,
    0,
    1,
    false,
    false,
    (sy) => {
      const op = sy.popOperand();
      return 0.5 * Math.log((1 + op) / (1 - op));
    }
  );
}

export function useOpenParenOperator() {
  return useSwissCalcOperator(
    ARITY_NULLARY,
    ASSOCIATIVITY_NONE,
    0,
    0,
    true,
    false,
    (sy) => {
      console.error("Cannot evaluate open parenthesis.");
    }
  );
}

export function useCloseParenOperator() {
  return useSwissCalcOperator(
    ARITY_NULLARY,
    ASSOCIATIVITY_NONE,
    0,
    0,
    false,
    true,
    (sy) => {
      console.error("Cannot evaluate close parenthesis.");
    }
  );
}
