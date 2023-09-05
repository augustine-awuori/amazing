import { useState, useEffect } from "react";
import { IconButton } from "@chakra-ui/react";
import { FaChevronUp } from "react-icons/fa";

const ScrollToTop = () => {
  const [showButton, setShowButton] = useState(false);

  const handleScroll = () => setShowButton(window.scrollY > 200);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <IconButton
      icon={<FaChevronUp />}
      isRound
      size="lg"
      colorScheme="teal"
      opacity={showButton ? 1 : 0}
      position="fixed"
      bottom="20px"
      right="20px"
      onClick={handleScrollToTop}
      zIndex="999"
      transition="opacity 0.3s ease"
      aria-label="Scroll to Top"
    />
  );
};

export default ScrollToTop;
