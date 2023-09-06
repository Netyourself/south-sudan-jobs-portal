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
import {
  domainAreaOptions,
  locationOptions,
  contractOptions,
} from '../data/data';
import { formatDate } from '@/utils/dateFormate';
import Pagination from '@/components/Pagination';
import { paginationCalculation } from '@/utils/pagination';
import { sanitizeData } from '@/utils/sanitizeInputs';
import { Job } from '@/types/job';
import { useJobs } from '@/contexts/jobsContext';

const HomePage: React.FC = () => {
  // data from context state
  const { jobs, addJob } = useJobs();

  const router = useRouter();
  const topRef = useRef<HTMLDivElement | null>(null);
  // Search criteria state variables
  const [searchInput, setSearchInput] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [selectedContract, setSelectedContract] = useState<string>('');
  const [selectedDomainArea, setSelectedDomainArea] = useState<string>('');
  const [searchFilteredJobs, setSearchFilteredJobs] = useState<Job[]>([]);
  const [searchFound, setSearchFound] = useState<Boolean | undefined>();

  // Pagination state
  const [jobsCurrentPage, setJobsCurrentPage] = useState(1);

  const itemsPerPage = 25;

  // Function to handle Jobs page changes
  const handleJobsPageChange = (page: number) => {
    setJobsCurrentPage(page);
  };
  // Utils pagination calculations
  const {
    currentPageItems: currentPageJobs,
    totalItemsPages: totalJobsPages,
    totalItems: totalJobs,
  } = paginationCalculation(jobs, itemsPerPage, jobsCurrentPage);

  const handleJobClick = (jobId: string | any) => {
    router.push(`/jobs/${jobId}`);
  };

  const handleSearchClick = () => {
    // Implement search logic here
    // sanitized inputs
    const input = sanitizeData(searchInput);
    const location = sanitizeData(selectedLocation);
    const contract = sanitizeData(selectedContract);
    const domainarea = sanitizeData(selectedDomainArea);

    // filter jobs
    const searchedJobs = jobs.filter((job) => {
      const titleMatch = input && sanitizeData(job?.title).includes(input); // Partial match for title

      const locationMatch =
        location && sanitizeData(job?.location) === location;

      const contractMatch =
        contract && sanitizeData(job?.contracttype) === contract;

      const departmentMatch =
        domainarea && sanitizeData(job?.domainarea) === domainarea;

      return titleMatch || locationMatch || contractMatch || departmentMatch;
    });

    // update state
    setSearchFilteredJobs(searchedJobs);
    searchFilteredJobs.length === 0
      ? setSearchFound(false)
      : setSearchFound(true);

    // TODO delay reset until searched data is updated on the page
    //setSearchInput(''); // upon clicking search button, reset input
    setSelectedLocation('');
    setSelectedContract('');
    setSelectedDomainArea('');
  };

  // jobs displayed on the index page
  const pageData =
    searchFilteredJobs.length !== 0 ? searchFilteredJobs : currentPageJobs;
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
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
            }}
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
            onValueChange={setSelectedLocation}
          />

          <FilterDropdown
            options={contractOptions}
            placeholder='Select Contract Type'
            selectedValue={selectedContract}
            onValueChange={setSelectedContract} // set the selected job type or we can use handler for complex implementation
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
        {
          searchFilteredJobs.length === 0 && searchFound === false && (
            <p>
              No seaarch results found! Use Another search criteria or browse
              below jobs
            </p>
          ) /*TODO design the warning message*/
        }
        {pageData?.map((job: Job) => (
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
              {job.organization}
            </Text>
            <Stack direction='row' spacing='4' color='gray.700' mb='0'>
              <Text fontSize='sm'>Location: {job.location}</Text>
              <Text>Posting Date: {formatDate(job.postingdate)}</Text>
              <Text>Deadline: {formatDate(job.deadline)}</Text>
            </Stack>
          </Box>
        ))}

        {totalJobs >= itemsPerPage && (
          <Pagination
            currentPage={jobsCurrentPage}
            totalPages={totalJobsPages}
            onPageChange={handleJobsPageChange}
          />
        )}
      </Box>
    </Layout>
  );
};

export default HomePage;
