import React from "react";
import { Box, Flex, FlexProps } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { Heading, Text } from "..";
import { useAppColorMode } from "../../hooks";

interface Props extends FlexProps {
  children: React.ReactNode;
  title: string;
}

const Container = ({ children, title, ...otherProps }: Props) => {
  const { accentColor } = useAppColorMode();
  const navigate = useNavigate();

  const query = title.toLowerCase();
  const isSignUpTitle = query.includes("up") || query.includes("register");

  const statement = isSignUpTitle
    ? "Have an account?"
    : "Don't have an account?";

  return (
    <Flex
      height="100vh"
      alignItems="center"
      justifyContent="center"
      {...otherProps}
    >
      <Box
        maxW="400px"
        p="6"
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="lg"
      >
        <Box textAlign="center">
          <Heading size="md">{title} to Amazing</Heading>
        </Box>
        <Box my="4">{children}</Box>
        <Text
          cursor="pointer"
          textAlign="center"
          color={accentColor}
          onClick={() => navigate(isSignUpTitle ? "/login" : "/register")}
        >
          {statement} {isSignUpTitle ? "Sign In" : "Sign Up"}
        </Text>
      </Box>
    </Flex>
  );
};

export default Container;
