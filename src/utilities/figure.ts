function addComma(number: number | undefined) {
  if (!number) return "";

  const numberString = number.toString();

  let figures = numberString.split("");

  for (let i = figures.length - 3; i > 0; i -= 3) {
    figures.splice(i, 0, ", ");
  }

  return figures.join("");
}

export default { addComma };
