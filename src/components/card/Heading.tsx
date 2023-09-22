import Heading from "../../components/Heading";

interface Props {
  children: any;
}

const AppHeading = ({ children }: Props) => (
  <Heading fontSize="2xl" noOfLines={1}>
    {children}
  </Heading>
);

export default AppHeading;
