import { useEffect, useState } from "react";
import { Box, HStack, SkeletonText } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { BiRecycle } from "react-icons/bi";
import { toast } from "react-toastify";

import { empty, figure } from "../utils";
import {
  Button,
  CardContainer,
  CardSkeleton,
  ImageSlider,
  MediaQuery,
  Modal,
  StartChatBtn,
  Text,
} from "../components";
import {
  useAppColorMode,
  useCurrentUser,
  useListing,
  useListings,
  useNoGrid,
  useProducts,
  useReload,
  useShops,
  useTimestamp,
} from "../hooks";
import { Listing } from "../hooks/useListing";
import { Product } from "../hooks/useProducts";
import { ShopSelectors } from "../components/listings";
import auth from "../services/auth";
import ListingUpdateForm from "../components/forms/ListingUpdateForm";
import service from "../services/listings";

const ListingDetailsPage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isShowModalOpen, setShopsModal] = useState(false);
  const [isListingDeletionModalOpen, setShowListingDeletionModal] =
    useState(false);
  const [selectedShop, setSelectedShop] = useState("");
  const { listing } = useListing();
  const { tempTimestamp } = useTimestamp(listing?.timestamp);
  const { accentColor } = useAppColorMode();
  const { convertToShopProduct, deleteListing } = useListings();
  const { info, isLoading, request } = useReload<Listing>(
    listing,
    empty.listing,
    service.getListing
  );
  const userId = info.author._id;
  const isTheAuthor = useCurrentUser(userId);
  const { isLoading: loadingShops } = useShops();
  const { addProduct } = useProducts(undefined);
  useNoGrid();

  useEffect(() => {
    request();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const switchModalVisibility = () => setModalOpen(!isModalOpen);

  const switchEditModalVisibility = () => setEditModalOpen(!isEditModalOpen);

  const switchDeleteModalVisibility = () =>
    setDeleteModalOpen(!isDeleteModalOpen);

  const handleDelete = () => {
    switchModalVisibility();
    switchDeleteModalVisibility();

    deleteListing(listing?._id);
  };

  const showEditForm = () => {
    switchModalVisibility();
    switchEditModalVisibility();
  };

  const navigateToProfile = () => {
    if (userId) navigate(`/profile/${userId}`);
  };

  const cancelModal = () => {
    switchEditModalVisibility();
    navigate(-1);
  };

  const promptDeletion = () => {
    switchModalVisibility();
    switchDeleteModalVisibility();
  };

  const createProductFromListing = async (): Promise<boolean> => {
    setShopsModal(false);

    toast.loading("Converting listing to shop product...");
    const { ok, data } = await convertToShopProduct(info._id, selectedShop);
    toast.dismiss();
    if (ok) addProduct(data as Product);

    return ok;
  };

  const convertListingToProduct = async () => {
    if (!selectedShop)
      return toast.info("You need to select a shop to add product to");

    const successful = await createProductFromListing();

    if (successful) {
      setShowListingDeletionModal(true);
      setShopsModal(false);
      navigate(-1);
    }
  };

  const handleListingDeletion = () => {
    deleteListing(listing?._id);
    toast.info("Deleting listing");
    setShowListingDeletionModal(false);
  };

  return (
    <Box pt={{ base: 8 }} mx="auto">
      <Modal
        isOpen={isDeleteModalOpen}
        title="Delete Listing"
        content="Are you sure you want to delete this listing permanently?"
        primaryBtnLabel="I'm sure"
        secondaryBtnLabel="Abort"
        onPrimaryClick={handleDelete}
        onSecondaryClick={switchDeleteModalVisibility}
        onModalClose={switchDeleteModalVisibility}
      />
      <Modal
        content={<ListingUpdateForm listing={listing} onDone={cancelModal} />}
        isOpen={isEditModalOpen}
        title="Edit Listing Info"
        onModalClose={switchEditModalVisibility}
      />
      <Modal
        content="WARNING! Changes made are irreversible"
        isOpen={isModalOpen}
        onModalClose={switchModalVisibility}
        onPrimaryClick={showEditForm}
        onSecondaryClick={promptDeletion}
        primaryBtnLabel="Edit Listing"
        secondaryBtnLabel="Delete Listing"
        title="How'd you like to change your listing?"
      />
      <Modal
        content={
          <ShopSelectors
            onShopSelect={setSelectedShop}
            selectedShop={selectedShop}
          />
        }
        title="Select Shop"
        isOpen={isShowModalOpen}
        isLoading={loadingShops}
        primaryBtnLabel="Add to Shop"
        secondaryBtnLabel="Cancel"
        onModalClose={() => setShopsModal(false)}
        onPrimaryClick={convertListingToProduct}
      />
      <Modal
        content="This listing has already been converted to shop product, would you like to delete it?"
        title="Listing Deletion Request"
        isOpen={isListingDeletionModalOpen}
        onModalClose={() => setShowListingDeletionModal(false)}
        primaryBtnLabel="Delete"
        secondaryBtnLabel="Dismiss"
        isLoading={false}
        onPrimaryClick={handleListingDeletion}
        onSecondaryClick={() => setShowListingDeletionModal(false)}
      />
      {isLoading ? (
        <CardContainer>
          <CardSkeleton />
        </CardContainer>
      ) : (
        <ImageSlider images={info.images} />
      )}
      <Box maxW="500px">
        <HStack alignItems="center">
          {isLoading ? (
            <SkeletonText mb={2} fontSize={21} />
          ) : (
            <Text fontWeight="bold" fontSize={21} marginBottom={2}>
              {info.title}
            </Text>
          )}
        </HStack>
        {isLoading ? (
          <SkeletonText />
        ) : (
          <>
            <HStack justifyContent="space-between" marginBottom={2}>
              <Text color={accentColor}>Ksh {figure.addComma(info.price)}</Text>
              <Text fontStyle="italic" color={accentColor}>
                {info.category?.label}
              </Text>
            </HStack>
            <Text>{info.description}</Text>
          </>
        )}
        <Box marginY={5} cursor="pointer" onClick={navigateToProfile}>
          <MediaQuery user={info.author} size="sm" time={tempTimestamp} />
        </Box>
        {isLoading ? (
          <SkeletonText mb={2} />
        ) : (
          <StartChatBtn
            phoneNumber={info.author?.otherAccounts?.whatsapp}
            imageUrl={info.images[0]}
          />
        )}
        {isTheAuthor && (
          <Button onClick={switchModalVisibility} my={3}>
            Edit Listing
          </Button>
        )}
        {(auth.getCurrentUser()?.isAdmin || isTheAuthor) && (
          <Button
            w="100%"
            backgroundColor="green.500"
            rightIcon={<BiRecycle />}
            onClick={() => setShopsModal(true)}
            _hover={{ bgColor: "green.600" }}
          >
            Convert to Shop Product
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default ListingDetailsPage;
