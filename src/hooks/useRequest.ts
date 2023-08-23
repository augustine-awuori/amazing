import { useContext } from "react";

import { Category } from "./useCategories";
import { User } from "./useUser";
import RequestContext from "../context/RequestContext";

export interface RequestInfo {
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

const useRequest = () => {
  const context = useContext(RequestContext);

  const request: Request = context?.request;
  const setRequest = context?.setRequest;

  return { request, setRequest };
};

export default useRequest;
