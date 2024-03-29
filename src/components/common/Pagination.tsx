import { HStack, Box, BoxProps } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import _ from "lodash";

import Button from "../Button";

export interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  pageSize: number;
}

interface Props extends PaginationProps, BoxProps {
  itemsCount: number;
}

const Pagination = ({
  itemsCount,
  currentPage,
  onPageChange,
  pageSize,
  ...boxProps
}: Props) => {
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);

  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < pagesCount;

  return (
    <Box maxW="100%" overflowX="auto" mb={4} {...boxProps} mt={5}>
      <HStack spacing={4} justify="center" align="center">
        {canGoPrevious && (
          <Button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={!canGoPrevious}
            colorScheme="teal"
          >
            <ChevronLeftIcon />
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
            colorScheme="teal"
            disabled={!canGoNext}
            onClick={() => onPageChange(currentPage + 1)}
          >
            <ChevronRightIcon />
          </Button>
        )}
      </HStack>
    </Box>
  );
};

export default Pagination;
