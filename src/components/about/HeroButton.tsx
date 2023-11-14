import { useNavigate } from "react-router-dom";
import { ButtonProps } from "@chakra-ui/react";

import { Button } from "../../components";
import { useAppColorMode } from "../../hooks";

const HeroButton = ({ ...rest }: ButtonProps) => {
  const { accentColor, concAccentColor } = useAppColorMode();
  const navigate = useNavigate();

  return (
    <Button
      {...rest}
      _hover={{ backgroundColor: concAccentColor }}
      backgroundColor={accentColor}
      borderRadius={30}
      fontSize="2xl"
      onClick={() => navigate("/")}
      px={5}
      py={6}
    >
      Get Started
    </Button>
  );
};

export default HeroButton;
