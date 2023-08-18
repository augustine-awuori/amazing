import { useContext } from "react";

import { User } from "./useUser";
import RequestContext from "../context/RequestContext";
import { Category } from "./useCategories";

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

  const request = context?.request;
  const setRequest = context?.setRequest;

  return { request, setRequest };
};

export default useRequest;
