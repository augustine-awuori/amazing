import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Image,
  Grid,
  GridItem,
  GridItemProps,
  useBreakpointValue,
} from "@chakra-ui/react";

import { Button, Heading, Text } from "../../components";
import listing from "../../assets/listing.png";
import request from "../../assets/quotes.png";
import shop from "../../assets/shop.png";
import utils from "../../utils/funcs";

interface FeatureProps extends Feature {
  index: number;
}

interface Feature {
  description: string;
  heading: string;
  image: string;
  url: string;
}

const FeatureGridItem = ({ children }: GridItemProps) => (
  <GridItem rowGap="2rem" columnGap="4rem" mt="3rem">
    {children}
  </GridItem>
);

const Feature = ({ description, heading, image, index, url }: FeatureProps) => {
  const navigate = useNavigate();
  const bigScreen = useBreakpointValue({ md: true, lg: true });

  const ImageCom = (
    <Image
      src={image}
      alt="img"
      w="100%"
      objectFit="contain"
      data-aos="zoom-in"
    />
  );

  const Details = (
    <FeatureGridItem>
      <Heading color="#1b0760" fontSize="2.2rem" as="h3" mt={4}>
        {heading}
      </Heading>
      <Text color="gray.500" fontSize="1.3rem" fontWeight="bold" mt={3}>
        {description}
      </Text>
      <Button color="red" mt={2} fontSize="md" onClick={() => navigate(url)}>
        Create One
      </Button>
    </FeatureGridItem>
  );

  const switchItems = bigScreen ? utils.isOdd(index) : false;

  return (
    <Grid
      templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
      gap={{ base: "4rem", md: "2rem" }}
    >
      {switchItems ? ImageCom : Details}
      {switchItems ? Details : ImageCom}
    </Grid>
  );
};

const features: Feature[] = [
  {
    description:
      "Experience the power of limitless reach, 24/7 accessibility, and seamless transactions – your shop, now thriving in the digital spotlight!",
    heading: "Online Shop",
    image: shop,
    url: "/shops/new",
  },
  {
    description:
      "Unlock a treasure trove of student-to-student deals! Items such as bed or chair",
    heading: "Listing",
    image: listing,
    url: "/listings/new",
  },
  {
    description:
      "When you're on the hunt for something special, and it's not there yet, just request it. Someone might just have it.",
    heading: "Request",
    image: request,
    url: "/requests/new",
  },
];

const FeaturesSection = () => (
  <Box data-aos="fade-up" py="2rem">
    <Container maxW="container.lg">
      <Heading
        color="#1b0760"
        fontSize="2.4rem"
        fontWeight="bold"
        mb={5}
        textAlign="center"
      >
        The Magic of Campus Mart
      </Heading>
      <Text color="gray.500" textAlign="center">
        How much can you show with a single glance? Can you risk it all on a
        fleeting moment? Ready to Embark?
      </Text>
      {features.map((feature, index) => (
        <Feature key={index} {...feature} index={index} />
      ))}
    </Container>
  </Box>
);

export default FeaturesSection;
