import { useState } from "react";
import { toast } from "react-toastify";
import { Box, Container, IconButton } from "@chakra-ui/react";
import { AiFillMessage } from "react-icons/ai";

import { Button, Heading, SearchInput, Text } from "..";
import service from "../../services/comments";

const DomainBlock = () => {
  const [input, setInput] = useState("");

  const handleComment = async () => {
    if (!input) return;

    const { ok } = await service.addComment(input);
    ok ? toast.success("Comment sent!") : toast.error("Comment not sent!");
  };

  const InputRightElement = (
    <Button
      backgroundColor="green.200"
      borderRadius="0"
      borderRightRadius={30}
      onClick={handleComment}
      px={8}
      type="button"
      _active={{ backgroundColor: "green.400" }}
    >
      Send
    </Button>
  );

  const InputLeftElement = (
    <IconButton
      borderRadius="30px"
      color="white"
      icon={<AiFillMessage w={1} h={1} />}
      aria-label="icon"
      transition="opacity 0.3s"
    />
  );

  return (
    <Box
      as="section"
      data-aos="fade-up"
      py={{ base: ".5rem", md: "3rem" }}
      my={{ base: "3rem", md: "0" }}
    >
      <Container maxW="1140px" margin="0 auto">
        <Heading as="h2" color="#1b0760" textAlign="center" fontSize="2.4rem">
          Leave Anonymous Comment
        </Heading>
        <Text color="blackAlpha.500" textAlign="center" my={3}>
          Any critic, feature request, advice?
        </Text>
        <Box maxW="500px" margin="0 auto">
          <SearchInput
            placeholder="Type your comment here"
            backgroundColor="gray.100"
            color="#1b0760"
            onTextChange={setInput}
            RightElement={InputRightElement}
            LeftElement={InputLeftElement}
            value={input}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default DomainBlock;
