import { useState } from "react";
import { Box, Button, HStack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { figure, format } from "../utilities";
import { ListingUpdateForm } from "../components/forms";
import { PageContainer, ImageSlider, MediaQuery, Modal } from "../components";
import {
  useAppColorMode,
  useCurrentUser,
  useListing,
  useListings,
  useTimestamp,
} from "../hooks";

const ListingDetailsPage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const { listing } = useListing();
  const userId = listing?.author?._id;
  const isTheAuthor = useCurrentUser(userId);
  const { tempTimestamp } = useTimestamp(listing?.timestamp);
  const { accentColor } = useAppColorMode();
  const { deleteListing } = useListings();

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
      <ImageSlider images={listing?.images} />
      <Box maxWidth="80%">
        <HStack alignItems="center">
          <Text fontWeight="bold" fontSize={21} marginBottom={2}>
            {listing?.title}
          </Text>
        </HStack>
        <HStack justifyContent="space-between" marginBottom={2}>
          <Text color={accentColor}>Ksh {figure.addComma(listing?.price)}</Text>
          <Text fontStyle="italic" color={accentColor}>
            {listing?.category?.label}
          </Text>
        </HStack>
        <Text>{listing?.description}</Text>
        <Box marginY={5} cursor="pointer" onClick={navigateToProfile}>
          <MediaQuery user={listing?.author} size="sm" time={tempTimestamp} />
        </Box>
        <Text>
          {format.phoneNumber(listing?.author?.otherAccounts?.whatsapp)}
        </Text>
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
