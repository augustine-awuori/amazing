import { Heading } from "@chakra-ui/react";
import { Category } from "../hooks/useCategories";

interface Props {
  count?: number;
  label?: string;
  selectedCategory: Category | null;
}

const GridHeading = ({ label = "Listings", selectedCategory }: Props) => {
  if (!selectedCategory?._id) return null;

  const heading = `${selectedCategory.label}  ${label}`;

  return (
    <Heading as="h1" fontSize={22} marginY={5}>
      {heading}
    </Heading>
  );
};

export default GridHeading;
