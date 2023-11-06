import {
  Box,
  Collapse,
  Flex,
  IconButton,
  Image,
  Stack,
  useBreakpointValue,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { AiFillEdit, AiOutlineLogin, AiOutlineLogout } from "react-icons/ai";

import { User } from "../../hooks/useUser";
import Avatar from "../../components/common/Avatar";
import DesktopNav from "./Desktop";
import logo from "../../../public/app.svg";
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
  const showIcon = useBreakpointValue({ base: true, md: false });
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
        <Flex
          flex={{ base: 1 }}
          justify={{ base: "center", md: "start" }}
          onClick={() => navigate("/")}
        >
          <Image cursor="pointer" src={logo} mr={1} w={5} />
          <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            color={useColorModeValue("gray.800", "white")}
            mr={1}
          >
            <NavButton
              to="/"
              color="#fff"
              label="Campus Mart"
              fontWeight="bold"
              fontSize={17}
            />
          </Text>
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
              <NavButton
                Element={showIcon ? <AiOutlineLogout /> : undefined}
                to="/logout"
                label="Logout"
              />
              <NavButton
                Element={
                  <Avatar name={user.name} size="xs" src={user.avatar} />
                }
                to={`/profile/${user?._id}`}
              />
            </>
          ) : (
            <>
              <NavButton
                Element={showIcon ? <AiOutlineLogin /> : undefined}
                to="/login"
                label="Sign In"
              />
              <NavButton
                Element={showIcon ? <AiFillEdit /> : undefined}
                to="/register"
                label="Sign Up"
              />
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
