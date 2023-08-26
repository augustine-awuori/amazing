import {
  Avatar,
  Wrap,
  WrapItem,
  Text,
  ResponsiveValue,
} from "@chakra-ui/react";
import { GoVerified } from "react-icons/go";
import { getFirstWord } from "../utilities/format";
import { User } from "../hooks/useUser";

interface Props {
  onClick?: () => void;
  user: User | undefined;
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
  time?: string;
}

const UserAvatar = ({ user, onClick, size = "xs", time }: Props) => {
  return (
    <Wrap marginTop={1} onClick={onClick}>
      <WrapItem>
        <Avatar size={size} name={user?.name} src={user?.avatar} />
      </WrapItem>
      <WrapItem>
        <Text fontSize={size} marginRight={1}>
          {getFirstWord(user?.name)}
        </Text>
        {user?.isVerified && <GoVerified size={12} color="orange" />}
      </WrapItem>
      {time && (
        <WrapItem>
          <Text fontSize=".8rem">{time}</Text>
        </WrapItem>
      )}
    </Wrap>
  );
};

export default UserAvatar;
