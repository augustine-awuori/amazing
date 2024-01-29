import { useState } from "react";
import { Box, Flex, IconButton } from "@chakra-ui/react";
import { FaShieldAlt, FaWhatsapp } from "react-icons/fa";
import { InfoIcon } from "@chakra-ui/icons";
import { GoVerified } from "react-icons/go";

import { AdminItem, Button, Modal, UserProfile } from ".";
import { User } from "../hooks/useUser";
import { useWhatsAppRedirect } from "../hooks";
import UserAvatar from "./common/MediaQuery";
import util from "../utils/funcs";

interface Props {
  user: User;
}

const UserAdminItem = ({ user }: Props) => {
  const [showButtons, setShowButtons] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const { url } = useWhatsAppRedirect(user.otherAccounts.whatsapp);

  const handleAvatarClick = () => setShowButtons(!showButtons);

  const Icons = (
    <>
      <IconButton
        icon={<InfoIcon />}
        mr={2}
        aria-label="info-icon"
        borderRadius="100%"
        size="sm"
        onClick={() => setShowDetails(true)}
      />
      <IconButton
        aria-label="whatsapp-icon"
        borderRadius="100%"
        bg="green.400"
        icon={<FaWhatsapp />}
        onClick={() => util.navTo(url)}
        size="sm"
      />
    </>
  );

  return (
    <>
      <Modal
        content={<UserProfile user={user} />}
        isOpen={showDetails}
        onModalClose={() => setShowDetails(false)}
        title="User Profile"
      />
      <AdminItem>
        <UserAvatar
          user={user}
          size="sm"
          RightElement={Icons}
          onClick={handleAvatarClick}
        />
        {showButtons && (
          <Flex mt={4} w="100%">
            <Button
              bg="blue.200"
              w="100%"
              rightIcon={<GoVerified />}
              _hover={{ bg: "blue.300" }}
            >
              Verify User
            </Button>
            <Box w={5} />
            <Button
              bg="yellow.400"
              w="100%"
              rightIcon={<FaShieldAlt />}
              _hover={{ bg: "yellow.500" }}
            >
              Make Admin
            </Button>
          </Flex>
        )}
      </AdminItem>
    </>
  );
};

export default UserAdminItem;
