import { Text } from "@chakra-ui/react";

import { Category } from "../hooks/useCategories";
import { Request } from "../hooks/useRequest";
import CardContainer from "./CardContainer";
import CardSkeleton from "./CardSkeleton";
import Grid from "./Grid";
import RequestCard from "./RequestCard";
import useRequests from "../hooks/useRequests";

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
    <Grid>
      {isLoading &&
        skeletons.map((skeleton) => (
          <CardContainer key={skeleton}>
            <CardSkeleton height="20px" />
          </CardContainer>
        ))}
      {filtered.map((request) => (
        <CardContainer key={request._id}>
          <RequestCard request={request} onClick={onRequestClick} />
        </CardContainer>
      ))}
    </Grid>
  );
};

export default ListingGrid;
