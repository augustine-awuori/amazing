import { Box } from "@chakra-ui/react";

import { Request } from "../../hooks/useRequest";
import { useAppColorMode, useTimestamp } from "../../hooks";
import Text from "../../components/Text";
import UserAvatar from "../common/MediaQuery";

interface Props {
  onClick: (request: Request) => void;
  request: Request;
  titleNoOfLines?: number;
  descriptionNoOfLines?: number;
}

export default function RequestCard({
  onClick,
  request,
  descriptionNoOfLines = 2,
  titleNoOfLines = 1,
}: Props) {
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
      <Text fontWeight="bold" noOfLines={titleNoOfLines}>
        {title}
      </Text>
      <Text marginBottom={1} noOfLines={descriptionNoOfLines} fontSize="sm">
        {description}
      </Text>
      <Text textAlign="center" color={accentColor} fontSize="sm">
        {category.label}
      </Text>
    </Box>
  );
}
