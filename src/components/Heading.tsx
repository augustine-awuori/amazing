import { As, Heading, HeadingProps } from "@chakra-ui/react";

interface Props extends HeadingProps {
  as?: As | undefined;
  show?: boolean;
}

const AppHeading = ({
  as = "h1",
  children,
  show = true,
  ...otherProps
}: Props) =>
  show ? (
    <Heading as={as} {...otherProps} fontFamily="andika">
      {children}
    </Heading>
  ) : null;

export default AppHeading;
