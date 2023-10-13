import { ReactNode } from "react";
import { Card } from "@chakra-ui/react";

interface Props {
  children: ReactNode;
  onClick: () => void;
}

const AppCard = ({ children, onClick }: Props) => (
  <Card
    borderRadius={10}
    cursor="pointer"
    onClick={onClick}
    overflow="hidden"
    shadow={{ purple: "0 0 0 3px purple" }}
  >
    {children}
  </Card>
);

export default AppCard;
