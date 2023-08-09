import {
  Box,
  Button,
  Heading,
  Input,
  Stack,
  HStack,
  Text,
} from '@chakra-ui/react';

import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';

import Layout from '../components/Layout';
import FilterDropdown from '@/components/FilterDropdown';
import { jobsData } from '../data/data';

const HomePage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(10);

  const jobs = jobsData;
  const router = useRouter();
  const topRef = useRef<HTMLDivElement | null>(null);
  // filters options
  const locationOptions = [
    'Awiel',
    'Abyei',
    'Terekeka',
    'Juba',
    'Wau',
    'Renk',
    'Kajokeji',
    'Torit',
    'Yambio',
    'Lire',
    'Raja',
    'Rombur',
    'Gurei',
    'Limi',
    'Mere',
    'Wudu',
    'Rumbek',
    'Ruweng',
  ];
  const jobTypeOptions = [
    'Full-Time',
    'Part-Time',
    'Contract',
    'Fix-Term',
    'Consultancy',
  ];
  const domainAreaOptions = [
    'Technology',
    'Finance',
    'Healthcare',
    'Marketing',
    'Logistics',
    'Education',
    'Agriculture',
    'Business',
  ];

  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [selectedJobType, setSelectedJobType] = useState<string>('');
  const [selectedDomainArea, setSelectedDomainArea] = useState<string>('');

  const handleLocationChange = (value: string) => {
    setSelectedLocation(value);
  };

  const handleJobClick = (jobId: string) => {
    router.push(`/jobs/${jobId}`);
  };

  const handleSearchClick = () => {
    // Implement search logic here
  };

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs?.slice(indexOfFirstJob, indexOfLastJob);

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
      <Box ref={topRef} />
      <Box bg='white' p='4' maxWidth={{ base: '95%', md: '1000px' }} mx='auto'>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={{ base: '4', md: '2' }}
          align={{ base: 'stretch', md: 'center' }}
          mb='4'
        >
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

          <FilterDropdown
            options={locationOptions}
            placeholder='Select Location'
            selectedValue={selectedLocation}
            onValueChange={handleLocationChange} // use handler function to set the selected location
          />

          <FilterDropdown
            options={jobTypeOptions}
            placeholder='Select Job Type'
            selectedValue={selectedJobType}
            onValueChange={setSelectedJobType} // set the selected job type
          />

          <FilterDropdown
            options={domainAreaOptions}
            placeholder='Select Domain Area'
            selectedValue={selectedDomainArea}
            onValueChange={setSelectedDomainArea} // set the selected domain
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
      </Box>

      <Box bg='white' p='4' maxWidth={{ base: '95%', md: '1000px' }} mx='auto'>
        {currentJobs?.map((job, index) => (
          <Box
            key={job.id}
            borderWidth='1px'
            borderRadius='md'
            p='4'
            my='4'
            boxShadow='md'
            transition='all 0.3s'
            _hover={{ transform: 'scale(1.02)', borderColor: 'blue.300' }}
          >
            <Heading
              size='lg'
              mb='2'
              color='blue.700'
              cursor='pointer'
              onClick={() => handleJobClick(job.id)}
              transition='all 0.3s'
              _hover={{
                transform: 'scale(1.02)',
                borderColor: 'blue.500',
              }}
            >
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

        <HStack spacing={2} mt={4}>
          <Button
            size='sm'
            variant='outline'
            colorScheme='blue'
            isDisabled={currentPage === 1}
            onClick={() => {
              setCurrentPage((prevPage) => prevPage - 1);
              topRef.current?.scrollIntoView({ behavior: 'auto' });
            }}
          >
            Previous
          </Button>
          {Array.from({ length: Math.ceil(jobs.length / jobsPerPage) }).map(
            (_, index) => (
              <Button
                key={index}
                size='sm'
                variant='outline'
                colorScheme='blue'
                isActive={index + 1 === currentPage}
                onClick={() => {
                  setCurrentPage(index + 1);
                  topRef.current?.scrollIntoView({ behavior: 'auto' });
                }}
              >
                {index + 1}
              </Button>
            )
          )}
          <Button
            size='sm'
            variant='outline'
            colorScheme='blue'
            isDisabled={currentPage === Math.ceil(jobs.length / jobsPerPage)}
            onClick={() => {
              setCurrentPage((prevPage) => prevPage + 1);
              topRef.current?.scrollIntoView({ behavior: 'auto' });
            }}
          >
            Next
          </Button>
        </HStack>
      </Box>
    </Layout>
  );
};

export default HomePage;
