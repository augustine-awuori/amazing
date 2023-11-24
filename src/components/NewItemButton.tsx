import { FC, useEffect, useState } from "react";
import { IconButton, useBreakpointValue } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import FloatingButtonBox from "./FloatingButtonBox";

interface Props {
  onClick?: () => void;
  label?: string;
}

const FloatingButton: FC<Props> = ({ label = "Create New", onClick }) => {
  const [lifted, setLifted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => setLifted(window.scrollY > 200);

  const handleClick = () => (onClick ? onClick() : navigate("new"));

  return (
    <FloatingButtonBox
      bottom={lifted ? "5rem" : "1.25rem"}
      onClick={handleClick}
      label={label}
    >
      {useBreakpointValue({
        base: (
          <IconButton
            aria-label="Add button"
            colorScheme="orange"
            color="white"
            icon={<FaPlus />}
            isRound
            size="lg"
            zIndex="999"
          />
        ),
        md: <FaPlus />,
      })}
    </FloatingButtonBox>
  );
};

export default FloatingButton;
