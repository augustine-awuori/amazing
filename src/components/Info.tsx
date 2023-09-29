import Heading from "./Heading";

interface Props {
  show?: boolean;
}

const Info = ({ show }: Props) => (
  <Heading color="yellow.400" fontSize="xl" show={show}>
    None found
  </Heading>
);

export default Info;
