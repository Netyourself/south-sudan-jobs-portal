import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useDisclosure,
  useMediaQuery,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import {
  FaUser,
  FaBriefcase,
  FaChartBar,
  FaPlus,
  FaEdit,
  FaTrash,
  FaBars,
  FaLock,
  FaUserLock,
} from 'react-icons/fa';
import { useRouter } from 'next/router';
import { jobsData, usersData } from '../data/data';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  postingDate: string;
  deadline: String;
  description: string;
  postedBy?: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

const Dashboard: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>(jobsData);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const [isLargerThanMd] = useMediaQuery('(min-width: 48em)');

  useEffect(() => {
    // Fetch job postings from API or database
    const fetchJobPostings = async () => {
      try {
        // TODO Replace with actual API call to fetch job postings
      } catch (error) {
        //console.error('Error fetching job postings:', error);
      }
    };

    // Fetch user data from API or database
    const fetchUsers = async () => {
      try {
        // TODO Replace with actual API call to fetch users
      } catch (error) {
        //console.error('Error fetching users:', error);
      }
    };

    fetchJobPostings();
    fetchUsers();
  }, []);

  const handleJobClick = (jobId: string) => {
    // Navigate to job details page
    router.push(`/jobs/${jobId}`);
  };

  const handleEditJob = (job: Job) => {
    setSelectedJob(job);
    onOpen();
  };

  const handleDeleteJob = (jobId: string) => {
    //TODO Perform delete operation using API or database
    // ...

    // TODO Update jobs state after successful deletion
    setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    onOpen();
  };

  const handleDeleteUser = (userId: string) => {
    // TODO Perform delete operation using API or database
    // ...

    // TODO Update users state after successful deletion
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  const renderSideMenu = () => {
    if (isLargerThanMd) {
      return (
        <Stack spacing='4' mt='4'>
          <Text
            as='b'
            fontSize='lg'
            variant='link'
            color='white'
            justifyContent='flex-start'
          >
            South Sudan Jobs Portal
          </Text>
          <Button
            leftIcon={<FaBriefcase />}
            onClick={() => router.push('/dashboard/jobs')}
            variant='link'
            color='white'
            justifyContent='flex-start'
            _hover={{ textDecoration: 'underline' }}
          >
            Jobs
          </Button>
          <Button
            leftIcon={<FaUser />}
            onClick={() => router.push('/dashboard/users')}
            variant='link'
            color='white'
            justifyContent='flex-start'
            _hover={{ textDecoration: 'underline' }}
          >
            Users
          </Button>
          <Button
            leftIcon={<FaChartBar />}
            onClick={() => router.push('/dashboard/analytics')}
            variant='link'
            color='white'
            justifyContent='flex-start'
            _hover={{ textDecoration: 'underline' }}
          >
            Analytics
          </Button>

          <Text
            as='b'
            fontSize='xl'
            variant='link'
            color='white'
            justifyContent='flex-start'
            mt='10'
          >
            Setting
          </Text>
          <Button
            leftIcon={<FaUserLock />}
            onClick={() => router.push('/setting/profile')}
            variant='link'
            color='white'
            justifyContent='flex-start'
            _hover={{ textDecoration: 'underline' }}
          >
            My Profile
          </Button>

          <Button
            leftIcon={<FaEdit />}
            onClick={() => router.push('/setting/password')}
            variant='link'
            color='white'
            justifyContent='flex-start'
            _hover={{ textDecoration: 'underline' }}
          >
            Change Passwords
          </Button>

          <Button
            leftIcon={<FaLock />}
            onClick={() => router.push('/')}
            variant='link'
            color='white'
            justifyContent='flex-start'
            _hover={{ textDecoration: 'underline' }}
          >
            Logout
          </Button>
        </Stack>
      );
    } else {
      return (
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label='Menu'
            icon={<FaBars />}
            variant='outline'
            colorScheme='blue'
            color='white'
            bg='blue.500'
            p='4'
            mt='5'
          />

          <MenuList>
            <MenuItem
              icon={<FaBriefcase />}
              onClick={() => router.push('/dashboard/jobs')}
            >
              Jobs
            </MenuItem>
            <MenuItem
              icon={<FaUser />}
              onClick={() => router.push('/dashboard/users')}
            >
              Users
            </MenuItem>
            <MenuItem
              icon={<FaChartBar />}
              onClick={() => router.push('/dashboard/analytics')}
            >
              Analytics
            </MenuItem>
            <MenuItem
              icon={<FaUserLock />}
              onClick={() => router.push('/setting/profile')}
            >
              My Profile
            </MenuItem>
            <MenuItem
              icon={<FaEdit />}
              onClick={() => router.push('/setting/password')}
            >
              Change Password
            </MenuItem>
            <MenuItem icon={<FaLock />} onClick={() => router.push('/')}>
              Logout
            </MenuItem>

            {/* <MenuItem onClick={() => router.push('/dashboard/analytics')}>
              <HStack spacing='2'>
                <Icon as={FaChartBar} />
                <Text>Analytics...</Text>
              </HStack>
            </MenuItem> */}

            {/* more menu items */}
          </MenuList>
        </Menu>
      );
    }
  };

  return (
    <Box display='flex' minHeight='100vh'>
      {/* Side Menu */}
      <Box
        bg={isLargerThanMd ? 'blue.500' : 'white'}
        p={isLargerThanMd ? '4' : '0'}
        color='blue.500'
        width={isLargerThanMd ? '250px' : '50px'}
      >
        {renderSideMenu()}
      </Box>

      {/* Main Content */}
      <Box p='4' flex='1'>
        <Heading size='lg' mb='4' color='blue.500'>
          Dashboard
        </Heading>
        {/* Job Postings */}
        <Box bg='white' p='4' borderRadius='md' boxShadow='md' mb='4'>
          <Heading size='md' mb='2' color='blue.500'>
            Job Postings
          </Heading>
          <Button
            leftIcon={<FaPlus />}
            size='md'
            colorScheme='blue'
            // onClick={createJob}
            mt='4'
            mb='8'
          >
            Add Job
          </Button>
          <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={4}>
            {jobs.map((job) => (
              <GridItem
                key={job.id}
                borderWidth='1px'
                borderRadius='md'
                p='2'
                cursor='pointer'
                onClick={() => handleJobClick(job.id)}
                transition='all 0.3s'
                _hover={{ transform: 'scale(1.02)', borderColor: 'blue.300' }}
              >
                <Text fontSize='lg' fontWeight='bold' color='blue.700'>
                  {job.title}
                </Text>
                <Text fontSize='sm' color='blue.600' mb='1'>
                  {job.company}
                </Text>
                <Text fontSize='sm' color='blue.500' mb='1'>
                  Location: {job.location}
                </Text>
                <Stack direction='row' mt='2'>
                  <Text fontSize='sm' color='blue.700'>
                    Posted on {job.postingDate}
                  </Text>
                  <Text fontSize='sm' color='blue.700'>
                    Deadline {job.deadline}
                  </Text>
                </Stack>
                <Text fontSize='sm' color='blue.500' mb='1'>
                  Posted by: {job?.postedBy || 'Admin'}
                </Text>

                <Stack direction='row' mt='2'>
                  <Button
                    leftIcon={<FaEdit />}
                    size='sm'
                    colorScheme='blue'
                    variant='outline'
                    onClick={() => handleEditJob(job)}
                  >
                    Edit
                  </Button>
                  <Button
                    leftIcon={<FaTrash />}
                    size='sm'
                    colorScheme='red'
                    variant='outline'
                    onClick={() => handleDeleteJob(job.id)}
                  >
                    Delete
                  </Button>
                </Stack>
              </GridItem>
            ))}
          </Grid>
        </Box>

        {/* User Management */}
        <Box bg='white' p='4' borderRadius='md' boxShadow='md'>
          <Heading size='md' mb='2' color='blue.500'>
            User Management
          </Heading>
          <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={4}>
            {usersData.map((user) => (
              <GridItem
                key={user.id}
                borderWidth='1px'
                borderRadius='md'
                p='2'
                cursor='pointer'
                onClick={() => handleEditUser(user)}
                transition='all 0.3s'
                _hover={{ transform: 'scale(1.02)', borderColor: 'blue.300' }}
              >
                <Text fontSize='lg' fontWeight='bold' color='blue.700'>
                  {user.name}
                </Text>
                <Text fontSize='sm' color='gray.600' mb='1'>
                  {user.email}
                </Text>
                <Text fontSize='sm' color='gray.500' mb='1'>
                  Role: {user.role}
                </Text>
                <Stack direction='row' mt='2'>
                  <Button
                    leftIcon={<FaEdit />}
                    size='sm'
                    colorScheme='blue'
                    variant='outline'
                    onClick={() => handleEditUser(user)}
                  >
                    Edit
                  </Button>
                  <Button
                    leftIcon={<FaTrash />}
                    size='sm'
                    colorScheme='red'
                    variant='outline'
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Delete
                  </Button>
                </Stack>
              </GridItem>
            ))}
          </Grid>
        </Box>
      </Box>

      {/* Drawer for CRUD operations */}
      <Drawer placement='right' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerHeader>Edit Job</DrawerHeader>
            <DrawerBody p='4'>{/* Content for CRUD operations */}</DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Box>
  );
};

export default Dashboard;
