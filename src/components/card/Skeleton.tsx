import {
  Card,
  CardBody,
  ResponsiveValue,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";

interface Props {
  height?:
    | ResponsiveValue<
        | number
        | "px"
        | (string & object)
        | "sm"
        | "md"
        | "lg"
        | "xl"
        | "2xl"
        | "-moz-initial"
        | "inherit"
        | "initial"
        | "revert"
        | "revert-layer"
        | "unset"
        | "-moz-max-content"
        | "-moz-min-content"
        | "container.xl"
        | "200px"
        | string
      >
    | undefined;
}

const CardSkeleton = ({ height = "200px" }: Props) => {
  return (
    <Card>
      <Skeleton height={height} />
      <CardBody>
        <SkeletonText />
      </CardBody>
    </Card>
  );
};

export default CardSkeleton;
