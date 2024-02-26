import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { Text } from "..";
import { useChat, useChatDetails } from "../../hooks";
import AppChatUser from "./ChatUser";
import chat, { ChatUser } from "../../db/chat";

const AppChatUsers = ({ query }: { query: string }) => {
  const [users, setUsers] = useState<ChatUser[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useChat();
  const { setChat } = useChatDetails();
  const navigate = useNavigate();

  useEffect(() => {
    initUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users.length, query]);

  async function initUsers() {
    setLoading(true);
    setUsers(await chat.getAllUsers());
    setLoading(false);
  }

  const handleUserClick = async (chatUser: ChatUser) => {
    if (!user) {
      toast.info("Chatting awaits, login to continue!");
      return navigate("/chats/auth");
    }

    const currentUser = users.find(({ uid }) => uid === user?.uid);

    if (!chatUser || !currentUser) return toast.error("Error opening chat!");

    await chat.getUserChatMessages(currentUser, chatUser);

    const chatId = chat.getCombinedUsersId(currentUser.uid, chatUser.uid);
    setChat({ user: chatUser, chatId });
    navigate(`/chats/${chatId}`);
  };

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
        .filter((u) => u.uid !== user?.uid)
        .map((user, index) => (
          <AppChatUser
            uid={user.uid}
            title={user.displayName}
            photoURL={user.photoURL}
            subTitle={user.email}
            onClick={() => handleUserClick(user)}
            key={index}
          />
        ))}
      {loading && (
        <Text textAlign="center" mt={5}>
          Loading chat users...
        </Text>
      )}
      {!users.length && !loading && (
        <Text textAlign="center" mt={5}>
          Showing none
        </Text>
      )}
    </Box>
  );
};

export default AppChatUsers;
