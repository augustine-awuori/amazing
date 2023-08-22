import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { ErrorMessage } from "../components/forms";
import { FormControl, FormLabel, Input, Button, Box } from "@chakra-ui/react";
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

  const doSubmit = (loginInfo: FormData) => {
    console.log(loginInfo);
  };

  return (
    <PageContainer>
      <Box my={4} textAlign="left" maxW="500px">
        <form onSubmit={handleSubmit(doSubmit)}>
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
            <Button width="full" mt={4} type="submit">
              Sign In
            </Button>
          </Box>
        </form>
      </Box>
    </PageContainer>
  );
};

export default LoginPage;
