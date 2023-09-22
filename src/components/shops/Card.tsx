import { HStack } from "@chakra-ui/react";

import { Shop } from "../../hooks/useShop";
import Body from "../card/Body";
import Card from "../card/index.tsx";
import format from "../../utils/format";
import Heading from "../card/Heading";
import Image from "../card/Image";
import Text from "../../components/Text";
import UserAvatar from "../common/MediaQuery.tsx";
import useAppColorMode from "../../hooks/useAppColorMode";

interface Props {
  onClick: () => void;
  shop: Shop;
}

const ShopCard = ({ onClick, shop }: Props) => {
  const { accentColor } = useAppColorMode();

  const { author, image, name, type } = shop;

  return (
    <Card onClick={onClick}>
      <Image src={image} />
      <Body>
        <Heading>{name}</Heading>
        <HStack mt={1}>
          <UserAvatar user={author} />
          <Text color={accentColor} fontSize=".9rem">
            {format.truncate(type?.label)}
          </Text>
        </HStack>
      </Body>
    </Card>
  );
};

export default ShopCard;
