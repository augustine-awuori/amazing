import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, SkeletonText } from "@chakra-ui/react";

import { Button, Text } from "../components";
import { MediaQuery, Modal, PageContainer, StartChatBtn } from "../components";
import { Request } from "../hooks/useRequest";
import {
  useAppColorMode,
  useCurrentUser,
  useReload,
  useRequest,
  useRequests,
  useTimestamp,
} from "../hooks";
import empty from "../utils/empty";
import requestsService from "../services/requests";
import RequestUpdateForm from "../components/forms/RequestUpdateForm";

const RequestDetailsPage = () => {
  const { accentColor } = useAppColorMode();
  const [isModalOpen, setModalOpen] = useState(false);
  const { request: requestInfo } = useRequest();
  const navigate = useNavigate();
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const { deleteRequest } = useRequests();
  const {
    info: request,
    isLoading,
    request: getInfoFromServer,
  } = useReload<Request>(
    requestInfo,
    empty.request,
    requestsService.getRequest
  );
  const { tempTimestamp } = useTimestamp(request.timestamp);
  const isTheAuthor = useCurrentUser(request.author._id);

  useEffect(() => {
    getInfoFromServer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const switchModalVisibility = () => setModalOpen(!isModalOpen);

  const navigateToProfile = () => navigate(`/profile/${request?.author._id}`);

  const switchEditModalVisibility = () => setEditModalOpen(!isEditModalOpen);

  const switchDeleteModalVisibility = () =>
    setDeleteModalOpen(!isDeleteModalOpen);

  const showEditForm = () => {
    switchModalVisibility();
    switchEditModalVisibility();
  };

  const promptDeletion = () => {
    switchModalVisibility();
    switchDeleteModalVisibility();
  };

  const cancelModal = () => {
    switchEditModalVisibility();
    navigate(-1);
  };

  const handleDelete = () => {
    switchModalVisibility();
    switchDeleteModalVisibility();
    if (request?._id) deleteRequest(request?._id);
  };

  return (
    <PageContainer>
      <Modal
        isOpen={isDeleteModalOpen}
        title="Delete Request"
        content="Are you sure you want to delete this request permanently?"
        primaryBtnLabel="I'm sure"
        secondaryBtnLabel="Abort"
        onPrimaryClick={handleDelete}
        onSecondaryClick={switchDeleteModalVisibility}
        onModalClose={switchDeleteModalVisibility}
      />
      <Modal
        content={<RequestUpdateForm request={request} onDone={cancelModal} />}
        isOpen={isEditModalOpen}
        title="Edit Request Info"
        onModalClose={switchEditModalVisibility}
      />
      <Modal
        content="WARNING! Changes made are irreversible"
        isOpen={isModalOpen}
        onModalClose={switchModalVisibility}
        onPrimaryClick={showEditForm}
        onSecondaryClick={promptDeletion}
        primaryBtnLabel="Edit Request"
        secondaryBtnLabel="Delete Request"
        title="How'd you like to change your Request?"
      />
      <Box marginY={2} maxWidth="500px">
        <MediaQuery
          user={request?.author}
          size="md"
          time={tempTimestamp}
          onClick={navigateToProfile}
        />
      </Box>
      {isLoading ? (
        <SkeletonText mt={3} />
      ) : (
        <>
          <Text fontWeight="bold" marginBottom={1}>
            {request?.title}
          </Text>
          <Text>{request?.description}</Text>
          <Text
            fontStyle="italic"
            fontSize="sm"
            color={accentColor}
            textAlign="center"
          >
            {request?.category.label}
          </Text>
          <StartChatBtn
            phoneNumber={request?.author?.otherAccounts?.whatsapp}
          />
        </>
      )}
      {isTheAuthor && (
        <Button onClick={switchModalVisibility} my={3}>
          Edit Listing
        </Button>
      )}
    </PageContainer>
  );
};

export default RequestDetailsPage;
