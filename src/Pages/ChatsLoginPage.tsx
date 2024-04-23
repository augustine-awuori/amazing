import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import { BiChat } from "react-icons/bi";
import { z } from "zod";

import { Form, FormField, SubmitButton } from "../components/form";
import { PageTitle } from "../components";
import { useChatUser, useForm, useNoGrid } from "../hooks";
import { Navigator, OrSeparator } from "../components/auth";
import auth from "../services/auth";
import chatDb from "../db/chat";
import GoogleButton from "react-google-button";

const schema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(1, "Password is required").max(255),
});

type FormData = z.infer<typeof schema>;

const ChatsLoginPage = () => {
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const { errors, handleSubmit, register } = useForm(schema);
  const navigate = useNavigate();
  const chat = useChatUser();
  useNoGrid();

  const navigateToChats = () => navigate("/chats");

  const doSubmit = async ({ email, password }: FormData) => {
    setLoading(true);
    if (error) setError("");
    const credential = await chatDb.signIn(email, password);
    setLoading(false);

    if (credential) {
      auth.setChatUser(credential.user);
      navigateToChats();
    } else setError("Email and or password is incorrect");
  };

  if (chat.user) return <Navigate to="/chats" />;

  return (
    <Flex
      alignItems="center"
      height="100vh"
      justifyContent="center"
      mt="3rem"
      w="100%"
    >
      <Flex
        align="center"
        alignItems="center"
        borderRadius="lg"
        borderWidth="1px"
        boxShadow="lg"
        direction="column"
        justify="center"
        justifyContent="center"
        maxW="400px"
      >
        <PageTitle Icon={<BiChat />} mt={5} pageTitle="Chats" />
        <Form handleSubmit={handleSubmit} onSubmit={doSubmit} error={error}>
          <FormField
            error={errors.email}
            label="Email address"
            name="email"
            placeholder="kimstacy@gmail.com"
            register={register}
          />
          <FormField
            error={errors.password}
            label="Password"
            type="password"
            placeholder="*******"
            register={register}
          />
          <SubmitButton label="Sign In" isLoading={isLoading} />
          <OrSeparator />
          <GoogleButton
            onClick={async () => await chat.signUpWithGoogleRedirect()}
            label="Sign In with Google"
          />
          <Navigator
            action="Create one"
            onClick={() => navigate("/chats/auth/register")}
            question="Don't have an account?"
          />
        </Form>
      </Flex>
    </Flex>
  );
};

export default ChatsLoginPage;
