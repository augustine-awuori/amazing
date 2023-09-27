import { Text, TextProps } from "@chakra-ui/react";

interface Props extends TextProps {}

const AppText = ({ children, ...otherProps }: Props) => (
  <Text {...otherProps} fontFamily="Andika sans-serif">
    {children}
  </Text>
);

export default AppText;
