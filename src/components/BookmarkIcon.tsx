import { IconButton, IconButtonProps } from "@chakra-ui/react";
import { BiBookmark } from "react-icons/bi";

import { useAppColorMode } from "../hooks";

interface Props extends IconButtonProps {
  marked: boolean;
}

const BookmarkIcon = ({ marked, ...rest }: Props) => {
  const { accentColor, concAccentColor } = useAppColorMode();

  return (
    <IconButton
      {...rest}
      _hover={{ bg: marked ? concAccentColor : "#ccc" }}
      icon={<BiBookmark />}
      borderRadius={10}
      bg={marked ? accentColor : "gray.400"}
    />
  );
};

export default BookmarkIcon;
