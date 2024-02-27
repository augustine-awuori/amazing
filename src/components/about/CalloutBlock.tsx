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
          What's Our Mission?
        </Heading>
        <Text color="#fff" fontSize="1.2rem">
          At Amazing, we're on a mission to digitally unite hearts, minds, and
          campuses. Join our tech-driven journey and be a part of our vision to
          create a hassle-free community. Click the button below to get started!
        </Text>
      </Box>
      <StartChatBtn phoneNumber={APP_PHONE_NUMBER} />
    </Grid>
  </Box>
);

export default Callout;
