import React from 'react';
import {
  Box,
  Heading,
  Text,
  Button,
  OrderedList,
  ListItem,
} from '@chakra-ui/react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { formatDate } from '@/utils/dateFormate';
import { Job } from '@/types/job';
import JobDownloadPDF from '@/components/JobsDownloadPDF';

interface JobDetailsCardProps {
  job: Job;
}

const JobDetailsCard: React.FC<JobDetailsCardProps> = ({ job }) => {
  return (
    <Box maxWidth={{ base: '95%', md: '800px' }} mx='auto' p='4'>
      <Heading size='lg' mb='4' color='blue.700'>
        {job?.title}
      </Heading>
      <Text fontSize='sm' color='gray.600' mb='2'>
        {job?.organization}
      </Text>
      <Text fontSize='sm' color='gray.500' mb='4'>
        Location: {job?.location}
      </Text>

      <Text fontWeight='bold' mt='4'>
        Job Descriptions:
      </Text>

      <Text color='gray.700' mb='4'>
        {job?.descriptions}
      </Text>
      <Text fontWeight='bold'>Requirements:</Text>
      <OrderedList>
        {job?.requirements?.map((requirement, index) => (
          <ListItem key={index} color='gray.700' mt='2' mb='2'>
            {requirement}
          </ListItem>
        ))}
      </OrderedList>
      <Text fontWeight='bold' mt='4'>
        How to Apply:
      </Text>
      <Text color='gray.700' mb='4'>
        Send an email to <b> {job?.howtoapply} </b> with your motivation letter,
        and cv
      </Text>
      <Text fontSize='sm' color='gray.500'>
        Posted: {formatDate(job.postingdate)}
      </Text>
      <Text fontSize='sm' color='gray.500' mb='4'>
        Deadline: {formatDate(job?.deadline)}
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
            fileName={`${job.title} ${job.organization}.pdf`}
          >
            {({ blob, url, loading, error }) =>
              loading ? 'Loading document...' : 'Download PDF'
            }
          </PDFDownloadLink>
        </Box>
      </Button>
    </Box>
  );
};

export default JobDetailsCard;
