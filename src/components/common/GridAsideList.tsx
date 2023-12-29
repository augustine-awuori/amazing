import { Box, HStack, List, ListItem, Spinner } from "@chakra-ui/react";

import { Button, Heading } from "../../components";
import { Item } from "./Selector";
import { scrollBarModifier } from "../../data/general";

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
      <List maxH="100vh" overflowY="scroll" css={scrollBarModifier}>
        {items.map((item) => {
          const selected = item._id === selectedItem?._id;

          return (
            <ListItem key={item._id} paddingY="5px">
              <HStack>
                <Button
                  color={selected ? "orange.400" : "whiteAlpha.700"}
                  fontSize="lg"
                  fontFamily="andika"
                  fontWeight={selected ? "bold" : "normal"}
                  onClick={() => onSelectItem(item)}
                  textAlign="left"
                  variant="link"
                  whiteSpace="normal"
                >
                  {item?.label}
                </Button>
              </HStack>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

export default AsideList;
