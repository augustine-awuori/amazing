import { Button, ButtonProps } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

interface Props extends ButtonProps {
  label: string;
  to: string;
}

const NavButton = ({ label, to, ...otherProps }: Props) => (
  <NavLink to={to}>
    <Button
      {...otherProps}
      as="a"
      fontSize="sm"
      fontFamily="andika"
      fontWeight={400}
      variant="link"
    >
      {label}
    </Button>
  </NavLink>
);

export default NavButton;
