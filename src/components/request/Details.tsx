import { Flex, Spinner } from "@chakra-ui/react";

import { CardContainer } from "../../components/card";
import useRequest from "../../hooks/useRequest";
import RequestCard from "./Card";

const Details = () => {
  const { request } = useRequest();

  if (!request)
    return (
      <Flex align="center" justify="center" w="100%" h="100%">
        <Spinner />
      </Flex>
    );

  return (
    <CardContainer>
      <RequestCard
        onClick={() => {}}
        request={request}
        descriptionNoOfLines={100}
        titleNoOfLines={100}
      />
    </CardContainer>
  );
};

export default Details;
