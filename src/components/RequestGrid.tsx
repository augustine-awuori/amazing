import { useState } from "react";
import { Box, Text } from "@chakra-ui/react";

import { Category } from "../hooks/useCategories";
import { paginate } from "../utilities/paginate";
import { Request } from "../hooks/useRequest";
import CardContainer from "./CardContainer";
import CardSkeleton from "./CardSkeleton";
import Grid from "./Grid";
import Pagination from "./common/Pagination";
import RequestCard from "./RequestCard";
import useRequests from "../hooks/useRequests";

interface Props {
  selectedCategory: Category | null;
  onRequestClick: (request: Request) => void;
  userId?: string | undefined;
}

const RequestGrid = ({ onRequestClick, selectedCategory, userId }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(9);
  const { error, isLoading, data: requests } = useRequests();
  const skeletons = [1, 2, 3, 4, 5, 6];

  const byUser = userId
    ? requests.filter((request) => request.author._id === userId)
    : requests;

  const filtered = selectedCategory?._id
    ? byUser.filter((request) => request.category._id === selectedCategory?._id)
    : byUser;

  const paginated: Request[] = paginate(filtered, currentPage, pageSize);

  if (error) return <Text>{error}</Text>;

  return (
    <>
      <Grid>
        {isLoading &&
          skeletons.map((skeleton) => (
            <CardContainer key={skeleton}>
              <CardSkeleton height="20px" />
            </CardContainer>
          ))}
        {paginated.map((request) => (
          <CardContainer key={request._id}>
            <RequestCard request={request} onClick={onRequestClick} />
          </CardContainer>
        ))}
      </Grid>
      <Box mt={5}>
        <Pagination
          currentPage={currentPage}
          itemsCount={requests.length}
          onPageChange={setCurrentPage}
          pageSize={pageSize}
        />
      </Box>
    </>
  );
};

export default RequestGrid;
