import { Flex, FlexProps } from "@chakra-ui/react";

import { Badge, BadgeSkeletons } from "../common";
import { funcs } from "../../utils";
import { hideScrollBarCss } from "../../data/general";
import { NewShopTypes } from "../../hooks/useShop";
import { Text } from "..";
import { useAppColorMode } from "../../hooks";
import useTypes, { Type } from "../../hooks/useTypes";

export type ShopTypes = {
  [typeId: string]: Type;
};

interface Props {
  onTypeSelect: (type: Type) => void;
  selectedTypes: ShopTypes | NewShopTypes;
}

const Container = ({ children }: FlexProps) => (
  <Flex
    overflowX="auto"
    flexWrap="nowrap"
    whiteSpace="nowrap"
    css={hideScrollBarCss}
  >
    {children}
  </Flex>
);

const ShopTypesSelector = ({ onTypeSelect, selectedTypes }: Props) => {
  const { accentColor } = useAppColorMode();
  const { types, isLoading } = useTypes();

  if (isLoading) return <BadgeSkeletons />;

  return (
    <>
      <Text mb={2}>Select Shop Types (Multiple)</Text>
      <Container mb={4}>
        {Object.values(selectedTypes).map(({ _id, label }) => (
          <Text key={_id} mr={2} color={accentColor} fontSize="sm">
            {label}
          </Text>
        ))}
      </Container>
      <Container mt={1}>
        {types
          .filter((s) => s._id)
          .map((type, index) => (
            <Badge
              key={index}
              isSelected={funcs.getBoolean(selectedTypes[type._id])}
              item={type}
              onClick={() => onTypeSelect(type)}
            />
          ))}
      </Container>
    </>
  );
};

export default ShopTypesSelector;
