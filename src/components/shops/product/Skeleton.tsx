import { useState } from "react";
import { Box, Flex, Skeleton, SkeletonText } from "@chakra-ui/react";

const DisplayCardSkeleton = ({ isLoading }: { isLoading: boolean }) => {
  const [skeletons] = useState([1, 2, 3, 4, 5, 6]);

  if (!isLoading) return null;

  return (
    <>
      {skeletons.map((skeleleton) => (
        <Flex display={{ base: "flex", md: "block" }} key={skeleleton}>
          <Skeleton
            borderRadius=".2rem"
            h={{ base: "8rem", md: "9.5rem" }}
            mr={{ base: 3, md: 5 }}
            w={{ sm: "60%", base: "70%", md: "100%" }}
          />
          <Box py={1} display="block" w="100%" mx={1.5}>
            <SkeletonText mb={{ base: 5 }} mt={{ base: 3 }} />
            <SkeletonText display={{ base: "block", md: "none" }} />
          </Box>
        </Flex>
      ))}
    </>
  );
};

export default DisplayCardSkeleton;
