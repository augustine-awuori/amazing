import { ReactNode } from "react";
import { Card } from "@chakra-ui/react";

interface Props {
  children: ReactNode;
  onClick: () => void;
}

const AppCard = ({ children, onClick }: Props) => (
  <Card
    shadow={{ purple: "0 0 0 3px purple" }}
    cursor="pointer"
    onClick={onClick}
  >
    {children}
  </Card>
);

export default AppCard;
