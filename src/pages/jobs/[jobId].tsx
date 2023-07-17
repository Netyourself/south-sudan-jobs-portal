import { useRouter } from 'next/router';
import {
  Box,
  Image,
  Heading,
  Text,
  Button,
  CardBody,
  CardFooter,
  Stack,
  Card,
} from '@chakra-ui/react';
import React from 'react';
import Link from 'next/link';

import { jobsData } from '@/data/data';
import Layout from '@/components/Layout';

interface Job {
  id: string;
  title: string;
  location: string;
  status: boolean;
  description: string;
}

const JobDetailsPage: React.FC<Job> = () => {
  const router = useRouter();
  const { jobId } = router.query;
  // Find the Job based on the JobId from the query
  const job = jobsData.find((Job) => Job.id === jobId);
  if (!job) {
    // Render not found page component
    return <div>Job not found</div>;
  }

  // Get the data
  const {
    id,
    title,
    company,
    location,
    description,
    requirements,
    howToApply,
    postingDate,
    deadline,
  } = job;

  return (
    <Layout>
      <Box maxWidth={{ base: '95%', md: '800px' }} mx='auto' p='4'>
        <Heading size='lg' mb='4' color='blue.700'>
          {job?.title}
        </Heading>
        <Text fontSize='sm' color='gray.600' mb='2'>
          {job?.company}
        </Text>
        <Text fontSize='sm' color='gray.500' mb='4'>
          Location: {job?.location}
        </Text>
        <Text fontWeight='bold' mt='4'>
          Job Descriptions:
        </Text>

        <Text color='gray.700' mb='4'>
          {job?.description}
        </Text>
        <Text fontWeight='bold'>Requirements:</Text>
        <ul>
          {job?.requirements.map((requirement, index) => (
            <li key={index} color='gray.700' ml='4' mb='2'>
              {requirement}
            </li>
          ))}
        </ul>
        <Text fontWeight='bold' mt='4'>
          How to Apply:
        </Text>
        <Text color='gray.700' mb='4'>
          Send an email to <b> {job?.howToApply} </b>
          with your motivation letter, and cv
        </Text>
        <Text fontSize='sm' color='gray.500'>
          Posted: {job?.postingDate}
        </Text>
        <Text fontSize='sm' color='gray.500' mb='4'>
          Deadline: {job?.deadline}
        </Text>
      </Box>
    </Layout>
  );
};

export default JobDetailsPage;
