import { useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";

import { authApi, usersApi } from "../services";
import { authTokenKey, DataError, Headers } from "../services/client";
import { Form, FormField, SubmitButton } from "../components/form";
import useForm from "../hooks/useForm";

const schema = z.object({
  name: z.string().min(3, "Name should be between 3 & 100 characters").max(100),
  username: z
    .string()
    .min(3, "Name should be between 3 & 50 characters")
    .max(50),
  whatsapp: z
    .string()
    .includes("254")
    .min(12, "WhatsApp number doesn't include 254 or is less")
    .max(13),
  password: z
    .string()
    .min(6, "Password should be between 6 & 100 characters")
    .max(100),
});

type FormData = z.infer<typeof schema>;

const RegisterPage = () => {
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const { errors, handleSubmit, register } = useForm(schema);

  const registerUser = async (info: FormData) => {
    if (error) setError("");

    setLoading(true);
    const response = await usersApi.register(info);
    setLoading(false);

    return response;
  };

  const loginWithJwt = (headers: Headers | undefined) => {
    const jwt = headers?.[authTokenKey];

    if (jwt) authApi.loginWithJwt(jwt);
  };

  const doSubmit = async (info: FormData) => {
    const { data, headers, ok, problem } = await registerUser(info);

    if (!ok) return setError((data as DataError)?.error || problem);

    toast("You're now a member!");
    loginWithJwt(headers);
    window.location.href = "/";
  };

  if (authApi.getCurrentUser()) return <Navigate to="/" />;

  return (
    <Form
      error={error}
      handleSubmit={handleSubmit}
      onSubmit={doSubmit}
      title="Register"
    >
      <FormField
        error={errors.name}
        label="Individual Name"
        name="name"
        register={register}
      />
      <FormField
        error={errors.username}
        label="Username (for signing in)"
        name="username"
        register={register}
      />
      <FormField
        error={errors.whatsapp}
        label="WhatsApp Number"
        placeholder="254"
        register={register}
        name="whatsapp"
        type="number"
      />
      <FormField
        error={errors.password}
        label="Password"
        placeholder="******"
        register={register}
        type="password"
      />
      <SubmitButton label="Sign Up" isLoading={isLoading} />
    </Form>
  );
};

export default RegisterPage;
