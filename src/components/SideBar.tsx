import { Box, Flex } from "@chakra-ui/react";
import { BiPlusCircle } from "react-icons/bi";

import { Button, Text } from "./";
import { useAppColorMode } from "../hooks";
import SideItem from "./nav/SideItem";

export type SideBarItem = {
  icon: JSX.Element;
  label: string;
};

interface Props {
  buttonLabel: string;
  Icon: JSX.Element;
  items: SideBarItem[];
  onButtonClick: () => void;
  onItemSelect: (label: string) => void;
  selectedItemLabel: string;
  pageTitle: string;
}

const SideBar = ({
  buttonLabel,
  Icon,
  items,
  pageTitle,
  onButtonClick,
  onItemSelect,
  selectedItemLabel,
}: Props) => {
  const { accentColor, isDarkMode } = useAppColorMode();

  return (
    <>
      <Box w="100%" pt={3} h="80%">
        <Flex align="center" mb={5} fontSize="xl" justify="center">
          {Icon}
          <Flex ml={1}>
            <Text
              color={isDarkMode ? "inherit" : "gray.900"}
              fontWeight="extrabold"
            >
              amazing
            </Text>
            <Text
              fontWeight="extrabold"
              color="orange.400"
              textTransform="lowercase"
            >
              {pageTitle}
            </Text>
          </Flex>
        </Flex>
        {items.map(({ icon, label }, index) => (
          <SideItem
            Icon={icon}
            label={label}
            key={index}
            onClick={() => onItemSelect(label)}
            selected={selectedItemLabel.toLowerCase() === label.toLowerCase()}
          />
        ))}
      </Box>
      <Button
        mt={8}
        borderRadius={30}
        bg={accentColor}
        _hover={{ bg: "orange.400" }}
        w="100%"
        letterSpacing={1}
        leftIcon={<BiPlusCircle />}
        onClick={onButtonClick}
      >
        {buttonLabel}
      </Button>
    </>
  );
};

export default SideBar;
