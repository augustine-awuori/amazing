import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, HStack, Badge, useBreakpointValue } from "@chakra-ui/react";
import { AiOutlineShopping, AiFillPlusCircle } from "react-icons/ai";

import { Button, Heading, Modal } from "../../components";
import { endpoint } from "../../services/shops";
import { Item } from "../../components/common/Selector";
import { Setting } from "./SettingsSelector";
import { useCurrentUser, useShop, useShops } from "../../hooks";
import auth from "../../services/auth";
import SettingsSelector from "./SettingsSelector";
import ShopUpdateForm from "./UpdateForm";

interface Props {
  bagCount: number;
  onAddProduct: () => void;
  onBagView: () => void;
  onShowSettings: () => void;
  productsCount: number;
  shopName: string | undefined;
}

const ShopPageHeader = ({
  bagCount,
  onAddProduct,
  onBagView,
  productsCount,
  shopName,
}: Props) => {
  const { shop } = useShop();
  const isTheAuthor = useCurrentUser(shop?.author._id);
  const showIconsOnly = useBreakpointValue({ base: true, md: false });
  const [, setSetting] = useState<Item | null>(null);
  const [isDeleting, setDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const currentUser = auth.getCurrentUser();
  const helper = useShops();
  const navigate = useNavigate();

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

    if (!ok) return;

    setShowDeleteModal(false);
    navigate(endpoint);
  };

  return (
    <HStack justifyContent="space-between" alignItems="center">
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
      <Heading as="h1" mb={4} size="md" noOfLines={1}>
        {shopName}'s Products ({productsCount})
      </Heading>
      <Box>
        {isTheAuthor || currentUser?.isAdmin ? (
          <Box whiteSpace="nowrap">
            <SettingsSelector
              data={settings}
              onSelectItem={setSetting}
              onShowSettings={setSetting}
              showIconsOnly={showIconsOnly}
            />
            <Button
              rightIcon={<AiFillPlusCircle />}
              onClick={onAddProduct}
              pl={showIconsOnly ? 1.5 : undefined}
            >
              {showIconsOnly ? null : "Add Product"}
            </Button>
          </Box>
        ) : (
          <Button
            isLoading={false}
            leftIcon={<AiOutlineShopping />}
            mx={3}
            onClick={onBagView}
            px={2}
            textAlign="center"
          >
            {showIconsOnly ? null : "My Bag"}
            <Badge rounded={50} ml={1} pl={1.5} py={0.5}>
              {bagCount}
            </Badge>
          </Button>
        )}
      </Box>
    </HStack>
  );
};

export default ShopPageHeader;
