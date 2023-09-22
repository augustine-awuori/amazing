import { Avatar } from "@chakra-ui/react";

interface Props {
  name: string;
  size?: string;
  src: string;
}

const AppAvatar = ({ name, size = "xl", src = "" }: Props) => (
  <Avatar name={name} src={src} size={size} />
);

export default AppAvatar;
