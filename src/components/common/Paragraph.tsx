import { TextProps } from "@chakra-ui/react";

import Text from "../../components/Text";

const Paragraph = ({ children, ...otherProps }: TextProps) => (
  <>
    <Text marginTop={3} {...otherProps} fontSize="1.1rem">
      {children}
    </Text>
    <br />
  </>
);

export default Paragraph;
