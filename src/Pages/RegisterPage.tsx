import { useState } from "react";
import { toast } from "react-toastify";
import { z } from "zod";

import { authApi, usersApi } from "../services";
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
    .min(12, "WhatsApp number should either start with +254 or 254")
    .max(13),
  password: z
    .string()
    .min(6, "Password should be between 6 & 100 characters")
    .max(100),
});

type FormData = z.infer<typeof schema>;

const RegisterPage = () => {
  const { errors, handleSubmit, register } = useForm(schema);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  const doSubmit = async (info: FormData) => {
    if (error) setError("");

    setLoading(true);
    const result = await usersApi.register(info);
    setLoading(false);

    if (!result.ok) {
      const responseData = result.data as { error?: string };
      return setError(responseData.error || result.problem);
    }

    toast.success("You're registered successfully!");
    const jwt = result.headers?.["x-auth-token"];
    if (jwt) authApi.loginWithJwt(jwt);
    window.location.href = "/";
  };

  return (
    <Form
      error={error}
      handleSubmit={handleSubmit}
      onSubmit={doSubmit}
      title="Register"
    >
      <FormField error={errors.name} label="Name" register={register} />
      <FormField error={errors.username} label="Username" register={register} />
      <FormField
        error={errors.whatsapp}
        label="WhatsApp Number"
        placeholder="+254 ..."
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
