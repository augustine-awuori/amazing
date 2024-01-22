import { Text, TextProps } from "@chakra-ui/react";

import { fontFamily } from "../data/typography";

const AppText = ({ children, ...otherProps }: TextProps) => (
  <Text {...otherProps} letterSpacing=".5px" fontFamily={fontFamily}>
    {children}
  </Text>
);

export default AppText;
