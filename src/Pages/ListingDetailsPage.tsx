import { useEffect, useState } from "react";
import { Box, HStack, SkeletonText } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { empty, figure } from "../utils";
import {
  Button,
  CardContainer,
  CardSkeleton,
  ImageSlider,
  MediaQuery,
  Modal,
  PageContainer,
  StartChatBtn,
  Text,
} from "../components";
import {
  useAppColorMode,
  useCurrentUser,
  useListing,
  useListings,
  useReload,
  useTimestamp,
} from "../hooks";
import { Listing } from "../hooks/useListing";
import ListingUpdateForm from "../components/forms/ListingUpdateForm";
import service from "../services/listings";

const ListingDetailsPage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const { listing } = useListing();
  const { tempTimestamp } = useTimestamp(listing?.timestamp);
  const { accentColor } = useAppColorMode();
  const { deleteListing } = useListings();
  const { info, isLoading, request } = useReload<Listing>(
    listing,
    empty.listing,
    service.getListing
  );
  const userId = info.author._id;
  const isTheAuthor = useCurrentUser(userId);

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

  return (
    <PageContainer>
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
          <StartChatBtn phoneNumber={info.author?.otherAccounts?.whatsapp} />
        )}
        {isTheAuthor && (
          <Button onClick={switchModalVisibility} my={3}>
            Edit Listing
          </Button>
        )}
      </Box>
    </PageContainer>
  );
};

export default ListingDetailsPage;
