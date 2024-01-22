import { As, Heading, HeadingProps } from "@chakra-ui/react";

import { fontFamily } from "../data/typography";

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
    <Heading as={as} {...otherProps} fontFamily={fontFamily}>
      {children}
    </Heading>
  ) : null;

export default AppHeading;
