import { Box, Flex, IconButton, useColorModeValue } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { InfoIcon } from "@chakra-ui/icons";

import { Image } from "../";
import { User } from "../../hooks/useUser";
import Cart from "./Cart";
import DesktopNav from "./Desktop";
import Text from "../../components/Text";
import logo from "../../assets/logo.png";
import useAppColorMode from "../../hooks/useAppColorMode";
import UserButton from "./UserButton";

interface Props {
  user: User | null | undefined;
  cartCount: number;
}

export default function WithSubNav({ cartCount, user }: Props) {
  const { accentColor, color } = useAppColorMode();
  const navigate = useNavigate();

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
            onClick={() => navigate("/about-app")}
            borderRadius="full"
            icon={<InfoIcon w={5} h={5} />}
            variant="ghost"
            aria-label="link"
          />
        </Flex>
        <Flex align="center" cursor="pointer" onClick={() => navigate("/")}>
          <Image src={logo} w={5} />
          <Text
            mx={1.5}
            color={useColorModeValue("gray.800", "white")}
            fontWeight="bold"
            fontSize={18}
          >
            Campus
          </Text>
          <Text fontWeight="extrabold" fontSize={18} color={accentColor}>
            Life
          </Text>
        </Flex>

        <Flex
          flex={{ base: 1 }}
          justify="center"
          align="center"
          display={{ base: "none", md: "flex" }}
        >
          <DesktopNav />
        </Flex>

        <Flex align="center" ml={{ base: 0, md: 4 }}>
          <Cart cartCount={cartCount} />
          <UserButton user={user} />
        </Flex>
      </Flex>
    </Box>
  );
}
