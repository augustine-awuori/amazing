import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

import { Form, FormField, SubmitButton } from "../components/forms";
import authApi from "../services/auth";

const schema = z.object({
  username: z.string().min(4).max(50),
  password: z.string().min(6).max(100),
});

type FormData = z.infer<typeof schema>;

const LoginPage = () => {
  const [loginFailed, setLoginFailed] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const doSubmit = async (loginInfo: FormData) => {
    if (loginFailed) setLoginFailed(false);

    setLoading(true);
    const response = await authApi.login(loginInfo);
    setLoading(false);

    const { data, ok } = response;

    if (!ok) {
      const error = (data as any)?.error;
      setError(error);
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
