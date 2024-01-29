import { Box } from "@chakra-ui/react";
import { GoVerified } from "react-icons/go";

interface Props {
  verified: boolean | undefined;
}

const VerifiedIcon = ({ verified }: Props) =>
  verified ? (
    <Box mr={1}>
      <GoVerified size={10} color="orange" />
    </Box>
  ) : null;

export default VerifiedIcon;
