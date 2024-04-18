import { useState } from "react";
import { Navigate } from "react-router-dom";
import { z } from "zod";
import { toast } from "react-toastify";

import { DataError } from "../services/client";
import { Container, Form, FormField, SubmitButton } from "../components/form";
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
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);
  const { errors, handleSubmit, register } = useForm(schema);

  const login = async (info: FormData) => {
    if (loginFailed) setLoginFailed(false);

    setLoading(true);
    const response = await authApi.login(info);
    setLoading(false);

    return response;
  };

  const doSubmit = async (info: FormData) => {
    const { data, ok, problem } = await login(info);

    if (ok) {
      toast.success("You're now logged in!");
      return (window.location.href = "/"); //TODO: Check where user came from for redirect
    }

    const error = (data as DataError)?.error || problem;
    if (error) setError(error);
    setLoginFailed(true);
  };

  if (authApi.getCurrentUser()) return <Navigate to="/" />;

  return (
    <Container title="Sign In">
      <Form handleSubmit={handleSubmit} onSubmit={doSubmit} error={error}>
        <FormField
          error={errors.username}
          label="Username"
          register={register}
          placeholder="stacykim"
        />
        <FormField
          error={errors.password}
          label="Password"
          placeholder="******"
          register={register}
          type="password"
        />
        <SubmitButton label="Sign In" isLoading={isLoading} />
      </Form>
    </Container>
  );
};

export default LoginPage;
