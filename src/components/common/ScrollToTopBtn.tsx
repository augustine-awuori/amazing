import { useState, useEffect } from "react";
import { IconButton, useBreakpointValue } from "@chakra-ui/react";
import { FaChevronUp } from "react-icons/fa";

import FloatingButtonBox from "../../components/FloatingButtonBox";

const ScrollToTop = () => {
  const [showButton, setShowButton] = useState(false);

  const handleScroll = () => setShowButton(window.scrollY > 200);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <FloatingButtonBox
      bottom="1.25rem"
      label="Scroll to Top"
      onClick={handleScrollToTop}
      opacity={showButton ? 1 : 0}
    >
      {useBreakpointValue({
        base: (
          <IconButton
            icon={<FaChevronUp />}
            isRound
            size="lg"
            colorScheme="orange"
            color="white"
            position="fixed"
            bottom="1.25rem"
            right="1.25rem"
            onClick={handleScrollToTop}
            aria-label="Scroll to Top"
          />
        ),
        md: <FaChevronUp />,
      })}
    </FloatingButtonBox>
  );
};

export default ScrollToTop;
