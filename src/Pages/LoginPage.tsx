import { useState } from "react";
import { FormControl, FormLabel, Input, Button, Box } from "@chakra-ui/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

import { ErrorMessage } from "../components/forms";
import authApi from "../services/auth";
import PageContainer from "../components/PageContainer";

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
    const { data, ok } = await authApi.login(loginInfo);
    setLoading(false);
    if (!ok) {
      setError(data.error);
      return setLoginFailed(true);
    }

    toast.success("You're now logged in!");
    window.location = "/";
  };

  return (
    <PageContainer>
      <Box my={4} textAlign="left" maxW="500px">
        <form onSubmit={handleSubmit(doSubmit)}>
          <ErrorMessage error={error} visible={error} />
          <FormControl marginBottom={4}>
            <FormLabel>Username</FormLabel>
            <Input type="text" placeholder="@test" {...register("username")} />
            <ErrorMessage
              error={errors.username?.message}
              visible={errors.username}
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

export default LoginPage;
