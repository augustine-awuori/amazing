import { Heading, HeadingProps } from "@chakra-ui/react";

interface Props extends HeadingProps {
  show?: boolean;
}

const AppHeading = ({ children, show = true, ...otherProps }: Props) =>
  show ? (
    <Heading {...otherProps} fontFamily="andika">
      {children}
    </Heading>
  ) : null;

export default AppHeading;
