import { FC, useState } from "react";
import { Flex, Text, useColorModeValue } from "@chakra-ui/react";

import { useAppColorMode } from "../../hooks";

interface Props {
  labels: string[];
  initialIndex?: number;
  onSwitch: (index: number) => void;
}

const TextSwitch: FC<Props> = ({ labels, initialIndex = 0, onSwitch }) => {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const { accentColor } = useAppColorMode();
  const bg = useColorModeValue("gray.600", "gray.300");
  const textColor = useColorModeValue("white", "gray.800");

  const handleSwitch = (index: number) => {
    setActiveIndex(index);
    onSwitch(index);
  };

  const getMarginRightExceptForTheLastItem = (index: number) =>
    index < labels.length - 1 ? 3 : 0;

  return (
    <Flex justify="center" align="center" my={3}>
      <Flex
        justify="center"
        align="center"
        cursor="pointer"
        bg={bg}
        p={2}
        borderRadius="full"
        width="auto"
      >
        {labels.map((label, index) => (
          <Text
            key={index}
            px={3}
            py={0.2}
            bg={activeIndex === index ? accentColor : bg}
            borderRadius="full"
            transition="background-color 0.3s"
            color={activeIndex === index ? "white" : textColor}
            fontWeight={activeIndex === index ? "bold" : "normal"}
            mr={getMarginRightExceptForTheLastItem(index)}
            onClick={() => handleSwitch(index)}
          >
            {label}
          </Text>
        ))}
      </Flex>
    </Flex>
  );
};

export default TextSwitch;
