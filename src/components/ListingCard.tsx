import { Card, CardBody, HStack, Heading, Image, Text } from "@chakra-ui/react";

import { Listing } from "../hooks/useListing";
import { useTimestamp, useAppColorMode } from "../hooks";
import figure from "../utilities/figure";
import UserAvatar from "./MediaQuery";

interface Props {
  listing: Listing;
  onClick: () => void;
}

const ListingCard = ({ listing, onClick }: Props) => {
  const { tempTimestamp } = useTimestamp(listing.timestamp, true);
  const { accentColor, isDarkMode } = useAppColorMode();

  return (
    <Card
      shadow={{ purple: "0 0 0 3px purple" }}
      cursor="pointer"
      onClick={onClick}
    >
      <Image
        src={listing.images[0]}
        style={{ maxHeight: "200px", objectFit: "cover" }}
      />
      <CardBody backgroundColor={isDarkMode ? "inherit" : "#f8f4f4"}>
        <Heading fontSize="2xl" noOfLines={1}>
          {listing.title}
        </Heading>
        <HStack justifyContent="space-between" alignItems="center">
          <Text color={accentColor} fontSize=".9rem">
            Ksh {figure.addComma(listing.price)}
          </Text>
        </HStack>
        <UserAvatar user={listing.author} time={tempTimestamp} />
      </CardBody>
    </Card>
  );
};

export default ListingCard;
