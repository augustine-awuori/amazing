import logger from "./logger";

const prefix = "cache";
const viewsKey = "views";

interface Views {
  [shopId: string]: string;
}

const get = (key: string) => {
  try {
    const value = localStorage.getItem(prefix + key);

    return value ? JSON.parse(value) : null;
  } catch (error) {
    logger.log(error);
  }
};

const store = (key: string, value: unknown) => {
  try {
    localStorage.setItem(prefix + key, JSON.stringify(value));
  } catch (error) {
    logger.log(error);
  }
};

const storeViews = (views: Views) => {
  try {
    localStorage.setItem(viewsKey, JSON.stringify(views));
  } catch (error) {
    logger.log(error);
  }
};

const getViewsValue = () => {
  try {
    return localStorage.getItem(viewsKey);
  } catch (error) {
    logger.log(error);
  }
};

const getViews = (): Views => {
  const value = getViewsValue();

  return value ? JSON.parse(value) : {};
};

const hasBeenViewed = (shop: unknown) => typeof shop !== "undefined";

const hasViewedShop = (shopId: string): boolean => {
  const views = getViews();
  if (hasBeenViewed(views[shopId])) return true;

  storeViews({ ...views, [shopId]: shopId });
  return false;
};

const removeViewFor = (shopId: string) => {
  const views = getViews();
  if (!hasBeenViewed(views[shopId])) return;

  delete views[shopId];
  storeViews(views);
};

export default { hasViewedShop, get, removeViewFor, store };
