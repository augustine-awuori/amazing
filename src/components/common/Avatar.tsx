import { Avatar, AvatarProps } from "@chakra-ui/react";

const AppAvatar = ({ size = "xl", ...rest }: AvatarProps) => (
  <Avatar {...rest} size={size} />
);

export default AppAvatar;
