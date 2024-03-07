import { Flex } from "@chakra-ui/react";

import { Text } from "../";
import { useAppColorMode } from "../../hooks";
import { hideScrollBarCss } from "../../data/general";

interface Item {
  _id: string;
  label: string;
}

interface Props {
  list: Item[];
  onItemSelect: (item: Item) => void;
  selectedItem: Item | null;
}

const BadgesList = ({ list, onItemSelect, selectedItem }: Props) => {
  const { accentColor } = useAppColorMode();

  return (
    <Flex overflowX="auto" flexWrap="nowrap" css={hideScrollBarCss} mt={1}>
      {list.map((item, index) => (
        <Text
          key={index}
          bg={selectedItem?._id === item._id ? accentColor : "gray.700"}
          px={2}
          py={2.45}
          mr={2}
          borderRadius={5}
          cursor="pointer"
          whiteSpace="nowrap"
          _hover={{ bg: accentColor }}
          onClick={() => onItemSelect(item)}
        >
          {item.label}
        </Text>
      ))}
    </Flex>
  );
};

export default BadgesList;
