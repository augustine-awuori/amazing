import { GoVerified } from "react-icons/go";

interface Props {
  verified: boolean | undefined;
}

const VerifiedIcon = ({ verified }: Props) => {
  if (verified) return <GoVerified size={10} color="orange" />;

  return null;
};

export default VerifiedIcon;
