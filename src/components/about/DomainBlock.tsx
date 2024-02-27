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

    try {
      const { ok } = await service.addComment(input);

      if (ok) {
        toast.success("Comment sent!");
        setInput("");
      } else {
        toast.error("Comment not sent!");
      }
    } catch (error) {
      console.error("Error while sending comment:", error);
      toast.error("Failed to send comment!");
    }
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
      _hover={{ backgroundColor: "green.400" }}
    >
      Send
    </Button>
  );

  const InputLeftElement = (
    <IconButton
      borderRadius="30px"
      color="green.200"
      icon={<AiFillMessage width={6} height={6} />}
      aria-label="icon"
      transition="opacity 0.3s"
      _hover={{ color: "green.400" }}
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
          Leave an Anonymous Comment
        </Heading>
        <Text color="blackAlpha.500" textAlign="center" my={3}>
          Share your thoughts, feedback, or suggestions anonymously.
        </Text>
        <Box maxW="600px" margin="0 auto" mt={7}>
          <SearchInput
            placeholder="Type your anonymous message here"
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
