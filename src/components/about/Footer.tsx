import { Children, ReactNode } from "react";
import { Box, Link, Grid, Flex, Image, FlexProps } from "@chakra-ui/react";

import Text from "../../components/Text";
import logo from "../../assets/logo.png";

interface Children {
  children: ReactNode;
}

const TextLinkHeader = ({ children }: Children) => (
  <Text fontSize="1.6rem" textTransform="uppercase" fontWeight="600">
    {children}
  </Text>
);

const TextLink = ({ children }: Children) => (
  <Link color="#777" transition="color 0.3s" _hover={{ color: "#fff" }}>
    {children}
  </Link>
);

const FooterItem = ({ children }: FlexProps) => (
  <Flex
    direction="column"
    py="1rem"
    px=".65rem"
    borderBottom={{ base: "1px solid #393939", md: 0 }}
    textAlign={{ base: "center", md: "left" }}
  >
    {children}
  </Flex>
);

interface Data {
  heading: string;
  items: string[];
}

const data: Data[] = [
  { heading: "Company", items: ["BABY Software Co", "Campus Life LLC"] },
  { heading: "Support", items: ["+254 7967 20289", "We Trust In God"] },
  {
    heading: "Domains",
    items: ["kisiiuniversemart.digital", "campusmart.site", "codewithmosh.com"],
  },
];

const Footer = () => (
  <Box bg="#232323" color="#fff" mt={10} px={{ md: 10 }}>
    <Grid
      templateColumns={{
        base: "1fr",
        md: "repeat(auto-fit, minmax(6rem, 1fr))",
      }}
      gap="4"
      paddingY="8"
    >
      {data.map((item) => (
        <FooterItem>
          <TextLinkHeader>{item.heading}</TextLinkHeader>
          {item.items.map((subItem) => (
            <TextLink>{subItem}</TextLink>
          ))}
        </FooterItem>
      ))}

      <Flex direction="column" paddingY="6" textAlign="center">
        <Image src={logo} alt="logo" maxW="100px" w="100%" alignSelf="center" />
        <Text
          fontSize="1.5rem"
          color="#fff"
          opacity="0.3"
          marginTop="1rem"
          textAlign="center"
        >
          &copy; 2023 Campus Life
        </Text>
      </Flex>
    </Grid>
  </Box>
);

export default Footer;
