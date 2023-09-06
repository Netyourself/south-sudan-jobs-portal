import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from '@chakra-ui/react';

// Define a generic type for the item to be deleted
interface DeleteConfirmationModalProps<T> {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
}

const DeleteConfirmationModal = <T extends {}>({
  isOpen,
  onClose,
  onConfirm,
  itemName,
}: DeleteConfirmationModalProps<T>) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirm Deletion</ModalHeader>
        <ModalCloseButton />
        <ModalBody>Are you sure you want to delete this {itemName}?</ModalBody>
        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onConfirm}>
            Confirm
          </Button>
          <Button variant='outline' onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteConfirmationModal;
