import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default (schema: any) => {
  type FormData = z.infer<typeof schema>;

  const form = useForm<FormData>({ resolver: zodResolver(schema) });
  const {
    formState: { errors },
  } = form;

  return { errors, ...form };
};
