import { ref } from "vue";
import { groupDigits } from "./swisscalc_format";

export function useSwissCalcNumericDisplay(groupDigitsL, maxLength) {
  const _display = ref("0");
  const _groupDigits =
    typeof groupDigitsL === "undefined" ? true : groupDigitsL;
  const _maxLength = typeof maxLength === "undefined" ? 20 : maxLength;

  // Returns current display
  const getCurrentDisplay = () => {
    return _groupDigits ? groupDigits(_display.value) : _display.value;
  };

  // Adds the given character to the display, if appropriate.
  // The only valid digits are: 0...9, . (decimal). Must be a string.
  const addDigit = (digit) => {
    // Don't go past maximum length...
    if (_display.value.length >= _maxLength) return;

    // Don't add multiple decimals...
    if (digit == "." && _display.value.indexOf(".") >= 0) return;

    // If not a decimal and display is empty, remove 0...
    if (digit != "." && _display.value == "0") _display.value = "";

    // Add the digit to the end (note: '.' will result in '0.')...
    _display.value += digit;
  };

  // Adds or removes the negative sign
  const negate = () => {
    const fChar = _display.value.charAt(0);
    _display.value =
      fChar == "-" ? _display.value.substring(1) : "-" + _display.value;
  };

  // Removes the last character if possible
  const backspace = () => {
    const len = _display.value.length;
    if (len == 1) _display.value = "0";
    else if (len == 2 && _display.value.charAt(0) == "-") _display.value = "0";
    else _display.value = _display.value.substring(0, len - 1);
  };

  // Clears the display
  const clear = () => {
    _display.value = "0";
  };

  // Returns _display as a numeric value
  const getDisplayValue = () => {
    return parseFloat(_display.value);
  };

  // Formats the value and sets the display. "val" should be a number.
  const setDisplayValue = (val) => {
    // TODO: May need to do some formatting/rounding...
    _display.value = val.toString();
  };

  return {
    getCurrentDisplay,
    addDigit,
    negate,
    backspace,
    clear,
    getDisplayValue,
    setDisplayValue,
  };
}
