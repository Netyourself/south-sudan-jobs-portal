import { Box, Button, Heading, Input, Stack, Text } from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import Layout from '../components/Layout';
import { jobsData } from '../data/data';

const HomePage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(5);
  const [showNextPage, setShowNextPage] = useState(true);

  const jobs = jobsData;
  const router = useRouter();

  const handleJobClick = (jobId: string) => {
    router.push(`/jobs/${jobId}`);
  };

  const handleSearchClick = () => {
    // Implement your search logic here
  };

  const handleLoadMoreClick = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs?.slice(0, indexOfLastJob);

  useEffect(() => {
    if (currentJobs && currentJobs.length === jobs.length) {
      setShowNextPage(false);
    }
  }, [currentJobs, jobs]);

  return (
    <Layout>
      <Box bg='blue.500' p='4' mb='4' textAlign='center'>
        <Heading color='white'>Welcome to the South Sudan Jobs Portal</Heading>
      </Box>
      <Box p='4' mb='4' textAlign='center'>
        <Heading color='blue.500' fontSize='xl'>
          Find your dream job in South Sudan
        </Heading>
      </Box>
      <Box bg='white' p='4' maxWidth={{ base: '95%', md: '1000px' }} mx='auto'>
        <Stack direction='row' spacing='4' align='center' mb='4'>
          <Input
            placeholder='Search jobs...'
            size='md'
            variant='filled'
            flex='1'
            _placeholder={{ color: 'gray.400' }}
            _hover={{ borderColor: 'yellow.300' }}
            _focus={{ borderColor: 'blue.500' }}
            bg='white'
            color='gray.700'
            borderColor='blue.300'
          />
          <Button
            size='md'
            bg='blue.500'
            color='white'
            variant='outline'
            colorScheme='blue'
            _hover={{
              borderColor: 'yellow.300',
              backgroundColor: 'yellow.500',
              color: 'white',
            }}
            _focus={{
              borderColor: 'blue.500',
            }}
            onClick={handleSearchClick}
          >
            Search
          </Button>
        </Stack>
        {currentJobs?.map((job, index) => (
          <Box
            key={job.id}
            borderWidth='1px'
            borderRadius='md'
            p='4'
            my='4'
            boxShadow='md'
            cursor='pointer'
            onClick={() => handleJobClick(job.id)}
            transition='all 0.3s'
            _hover={{ transform: 'scale(1.02)', borderColor: 'blue.300' }}
          >
            <Heading size='lg' mb='2' color='blue.700'>
              {job.title}
            </Heading>
            <Text fontSize='sm' color='blue.600' mb='2'>
              {job.company}
            </Text>
            <Stack direction='row' spacing='4' color='gray.700' mb='0'>
              <Text fontSize='sm'>Location: {job.location}</Text>
              <Text>Posting Date: {job.postingDate}</Text>
              <Text>Deadline: {job.deadline}</Text>
            </Stack>
          </Box>
        ))}
        {showNextPage && (
          <Box textAlign='center' py='8'>
            <Button
              size='md'
              variant='solid'
              colorScheme='blue'
              _hover={{
                borderColor: 'yellow.300',
                backgroundColor: 'yellow.500',
                color: 'white',
              }}
              onClick={handleLoadMoreClick}
            >
              Load More Jobs..
            </Button>
          </Box>
        )}
      </Box>
    </Layout>
  );
};

export default HomePage;
