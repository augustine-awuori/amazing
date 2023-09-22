import { Text, TextProps } from "@chakra-ui/react";

interface Props extends TextProps {}

const AppText = ({ children, ...otherProps }: Props) => (
  <Text {...otherProps} fontFamily="andika">
    {children}
  </Text>
);

export default AppText;
