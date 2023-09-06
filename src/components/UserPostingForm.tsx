import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  Select,
} from '@chakra-ui/react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import FilterDropdown from './FilterDropdown';
import { roles } from '@/constants/userData';
import { User } from '@/types/user';

// Define the props for the UserPostingForm component
interface JobPostingFormProps {
  user?: User;
  onSubmit: SubmitHandler<User>; // Use the SubmitHandler type from react-hook-form
  onCancel: () => void; // onCancel is a function with no arguments
}

const UserPostingForm: React.FC<JobPostingFormProps> = ({
  user,
  onSubmit,
  onCancel,
}) => {
  const [selectedRole, setSelectedRole] = useState<string>(user?.role || '');

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<User>({ defaultValues: user });

  const handleFormSubmit: SubmitHandler<User> = (data) => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <FormControl isInvalid={!!errors.firstname}>
        <FormLabel htmlFor='firstname' color='blue.500'>
          First Name
        </FormLabel>
        <Input
          type='text'
          id='firstname'
          placeholder='First Name'
          {...register('firstname', {
            required: 'First Name is required',
          })}
          size='md'
          variant='filled'
          borderColor={errors.firstname ? 'red.500' : 'blue.500'}
        />
        <FormErrorMessage color='red.500'>
          {errors.firstname?.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.lastname}>
        <FormLabel htmlFor='lastname' color='blue.500'>
          Last Name
        </FormLabel>
        <Input
          type='text'
          id='lastname'
          placeholder='Last Name'
          {...register('lastname', {
            required: 'First Name is required',
          })}
          size='md'
          variant='filled'
          borderColor={errors.lastname ? 'red.500' : 'blue.500'}
        />
        <FormErrorMessage color='red.500'>
          {errors.lastname?.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.email}>
        <FormLabel htmlFor='email' color='blue.500'>
          Email
        </FormLabel>
        <Input
          type='text'
          id='email'
          placeholder='Valid Email'
          {...register('email', {
            required: 'Email is required',
          })}
          size='md'
          variant='filled'
          borderColor={errors.email ? 'red.500' : 'blue.500'}
          // disabled
        />
        <FormErrorMessage color='red.500'>
          {errors.email?.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.organization}>
        <FormLabel htmlFor='organization' color='blue.500'>
          Organization
        </FormLabel>
        <Input
          type='text'
          id='organization'
          placeholder='Organization or company name'
          {...register('organization', {
            required: 'Organization or Company is required',
          })}
          size='md'
          variant='filled'
          borderColor={errors.organization ? 'red.500' : 'blue.500'}
        />
        <FormErrorMessage color='red.500'>
          {errors.organization?.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.role}>
        <FormLabel htmlFor='role' color='blue.500'>
          Role
        </FormLabel>
        <Select
          id='role'
          defaultValue={selectedRole}
          placeholder='Select user role'
          {...register('role', {
            required: 'Role is required',
          })}
          colorScheme='blue'
          variant='filled'
          borderColor={errors.role ? 'red.500' : 'blue.500'}
          onChange={(e) => setSelectedRole(e.target.value)}
        >
          {roles.map((role, index) => (
            <option key={index} value={role}>
              {role}
            </option>
          ))}
        </Select>
        <FormErrorMessage color='red.500'>
          {errors.role?.message}
        </FormErrorMessage>
      </FormControl>

      <Stack direction='row' mt='2'>
        <Button
          type='submit'
          size='md'
          colorScheme='blue'
          onClick={() => {}}
          mt='4'
          mb='8'
        >
          Save
        </Button>
        <Button size='md' colorScheme='blue' onClick={onCancel} mt='4' mb='8'>
          Cancel
        </Button>
      </Stack>
    </form>
  );
};

export default UserPostingForm;
