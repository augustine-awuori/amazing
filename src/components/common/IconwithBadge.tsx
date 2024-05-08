import { Box, BoxProps, IconButton } from "@chakra-ui/react";

import { useAppColorMode } from "../../hooks";

interface Props extends BoxProps {
  Icon: JSX.Element;
  showBadge?: boolean;
}

const IconWithBadge = ({ Icon, showBadge, ...otherProps }: Props) => {
  const { accentColor } = useAppColorMode();

  return (
    <Box pos="relative" {...otherProps}>
      <IconButton
        aria-label="notification-bell"
        borderRadius="full"
        size="sm"
        icon={Icon}
      />
      {showBadge && (
        <Box
          bg={accentColor}
          borderRadius="50%"
          height="8px"
          pos="absolute"
          right={-0.3}
          top={0}
          width="8px"
        />
      )}
    </Box>
  );
};

export default IconWithBadge;
