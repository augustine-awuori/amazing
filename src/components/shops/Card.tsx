import { HStack, Flex } from "@chakra-ui/react";
import { GoLocation } from "react-icons/go";

import { Shop } from "../../hooks/useShop";
import Body from "../card/Body";
import Card from "../card/index.tsx";
import Heading from "../card/Heading";
import Image from "../card/Image";
import SeenIcon from "../../components/SeenIcon.tsx";
import Text from "../../components/Text";
import UserAvatar from "../common/MediaQuery.tsx";

interface Props {
  onClick: () => void;
  shop: Shop;
}

const ShopCard = ({ onClick, shop }: Props) => {
  const { author, image, name, location, views } = shop;

  return (
    <Card onClick={onClick}>
      <Image src={image} />
      <Body>
        <Flex align="center" justify="space-between">
          <Heading
            flex="1"
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {name}
          </Heading>
          <SeenIcon count={views} />
        </Flex>
        <HStack mt={1}>
          <UserAvatar user={author} />
        </HStack>
        {location && (
          <HStack mt={2}>
            <GoLocation />
            <Text color="green.400" fontSize="sm" noOfLines={1}>
              {location}
            </Text>
          </HStack>
        )}
      </Body>
    </Card>
  );
};

export default ShopCard;
