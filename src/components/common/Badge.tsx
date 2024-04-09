import { Text } from "..";
import { useAppColorMode } from "../../hooks";

export type BadgeItem = {
  _id: string;
  label: string;
};

interface Props {
  item: BadgeItem;
  isSelected: boolean;
  onClick: (item: BadgeItem) => void;
}

const Badge = ({ isSelected, item, onClick }: Props) => {
  const { accentColor } = useAppColorMode();

  return (
    <Text
      _hover={{ bg: isSelected ? accentColor : "gray.600" }}
      bg={isSelected ? accentColor : "gray.700"}
      borderRadius={9}
      cursor="pointer"
      mr={2}
      onClick={() => onClick(item)}
      px={2}
      py={2.45}
      whiteSpace="nowrap"
    >
      {item.label}
    </Text>
  );
};

export default Badge;
