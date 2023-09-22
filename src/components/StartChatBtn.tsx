import { useAppColorMode, useWhatsAppRedirect } from "../hooks";
import Button from "./Button";

interface Props {
  phoneNumber: string;
}

const StartChatBtn = ({ phoneNumber }: Props) => {
  const { accentColor, concAccentColor } = useAppColorMode();
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
      rel="noopener noreferrer"
      maxW="500px"
      w="100%"
      my={5}
      _hover={{ backgroundColor: concAccentColor }}
    >
      Start Chat
    </Button>
  );
};

export default StartChatBtn;
