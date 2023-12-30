import { ResponsiveValue } from "@chakra-ui/react";

import CardContainer from "./Container";
import CardSkeleton from "./Skeleton";
import utils from "../../utils/figure";

interface Props {
  isLoading: boolean;
  height?: ResponsiveValue<string | number> | undefined;
  pageSize?: number;
}

const CardSkeletons = ({ isLoading, height, pageSize }: Props) => (
  <>
    {isLoading && (
      <>
        {utils.getArrayUpTo(pageSize || 6).map((skeleton) => (
          <CardContainer key={skeleton}>
            <CardSkeleton height={height} />
          </CardContainer>
        ))}
      </>
    )}
  </>
);

export default CardSkeletons;
