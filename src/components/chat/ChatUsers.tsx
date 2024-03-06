import { Box } from "@chakra-ui/react";

import { ChatUser } from "../../db/chat";
import { Text } from "..";
import { useChatUser, useChatDetails } from "../../hooks";
import AppChatUser from "./ChatUser";

const AppChatUsers = ({ query }: { query: string }) => {
  const { user } = useChatUser();
  const { isLoadingUsers, onStartChat, users } = useChatDetails();

  const sortByDisplayName = (a: ChatUser, b: ChatUser) => {
    if (a.displayName && b.displayName)
      return a.displayName < b.displayName ? -1 : 1;

    return 0;
  };

  const queried = query
    ? users.filter(
        (user) =>
          user.displayName?.toLowerCase().includes(query.toLowerCase()) ||
          user.email?.toLowerCase().includes(query.toLowerCase())
      )
    : users;

  return (
    <Box>
      {queried
        .sort(sortByDisplayName)
        .filter((u) => u.uid !== (user as ChatUser)?.uid)
        .map((user, index) => (
          <AppChatUser
            uid={user.uid}
            title={user.displayName}
            photoURL={user.photoURL}
            subTitle={user.email}
            onClick={() => onStartChat(user)}
            key={index}
          />
        ))}
      {isLoadingUsers && (
        <Text textAlign="center" mt={5}>
          Loading chat users...
        </Text>
      )}
      {!users.length && !isLoadingUsers && (
        <Text textAlign="center" mt={5}>
          Showing none
        </Text>
      )}
    </Box>
  );
};

export default AppChatUsers;
