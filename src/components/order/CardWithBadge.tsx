import { Box } from "@chakra-ui/react";

import Badge, { BadgeProps } from "./Badge";
import Card, { OrderCardProps } from "./Card";
import useTimestamp from "../../hooks/useTimestamp";

interface Props extends BadgeProps, OrderCardProps {
  timestamp: number;
}

const CardWithBadge = ({ count, timestamp, ...otherProps }: Props) => {
  const { tempTimestamp } = useTimestamp(timestamp, true);

  return (
    <Box position="relative">
      <Badge count={count - 1} />
      <Card {...otherProps} time={tempTimestamp || ""} />
    </Box>
  );
};

export default CardWithBadge;
