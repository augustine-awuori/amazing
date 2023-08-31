import { Link } from "react-router-dom";
import { Text } from "@chakra-ui/react";

import format from "../utilities/format";
import useWhatsAppRedirect from "../hooks/useWhatsAppRedirect";

interface Props {
  phoneNumber: string;
}

const PhoneNumber = ({ phoneNumber }: Props) => {
  const { url } = useWhatsAppRedirect(phoneNumber);

  return (
    <Link to={url} target="_blank">
      <Text>{format.phoneNumber(phoneNumber)}</Text>
    </Link>
  );
};

export default PhoneNumber;
