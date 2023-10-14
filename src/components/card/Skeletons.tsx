import { ResponsiveValue } from "@chakra-ui/react";

import CardContainer from "./Container";
import CardSkeleton from "./Skeleton";

interface Props {
  isLoading: boolean;
  height?: ResponsiveValue<string | number> | undefined;
}

const CardSkeletons = ({ isLoading, height }: Props) => (
  <>
    {isLoading && (
      <>
        {[1, 2, 3, 4, 5, 6].map((skeleton) => (
          <CardContainer key={skeleton}>
            <CardSkeleton height={height} />
          </CardContainer>
        ))}
      </>
    )}
  </>
);

export default CardSkeletons;
