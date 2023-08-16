import { Heading } from "@chakra-ui/react";
import { Category } from "../hooks/useCategories";

interface Props {
  count?: number;
  selectedCategory: Category | null;
}

const GameHeading = ({ selectedCategory }: Props) => {
  if (!selectedCategory?._id) return null;

  const heading = `${selectedCategory.label}  Listings`;

  return (
    <Heading as="h1" fontSize={22} marginY={5}>
      {heading}
    </Heading>
  );
};

export default GameHeading;
