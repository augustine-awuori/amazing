import { Avatar, Wrap, WrapItem, ResponsiveValue } from "@chakra-ui/react";
import { FaShieldAlt } from "react-icons/fa";

import { getFirstWord } from "../../utils/format";
import Text from "../../components/Text";
import VerifiedIcon from "./VerifiedIcon";

export interface MediaQueryUser {
  _id?: string;
  avatar: string;
  name: string;
  isVerified: boolean;
  isAdmin?: boolean;
  username?: string;
  timestamp?: number;
}

interface Props {
  onClick?: () => void;
  user: MediaQueryUser | undefined;
  RightElement?: JSX.Element;
  size?:
    | ResponsiveValue<
        | (string & object)
        | "sm"
        | "md"
        | "lg"
        | "xl"
        | "2xl"
        | "2xs"
        | "xs"
        | "full"
      >
    | undefined;
  time?: string;
}

const UserAvatar = ({
  user,
  onClick,
  size = "xs",
  RightElement,
  time = "",
}: Props) => {
  return (
    <Wrap
      cursor="pointer"
      marginTop={1}
      onClick={onClick}
      justifyContent="space-between"
      alignItems="center"
      w="100%"
    >
      <WrapItem>
        <Avatar size={size} name={user?.name} src={user?.avatar} />
      </WrapItem>
      <WrapItem display="flex" alignItems="center">
        <Text marginRight={1}>{getFirstWord(user?.name)}</Text>
        <VerifiedIcon verified={user?.isVerified} />
        {user?.isAdmin && <FaShieldAlt size={10} />}
      </WrapItem>
      <WrapItem marginLeft="auto">
        {RightElement || <Text fontSize=".85rem">{time}</Text>}
      </WrapItem>
    </Wrap>
  );
};

export default UserAvatar;
