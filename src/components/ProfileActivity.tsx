import { Badge } from "@chakra-ui/react";

interface Props {
  count: number;
  colorScheme?: string;
  label: string;
  onClick: () => void;
}

const ProfileActivity = ({
  colorScheme = "blue",
  count,
  label,
  onClick,
}: Props) =>
  count ? (
    <Badge m={1} colorScheme={colorScheme} cursor="pointer" onClick={onClick}>
      {count} {label}
    </Badge>
  ) : null;

export default ProfileActivity;
