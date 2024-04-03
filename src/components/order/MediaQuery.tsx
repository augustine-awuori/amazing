import { Box, Flex } from "@chakra-ui/react";

import { Avatar } from "../common";
import { Text } from "..";

interface Props {
  image: string;
  subTitle?: string;
  title: string;
}

const MediaQuery = ({ image, title, subTitle }: Props) => (
  <Flex align="center">
    <Avatar src={image} name={title} size="sm" mr={2} />
    <Box>
      <Text noOfLines={1} fontSize="sm" textTransform="capitalize">
        {title}
      </Text>
      <Flex align="center">
        {subTitle && (
          <Text color="whiteAlpha.500" fontSize="xs" ml={1}>
            {subTitle}
          </Text>
        )}
      </Flex>
    </Box>
  </Flex>
);

export default MediaQuery;
