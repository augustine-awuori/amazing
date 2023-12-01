import { Box, Heading, Text, Grid } from "@chakra-ui/react";

import { APP_PHONE_NUMBER } from "../../data/general";
import { StartChatBtn } from "../../components";

const Callout = () => (
  <Box
    bg="#2584ff"
    color="#fff"
    borderRadius="5px"
    p="2rem"
    mx={{ base: 5, lg: 30 }}
  >
    <Grid
      alignItems="center"
      templateColumns={{ base: "1fr", md: "1fr auto" }}
      gap={4}
    >
      <Box textAlign={{ base: "center", md: "left" }} alignSelf="center">
        <Heading color="#fff" fontSize="3rem" mt={0} mb={3}>
          What's It All About?
        </Heading>
        <Text color="#fff" fontSize="1.2rem">
          Campus Mart's mission: digitally weave hearts, minds, and campuses.
          Join our tech-driven journey—click the button and unite with our
          vision.
        </Text>
      </Box>
      <StartChatBtn phoneNumber={APP_PHONE_NUMBER} />
    </Grid>
  </Box>
);

export default Callout;
