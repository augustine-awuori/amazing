import { HStack, Flex } from "@chakra-ui/react";
import { GoLocation } from "react-icons/go";

import { Shop } from "../../hooks/useShop";
import Body from "../card/Body";
import Card from "../card/index.tsx";
import format from "../../utils/format";
import Heading from "../card/Heading";
import Image from "../card/Image";
import SeenIcon from "../../components/SeenIcon.tsx";
import Text from "../../components/Text";
import UserAvatar from "../common/MediaQuery.tsx";
import useAppColorMode from "../../hooks/useAppColorMode";

interface Props {
  onClick: () => void;
  shop: Shop;
}

const ShopCard = ({ onClick, shop }: Props) => {
  const { accentColor } = useAppColorMode();

  const { author, image, name, location, type, views } = shop;

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
          <Text
            color={accentColor}
            fontSize=".9rem"
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {format.truncate(format.getFirstWord(type?.label))}
          </Text>
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
