import { Text, TextProps } from "@chakra-ui/react";

const AppText = ({ children, ...otherProps }: TextProps) => (
  <Text {...otherProps} fontFamily="andika" letterSpacing=".5px">
    {children}
  </Text>
);

export default AppText;
