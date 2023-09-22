import { Heading, HeadingProps } from "@chakra-ui/react";

interface Props extends HeadingProps {}

const AppHeading = ({ children, ...otherProps }: Props) => (
  <Heading {...otherProps} fontFamily="andika">
    {children}
  </Heading>
);

export default AppHeading;
