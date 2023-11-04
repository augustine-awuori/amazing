import { Item } from "../common/Selector";
import Heading from "../Heading";

interface Props {
  count?: number;
  headingPrefix?: string;
  label?: string;
  selectedItem: Item | null;
}

const GridHeading = ({
  label = "Listings",
  headingPrefix = "",
  selectedItem,
}: Props) => {
  const prefix = selectedItem?.label ? headingPrefix : headingPrefix;

  const heading = `${prefix} ${selectedItem?.label || ""}  ${label}`;

  return (
    <Heading as="h1" fontSize={22} marginY={5} mt={0} pt={0} noOfLines={1}>
      {heading}
    </Heading>
  );
};

export default GridHeading;
