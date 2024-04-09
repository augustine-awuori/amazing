import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Box, Flex, HStack, useBreakpointValue } from "@chakra-ui/react";
import { AiFillPlusCircle } from "react-icons/ai";
import { BsXCircle } from "react-icons/bs";
import GoogleButton from "react-google-button";

import { empty } from "../../utils";
import { Heading, Modal, Text } from "../../components";
import { ChatAccountsDisplay, SettingsSelector, ShopUpdateForm } from ".";
import { ChatIcon } from "../../components/icons";
import { endpoint } from "../../services/shops";
import { Item } from "../../components/common/Selector";
import { Setting } from "./SettingsSelector";
import {
  useChatUser,
  useChatDetails,
  useCurrentUser,
  useShop,
  useShops,
} from "../../hooks";
import auth from "../../services/auth";
import Button from "./ShopHeaderButton";
import userService from "../../services/users";
import useUser from "../../hooks/useUser";

interface Props {
  onAddProduct: () => void;
  onShowSettings: () => void;
  productsCount: number;
  shopName: string | undefined;
}

const ShopPageHeader = ({ onAddProduct, productsCount, shopName }: Props) => {
  const shop = useShop().shop || empty.shop;
  const sellerId = shop?.author?._id;
  const shopOwnerDetails = useUser(sellerId);
  const { setChat } = useChatDetails();
  const isTheAuthor = useCurrentUser(shop?.author?._id);
  const [, setSetting] = useState<Item | null>(null);
  const [isDeleting, setDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showChatsModal, setChatsModal] = useState(false);
  const [showChatAccountPrompt, setShowChatAccountPrompt] = useState(false);
  const chat = useChatUser();
  const helper = useShops();
  const navigate = useNavigate();
  const isSmallScreen = useBreakpointValue({ base: true, md: false });

  const settings: Setting[] = [
    {
      _id: "",
      label: "Update Shop Info",
      onClick: () => setShowUpdateModal(true),
    },
    {
      _id: "",
      label: "Delete Shop",
      onClick: () => setShowDeleteModal(true),
    },
  ];

  const handleDelete = async () => {
    setDeleting(true);
    const ok = await helper.deleteShop(shop?._id);
    setDeleting(false);

    if (ok) {
      setShowDeleteModal(false);
      navigate(endpoint);
    }
  };

  const handleChat = () => {
    const chatIds = shopOwnerDetails?.chatIds;
    if (!chatIds) return toast.error("Couldn't load seller's chat account");

    const ids = Object.values(chatIds);
    if (ids.length > 1) return setChatsModal(true);
    const chatId = ids[0];

    setChat({
      chatId,
      user: {
        displayName: shopOwnerDetails?.name || "Unknown",
        email: "",
        photoURL: shopOwnerDetails?.avatar || "",
        uid: "",
      },
    });
    navigate(isSmallScreen ? `/chats/${chatId}` : "/chats");
  };

  const handleChatSignUp = async () => {
    await chat.signUpWithGoogleRedirect();

    if (shopOwnerDetails?._id) await userService.resetToken();
  };

  const ChatButton = (): JSX.Element => {
    if (isTheAuthor && !shopOwnerDetails?.chatIds)
      return (
        <Box ml={3} borderRadius={12} overflow="hidden">
          <GoogleButton label="Chat w/ Customers" onClick={handleChatSignUp} />
        </Box>
      );

    if (!isTheAuthor && shopOwnerDetails?.chatIds)
      return (
        <Button onClick={handleChat} rightIcon={<ChatIcon />}>
          View Chats
        </Button>
      );

    return (
      <Button
        leftIcon={<BsXCircle size={12} />}
        onClick={() =>
          toast.info("Seller hasn't activated the chats yet! Keep checking!")
        }
      >
        <ChatIcon />
      </Button>
    );
  };

  return (
    <HStack justifyContent="space-between" alignItems="center">
      <Modal
        content={
          <Text textAlign="center">
            Please, activate your chats to enable customers to reach out to you!
          </Text>
        }
        isOpen={
          isTheAuthor && !shopOwnerDetails?.chatIds && showChatAccountPrompt
        }
        onModalClose={() => setShowChatAccountPrompt(false)}
        title="Chat Account Activation"
      />
      <Modal
        content={
          <ChatAccountsDisplay
            onDoneAccountClick={() => setChatsModal(false)}
            seller={shopOwnerDetails}
          />
        }
        isOpen={showChatsModal}
        onModalClose={() => setChatsModal(false)}
        title="Select Chat Account"
        secondaryBtnLabel="Close"
      />
      <Modal
        content="Are you sure you want to permanently delete this shop and it's products? "
        isLoading={isDeleting}
        isOpen={showDeleteModal}
        onModalClose={() => setShowDeleteModal(false)}
        onPrimaryClick={handleDelete}
        primaryBtnLabel="Yes"
        secondaryBtnLabel="No"
        title="Confirm Deletion"
      />
      <Modal
        content={<ShopUpdateForm onDone={() => setShowUpdateModal(false)} />}
        isOpen={showUpdateModal}
        onModalClose={() => setShowUpdateModal(false)}
        title="Update Shop Info"
      />
      <Heading
        as="h1"
        mb={4}
        size="md"
        noOfLines={1}
        textTransform="capitalize"
      >
        {shopName + "'s"} Products ({productsCount})
      </Heading>
      <Flex align="center">
        {(isTheAuthor || auth.getCurrentUser()?.isAdmin) && (
          <Box whiteSpace="nowrap">
            <SettingsSelector
              data={settings}
              onSelectItem={setSetting}
              onShowSettings={setSetting}
              showIconsOnly={isSmallScreen}
            />
            <Button
              rightIcon={<AiFillPlusCircle />}
              onClick={onAddProduct}
              ml={0}
            >
              Add Product
            </Button>
          </Box>
        )}
        <ChatButton />
      </Flex>
    </HStack>
  );
};

export default ShopPageHeader;
