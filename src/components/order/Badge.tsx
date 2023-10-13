import { Badge } from "@chakra-ui/react";

export interface BadgeProps {
  count: number;
}

const CardBadge = ({ count }: BadgeProps) =>
  count > 0 ? (
    <Badge
      borderRadius={100}
      position="absolute"
      px={3}
      py={2.5}
      right={2.5}
      top={2.5}
      zIndex={1}
    >
      +{count}
    </Badge>
  ) : null;

export default CardBadge;
