import { ButtonProps } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

import Button from "../Button";

interface Props extends ButtonProps {
  Element?: JSX.Element;
  label?: string;
  to: string;
}

const NavButton = ({ Element, label, to, ...otherProps }: Props) => (
  <NavLink to={to}>
    <Button
      {...otherProps}
      as="a"
      fontSize="sm"
      fontWeight={400}
      variant="link"
    >
      {label || Element}
    </Button>
  </NavLink>
);

export default NavButton;
