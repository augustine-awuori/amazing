import { Card, CardProps } from "@chakra-ui/react";

const AppCard = ({ children, onClick }: CardProps) => (
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
