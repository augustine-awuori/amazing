import { Flex, FlexProps, Skeleton } from "@chakra-ui/react";

import { Text } from "../";
import { useAppColorMode } from "../../hooks";
import { hideScrollBarCss } from "../../data/general";

interface Item {
  _id: string;
  label: string;
}

interface Props extends FlexProps {
  list: Item[];
  onItemSelect: (item: Item) => void;
  selectedItem: Item | null;
  loading?: boolean;
}

const BadgesList = ({
  list,
  loading,
  onItemSelect,
  selectedItem,
  ...otherProps
}: Props) => {
  const { accentColor } = useAppColorMode();

  if (loading)
    return (
      <Flex>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((_item, index) => (
          <Skeleton
            borderRadius={9}
            cursor="pointer"
            h={6}
            key={index}
            mr={2}
            pr={2}
            py={2.45}
            w={20}
          />
        ))}
      </Flex>
    );

  return (
    <Flex
      overflowX="auto"
      flexWrap="nowrap"
      css={hideScrollBarCss}
      mt={1}
      {...otherProps}
    >
      {list.map((item, index) => (
        <Text
          key={index}
          bg={selectedItem?._id === item._id ? accentColor : "gray.700"}
          px={2}
          py={2.45}
          mr={2}
          borderRadius={9}
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
