import {
  Avatar,
  Card,
  CardBody,
  Heading,
  Text,
  Image,
  Wrap,
  WrapItem,
  useColorMode,
} from "@chakra-ui/react";
import { GoVerified } from "react-icons/go";

import { Listing } from "../hooks/useListings";
import { getFirstWord } from "../utilities/stringManipulator";

interface Props {
  listing: Listing;
  onClick: () => void;
}

const ListingCard = ({ listing, onClick }: Props) => {
  const { colorMode } = useColorMode();
  const { author } = listing;

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
        <Wrap marginTop={2}>
          <WrapItem>
            <Avatar size="xs" name={author.name} src={author.avatar} />
          </WrapItem>
          <WrapItem>
            <Text fontSize={13} marginRight={1}>
              {getFirstWord(author.name)}
            </Text>
            <GoVerified size={12} color="orange" />
          </WrapItem>
        </Wrap>
      </CardBody>
    </Card>
  );
};

export default ListingCard;
