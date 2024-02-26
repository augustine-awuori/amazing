import { Box, Flex } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

import { Avatar, Text } from "../";

import { useChatDetails } from "../../hooks";

const Profile = () => {
  const { chat } = useChatDetails();

  const user = chat?.user;

  return (
    <Box pt={5} px={5} pos="relative">
      <CloseIcon pos="absolute" right={4} top={4} />
      <Flex
        mt={10}
        align="center"
        justify="center"
        direction="column"
        w="auto"
        alignItems="center"
      >
        <Avatar
          src={user?.photoURL || ""}
          w={75}
          h={75}
          borderRadius="full"
          mb={2}
        />
        <Box maxW="200px">
          <Text fontWeight="bold" fontSize="md" textAlign="center">
            {user?.displayName}
          </Text>
          <Text textAlign="center" flexWrap="wrap">
            {user?.email}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default Profile;
