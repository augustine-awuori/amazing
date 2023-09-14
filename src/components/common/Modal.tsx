import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";

interface Props {
  title: string;
  subTitle?: string;
  isOpen: boolean;
  content: any;
  primaryBtnLabel?: string;
  secondaryBtnLabel?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  onModalClose: () => void;
}

function AppModal({
  content,
  isOpen,
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
    onClose();
    if (onSecondaryClick) onSecondaryClick();
  };

  return (
    <>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
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
              <Button colorScheme="orange" mr={3} onClick={handlePrimaryClick}>
                {primaryBtnLabel}
              </Button>
              <Button variant="ghost" onClick={handleSecondaryClick}>
                {secondaryBtnLabel}
              </Button>
            </ModalFooter>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default AppModal;
