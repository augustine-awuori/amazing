import { useState } from "react";
import { Box, Button, HStack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { useCurrentUser, useListing, useTimestamp } from "../hooks";
import AppModal from "../components/Modal";
import figure from "../utilities/figure";
import format from "../utilities/format";
import ImageSlider from "../components/ImageSlider";
import PageContainer from "../components/PageContainer";
import UserAvatar from "../components/MediaQuery";

const ListingDetailsPage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const { listing } = useListing();
  const userId = listing?.author?._id;
  const isTheAuthor = useCurrentUser(userId);
  const { tempTimestamp } = useTimestamp(listing?.timestamp);

  const switchModalVisibility = () => setModalOpen(!isModalOpen);

  const handleDelete = () => {
    setModalOpen(false);
  };

  const handleEdit = () => {
    setModalOpen(false);
  };

  const navigateToProfile = () => {
    if (userId) navigate(`/profile/${userId}`);
  };

  return (
    <PageContainer>
      <AppModal
        content="WARNING! Changes made are irreversible"
        isOpen={isModalOpen}
        onModalClose={switchModalVisibility}
        onPrimaryClick={handleEdit}
        onSecondaryClick={handleDelete}
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
          <Text color="orange.400">Ksh {figure.addComma(listing?.price)}</Text>
          <Text fontStyle="italic" color="orange.400">
            {listing?.category?.label}
          </Text>
        </HStack>
        <Text>{listing?.description}</Text>
        <Box marginY={5} cursor="pointer" onClick={navigateToProfile}>
          <UserAvatar
            user={listing?.author}
            size="sm"
            onClick={console.log}
            time={tempTimestamp}
          />
        </Box>
        <Text>
          {format.phoneNumber(listing?.author?.otherAccounts?.whatsapp)}
        </Text>
        {isTheAuthor && (
          <Button onClick={switchModalVisibility} mt={3}>
            Edit Listing
          </Button>
        )}
      </Box>
    </PageContainer>
  );
};

export default ListingDetailsPage;
