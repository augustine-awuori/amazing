import { useContext } from "react";

import { Category } from "./useCategories";
import { RequestFormData } from "../data/schemas";
import { User } from "./useUser";
import RequestContext from "../contexts/RequestContext";

export interface RequestInfo {
  author: string | undefined;
  category: string;
  title: string;
  description: string;
}

export interface Request {
  _id: string;
  author: User;
  category: Category;
  description: string;
  title: string;
  timestamp: number;
}

export const populate = (
  info: RequestFormData,
  request: Request | undefined
): RequestInfo => {
  const { category, description, title } = info;

  return {
    author: request?.author?._id,
    category,
    description,
    title,
  };
};

const useRequest = () => {
  const context = useContext(RequestContext);

  const request = context?.request;
  const setRequest = context?.setRequest;

  return { request, setRequest };
};

export default useRequest;
