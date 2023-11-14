import { Text, TextProps } from "@chakra-ui/react";

const AppText = ({ children, ...otherProps }: TextProps) => (
  <Text {...otherProps} fontFamily="andika">
    {children}
  </Text>
);

export default AppText;
