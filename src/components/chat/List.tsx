import { useEffect, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { Avatar, Modal, PageTitle, SearchInput, Text } from "../";
import { ChatsIcon } from "../../components/icons";
import { ChatUsers, Chats, ChatListOptions as Options } from ".";
import { useChatUser } from "../../hooks";
import chatAuth, { ChatUser } from "../../db/chat";

const List = () => {
  const [query, setQuery] = useState("");
  const [showingProfile, setShowProfile] = useState(false);
  const [selectedOption, setSelectedOption] = useState("chats");
  const [Component, setComponent] = useState<JSX.Element>();
  const user = useChatUser().user as ChatUser;
  const navigate = useNavigate();

  useEffect(() => {
    setComponent(renderComponent());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOption, (user as ChatUser)?.uid, query]);

  function renderComponent(): JSX.Element {
    switch (selectedOption) {
      case "chats":
        return <Chats query={query} />;

      case "users":
        return <ChatUsers query={query} />;

      default:
        return (
          <Box mt={3}>
            <Text textAlign="center">Contacts are comming sooner!</Text>
          </Box>
        );
    }
  }

  return (
    <Box px={2}>
      <Modal
        content={
          <Flex align="center" justify="center" direction="column">
            <Avatar
              src={user?.photoURL || ""}
              borderRadius="full"
              w={20}
              h={20}
              mb={1}
            />
            {user?.displayName && <Text>{user.displayName}</Text>}
            {user?.email && <Text>{user.email}</Text>}
          </Flex>
        }
        isOpen={showingProfile}
        onModalClose={() => setShowProfile(false)}
        title="Chat Profile"
        primaryBtnLabel={user ? "Sign Out" : "Sign In"}
        onPrimaryClick={() =>
          user ? chatAuth.signOutOfChat() : navigate("/chats/auth")
        }
      />
      <Flex align="center" justify="space-between" pt={2} px={1.5}>
        <PageTitle pageTitle="chats" Icon={<ChatsIcon />} />
        <Avatar
          src={user?.photoURL || ""}
          w={8}
          h={8}
          borderRadius="100%"
          cursor="pointer"
          onClick={() => setShowProfile(true)}
        />
      </Flex>
      <SearchInput
        value={query}
        onTextChange={setQuery}
        placeholder={`Search ${selectedOption}`}
      />
      <Options
        onOptionSelect={setSelectedOption}
        selectedOption={selectedOption}
      />
      {Component}
    </Box>
  );
};

export default List;
