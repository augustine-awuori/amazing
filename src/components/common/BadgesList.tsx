import { Flex, FlexProps } from "@chakra-ui/react";

import { BadgeSkeletons } from ".";
import { hideScrollBarCss } from "../../data/general";
import Badge, { BadgeItem } from "./Badge";

interface Props extends FlexProps {
  list: BadgeItem[];
  loading?: boolean;
  onItemSelect: (item: BadgeItem) => void;
  selectedItem: BadgeItem | null;
}

const BadgesList = ({
  list,
  loading,
  onItemSelect,
  selectedItem,
  ...otherProps
}: Props) => {
  if (loading) return <BadgeSkeletons />;

  return (
    <Flex
      overflowX="auto"
      flexWrap="nowrap"
      css={hideScrollBarCss}
      mt={1}
      {...otherProps}
    >
      {list.map((item, index) => (
        <Badge
          isSelected={selectedItem?._id === item._id}
          item={item}
          key={index}
          onClick={() => onItemSelect(item)}
        />
      ))}
    </Flex>
  );
};

export default BadgesList;
