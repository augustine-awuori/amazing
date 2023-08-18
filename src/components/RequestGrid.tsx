import { SimpleGrid, Text } from "@chakra-ui/react";

import { Category } from "../hooks/useCategories";
import { Request } from "../hooks/useRequest";
import ListingCardContainer from "./ListingCardContainer";
import ListingCardSkeleton from "./ListingCardSkeleton";
import useRequests from "../hooks/useRequests";
import RequestCard from "./RequestCard";

interface Props {
  selectedCategory: Category | null;
  onRequestClick: (request: Request) => void;
}

const ListingGrid = ({ onRequestClick, selectedCategory }: Props) => {
  const { error, isLoading, data: requests } = useRequests();
  const skeletons = [1, 2, 3, 4, 5, 6];

  const filtered = selectedCategory?._id
    ? requests.filter(
        (request) => request.category._id === selectedCategory?._id
      )
    : requests;

  if (error) return <Text>{error}</Text>;

  return (
    <SimpleGrid
      columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
      padding="10px"
      spacing={6}
    >
      {isLoading &&
        skeletons.map((skeleton) => (
          <ListingCardContainer key={skeleton}>
            <ListingCardSkeleton />
          </ListingCardContainer>
        ))}
      {filtered.map((request) => (
        <ListingCardContainer key={request._id}>
          <RequestCard request={request} onClick={onRequestClick} />
        </ListingCardContainer>
      ))}
    </SimpleGrid>
  );
};

export default ListingGrid;
