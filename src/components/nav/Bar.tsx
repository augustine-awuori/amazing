import { NavLink } from "react-router-dom";
import {
  Box,
  Collapse,
  Flex,
  IconButton,
  Stack,
  useBreakpointValue,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

import { User } from "../../hooks/useUser";
import DesktopNav from "./Desktop";
import format from "../../utils/format";
import MobileNav from "./Mobile";
import NavButton from "./Button";
import Text from "../../components/Text";
import useAppColorMode from "../../hooks/useAppColorMode";

interface Props {
  user: User | null | undefined;
}

export default function WithSubNav({ user }: Props) {
  const { color } = useAppColorMode();
  const { isOpen, onToggle } = useDisclosure();

  const MenuIcon = isOpen ? CloseIcon : HamburgerIcon;

  return (
    <Box
      bgColor="inherit"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={1000}
      bg={color}
    >
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH="60px"
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle="solid"
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align="center"
        backgroundColor={color}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={<MenuIcon w={3} h={3} />}
            variant="ghost"
            aria-label="Toggle Navigation"
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <NavLink to="/">
            <Text
              textAlign={useBreakpointValue({ base: "center", md: "left" })}
              fontWeight="bold"
              color={useColorModeValue("gray.800", "white")}
              fontSize={17}
              cursor="pointer"
              mr={1}
            >
              Campus Mart
            </Text>
          </NavLink>
          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          {user ? (
            <>
              <NavButton to="/logout" label="Logout" />
              <NavButton
                to={`/profile/${user?._id}`}
                label={format.getFirstWord(user?.name)}
              />
            </>
          ) : (
            <>
              <NavButton to="/login" label="Sign In" />
              <NavButton to="/register" label="Sign Up" />
            </>
          )}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}
