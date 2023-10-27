import { ReactNode } from "react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

import { Button, Text } from "../../components";

interface Props {
  title?: string;
  subTitle?: string;
  isOpen: boolean;
  isLoading?: boolean | undefined;
  content: ReactNode;
  primaryBtnLabel?: string;
  secondaryBtnLabel?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  onModalClose: () => void;
}

function AppModal({
  content,
  isOpen,
  isLoading,
  onModalClose,
  onPrimaryClick,
  onSecondaryClick,
  primaryBtnLabel,
  secondaryBtnLabel,
  subTitle,
  title,
}: Props) {
  const { onClose } = useDisclosure();

  const handlePrimaryClick = () => {
    onClose();
    if (onPrimaryClick) onPrimaryClick();
  };

  const handleSecondaryClick = () => {
    if (isLoading) return;

    onClose();

    onSecondaryClick ? onSecondaryClick() : onModalClose();
  };

  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onModalClose}>
      <ModalOverlay />
      <ModalContent>
        {title && <ModalHeader>{title}</ModalHeader>}
        <ModalCloseButton />
        <ModalBody>
          {subTitle && (
            <Text fontWeight="bold" mb="1rem">
              {subTitle}
            </Text>
          )}
          {content}
        </ModalBody>
        {primaryBtnLabel && secondaryBtnLabel && (
          <ModalFooter>
            <Button
              colorScheme="orange"
              isLoading={isLoading}
              mr={3}
              onClick={handlePrimaryClick}
              type="submit"
            >
              {primaryBtnLabel}
            </Button>
            <Button
              disabled={isLoading}
              variant="ghost"
              onClick={handleSecondaryClick}
            >
              {secondaryBtnLabel}
            </Button>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
}

export default AppModal;
