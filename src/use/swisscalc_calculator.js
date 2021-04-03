import { ref } from "vue";
import { useSwissCalcMemoryDisplay } from "./swisscalc_memory_display";
import { useSwissCalcNumericDisplay } from "./swisscalc_numeric_display";
import {
  useCloseParenOperator,
  useNegateOperator,
  useOpenParenOperator,
} from "./swisscalc_operator_cache";
import { useSwissCalcShuntingYard } from "./swisscalc_shunting_yard";

// Constants...
export const STATE_AWAITING_OPERAND = 0; // Don't use. Use STATE_AWAITING_OPERATOR instead
export const STATE_AWAITING_OPERATOR = 0;
export const STATE_ENTERING_OPERAND = 1;
export const STATE_ENTERING_OPERATOR = 2;

export function useSwissCalcCalculator() {
  const _state = ref(0); // STATE_AWAITING_OPERATOR
  const _evaluator = useSwissCalcShuntingYard();
  const _mainDisplay = useSwissCalcNumericDisplay();
  const _memoryDisplay = useSwissCalcMemoryDisplay();

  // Sets the current state of the calculator.
  const setState = (state) => {
    _state.value = state;
  };

  // Pushes the value of _mainDisplay onto the operand stack.
  const pushDisplay = () => {
    const val = _mainDisplay.getDisplayValue();
    _evaluator.addOperand(val);
  };

  // Adds the given digit, or starts the display over if applicable.
  // Only send 0...9 or . (decimal). Must be a string. State dependent.
  const addDigit = (digit) => {
    if (_state.value == STATE_AWAITING_OPERATOR) {
      _mainDisplay.clear();
      _mainDisplay.addDigit(digit);
      setState(STATE_ENTERING_OPERAND);
    } else if (_state.value == STATE_ENTERING_OPERAND) {
      _mainDisplay.addDigit(digit);
      setState(STATE_ENTERING_OPERAND);
    } else if (_state.value == STATE_ENTERING_OPERATOR) {
      _mainDisplay.clear();
      _mainDisplay.addDigit(digit);
      setState(STATE_ENTERING_OPERAND);
    }
  };

  // Removes the last character if applicable. State dependent.
  const backspace = () => {
    if (_state.value == STATE_AWAITING_OPERATOR) {
      setState(STATE_AWAITING_OPERATOR);
    } else if (_state.value == STATE_ENTERING_OPERAND) {
      _mainDisplay.backspace();
      setState(STATE_ENTERING_OPERAND);
    } else if (_state.value == STATE_ENTERING_OPERATOR) {
      setState(STATE_ENTERING_OPERATOR);
    }
  };

  // Clears everything and returns to initial state
  const clear = () => {
    _mainDisplay.clear();
    _evaluator.clear();
    setState(STATE_AWAITING_OPERATOR);
  };

  // Clears the display. Does not change state. (Like pressing CE on a calculator)
  const clearEntry = () => {
    _mainDisplay.clear();
  };

  // Pushes display, evaluates, and updates display.
  const equalsPressed = () => {
    pushDisplay();
    const result = _evaluator.evaluate();
    _mainDisplay.setDisplayValue(result);
    setState(STATE_AWAITING_OPERATOR);
  };

  // Adds parenthesis and clears display.
  const openParen = () => {
    _evaluator.addOpenParen(useOpenParenOperator());
    _mainDisplay.clear();
    setState(STATE_AWAITING_OPERATOR);
  };

  // If in a sub-expression, pushes display, applies parenthesis, and updates display.
  const closeParen = () => {
    // Ignore if not in sub-expression...
    if (!_evaluator.inSubExpression()) return;

    pushDisplay();
    _evaluator.addCloseParen(useCloseParenOperator());
    _mainDisplay.setDisplayValue(_evaluator.popOperand());
    setState(STATE_AWAITING_OPERATOR);
  };

  // Just displays the constant on the screen.
  const addNullaryOperator = (nullaryOperator) => {
    const val = nullaryOperator.evaluate();
    _mainDisplay.setDisplayValue(val);
    setState(STATE_AWAITING_OPERATOR);
  };

  // Adds the given unary operator. Do NOT send this function a NegateOperator; use negate() instead.
  const addUnaryOperator = (unaryOperator) => {
    pushDisplay();
    _evaluator.addUnaryOperator(unaryOperator);
    _mainDisplay.setDisplayValue(_evaluator.popOperand());
    setState(STATE_AWAITING_OPERATOR);
  };

  // Negation is a special type of unary operator because the user must be allowed to continue typing the number.
  const negate = () => {
    if (_state.value == STATE_AWAITING_OPERATOR) {
      addUnaryOperator(useNegateOperator());
    } else if (_state.value == STATE_ENTERING_OPERAND) {
      _mainDisplay.negate();
      setState(STATE_ENTERING_OPERAND);
    } else if (_state.value == STATE_ENTERING_OPERATOR) {
      addUnaryOperator(useNegateOperator());
    }
  };

  // Adds the given binary operator.
  const addBinaryOperator = (binaryOperator) => {
    if (_state.value == STATE_AWAITING_OPERATOR) {
      pushDisplay();
      _evaluator.addBinaryOperator(binaryOperator);
      _mainDisplay.setDisplayValue(_evaluator.peekOperand());
      setState(STATE_ENTERING_OPERATOR);
    } else if (_state.value == STATE_ENTERING_OPERAND) {
      pushDisplay();
      _evaluator.addBinaryOperator(binaryOperator);
      _mainDisplay.setDisplayValue(_evaluator.peekOperand());
      setState(STATE_ENTERING_OPERATOR);
    } else if (_state.value == STATE_ENTERING_OPERATOR) {
      // If entering an operator, we must have already had one, so we can pop..
      _evaluator.popOperator();
      _evaluator.addBinaryOperator(binaryOperator);
      _mainDisplay.setDisplayValue(_evaluator.peekOperand());
      setState(STATE_ENTERING_OPERATOR);
    }
  };

  // Returns the current display on the _mainDisplay.
  const getMainDisplay = () => {
    return _mainDisplay.getCurrentDisplay();
  };

  //
  // *** MEMORY FUNCTIONS ***
  //

  // Clears the memory.
  const memoryClear = () => {
    _memoryDisplay.memoryClear();
  };

  // Adds current display to memory.
  const memoryPlus = () => {
    const val = _mainDisplay.getDisplayValue();
    _memoryDisplay.memoryPlus(val);
  };

  // Subtracts current display from memory.
  const memoryMinus = () => {
    const val = _mainDisplay.getDisplayValue();
    _memoryDisplay.memoryMinus(val);
  };

  // Sets memory to the display.
  const memorySet = () => {
    const val = _mainDisplay.getDisplayValue();
    _memoryDisplay.memorySet(val);
  };

  // Displays memory on the display and waits for operator.
  const memoryRecall = () => {
    // Ignore if memory not set...
    if (!_memoryDisplay.hasMemory()) return;

    const val = _memoryDisplay.memoryRecall();
    _mainDisplay.setDisplayValue(val);
    setState(STATE_AWAITING_OPERATOR);
  };

  return {
    setState,
    pushDisplay,
    addDigit,
    backspace,
    clear,
    clearEntry,
    equalsPressed,
    openParen,
    closeParen,
    addNullaryOperator,
    addUnaryOperator,
    negate,
    addBinaryOperator,
    getMainDisplay,
    memoryClear,
    memoryPlus,
    memoryMinus,
    memorySet,
    memoryRecall,
  };
}
