import React from "react";
import { Box, Flex, FlexProps, Link } from "@chakra-ui/react";

import { Heading } from "..";
import { useAppColorMode } from "../../hooks";

interface Props extends FlexProps {
  children: React.ReactNode;
  title: string;
}

const Container = ({ children, title, ...otherProps }: Props) => {
  const { accentColor } = useAppColorMode();

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
        <Box textAlign="center" mt="2">
          <Link
            color={accentColor}
            href={isSignUpTitle ? "/login" : "/register"}
          >
            {statement} {isSignUpTitle ? "Sign In" : "Sign Up"}
          </Link>
        </Box>
      </Box>
    </Flex>
  );
};

export default Container;
