import {
  Box,
  Flex,
  Text,
  Image,
  IconButton,
  Collapse,
  useDisclosure,
} from '@chakra-ui/react';
import { FaBars } from 'react-icons/fa';
import Link from 'next/link';

interface NavItemProps {
  href: string;
  children: React.ReactNode;
}

const NavItem: React.FC<NavItemProps> = ({ href, children }) => {
  return (
    <Link href={href}>
      <Text px={2} py={2} color='white' fontWeight='medium'>
        {children}
      </Text>
    </Link>
  );
};

const NavItems = () => {
  return (
    <>
      <NavItem href='/signin'>Employer Account</NavItem>
      {/* <NavItem href='/signin'>Login</NavItem>
      <NavItem href='/signup'>Signup</NavItem> */}
    </>
  );
};

const Navbar = () => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box as='header' bg='blue.500' p={2} color='white' fontSize='2xl'>
      <Box className='container mx-auto'>
        <Flex justify='space-between' align='center'>
          <Flex align='center'>
            <Link href='/'>
              {/* Add your logo component here */}
              {/* <Box boxSize='50px' objectFit='cover'>
                <Image src='/logo.png' alt='Logo' />
              </Box> */}
              <Text fontWeight='bold' fontSize='2xl' ml={2}>
                South Sudan Jobs Portal
              </Text>
            </Link>
          </Flex>

          {/* Responsive Navbar */}
          <Flex display={{ base: 'none', md: 'flex' }} align='center'>
            <NavItems />
          </Flex>

          {/* Hamburger Menu */}
          <IconButton
            icon={<FaBars />}
            variant='white'
            fontSize='35px'
            aria-label='Toggle navigation'
            display={{ base: 'block', md: 'none' }}
            onClick={onToggle}
          />
        </Flex>

        {/* Mobile Nav Menu */}
        <Collapse in={isOpen} animateOpacity>
          <Flex direction='column' mt={2}>
            <NavItems />
          </Flex>
        </Collapse>
      </Box>
    </Box>
  );
};

export default Navbar;
