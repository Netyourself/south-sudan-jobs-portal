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
import JobsPostingForm from '@/components/JobPostingForm';
import JobPostingForm from '@/components/JobPostingForm';
import DeleteConfirmationModal from '@/components/DeleteConfirmationModal';
import CrudDrawer from '@/components/CrudDrawer';
import UserPostingForm from '@/components/UserPostingForm';
import Pagination from '@/components/Pagination';
import { formatDate } from '@/utils/dateFormate';
import { paginationCalculation } from '@/utils/pagination';
import { Job } from '@/types/job';
import { User } from '@/types/user';
import { useJobs } from '@/contexts/jobsContext';
import { useUsers } from '@/contexts/userContext';
import { PDFDownloadLink } from '@react-pdf/renderer';
import JobDownloadPDF from '@/components/JobsDownloadPDF';
import JobDetailsCard from '@/components/JobsDetailsCard';
import UserDetailsCard from '@/components/UserDetailsCard';

const Dashboard: React.FC = () => {
  const { jobs, addJob, editJob, deleteJob } = useJobs();
  const { users, addUser, editUser, deleteUser } = useUsers();
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');

  const [drawerMode, setDrawerMode] = useState<
    | 'job-edit'
    | 'job-create'
    | 'job-details'
    | 'user-edit'
    | 'user-create'
    | 'user-details'
    | ''
  >('');

  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const [isLargerThanMd] = useMediaQuery('(min-width: 48em)');

  const [isEditing, setIsEditing] = useState(false); // Add this state

  const [selectedSection, setSelectedSection] = useState<
    'jobs' | 'users' | 'analytics'
  >('jobs');

  // Pagination state
  const [jobsCurrentPage, setJobsCurrentPage] = useState(1);
  const [usersCurrentPage, setUsersCurrentPage] = useState(1);

  const itemsPerPage = 5;

  // Function to handle Jobs page changes
  const handleJobsPageChange = (page: number) => {
    setJobsCurrentPage(page);
  };

  // Function to handle users page changes
  const handleUsersPageChange = (page: number) => {
    setUsersCurrentPage(page);
  };

  // Utils pagination calculations
  // Jobs pagination data
  const {
    currentPageItems: currentPageJobs,
    totalItemsPages: totalJobsPages,
    totalItems: totalJobs,
  } = paginationCalculation(jobs, itemsPerPage, jobsCurrentPage);
  // Users paginations data
  const {
    currentPageItems: currentPageUsers,
    totalItemsPages: totalUsersPages,
    totalItems: totalUsers,
  } = paginationCalculation(users, itemsPerPage, usersCurrentPage);

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

  const createJob = () => {
    setSelectedJob(null);
    setIsEditing(false); // Set editing mode to false when adding a new job
    setDrawerMode('job-create');
    onOpen();
  };

  const handleSaveJob = (data: Job) => {
    if (isEditing && selectedJob) {
      // Update existing job
      const updatedJobs = jobs.map((job) => {
        return job.id === selectedJob.id ? { ...job, ...data } : job;
      });
      editJob(updatedJobs); // update on contexts
      //setJobs(updatedJobs); // update locally
    } else {
      // Add new job
      // make api calls and wait for response before updating state
      addJob(data); // update at context
    }
    setSelectedJob(null);
    setIsEditing(false); // Set editing mode to false
    onClose();
  };
  const handleViewJob = (job: Job) => {
    // Navigate to job details page
    // router.push(`/jobs/${jobId}`);
    setSelectedJob(job);
    setDrawerMode('job-details');
    onOpen();
  };

  const handleEditJob = (job: Job) => {
    if (job?.id === undefined) return;
    setSelectedJob(job);
    setSelectedJobId(job?.id);
    setDrawerMode('job-edit');
    setIsEditing(true); // Set editing mode to true
    onOpen();
  };

  const handleCancelEdit = () => {
    setSelectedJob(null);
    setIsEditing(false); // Set editing mode to false
    onClose();
  };

  const handleDeleteJob = (jobId: string | undefined) => {
    if (jobId === undefined) return; // dont proceed if no id
    setIsDeleteModalOpen(true);
    setSelectedJobId(jobId);
  };

  const confirmDeleteJob = () => {
    const jobId = selectedJobId;
    if (jobId) {
      // TODO Perform delete operation using API or database
      // Perform the actual delete operation on backend
      // Update the jobs list as needed.
      deleteJob(jobId); // delete from context

      // Close the modal
      setIsDeleteModalOpen(false);
      setSelectedJobId('');
    }
  };

  const createUser = () => {
    setSelectedUser(null);
    setIsEditing(false); // Set editing mode to false when creating a new user
    setDrawerMode('user-create');
    onOpen();
  };
  const handleSaveUser = (data: User) => {
    if (isEditing && selectedUser) {
      // Update existing job
      const updatedUsers = users.map((user) => {
        return user.id === selectedUser.id ? { ...user, ...data } : user;
      });
      editUser(updatedUsers); // update on contexts
    } else {
      // Add new User
      // make api calls
      addUser(data);
      //setUsers([...users, { ...data }]); // Id generated on the server side
    }
    setSelectedUser(null);
    setIsEditing(false); // Set editing mode to false
    onClose();
  };
  const handleViewUser = (user: User) => {
    if (user?.id === undefined) return;
    setSelectedUser(user);
    setSelectedUserId(user?.id);
    setDrawerMode('user-details');
    onOpen();
  };

  const handleEditUser = (user: User) => {
    if (user.id === undefined) return;
    setSelectedUser(user);
    setSelectedUserId(user.id);
    setDrawerMode('user-edit');
    setIsEditing(true); // Set editing mode to true
    onOpen();
  };

  const handleDeleteUser = (userId: string | undefined) => {
    if (userId === undefined) return; // dont proceed if no id
    // Open the modal
    setIsDeleteModalOpen(true);
    setSelectedUserId(userId);
  };
  const confirmDeleteUser = () => {
    const userId = selectedUserId;
    if (userId === undefined) return;

    if (userId === undefined) return; // dont proceed if no id

    if (userId) {
      // TODO Perform delete operation using API or database
      // Perform the actual delete operation on backend
      // Update the user list as needed.
      deleteUser(userId);
      // setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      // Close the modal
      setIsDeleteModalOpen(false);
      setSelectedUserId('');
    }
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
            onClick={() => {
              setSelectedSection('jobs');
              //router.push('/dashboard/jobs');
            }}
            variant='link'
            color='white'
            justifyContent='flex-start'
            _hover={{ textDecoration: 'underline' }}
          >
            Jobs
          </Button>
          <Button
            leftIcon={<FaUser />}
            onClick={() => {
              setSelectedSection('users');

              //router.push('/dashboard/users');
            }}
            variant='link'
            color='white'
            justifyContent='flex-start'
            _hover={{ textDecoration: 'underline' }}
          >
            Users
          </Button>
          <Button
            leftIcon={<FaChartBar />}
            onClick={() => {
              setSelectedSection('analytics');
            }}
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
              onClick={() => {
                setSelectedSection('jobs');
                //router.push('/dashboard/jobs');
              }}
            >
              Jobs
            </MenuItem>
            <MenuItem
              icon={<FaUser />}
              onClick={() => {
                setSelectedSection('users');
              }}
            >
              Users
            </MenuItem>
            <MenuItem
              icon={<FaChartBar />}
              onClick={() => {
                setSelectedSection('analytics');
              }}
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
        {selectedSection === 'jobs' && (
          <Box bg='white' p='4' borderRadius='md' boxShadow='md' mb='4'>
            <Heading size='md' mb='2' color='blue.500'>
              Job Postings
            </Heading>
            <Button
              leftIcon={<FaPlus />}
              size='md'
              colorScheme='blue'
              // onClick={createJob}
              onClick={createJob}
              mt='4'
              mb='8'
            >
              Add Job
            </Button>
            <Grid
              templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}
              gap={4}
            >
              {currentPageJobs.map((job) => (
                <GridItem
                  key={job.id}
                  borderWidth='1px'
                  borderRadius='md'
                  p='2'
                >
                  <Text
                    fontSize='2xl'
                    fontWeight='bold'
                    color='blue.700'
                    cursor='pointer'
                    onClick={() => handleViewJob(job)}
                    transition='all 0.3s'
                    _hover={{
                      transform: 'scale(1.02)',
                      borderColor: 'blue.300',
                    }}
                  >
                    {/* {console.log('test data', job, jobs)} */}
                    {job.title}
                  </Text>
                  <Text fontSize='sm' color='blue.600' mb='1'>
                    {job.organization}
                  </Text>
                  <Text fontSize='sm' color='blue.500' mb='1'>
                    Location: {job.location}
                  </Text>
                  <Stack direction='row' mt='2'>
                    <Text fontSize='sm' color='blue.700'>
                      Posted on {formatDate(job?.postingdate)}
                    </Text>
                    <Text fontSize='sm' color='blue.700'>
                      Deadline {formatDate(job?.deadline)}
                    </Text>
                  </Stack>
                  <Text fontSize='sm' color='blue.500' mb='1'>
                    Posted by: {job?.postedby || 'Admin'}
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
            {totalJobs >= itemsPerPage && (
              <Pagination
                currentPage={jobsCurrentPage}
                totalPages={totalJobsPages}
                onPageChange={handleJobsPageChange}
              />
            )}
          </Box>
        )}
        {/* User Management */}

        {selectedSection === 'users' && (
          <Box bg='white' p='4' borderRadius='md' boxShadow='md'>
            <Heading size='md' mb='2' color='blue.500'>
              User Management
            </Heading>
            <Button
              leftIcon={<FaPlus />}
              size='md'
              colorScheme='blue'
              onClick={createUser}
              mt='4'
              mb='8'
            >
              Create New User
            </Button>

            <Grid
              templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}
              gap={4}
            >
              {currentPageUsers.map((user) => (
                <GridItem
                  key={user.id}
                  borderWidth='1px'
                  borderRadius='md'
                  p='2'
                >
                  <Text
                    cursor='pointer'
                    // onClick={() => handleEditUser(user)} TODO view user details
                    onClick={() => handleViewUser(user)}
                    transition='all 0.3s'
                    _hover={{
                      transform: 'scale(1.02)',
                      borderColor: 'blue.300',
                    }}
                    fontSize='2xl'
                    fontWeight='bold'
                    color='blue.700'
                  >
                    {`${user.firstname} ${user.lastname}`}
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
                      onClick={() => handleDeleteUser(user?.id)}
                    >
                      Delete
                    </Button>
                  </Stack>
                </GridItem>
              ))}
            </Grid>
            {totalUsers >= itemsPerPage && (
              <Pagination
                currentPage={usersCurrentPage}
                totalPages={totalUsersPages}
                onPageChange={handleUsersPageChange}
              />
            )}
          </Box>
        )}
        {/* Analytics Management */}
        {selectedSection === 'analytics' && <p>Analytics coming soon....</p>}
        {/* Delete User Confirmation Modal */}
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={selectedUserId ? confirmDeleteUser : confirmDeleteJob}
          itemName={selectedUserId ? 'User' : 'Job'}
        />

        {/*drawer for job details*/}
        {
          <CrudDrawer isOpen={isOpen} onClose={onClose} mode={drawerMode}>
            {drawerMode === 'job-create' && (
              <JobsPostingForm onSubmit={handleSaveJob} onCancel={onClose} />
            )}

            {drawerMode === 'job-edit' && selectedJob && (
              <JobsPostingForm
                job={selectedJob}
                onSubmit={handleSaveJob}
                onCancel={onClose}
              />
            )}
            {drawerMode === 'job-details' && selectedJob && (
              <JobDetailsCard job={selectedJob} />
            )}
            {drawerMode === 'user-edit' && selectedUser && (
              <UserPostingForm
                user={selectedUser}
                onSubmit={handleSaveUser}
                onCancel={onClose}
              />
            )}
            {drawerMode === 'user-create' && (
              <UserPostingForm onSubmit={handleSaveUser} onCancel={onClose} />
            )}
            {drawerMode === 'user-details' && selectedUser && (
              <UserDetailsCard user={selectedUser} />
            )}
          </CrudDrawer>
        }
      </Box>
    </Box>
  );
};

export default Dashboard;
