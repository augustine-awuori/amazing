import { Box, Flex, FlexProps } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

import { Avatar } from "../common";
import { Text } from "..";

interface Props extends FlexProps {
  image: string;
  subTitle?: string;
  title: string;
}

const Profile = ({ image, subTitle, title, ...otherProps }: Props) => (
  <Flex
    _hover={{ bg: "gray.700" }}
    align="center"
    borderBottom="1px solid gray"
    cursor="pointer"
    justify="space-between"
    px={3}
    py={2}
    {...otherProps}
  >
    <Flex>
      <Avatar borderRadius="full" mr={2} name={title} size="sm" src={image} />
      <Box>
        <Text fontSize="sm">{title}</Text>
        {subTitle && (
          <Text color="whiteAlpha.600" fontSize="xs">
            {subTitle}
          </Text>
        )}
      </Box>
    </Flex>
    <ChevronRightIcon />
  </Flex>
);

export default Profile;
