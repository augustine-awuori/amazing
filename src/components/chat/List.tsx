import { useEffect, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";

import { ChatUsers, Chats, ChatListOptions as Options } from ".";
import { Avatar, Modal, PageTitle, SearchInput, Text } from "../";
import { useChat } from "../../hooks";
import chatAuth from "../../db/chat";

const List = () => {
  const [query, setQuery] = useState("");
  const [showingProfile, setShowProfile] = useState(false);
  const [selectedOption, setSelectedOption] = useState("chats");
  const [Component, setComponent] = useState<JSX.Element>();
  const { user } = useChat();

  useEffect(() => {
    setComponent(renderComponent());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOption, user?.uid, query]);

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
        primaryBtnLabel="Sign Out"
        onPrimaryClick={() => chatAuth.signOutOfChat()}
      />
      <Flex align="center" justify="space-between" pt={2} px={1.5}>
        <PageTitle pageTitle="chats" Icon={<ChatIcon />} />
        <Avatar
          src={user?.photoURL || ""}
          w={6}
          h={6}
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
