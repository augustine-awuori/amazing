import { HStack } from "@chakra-ui/react";

import { Listing } from "../../hooks/useListing";
import { useTimestamp, useAppColorMode } from "../../hooks";
import Body from "../card/Body";
import Card from "../card/index.tsx";
import figure from "../../utils/figure.ts";
import Heading from "../card/Heading";
import Image from "../card/Image";
import Text from "../../components/Text";
import UserAvatar from "../common/MediaQuery.tsx";

interface Props {
  listing: Listing;
  onClick: () => void;
}

const ListingCard = ({ listing, onClick }: Props) => {
  const { tempTimestamp } = useTimestamp(listing.timestamp, true);
  const { accentColor } = useAppColorMode();

  return (
    <Card onClick={onClick}>
      <Image src={listing.images[0]} />
      <Body>
        <Heading>{listing.title}</Heading>
        <HStack justifyContent="space-between" alignItems="center">
          <Text color={accentColor} fontSize=".9rem">
            Ksh {figure.addComma(listing.price)}
          </Text>
        </HStack>
        <UserAvatar user={listing.author} time={tempTimestamp} />
      </Body>
    </Card>
  );
};

export default ListingCard;
