import { Button, HStack } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import _ from "lodash";

interface Props {
  itemsCount: number;
  onPageChange: (page: number) => void;
  pageSize: number;
  currentPage?: number;
}

const Pagination = ({
  itemsCount,
  currentPage = 1,
  onPageChange,
  pageSize,
}: Props) => {
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);

  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < pagesCount;

  return (
    <HStack spacing={4} justify="center" align="center">
      {canGoPrevious && (
        <Button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!canGoPrevious}
          leftIcon={<ChevronLeftIcon />}
          colorScheme="teal"
        >
          Prev
        </Button>
      )}

      {pages.map((page) => (
        <Button
          key={page}
          onClick={() => onPageChange(page)}
          colorScheme={currentPage === page ? "teal" : "gray"}
        >
          {page}
        </Button>
      ))}

      {canGoNext && (
        <Button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!canGoNext}
          rightIcon={<ChevronRightIcon />}
          colorScheme="teal"
        >
          Next
        </Button>
      )}
    </HStack>
  );
};

export default Pagination;
