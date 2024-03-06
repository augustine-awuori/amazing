import { Box, Flex, IconButton } from "@chakra-ui/react";
import { BiGroup, BiSolidContact } from "react-icons/bi";

import { ChatIcon } from "../../components/icons";

interface Option {
  Icon: JSX.Element;
  label: string;
}

const options: Option[] = [
  { Icon: <ChatIcon />, label: "chats" },
  { Icon: <BiGroup />, label: "users" },
  { Icon: <BiSolidContact />, label: "contacts" },
];

interface Props {
  onOptionSelect: (label: string) => void;
  selectedOption: string;
}

const Options = ({ onOptionSelect, selectedOption }: Props) => {
  return (
    <Flex align="center" justify="space-between" px={3} my={1}>
      {options.map(({ Icon, label }, index) => (
        <Box key={index} onClick={() => onOptionSelect(label)} cursor="pointer">
          <IconButton
            icon={Icon}
            aria-label=""
            borderRadius="15px"
            p={0}
            m={0}
            bg={selectedOption === label ? "orange.400" : "inherit"}
          />
        </Box>
      ))}
    </Flex>
  );
};

export default Options;
