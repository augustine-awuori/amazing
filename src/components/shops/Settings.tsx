import {
  Box,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";

import { fontFamily } from "../../data/typography";
import { NavItem } from "../../data/navItems";
import DesktopSubNav from "../../components/nav/DesktopSub";

const Settings = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  const items: NavItem[] = [
    {
      label: "Edit Shop",
      href: "",
      children: [{ label: "Edit your shop", href: "" }],
    },
    {
      label: "Delete Shop",
      href: "",
      children: [{ label: "Delete your shop", href: "" }],
    },
  ];

  return (
    <>
      {items.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger="hover" placement="bottom-start">
            <PopoverTrigger>
              <Box
                as="a"
                p={2}
                href={navItem.href ?? "#"}
                fontFamily={fontFamily}
                fontSize="sm"
                fontWeight={500}
                color={linkColor}
                _hover={{ textDecoration: "none", color: linkHoverColor }}
              >
                {navItem.label}
              </Box>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow="xl"
                bg={popoverContentBgColor}
                p={4}
                rounded="xl"
                minW="sm"
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </>
  );
};

export default Settings;
