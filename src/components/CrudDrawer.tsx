import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from '@chakra-ui/react';
import React from 'react';

interface CrudDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  mode:
    | 'job-edit'
    | 'job-create'
    | 'job-details'
    | 'user-edit'
    | 'user-create'
    | 'user-details'
    | '';
  children: React.ReactNode;
}

const CrudDrawer: React.FC<CrudDrawerProps> = ({
  isOpen,
  onClose,
  mode,
  children,
}) => {
  let headerText = '';
  switch (mode) {
    case 'job-edit':
      headerText = 'Edit Job';
      break;
    case 'job-create':
      headerText = 'Create Job Advert';
      break;
    case 'job-details':
      headerText = 'Job Details';
      break;

    case 'user-edit':
      headerText = 'Edit User';
      break;
    case 'user-create':
      headerText = 'Create New User';
      break;
    case 'user-details':
      headerText = 'User Details';
      break;
    default:
      headerText = '';
  }
  return (
    <Drawer placement='right' size='lg' onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerHeader>{headerText}</DrawerHeader>
          <DrawerBody p='4'>{children}</DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default CrudDrawer;
