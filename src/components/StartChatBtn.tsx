import { useAppColorMode, useWhatsAppRedirect } from "../hooks";
import Button from "./Button";
import util from "../utils/funcs";

interface Props {
  imageUrl?: string;
  phoneNumber: string | undefined;
}

const StartChatBtn = ({ phoneNumber = "+254796720289", imageUrl }: Props) => {
  const { accentColor, concAccentColor } = useAppColorMode();
  const { url } = useWhatsAppRedirect(phoneNumber, imageUrl);

  const handleStartChatClick = () => util.navTo(url);

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
