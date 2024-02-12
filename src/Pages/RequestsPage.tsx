import { useState } from "react";

import { Category } from "../hooks/useCategories";
import { Details } from "../components/request";
import { Modal, RequestGrid, Text } from "../components";
import { useAppColorMode } from "../hooks";
import useRequest, { Request } from "../hooks/useRequest";

interface Props {
  selectedCategory?: Category | null;
  onListingsPageNav?: () => void;
  searchQuery?: string;
}

const RequestsPage = ({
  onListingsPageNav,
  selectedCategory,
  ...rest
}: Props) => {
  const { accentColor } = useAppColorMode();
  const [showDetails, setShowDetails] = useState(false);
  const { setRequest } = useRequest();

  const Heading =
    "Listings' Requests (you can't find it? request it for someone to list, it just for you)";

  const handleRequestClick = (req: Request) => {
    setRequest(req);
    setShowDetails(true);
  };

  return (
    <>
      <Modal
        title="Request Full Details"
        content={<Details />}
        isOpen={showDetails}
        onModalClose={() => setShowDetails(false)}
      />
      <Text fontSize={22} display={{ base: "block", md: "none" }} mb={1}>
        {Heading}
      </Text>
      <Text
        color={accentColor}
        fontSize={20}
        cursor="pointer"
        onClick={onListingsPageNav}
      >
        Tap to see what others have already listed
      </Text>
      <RequestGrid
        {...rest}
        onRequestClick={handleRequestClick}
        selectedCategory={selectedCategory || null}
      />
    </>
  );
};

export default RequestsPage;
