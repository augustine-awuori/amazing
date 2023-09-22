import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  useColorModeValue,
  Stack,
  Text,
  Flex,
  Icon,
} from "@chakra-ui/react";

import { NavItem } from "../../data/navItems";
import useAppColorMode from "../../hooks/useAppColorMode";

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  const { accentColor } = useAppColorMode();

  return (
    <Box
      as="a"
      href={href}
      role="group"
      display="block"
      p={2}
      rounded="md"
      _hover={{ bg: useColorModeValue("orange.50", "gray.900") }}
    >
      <Stack direction="row" align="center">
        <Box>
          <Text
            transition="all .3s ease"
            _groupHover={{ color: accentColor }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize="sm">{subLabel}</Text>
        </Box>
        <Flex
          transition="all .3s ease"
          transform="translateX(-10px)"
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify="flex-end"
          align="center"
          flex={1}
        >
          <Icon color={accentColor} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Box>
  );
};

export default DesktopSubNav;
