import {
  Card,
  CardBody,
  CardProps,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";

const CardSkeleton = ({ height = "200px", ...otherProps }: CardProps) => (
  <Card {...otherProps}>
    <Skeleton height={height} />
    <CardBody>
      <SkeletonText />
    </CardBody>
  </Card>
);

export default CardSkeleton;
