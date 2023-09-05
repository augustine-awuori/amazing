import { Category } from "../hooks/useCategories";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { GridPageContainer, RequestGrid } from "../components";
import useRequest, { Request } from "../hooks/useRequest";

const RequestsPage = () => {
  const navigate = useNavigate();
  const { setRequest } = useRequest();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const navigateToDetails = (request: Request) => {
    setRequest(request);
    navigate(`/requests/${request._id}`);
  };

  return (
    <GridPageContainer
      onSelectCategory={setSelectedCategory}
      selectedCategory={selectedCategory}
      pl={10}
      pr={0}
    >
      <RequestGrid
        onRequestClick={navigateToDetails}
        selectedCategory={selectedCategory}
      />
    </GridPageContainer>
  );
};

export default RequestsPage;
