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

  const handleStartChatClick = () => util.navTo(url);

  return (
    <Button
      backgroundColor={accentColor}
      color="#fff"
      onClick={handleStartChatClick}
      as="a"
      rel="noopener noreferrer"
      w="100%"
      my={5}
      _hover={{ backgroundColor: concAccentColor }}
    >
      Start Chat
    </Button>
  );
};

export default StartChatBtn;
