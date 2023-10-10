import logger from "./logger";

const prefix = "cache";

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

export default { get, store };
