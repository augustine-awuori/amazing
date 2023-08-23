import { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { authApi, usersApi } from "../services";
import { ErrorMessage } from "../components/forms";
import PageContainer from "../components/PageContainer";

const schema = z.object({
  name: z.string().min(3),
  username: z.string().min(3),
  whatsapp: z.string().includes("254").min(12).max(13),
  password: z.string().min(6).max(100),
});

type FormData = z.infer<typeof schema>;

const RegisterPage = () => {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  const doSubmit = async (info: FormData) => {
    if (error) setError("");

    setLoading(true);
    const result = await usersApi.register(info);
    setLoading(false);
    if (!result.ok) return setError(result.data?.error || result.problem);

    toast.success("You're registered successfully!");
    authApi.loginWithJwt(result.headers?.["x-auth-token"]);
    window.location = "/";
  };

  return (
    <PageContainer>
      <Box my={4} textAlign="left" maxW="500px">
        <form onSubmit={handleSubmit(doSubmit)}>
          <ErrorMessage error={error} visible={error} />
          <FormControl marginBottom={4}>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              placeholder="test@test.com"
              {...register("name")}
            />
            <ErrorMessage error={errors.name?.message} visible={errors.name} />
          </FormControl>
          <FormControl marginBottom={4}>
            <FormLabel>Username</FormLabel>
            <Input type="text" placeholder="@test" {...register("username")} />
            <ErrorMessage
              error={errors.username?.message}
              visible={errors.username}
            />
          </FormControl>
          <FormControl marginBottom={4}>
            <FormLabel>WhatsApp Number</FormLabel>
            <Input
              type="text"
              placeholder="+254 ..."
              {...register("whatsapp")}
            />
            <ErrorMessage
              error={errors.whatsapp?.message}
              visible={errors.whatsapp}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="********"
              {...register("password")}
            />
            <ErrorMessage
              error={errors.password?.message}
              visible={errors.password}
            />
          </FormControl>
          <Box marginTop={5}>
            <Button width="full" mt={4} type="submit" isLoading={isLoading}>
              Sign In
            </Button>
          </Box>
        </form>
      </Box>
    </PageContainer>
  );
};

export default RegisterPage;
