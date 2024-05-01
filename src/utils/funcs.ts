import { NewShopTypes } from "../hooks/useShop";
import { ShopTypes } from "../components/shops/TypesSelector";

const addMessageToUrl = (url: string, text = "") =>
  text ? `${url} . ${text}` : url;

const navTo = (url: string, message?: string) =>
  window.open(addMessageToUrl(url, message), "_blank", "noopener,noreferrer");

function isOdd(number: number): boolean {
  return number % 2 !== 0;
}

function removeLastChar(plural: string): string {
  let result = "";

  for (let i = 0; i < plural.length - 1; i++) result += plural.charAt(i);

  return result;
}

function getBoolean(value: unknown): boolean {
  return value ? true : false;
}

export const prepShopTypes = (
  selectedShopTypes: ShopTypes | NewShopTypes
): NewShopTypes => {
  const result: NewShopTypes = {};

  Object.keys(selectedShopTypes).forEach((id) => {
    result[id] = id;
  });

  return result;
};

function insertAtIndex<T>(array: T[], index: number, element: T): T[] {
  if (index < 0 || index > array.length) return array;

  return [...array.slice(0, index), element, ...array.slice(index)];
}

export default {
  insertAtIndex,
  navTo,
  prepShopTypes,
  isOdd,
  getBoolean,
  removeLastChar,
};
