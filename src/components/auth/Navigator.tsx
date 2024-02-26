import { Text } from "../";
import { useAppColorMode } from "../../hooks";

interface Props {
  action: string;
  onClick: () => void;
  question: string;
}

const Navigator = ({ action, onClick, question }: Props) => {
  const { accentColor } = useAppColorMode();

  return (
    <Text
      mt={4}
      fontSize="xs"
      textAlign="center"
      onClick={onClick}
      cursor="pointer"
    >
      {question}{" "}
      <Text display="inline-flex" color={accentColor}>
        {action}
      </Text>
    </Text>
  );
};

export default Navigator;
