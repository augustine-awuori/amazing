import { Heading } from "@chakra-ui/react";

import { Item } from "../common/Selector";

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
  if (!selectedItem?._id) return null;

  const heading = `${headingPrefix ? headingPrefix + "'s" : ""} ${
    selectedItem.label
  }  ${label}`;

  return (
    <Heading as="h1" fontSize={22} marginY={5}>
      {heading}
    </Heading>
  );
};

export default GridHeading;
