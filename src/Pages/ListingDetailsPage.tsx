import { useState } from "react";
import { Box, Button, HStack, Text } from "@chakra-ui/react";

import AppModal from "../components/Modal";
import figure from "../utilities/figure";
import ImageSlider from "../components/ImageSlider";
import PageContainer from "../components/PageContainer";
import useListing from "../hooks/useListing";
import UserAvatar from "../components/MediaQuery";

const ListingDetailsPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { listing } = useListing();

  const { author, category, description, title, images, price } = listing;

  const switchModalVisibility = () => setModalOpen(!isModalOpen);

  const handleDelete = () => {
    setModalOpen(false);
  };

  const handleEdit = () => {
    setModalOpen(false);
  };

  const navigateToProfile = () => {
    console.log(author);
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
      <ImageSlider images={images} />
      <Box maxWidth="80%">
        <Text fontWeight="bold" fontSize={21} marginBottom={2}>
          {title}
        </Text>
        <HStack justifyContent="space-between" marginBottom={2}>
          <Text color="orange.400">Ksh {figure.addComma(price)}</Text>
          <Text fontStyle="italic" color="orange.400">
            {category.label}
          </Text>
        </HStack>
        <Text>{description}</Text>
        <Box marginY={5} cursor="pointer" onClick={navigateToProfile}>
          <UserAvatar user={author} size="sm" onClick={console.log} />
        </Box>
        <Button onClick={switchModalVisibility}>Edit Listing</Button>
      </Box>
    </PageContainer>
  );
};

export default ListingDetailsPage;
