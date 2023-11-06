import { ButtonProps } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

import Button from "../Button";

interface Props extends ButtonProps {
  Element?: JSX.Element;
  fontWeight?: number | string;
  fontSize?: number | string;
  label?: string;
  to: string;
}

const NavButton = ({
  Element,
  label,
  to,
  fontSize = "sm",
  fontWeight = 400,
  ...otherProps
}: Props) => (
  <NavLink to={to}>
    <Button
      {...otherProps}
      as="a"
      fontSize={fontSize}
      fontWeight={fontWeight}
      variant="link"
    >
      {Element || label}
    </Button>
  </NavLink>
);

export default NavButton;
