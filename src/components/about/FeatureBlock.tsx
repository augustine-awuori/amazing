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
import { Feature, features } from "../../data/features";
import utils from "../../utils/funcs";
import useAppColorMode from "../../hooks/useAppColorMode";

interface FeatureProps extends Feature {
  index: number;
}

const FeatureGridItem = ({ children }: GridItemProps) => (
  <GridItem rowGap="2rem" columnGap="4rem" mt="3rem">
    {children}
  </GridItem>
);

const FeatureBlock = ({
  description,
  heading,
  image,
  imageHeight,
  index,
  url,
}: FeatureProps) => {
  const navigate = useNavigate();
  const bigScreen = useBreakpointValue({ md: true, lg: true });
  const { accentColor } = useAppColorMode();

  const ImageCom = (
    <Image
      src={image}
      alt="img"
      w="100%"
      h={imageHeight}
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
      <Button
        color={accentColor}
        mt={4}
        fontSize="md"
        border="1px"
        borderRadius="30px"
        onClick={() => navigate(url)}
        _hover={{ color: "#fff", backgroundColor: accentColor }}
      >
        Join Now
      </Button>
    </FeatureGridItem>
  );

  const switchItems = bigScreen ? utils.isOdd(index) : false;

  return (
    <Grid
      templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
      gap={{ base: "4rem", md: "2rem" }}
      alignItems="center"
    >
      {switchItems ? ImageCom : Details}
      {switchItems ? Details : ImageCom}
    </Grid>
  );
};

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
        Discover the Ease of Our Community
      </Heading>
      <Text color="gray.500" textAlign="center">
        Explore the features that make our community hassle-free and enjoyable.
        Ready to join?
      </Text>
      {features.map((feature, index) => (
        <FeatureBlock key={index} {...feature} index={index} />
      ))}
    </Container>
  </Box>
);

export default FeaturesSection;
