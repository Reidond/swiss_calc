export function groupDigits(number) {
  // http://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript/2901298#2901298
  const parts = number.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

export function asUSCurrency(number) {
  let s = number.toFixed(2);
  s = groupDigits(s);
  return s.charAt(0) == "-" ? "-$" + s.substring(1) : "$" + s;
}
