import { Heading } from "@chakra-ui/react";
import { Category } from "../hooks/useCategories";

interface Props {
  count?: number;
  headingPrefix?: string;
  label?: string;
  selectedCategory: Category | null;
}

const GridHeading = ({
  label = "Listings",
  headingPrefix = "",
  selectedCategory,
}: Props) => {
  if (!selectedCategory?._id) return null;

  const heading = `${headingPrefix ? headingPrefix + "'s" : ""} ${
    selectedCategory.label
  }  ${label}`;

  return (
    <Heading as="h1" fontSize={22} marginY={5}>
      {heading}
    </Heading>
  );
};

export default GridHeading;
