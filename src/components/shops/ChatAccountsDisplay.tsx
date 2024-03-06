import { Box, Flex } from "@chakra-ui/react";
import { toast } from "react-toastify";

import { Avatar, Text } from "..";
import { CompleteUser } from "../../hooks/useUser";
import { useAppColorMode, useChatDetails } from "../../hooks";
import chatDb, { ChatUser } from "../../db/chat";

interface Props {
  onDoneAccountClick: () => void;
  seller?: CompleteUser;
}

const ChatAccountsDisplay = ({
  onDoneAccountClick,
  seller,
}: Props): JSX.Element => {
  const { accentColor } = useAppColorMode();
  const { onStartChat } = useChatDetails();
  const chatIds = seller?.chatIds;

  const handleAccountClick = async (index: number) => {
    onDoneAccountClick();

    if (!chatIds)
      return toast.error(
        "Seller hasn't set his/her chat account yet! Keep checking"
      );

    const sellerId = Object.values(chatIds)[index];
    const foundSeller = (await chatDb.getAllUsers()).find(
      (u) => u.uid === sellerId
    );

    await onStartChat({
      uid: sellerId,
      displayName: foundSeller?.displayName || seller.name,
      photoURL: foundSeller?.photoURL,
      email: foundSeller?.email,
    } as ChatUser);
  };

  if (!chatIds) return <Text textAlign="center">No Chat Accounts!</Text>;

  return (
    <>
      {Object.keys(chatIds).map((email, index) => (
        <Flex
          _hover={{ bg: "gray.800" }}
          align="center"
          borderRadius={5}
          cursor="pointer"
          key={index}
          mb={2}
          onClick={() => handleAccountClick(index)}
          p={2}
        >
          <Avatar src={seller?.avatar} w={8} h={8} mr={2} />
          <Box>
            <Text>{seller?.name}</Text>
            <Text fontSize="xs" color={accentColor}>
              {email}
            </Text>
          </Box>
        </Flex>
      ))}
    </>
  );
};

export default ChatAccountsDisplay;
