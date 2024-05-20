import { MenuList, MenuItem, Flex, Box } from "@chakra-ui/react";

import { fontFamily } from "../../data/typography";
import { Item } from "./Selector";
import Text from "../Text";

export interface MenuListProps {
  data: Item[];
  onSelectItem: (item: Item) => void;
}

const SelectorMenuList = ({ data, onSelectItem }: MenuListProps) => (
  <MenuList>
    {data.map((item, index) => (
      <MenuItem
        key={index}
        fontFamily={fontFamily}
        onClick={() => onSelectItem(item)}
      >
        <Flex
          align="center"
          letterSpacing=".59px"
          justify="space-between"
          w="100%"
        >
          <Flex align="center">
            <Box mr={2}>{item.icon}</Box>
            <Text noOfLines={1}>{item.label}</Text>
          </Flex>
          <Box
            onMouseDown={(e) => {
              e.stopPropagation();
              onSelectItem(item);
            }}
          >
            {item?.rightIcon}
          </Box>
        </Flex>
      </MenuItem>
    ))}
  </MenuList>
);

export default SelectorMenuList;
