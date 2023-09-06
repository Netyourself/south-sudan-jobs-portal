import React from 'react';
import {
  Box,
  Heading,
  Text,
  Button,
  OrderedList,
  ListItem,
} from '@chakra-ui/react';
import { User } from '@/types/user';
import { formatDate } from '@/utils/dateFormate';

interface UserDetailsCardProps {
  user: User;
}
const UserDetailsCard: React.FC<UserDetailsCardProps> = ({ user }) => {
  return (
    <Box maxWidth={{ base: '95%', md: '800px' }} mx='auto' p='4'>
      <Heading size='lg' mb='4' color='blue.700'>
        {user?.firstname} {user?.lastname}
      </Heading>
      <Text fontSize='sm' color='gray.500' mb='4'>
        Email: {user?.email}
      </Text>

      <Text color='gray.600' mb='2'>
        Created since: {formatDate(user?.createdon || new Date())}
      </Text>

      <Text fontWeight='bold' mt='4'>
        Organization:
      </Text>
      <Text color='gray.700' mb='4'>
        {user?.organization}
      </Text>
      <Text fontWeight='bold' mt='4'>
        Assigned Role:
      </Text>
      <Text color='gray.700' mb='4'>
        {user?.role}
      </Text>

      <Text fontWeight='bold' mt='4'>
        Created by:
      </Text>
      <Text color='gray.700' mb='4'>
        {user?.createdby || 'admin'}
      </Text>
    </Box>
  );
};

export default UserDetailsCard;
