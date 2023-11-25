import {
  Box,
  Collapse,
  Flex,
  IconButton,
  Image,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

import { User } from "../../hooks/useUser";
import Cart from "./Cart";
import DesktopNav from "./Desktop";
import logo from "../../assets/logo.svg";
import MobileNav from "./Mobile";
import Text from "../../components/Text";
import useAppColorMode from "../../hooks/useAppColorMode";
import UserButton from "./UserButton";

interface Props {
  user: User | null | undefined;
  cartCount: number;
}

export default function WithSubNav({ cartCount, user }: Props) {
  const { color } = useAppColorMode();
  const { isOpen, onToggle } = useDisclosure();
  const navigate = useNavigate();

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
        justifyContent="space-between"
        backgroundColor={color}
      >
        <Flex
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
          align="center"
        >
          <IconButton
            onClick={onToggle}
            icon={<MenuIcon w={3} h={3} />}
            variant="ghost"
            aria-label="Toggle Navigation"
          />
        </Flex>
        <Flex
          flex={{ base: 1 }}
          justify={{ base: "center", md: "flex-start" }}
          align="center"
        >
          <Flex align="center" cursor="pointer" onClick={() => navigate("/")}>
            <Image src={logo} mr={1.5} w={5} />
            <Text
              color={useColorModeValue("gray.800", "white")}
              fontWeight="bold"
              fontSize={17}
            >
              Campus Mart
            </Text>
          </Flex>

          <Flex
            display={{ base: "none", md: "flex" }}
            ml={{ base: 0, md: 10 }}
            align="center"
          >
            <DesktopNav />
          </Flex>
        </Flex>

        <Flex align="center" ml={{ base: 0, md: 4 }} justify="center">
          <Cart cartCount={cartCount} />
          <UserButton user={user} />
        </Flex>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}
