import {
  Box,
  Button,
  Heading,
  HStack,
  List,
  ListItem,
  Spinner,
} from "@chakra-ui/react";

import { Item } from "./Selector";

interface Props {
  heading: string;
  isLoading: boolean;
  items: Item[];
  onSelectItem: (item: Item) => void;
  selectedItem: Item | null;
}

const AsideList = ({
  heading,
  isLoading,
  items,
  onSelectItem,
  selectedItem,
}: Props) =>
  isLoading ? (
    <Spinner />
  ) : (
    <Box display={{ base: "none", lg: "block" }}>
      <Heading fontSize={20} marginBottom={3}>
        {heading}
      </Heading>
      <List>
        {items.map((item) => (
          <ListItem key={item._id} paddingY="5px">
            <HStack>
              <Button
                fontSize="lg"
                fontFamily="andika"
                fontWeight={item._id === selectedItem?._id ? "bold" : "normal"}
                onClick={() => onSelectItem(item)}
                textAlign="left"
                variant="link"
                whiteSpace="normal"
              >
                {item?.label}
              </Button>
            </HStack>
          </ListItem>
        ))}
      </List>
    </Box>
  );

export default AsideList;
