import { Avatar } from "@chakra-ui/react";

interface Props {
  name: string;
  src: string;
}

const AppAvatar = ({ name, src = "" }: Props) => (
  <Avatar name={name} src={src} size="xl" />
);

export default AppAvatar;
