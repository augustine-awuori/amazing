import { Box, Flex } from "@chakra-ui/react";

import { Text } from "../../components";
import { useAppColorMode } from "../../hooks";

interface Props {
  Icon: JSX.Element;
  label: string;
  onClick: () => void;
  selected?: boolean;
}

const SideItem = ({ Icon, label, selected, ...rest }: Props) => {
  const { isDarkMode, accentColor, concAccentColor } = useAppColorMode();

  const selectedColor = selected ? "white" : "whiteAlpha.700";
  const color = isDarkMode ? selectedColor : "gray.600";
  const selectedBgColor = selected ? concAccentColor : "gray.700";

  return (
    <Flex
      {...rest}
      _hover={{ bg: isDarkMode ? selectedBgColor : accentColor }}
      align="center"
      border="0.1px solid gray"
      borderColor={selected ? accentColor : "gray.300"}
      borderRadius={19}
      bg={selected ? accentColor : "inherit"}
      cursor="pointer"
      my={2.5}
      px={2.5}
      py={2}
      w="100%"
    >
      <Box mx={2.5} color={color}>
        {Icon}
      </Box>
      <Text color={color}>{label}</Text>
    </Flex>
  );
};

export default SideItem;
