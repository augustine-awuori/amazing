import React from "react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";

import { Text } from "../components";
import { Pagination } from "./common";
import { PaginationProps } from "./common/Pagination";

interface Props extends PaginationProps {
  children: React.ReactNode;
  itemsCount: number;
  onViewAll: () => void;
  title: string;
}

const AdminItemList = ({
  children,
  itemsCount,
  onViewAll,
  currentPage,
  onPageChange,
  pageSize = 4,
  title,
}: Props) => {
  return (
    <>
      <Flex align="center" mb={4} justify="space-between">
        <Text fontSize="2xl" fontWeight="bold">
          {title}{" "}
          <IconButton
            icon={<>{itemsCount}</>}
            aria-label="count"
            borderRadius="100%"
            size="sm"
          />
        </Text>
        <Flex align="center">
          <Text fontWeight="bold" onClick={onViewAll} cursor="pointer">
            View All
          </Text>
          <ChevronRightIcon boxSize="5" />
        </Flex>
      </Flex>
      {children}
      <Pagination
        currentPage={currentPage}
        itemsCount={itemsCount}
        onPageChange={onPageChange}
        pageSize={pageSize}
      />
    </>
  );
};

export default AdminItemList;
