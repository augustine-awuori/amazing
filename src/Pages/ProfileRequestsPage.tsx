import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Category } from "../hooks/useCategories";
import { endpoint } from "../services/requests";
import { useProfileRequests } from "../hooks";
import empty from "../utilities/empty";
import format from "../utilities/format";
import GridPageContainer from "../components/GridPageContainer";
import RequestGrid from "../components/RequestGrid";
import useRequest, { Request } from "../hooks/useRequest";

const ProfileRequestsPage = () => {
  const navigate = useNavigate();
  const { setRequest } = useRequest();
  const params = useParams();
  const { requests } = useProfileRequests(params[empty.user.paramsId]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const navigateToDetails = (request: Request) => {
    setRequest(request);
    navigate(`${endpoint}/${request._id}`);
  };

  return (
    <GridPageContainer
      headingPrefix={format.getFirstWord(requests?.[0]?.author?.name)}
      selectedCategory={selectedCategory}
      onSelectCategory={setSelectedCategory}
    >
      <RequestGrid
        onRequestClick={navigateToDetails}
        selectedCategory={selectedCategory}
      />
    </GridPageContainer>
  );
};

export default ProfileRequestsPage;
