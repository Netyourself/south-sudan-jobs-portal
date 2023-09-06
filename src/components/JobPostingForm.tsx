import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  Textarea,
} from '@chakra-ui/react';
import {
  useForm,
  FieldValues,
  Controller,
  SubmitHandler,
} from 'react-hook-form';
import DatePicker from 'react-datepicker';
import { addDays, subDays } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';

import { contractTypeOptions, domainAreaOptions } from '@/constants/jobsdata';
import { Job } from '@/types/job';

// Define the props for the JobPostingForm component
interface JobPostingFormProps {
  job?: Job;
  onSubmit: SubmitHandler<Job>; // Use the SubmitHandler type from react-hook-form
  onCancel: () => void; // onCancel is a function with no arguments
}

const JobPostingForm: React.FC<JobPostingFormProps> = ({
  job,
  onSubmit,
  onCancel,
}) => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Job>({ defaultValues: job });
  // Calculate the date n days from the current date, ensuring it stays within the same month
  const currentDate = new Date();
  const daysFromCurrentDate = new Date(currentDate);
  daysFromCurrentDate.setDate(currentDate.getDate() + 20);
  // Ensure the date doesn't exceed the maximum number of days in the current month
  const maxDaysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  if (daysFromCurrentDate.getDate() > maxDaysInMonth) {
    daysFromCurrentDate.setDate(maxDaysInMonth);
  }

  const [postingDate, setPostingDate] = useState(new Date());
  const [deadline, setDeadline] = useState(daysFromCurrentDate);

  const handleFormSubmit: SubmitHandler<Job> = (data) => {
    // TODO preprocess the posting date and deadline, then attach to the data object
    // TODO check the requirements contains commas, then put them into an array, otherwise return the single requirement

    const newdata = {
      ...data,
      requirements: [data?.requirements].flat(),
      postingdate: postingDate,
      deadline,
    };
    onSubmit(newdata);
    reset();
  };
  const [selectedContractType, setSelectedContractType] =
    useState<string>('others');
  const [selectedDomainArea, setSelectedDomainArea] =
    useState<string>('others');

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <FormControl isInvalid={!!errors.title}>
        <FormLabel htmlFor='title' color='blue.500'>
          Title
        </FormLabel>
        <Input
          type='text'
          id='title'
          placeholder='position title'
          {...register('title', {
            required: 'Position Title is required',
          })}
          size='md'
          variant='filled'
          borderColor={errors.title ? 'red.500' : 'blue.500'}
        />
        <FormErrorMessage color='red.500'>
          {errors.title?.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.organization}>
        <FormLabel htmlFor='organization' color='blue.500'>
          Hiring organization
        </FormLabel>
        <Input
          type='text'
          id='organization'
          placeholder='Organization Name'
          {...register('organization', {
            required: 'Organization is required',
          })}
          size='md'
          variant='filled'
          borderColor={errors.organization ? 'red.500' : 'blue.500'}
        />
        <FormErrorMessage color='red.500'>
          {errors.organization?.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.location}>
        <FormLabel htmlFor=' location' color='blue.500'>
          Job base location
        </FormLabel>
        <Input
          type='text'
          id=' location'
          placeholder=' location Name'
          {...register('location', {
            required: ' location is required',
          })}
          size='md'
          variant='filled'
          borderColor={errors.location ? 'red.500' : 'blue.500'}
        />
        <FormErrorMessage color='red.500'>
          {errors.location?.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.postingdate}>
        <FormLabel htmlFor='postingdate' color='blue.500'>
          Job Opening date
        </FormLabel>

        <DatePicker
          id='postingdate'
          selected={postingDate}
          onChange={(date: Date) => setPostingDate(date)}
          dateFormat='dd/MM/yyyy'
          placeholderText='Select a Job opening date'
          // size='md'
          minDate={subDays(new Date(), 5)} // posting date cant be more than 5 days ago
          maxDate={addDays(new Date(), 10)} // posting date cant be more than 10 days from current date
          //openToDate={new Date( daysFromCurrentDate)}
        />
        <FormErrorMessage color='red.500'>
          {/* Todo Error here when postingdate is not selected */}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.deadline}>
        <FormLabel htmlFor='deadline' color='blue.500'>
          Closing deadline
        </FormLabel>

        <DatePicker
          id='deadline'
          selected={deadline}
          onChange={(date: Date) => setDeadline(date)}
          dateFormat='dd/MM/yyyy'
          placeholderText='Select a Job closing deadline date'
          minDate={subDays(new Date(), 0)} // posting date cant be more than 5 days ago
        />
        <FormErrorMessage color='red.500'>
          {/* Todo Error here when postingdate is not selected */}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.contracttype}>
        <FormLabel htmlFor='contracttype' color='blue.500'>
          Contract Type
        </FormLabel>
        <Select
          defaultValue={selectedContractType}
          placeholder='Select Contract Type'
          {...register('contracttype', {
            required: 'Contract Type is required',
          })}
          colorScheme='blue'
          variant='filled'
          borderColor={errors.contracttype ? 'red.500' : 'blue.500'}
          onChange={(e) => setSelectedContractType(e.target.value)}
        >
          {contractTypeOptions.map((contract, index) => (
            <option key={index} value={contract}>
              {contract}
            </option>
          ))}
        </Select>
        <FormErrorMessage color='red.500'>
          {errors.contracttype?.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.domainarea}>
        <FormLabel htmlFor='domainarea' color='blue.500'>
          Department
        </FormLabel>
        <Select
          defaultValue={selectedDomainArea}
          placeholder='Select Department or Domain Area'
          {...register('domainarea', {
            required: 'Department is required',
          })}
          onChange={(e) => setSelectedDomainArea(e.target.value)}
        >
          {domainAreaOptions.map((area, index) => (
            <option key={index} value={area}>
              {area}
            </option>
          ))}
        </Select>
        <FormErrorMessage color='red.500'>
          {errors.domainarea?.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.descriptions}>
        <FormLabel htmlFor='descriptions' color='blue.500'>
          Descriptions
        </FormLabel>
        <Textarea
          id='descriptions'
          placeholder='Detailed Job advert descriptions'
          {...register('descriptions', {
            required: ' Descriptions is required',
          })}
          variant='filled'
          borderColor={errors.descriptions ? 'red.500' : 'blue.500'}
          style={{ height: '300px' }}
        />
        <FormErrorMessage color='red.500'>
          {errors.descriptions?.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.requirements}>
        <FormLabel htmlFor='requirements' color='blue.500'>
          Requirements
        </FormLabel>
        <Textarea
          id='requirements'
          placeholder='requirements'
          {...register('requirements', {
            required: ' Requirements are required',
          })}
          variant='filled'
          borderColor={errors.requirements ? 'red.500' : 'blue.500'}
          style={{ height: '150px' }}
        />
        <FormErrorMessage color='red.500'>
          {errors.requirements?.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.howtoapply}>
        <FormLabel htmlFor='howtoapply' color='blue.500'>
          How to apply?
        </FormLabel>
        <Textarea
          id='howtoapply'
          placeholder='howtoapply'
          {...register('howtoapply', {
            required: ' how to apply field is required',
          })}
          variant='filled'
          borderColor={errors.howtoapply ? 'red.500' : 'blue.500'}
        />
        <FormErrorMessage color='red.500'>
          {errors.howtoapply?.message}
        </FormErrorMessage>
      </FormControl>

      <Stack direction='row' mt='2'>
        <Button
          type='submit'
          size='md'
          colorScheme='blue'
          // onClick={() => {}}
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

export default JobPostingForm;
