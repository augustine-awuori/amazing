import { Flex, Skeleton } from "@chakra-ui/react";

interface Props {
  isLoading?: boolean;
}

const BadgeSkeletons = ({ isLoading }: Props) => {
  if (!isLoading) return null;

  return (
    <Flex>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((_item, index) => (
        <Skeleton
          borderRadius={9}
          cursor="pointer"
          h={6}
          key={index}
          mr={2}
          pr={2}
          py={2.45}
          w={20}
        />
      ))}
    </Flex>
  );
};

export default BadgeSkeletons;
