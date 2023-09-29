import { useState } from "react";
import { z } from "zod";
import { toast } from "react-toastify";

import { DataError } from "../services/client";
import { Form, FormField, SubmitButton } from "../components/form";
import authApi from "../services/auth";
import useForm from "../hooks/useForm";

const schema = z.object({
  username: z
    .string()
    .min(4, "Username should be between 4 and 50 characters")
    .max(50),
  password: z
    .string()
    .min(6, "Password should be between 6 and 100 characters")
    .max(100),
});

type FormData = z.infer<typeof schema>;

const LoginPage = () => {
  const [loginFailed, setLoginFailed] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const { errors, handleSubmit, register } = useForm(schema);

  const doSubmit = async (info: FormData) => {
    if (loginFailed) setLoginFailed(false);

    setLoading(true);
    const response = await authApi.login(info);
    setLoading(false);

    const { data, ok } = response;

    if (!ok) {
      const error = (data as DataError)?.error;
      if (error) setError(error);
      return setLoginFailed(true);
    }

    toast.success("You're now logged in!");
    window.location.href = "/";
  };

  return (
    <Form
      handleSubmit={handleSubmit}
      onSubmit={doSubmit}
      title="Login"
      error={error}
    >
      <FormField error={errors.username} label="Username" register={register} />
      <FormField
        error={errors.password}
        label="Password"
        placeholder="******"
        register={register}
        type="password"
      />
      <SubmitButton label="Sign In" isLoading={isLoading} />
    </Form>
  );
};

export default LoginPage;
