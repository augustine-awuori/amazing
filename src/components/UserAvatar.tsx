import {
  Avatar,
  Wrap,
  WrapItem,
  Text,
  ResponsiveValue,
} from "@chakra-ui/react";
import { GoVerified } from "react-icons/go";
import { getFirstWord } from "../utilities/stringManipulator";
import { User } from "../hooks/useUser";

interface Props {
  onClick?: () => void;
  user: User;
  size?:
    | ResponsiveValue<
        | (string & {})
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
}

const UserAvatar = ({ user, onClick, size = "xs" }: Props) => {
  return (
    <Wrap marginTop={2} onClick={onClick}>
      <WrapItem>
        <Avatar size={size} name={user.name} src={user.avatar} />
      </WrapItem>
      <WrapItem>
        <Text fontSize={size} marginRight={1}>
          {getFirstWord(user.name)}
        </Text>
        {user.isVerified && <GoVerified size={12} color="orange" />}
      </WrapItem>
    </Wrap>
  );
};

export default UserAvatar;
