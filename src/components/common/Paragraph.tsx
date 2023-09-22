import Text from "../../components/Text";

interface Props {
  children: any;
}

const Paragraph = ({ children }: Props) => (
  <>
    <Text marginTop={3}>{children} </Text>
    <br />
  </>
);

export default Paragraph;
