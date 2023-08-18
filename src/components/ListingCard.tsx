import { Card, CardBody, Heading, Image, useColorMode } from "@chakra-ui/react";

import { Listing } from "../hooks/useListing";
import UserAvatar from "./MediaQuery";

interface Props {
  listing: Listing;
  onClick: () => void;
}

const ListingCard = ({ listing, onClick }: Props) => {
  const { colorMode } = useColorMode();

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
        <UserAvatar user={listing.author} />
      </CardBody>
    </Card>
  );
};

export default ListingCard;
