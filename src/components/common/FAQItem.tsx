import { useState } from "react";
import {
  Box,
  Flex,
  Text,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";

import { FAQ } from "../../data/FAQs";

const MotionBox = motion(Box);

const FAQItem = ({ question, answer }: FAQ) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const questionColor = useColorModeValue("blue.500", "blue.300");
  const iconColor = useColorModeValue("gray.500", "gray.300");

  const handleToggle = () => setIsExpanded(!isExpanded);

  return (
    <Box
      borderBottom="1px solid gray"
      borderWidth="1px"
      m="0 auto"
      maxW="900px"
      mb={5}
    >
      <Flex
        align="center"
        borderRadius={10}
        cursor="pointer"
        justify="space-between"
        onClick={handleToggle}
        transition="background 0.3s ease-in-out"
      >
        <Text
          color={questionColor}
          cursor="pointer"
          fontSize="1.3rem"
          fontWeight="bold"
          letterSpacing=".5px"
          mb={4.9}
        >
          {question}
        </Text>
        <IconButton
          aria-label={isExpanded ? "Collapse" : "Expand"}
          icon={isExpanded ? <MinusIcon /> : <AddIcon />}
          color={isExpanded ? iconColor : questionColor}
          variant="ghost"
        />
      </Flex>
      <MotionBox
        animate={{ opacity: isExpanded ? 1 : 0 }}
        color="gray.600"
        display={isExpanded ? "block" : "none"}
        initial={{ opacity: 0 }}
        mb={2}
        transition={{ duration: 0.3 }}
      >
        <Text fontSize="1.1rem" letterSpacing="1px">
          {answer}
        </Text>
      </MotionBox>
    </Box>
  );
};

export default FAQItem;
