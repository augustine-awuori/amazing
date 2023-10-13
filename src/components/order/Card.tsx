import { Card, CardBody, CardHeading, CardImage } from "../../components/card";
import pic from "../../assets/pic.jpg";
import UserAvatar, { MediaQueryUser } from "../../components/common/MediaQuery";

export interface OrderCardProps {
  name: string;
  onClick: () => void;
  user: MediaQueryUser;
  time?: string;
}

const OrderCard = ({ name, onClick, time, user }: OrderCardProps) => (
  <Card onClick={onClick}>
    <CardImage src={pic} />
    <CardBody>
      <CardHeading mb={3}>{name}</CardHeading>
      <UserAvatar user={user} time={time} />
    </CardBody>
  </Card>
);

export default OrderCard;
