import { Box, Container, Image } from "@chakra-ui/react";

import { Heading, Text } from "..";
import banner from "../../assets/hero.png";
import Button from "./HeroButton";

const HeroSection = () => (
  <Box
    as="section"
    bg="gray.800"
    color="#7b858b"
    pb={{ base: "8rem", md: "8.5rem" }}
    clipPath="polygon(0% 0%, 100% 0%, 100% 90%, 0% 100%)"
  >
    <Container
      maxW="container.xl"
      display="grid"
      gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }}
      alignItems="center"
    >
      <Box
        textAlign={{ base: "center", md: "left" }}
        px={{ md: "1rem" }}
        pt={{ base: 5, lg: 0 }}
      >
        <Heading
          as="h1"
          color="white"
          data-aos="fade-right"
          fontSize="5xl"
          mt={{ base: "8rem" }}
          mb={{ base: 13 }}
        >
          Your Campus, Your Life
        </Heading>
        <Text fontSize="1.25rem" my={{ base: "3.5rem" }} color="whiteAlpha.700">
          Dive into a dynamic community where every aspect of campus life comes
          alive.
        </Text>
        <Button mb={{ base: "3.5rem" }} />
      </Box>
      <Image
        src={banner}
        alt="img"
        w="100%"
        objectFit="cover"
        data-aos="zoom-in"
        mt={{ md: 16 }}
      />
    </Container>
  </Box>
);

export default HeroSection;
