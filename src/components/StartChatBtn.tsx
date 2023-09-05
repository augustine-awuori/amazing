import React from "react";
import { Button } from "@chakra-ui/react";

import { useAppColorMode, useWhatsAppRedirect } from "../hooks";

interface Props {
  phoneNumber: string;
}

const StartChatBtn = ({ phoneNumber }: Props) => {
  const { accentColor } = useAppColorMode();
  const { url } = useWhatsAppRedirect(phoneNumber);

  const handleStartChatClick = () => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Button
      backgroundColor={accentColor}
      color="#fff"
      onClick={handleStartChatClick}
      as="a"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      maxW="500px"
      w="100%"
      my={5}
    >
      Start Chat
    </Button>
  );
};

export default StartChatBtn;
