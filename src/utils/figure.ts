function addComma(number: number | undefined) {
  if (!number) return "";

  const numberString = number.toString();

  const figures = numberString.split("");

  for (let i = figures.length - 3; i > 0; i -= 3) {
    figures.splice(i, 0, ", ");
  }

  return figures.join("");
}

function roundToTwoDecimalPlaces(num: number): number {
  return parseFloat(num.toFixed(2));
}

export default { addComma, roundToTwoDecimalPlaces };
