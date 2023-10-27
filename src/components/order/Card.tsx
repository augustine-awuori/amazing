import { Card, CardBody, CardHeading, CardImage } from "../../components/card";
import UserAvatar, { MediaQueryUser } from "../../components/common/MediaQuery";

export interface OrderCardProps {
  name: string;
  image: string;
  onClick: () => void;
  user: MediaQueryUser;
  time?: string;
}

const OrderCard = ({ name, onClick, time, user, image }: OrderCardProps) => (
  <Card onClick={onClick}>
    <CardImage src={image} />
    <CardBody>
      <CardHeading mb={3}>{name}</CardHeading>
      <UserAvatar user={user} time={time} />
    </CardBody>
  </Card>
);

export default OrderCard;
