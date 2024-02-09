import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  UseDisclosureProps,
} from "@chakra-ui/react";

interface Props extends UseDisclosureProps {
  Content: JSX.Element;
}

const BottomSheetModal = ({ Content, isOpen, onClose }: Props) => (
  <Modal isOpen={isOpen ? true : false} onClose={() => onClose?.()} isCentered>
    <ModalOverlay />
    <ModalContent
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      borderTopRadius="20px"
      boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
      padding={4}
      h="90vh"
    >
      <ModalBody pb={5}>{Content}</ModalBody>
    </ModalContent>
  </Modal>
);

export default BottomSheetModal;
