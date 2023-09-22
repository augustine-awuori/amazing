import { Box } from "@chakra-ui/react";

import { Request } from "../../hooks/useRequest";
import { useAppColorMode, useTimestamp } from "../../hooks";
import Text from "../../components/Text";
import UserAvatar from "../common/MediaQuery";

interface Props {
  onClick: (request: Request) => void;
  request: Request;
}

export default function RequestCard({ onClick, request }: Props) {
  const { author, category, description, timestamp, title } = request;
  const { accentColor, isDarkMode } = useAppColorMode();
  const { tempTimestamp } = useTimestamp(timestamp, true);

  return (
    <Box
      onClick={() => onClick(request)}
      backgroundColor={isDarkMode ? "#615f5f" : "#f8f4f4"}
      paddingY={1}
      paddingX={2}
      cursor="pointer"
    >
      <Box marginBottom={1.5}>
        <UserAvatar user={author} time={tempTimestamp} />
      </Box>
      <Text fontWeight="bold" noOfLines={1}>
        {title}
      </Text>
      <Text marginBottom={1} noOfLines={2} fontSize="sm">
        {description}
      </Text>
      <Text textAlign="center" color={accentColor} fontSize="sm">
        {category.label}
      </Text>
    </Box>
  );
}
