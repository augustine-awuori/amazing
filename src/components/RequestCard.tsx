import { Box, Text, useColorMode } from "@chakra-ui/react";
import { Request } from "../hooks/useRequest";
import UserAvatar from "./UserAvatar";

interface Props {
  onClick: (request: Request) => void;
  request: Request;
}

export default function RequestCard({ onClick, request }: Props) {
  const { colorMode } = useColorMode();

  const { author, category, description, timestamp, title } = request;

  return (
    <Box
      onClick={() => onClick(request)}
      backgroundColor={colorMode === "dark" ? "#615f5f" : "#f8f4f4"}
      paddingY={1}
      paddingX={2}
      cursor="pointer"
    >
      <Box marginBottom={1.5}>
        <UserAvatar user={author} />
      </Box>
      <Text fontWeight="bold" noOfLines={1}>
        {title}
      </Text>
      <Text marginBottom={1} noOfLines={2} fontSize="sm">
        {description}
      </Text>
      <Text textAlign="center" color="orange.400" fontSize="sm">
        {category.label}
      </Text>
    </Box>
  );
}