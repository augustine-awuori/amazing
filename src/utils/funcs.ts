const addMessageToUrl = (url: string, text = "") =>
  text ? `${url} . ${text}` : url;

const navTo = (url: string, message?: string) =>
  window.open(addMessageToUrl(url, message), "_blank", "noopener,noreferrer");

function isOdd(number: number): boolean {
  return number % 2 !== 0;
}

export default { navTo, isOdd };
