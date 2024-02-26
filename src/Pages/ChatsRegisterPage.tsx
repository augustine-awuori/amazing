import { useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { Navigate, useNavigate } from "react-router-dom";
import { BiChat } from "react-icons/bi";
import { z } from "zod";

import {
  ErrorMessage,
  Form,
  FormField,
  SubmitButton,
} from "../components/form";
import { ImageInputList } from "../components/common";
import { PageTitle, Text } from "../components";
import { useAppColorMode, useChat, useForm, useImages } from "../hooks";
import { OrSeparator } from "../components/auth";
import auth from "../services/auth";
import chatDb from "../db/chat";
import storage from "../db/image";
import GoogleButton from "react-google-button";

const IMAGE_INPUT_LIMIT = 1;

const schema = z.object({
  name: z.string().min(1, "Preferred name is required"),
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(1, "Password is required").max(255),
});

type FormData = z.infer<typeof schema>;

const ChatsLoginPage = () => {
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const { errors, handleSubmit, register } = useForm(schema);
  const { accentColor } = useAppColorMode();
  const { images, imagesCount } = useImages(IMAGE_INPUT_LIMIT);
  const navigate = useNavigate();
  const chat = useChat();

  const doSubmit = async ({ name, ...rest }: FormData) => {
    setLoading(true);
    if (error) setError("");
    let photoURL = "";
    if (imagesCount) photoURL = await storage.saveImage(images[0]);

    const user = (
      await chatDb.createUser({
        displayName: name,
        photoURL,
        ...rest,
      })
    )?.user;
    setLoading(false);

    if (user) {
      auth.setChatUser(user);
      navigate("/chats");
    } else {
      setError("Chat Registration Failed");
      await storage.deleteImage(photoURL);
    }
  };

  if (chat.user) return <Navigate to="/chats" />;

  return (
    <Box pt={20} w="100%">
      <Flex
        align="center"
        justify="center"
        direction="column"
        alignItems="center"
        mt={5}
        maxW="400px"
        mx="auto"
      >
        <PageTitle Icon={<BiChat />} pageTitle="Chats" />
        <Form
          handleSubmit={handleSubmit}
          onSubmit={doSubmit}
          error={error}
          usePageContainer={false}
          title="Hint"
          explanation="The email password doesn't have to be that of google. Come up with a new password that you can remember"
        >
          <ImageInputList imagesLimit={IMAGE_INPUT_LIMIT} />
          <ErrorMessage error={error} />
          <FormField
            error={errors.name}
            label="Preferred name"
            name="name"
            register={register}
          />
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
          <SubmitButton label="Sign Up" isLoading={isLoading} />
          <OrSeparator />
          <GoogleButton
            onClick={async () => await chat.signUpWithGoogleRedirect()}
            label="Sign Up with Google"
          />
          <Text
            mt={4}
            fontSize="xs"
            textAlign="center"
            cursor="pointer"
            onClick={() => navigate("/chats/auth/login")}
          >
            Have an account?{" "}
            <Text color={accentColor} display="inline-flex">
              Use it
            </Text>
          </Text>
        </Form>
      </Flex>
    </Box>
  );
};

export default ChatsLoginPage;
