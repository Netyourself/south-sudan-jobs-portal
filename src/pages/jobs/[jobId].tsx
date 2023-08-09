import { useRouter } from 'next/router';
import {
  Box,
  Heading,
  Text,
  Button,
  OrderedList,
  ListItem,
} from '@chakra-ui/react';
import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { jobsData } from '@/data/data';
import Layout from '@/components/Layout';
import JobDownloadPDF from '@/components/JobsDownloadPDF';

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
  // Find the Job based on the jobId from the query
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
        <OrderedList>
          {job?.requirements.map((requirement, index) => (
            <ListItem key={index} color='gray.700' mt='2' mb='2'>
              {requirement}
            </ListItem>
          ))}
        </OrderedList>
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
        <Button
          mt='4'
          bg='blue.500'
          color='white'
          variant='outline'
          _hover={{
            borderColor: 'yellow.300',
            backgroundColor: 'yellow.500',
            color: 'white',
          }}
        >
          <Box>
            {/* Link to trigger the PDF download */}
            <PDFDownloadLink
              document={<JobDownloadPDF job={job} />}
              fileName={`${job.title} ${job.company}.pdf`}
            >
              {({ blob, url, loading, error }) =>
                loading ? 'Loading document...' : 'Download PDF'
              }
            </PDFDownloadLink>
          </Box>
        </Button>
      </Box>
    </Layout>
  );
};

export default JobDetailsPage;
