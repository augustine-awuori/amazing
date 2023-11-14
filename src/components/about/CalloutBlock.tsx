import { Box, Heading, Text, Grid } from "@chakra-ui/react";

import { StartChatBtn } from "../../components";

const Callout = () => (
  <Box bg="#2584ff" color="#fff" borderRadius="5px" p="2rem" mx={5}>
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
          Our mission is to make life easier, starting with Kisii University
          students and extending beyond. We're on a tech-driven journey, and if
          you share our vision, let's join forces by clicking this button.
        </Text>
      </Box>
      <StartChatBtn phoneNumber="" />
    </Grid>
  </Box>
);

export default Callout;
