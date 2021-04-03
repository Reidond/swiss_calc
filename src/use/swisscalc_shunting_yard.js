import { ref } from "vue";
import { ARITY_BINARY, ARITY_NULLARY, ARITY_UNARY } from "./swisscalc_operator";

export function useSwissCalcShuntingYard(
  numOpenParen = 0,
  operands = [],
  operators = [],
  actionBuffer = []
) {
  const _numOpenParen = ref(numOpenParen);
  const _operands = ref(operands);
  const _operators = ref(operators);
  const _actionBuffer = ref(actionBuffer);

  const peekOperand = () => {
    const len = _operands.value.length;
    return len !== 0 ? _operands.value[len - 1] : 0.0;
  };

  const popOperand = () => {
    const len = _operands.value.length;
    return len !== 0 ? _operands.value.pop() : 0.0;
  };

  const numOperands = () => {
    return _operands.value.length;
  };

  const popOperator = () => {
    return _actionBuffer.value.pop();
  };

  // Returns number of operators.
  const numOperators = () => {
    return _actionBuffer.value.length;
  };

  // Returns true if currently evaluating sub-expression.
  const inSubExpression = () => {
    return _numOpenParen.value > 0;
  };

  // Clears all stacks.
  const clear = () => {
    _operands.value.length = 0;
    _operators.value.length = 0;
    _actionBuffer.value.length = 0;
  };

  // Adds an operand to the stack.
  const addOperand = (operand) => {
    _operands.value.push(operand);
  };

  // Evaluates the given operator and adds result to _operands.
  const applyOperator = (operator) => {
    const val = operator.evaluate(
      useSwissCalcShuntingYard(
        _numOpenParen.value,
        _operands.value,
        _operators.value,
        _actionBuffer.value
      )
    );
    addOperand(val);
  };

  // Empties the stack and returns the final evaluation.
  const evaluate = () => {
    // Push all _actionBuffer to _operators...
    for (let i = 0; i < _actionBuffer.value.length; i++)
      _operators.value.push(_actionBuffer.value[i]);
    _actionBuffer.value.length = 0;

    // Evaluate all _operators...
    while (_operators.value.length > 0) {
      const operator = _operators.value.pop();
      applyOperator(operator);
    }

    // Check for errors and return result...
    if (_operands.value.length != 1)
      console.error("Invalid operand length (" + _operands.value.length + ")");

    return _operands.value.pop();
  };

  // Evaluates the NullaryOperator and pushes result to stack.
  const addNullaryOperator = (operator) => {
    applyOperator(operator);
  };

  // Evaluates the NullaryOperator and pushes result to stack.
  const addUnaryOperator = (operator) => {
    applyOperator(operator);
  };

  // First adds operator to _actionBuffer before committing to anything.
  const addBinaryOperator = (operator) => {
    // If not parenthesis, perform precedence checks as usual...
    while (_actionBuffer.value.length > 0) {
      // If previous is not higher, exit...
      const abLen = _actionBuffer.value.length;
      if (!_actionBuffer.value[abLen - 1].isHigherPrecedence(operator)) break;

      const prevOperator = _actionBuffer.value.pop();
      applyOperator(prevOperator);
    }

    _actionBuffer.value.push(operator);
  };

  // Adds the open parenthesis operator. Just adds to _actionBuffer.
  const addOpenParen = (operator) => {
    _actionBuffer.value.push(operator);
    _numOpenParen.value++;
  };

  // Adds the close parenthesis operator. Pops operators until open is reached.
  const addCloseParen = (operator) => {
    // Ignore if no open parentheses...
    if (_numOpenParen.value === 0) return;

    _numOpenParen.value--;
    while (_actionBuffer.value.length > 0) {
      // If encountered an open paren, return...
      const nextOperator = _actionBuffer.value.pop();
      if (nextOperator.IsOpenParen) return;

      // Evaluate the operator and then push it as an operand...
      applyOperator(nextOperator);
    }
  };

  // Adds the given operator.
  const addOperator = (operator) => {
    if (operator.IsOpenParen) {
      addOpenParen(operator);
    } else if (operator.IsCloseParen) {
      addCloseParen(operator);
    } else if (operator.Arity == ARITY_NULLARY) {
      addNullaryOperator(operator);
    } else if (operator.Arity == ARITY_UNARY) {
      addUnaryOperator(operator);
    } else if (operator.Arity == ARITY_BINARY) {
      addBinaryOperator(operator);
    }
  };

  return {
    peekOperand,
    popOperand,
    numOperands,
    popOperator,
    numOperators,
    inSubExpression,
    clear,
    addOperand,
    applyOperator,
    evaluate,
    addNullaryOperator,
    addUnaryOperator,
    addBinaryOperator,
    addOpenParen,
    addCloseParen,
    addOperator,
  };
}
