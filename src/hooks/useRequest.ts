import { useContext } from "react";
import { z } from "zod";

import { Category } from "./useCategories";
import { User } from "./useUser";
import RequestContext from "../contexts/RequestContext";

export interface RequestInfo {
  authorId: string | undefined;
  categoryId: string;
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

export const schema = z.object({
  category: z.string().min(5),
  description: z.string().min(6).max(100),
  title: z.string().min(4).max(50),
});

export type FormData = z.infer<typeof schema>;

export const populate = (
  info: FormData,
  request: Request | undefined
): RequestInfo => {
  const { category, description, title } = info;

  return {
    authorId: request?.author?._id,
    categoryId: category,
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
