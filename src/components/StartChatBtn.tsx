import { AiOutlineWhatsApp } from "react-icons/ai";

import { APP_PHONE_NUMBER } from "../data/general";
import { useAppColorMode, useWhatsAppRedirect } from "../hooks";
import Button from "./Button";
import util from "../utils/funcs";

interface Props {
  imageUrl?: string;
  phoneNumber: string | undefined;
}

const StartChatBtn = ({ phoneNumber = APP_PHONE_NUMBER, imageUrl }: Props) => {
  const { accentColor, concAccentColor } = useAppColorMode();
  const { url } = useWhatsAppRedirect(phoneNumber, imageUrl);

  const handleClick = () => util.navTo(url);

  return (
    <Button
      _hover={{ backgroundColor: concAccentColor }}
      as="a"
      backgroundColor={accentColor}
      color="#fff"
      my={5}
      onClick={handleClick}
      rel="noopener noreferrer"
      rightIcon={<AiOutlineWhatsApp />}
      w="100%"
    >
      Start Chat
    </Button>
  );
};

export default StartChatBtn;
