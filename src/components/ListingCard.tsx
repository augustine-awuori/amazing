import {
  Card,
  CardBody,
  HStack,
  Heading,
  Image,
  Text,
  useColorMode,
} from "@chakra-ui/react";

import { Listing } from "../hooks/useListing";
import figure from "../utilities/figure";
import UserAvatar from "./MediaQuery";
import useTimestamp from "../hooks/useTimestamp";

interface Props {
  listing: Listing;
  onClick: () => void;
}

const ListingCard = ({ listing, onClick }: Props) => {
  const { colorMode } = useColorMode();
  const { tempTimestamp } = useTimestamp(listing.timestamp, true);

  return (
    <Card
      shadow={{ purple: "0 0 0 3px purple" }}
      cursor="pointer"
      onClick={onClick}
    >
      <Image src={listing.images[0]} />
      <CardBody backgroundColor={colorMode === "dark" ? "inherit" : "#f8f4f4"}>
        <Heading fontSize="2xl" noOfLines={1}>
          {listing.title}
        </Heading>
        <HStack justifyContent="space-between" alignItems="center">
          <Text color="orange.400" fontSize=".9rem">
            Ksh {figure.addComma(listing.price)}
          </Text>
        </HStack>
        <UserAvatar user={listing.author} time={tempTimestamp} />
      </CardBody>
    </Card>
  );
};

export default ListingCard;
