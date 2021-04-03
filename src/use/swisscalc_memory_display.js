import { ref } from "vue";

export function useSwissCalcMemoryDisplay() {
  const _display = ref("");
  const _memValue = ref(0);
  const _hasMemory = ref(false);

  // Returns true if memory is set.
  const hasMemory = () => {
    return _hasMemory.value;
  };

  // Returns current display
  const getCurrentDisplay = () => {
    return _display.value;
  };

  // Returns memory value.
  const memoryRecall = () => {
    return _memValue.value;
  };

  // Sets the memory to the given value.
  const memorySet = (val) => {
    _hasMemory.value = true;
    _memValue.value = val;
    _display.value = "M";
  };

  // Adds given number to the memory.
  const memoryPlus = (val) => {
    _hasMemory.value = true;
    _memValue.value += val;
    _display.value = "M";
  };

  // Subtracts the given value from memory.
  const memoryMinus = (val) => {
    _hasMemory.value = true;
    _memValue.value -= val;
    _display.value = "M";
  };

  // Clears the memory.
  const memoryClear = () => {
    _hasMemory.value = false;
    _memValue.value = 0;
    _display.value = "";
  };

  return {
    hasMemory,
    getCurrentDisplay,
    memoryRecall,
    memorySet,
    memoryPlus,
    memoryMinus,
    memoryClear,
  };
}
