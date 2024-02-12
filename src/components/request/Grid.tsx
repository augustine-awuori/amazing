import { useState } from "react";
import { Box } from "@chakra-ui/react";

import { CardContainer, CardSkeletons } from "../card";
import { Category } from "../../hooks/useCategories";
import { paginate } from "../../utils/paginate";
import { Request } from "../../hooks/useRequest";
import { Info, Text } from "../../components";
import Grid from "../grid";
import Pagination from "../common/Pagination";
import RequestCard from "./Card";
import useRequests from "../../hooks/useRequests";

interface Props {
  selectedCategory: Category | null;
  onRequestClick: (request: Request) => void;
  userId?: string | undefined;
  searchQuery?: string;
}

const RequestGrid = ({
  onRequestClick,
  searchQuery,
  selectedCategory,
  userId,
}: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(9);
  const { error, isLoading, data: requests } = useRequests();

  const byUser = userId
    ? requests.filter((request) => request.author._id === userId)
    : requests;

  const filtered = selectedCategory?._id
    ? byUser.filter((request) => request.category._id === selectedCategory?._id)
    : byUser;

  const queried = searchQuery
    ? filtered.filter((request) =>
        request.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filtered;

  const paginated = paginate<Request>(queried, currentPage, pageSize);

  if (error) return <Text>{error}</Text>;

  if (!paginated.length && !isLoading)
    return (
      <Box w="100%" h="100%">
        <Info show={!isLoading} />
      </Box>
    );

  return (
    <>
      <Grid columns={{ sm: 1, md: 2 }}>
        <CardSkeletons isLoading={isLoading} height="20px" />
        {paginated.map((request) => (
          <CardContainer key={request._id}>
            <RequestCard request={request} onClick={onRequestClick} />
          </CardContainer>
        ))}
      </Grid>
      <Box mt={5}>
        <Pagination
          currentPage={currentPage}
          itemsCount={queried.length}
          onPageChange={setCurrentPage}
          pageSize={pageSize}
        />
      </Box>
    </>
  );
};

export default RequestGrid;
