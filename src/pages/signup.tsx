import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

type SignUpFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUp: React.FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
    watch,
  } = useForm<SignUpFormData>();
  const router = useRouter();

  const onSubmit = handleSubmit((data: SignUpFormData) => {
    // Handle form submission
    // Redirect to login page
    router.push('/signin');
  });

  return (
    <Box p='4' maxWidth='400px' mx='auto'>
      <Heading size='lg' mb='4' textAlign='center' color='blue.500'>
        Sign Up
      </Heading>
      <form onSubmit={onSubmit}>
        <Stack spacing='4'>
          <FormControl isInvalid={!!errors.name}>
            <FormLabel htmlFor='name' color='blue.500'>
              Name
            </FormLabel>
            <Input
              type='text'
              id='name'
              placeholder='Name'
              {...register('name', { required: 'Name is required' })}
              size='md'
              variant='filled'
              borderColor={errors.name ? 'red.500' : 'blue.500'}
            />
            <FormErrorMessage color='red.500'>
              {errors.name?.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.email}>
            <FormLabel htmlFor='email' color='blue.500'>
              Email
            </FormLabel>
            <Input
              type='email'
              id='email'
              placeholder='Email'
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Invalid email address',
                },
              })}
              size='md'
              variant='filled'
              borderColor={errors.email ? 'red.500' : 'blue.500'}
            />
            <FormErrorMessage color='red.500'>
              {errors.email?.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.password}>
            <FormLabel htmlFor='password' color='blue.500'>
              Password
            </FormLabel>
            <Input
              type='password'
              id='password'
              placeholder='Password'
              {...register('password', { required: 'Password is required' })}
              size='md'
              variant='filled'
              borderColor={errors.password ? 'red.500' : 'blue.500'}
            />
            <FormErrorMessage color='red.500'>
              {errors.password?.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.confirmPassword}>
            <FormLabel htmlFor='confirmPassword' color='blue.500'>
              Confirm Password
            </FormLabel>
            <Input
              type='password'
              id='confirmPassword'
              placeholder='Confirm Password'
              {...register('confirmPassword', {
                required: 'Confirm Password is required',
                validate: (value) =>
                  value === watch('password') || 'Passwords do not match',
              })}
              size='md'
              variant='filled'
              borderColor={errors.confirmPassword ? 'red.500' : 'blue.500'}
            />
            <FormErrorMessage color='red.500'>
              {errors.confirmPassword?.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            type='submit'
            size='md'
            colorScheme='blue'
            bgColor='blue.500'
            color='white'
            _hover={{ bgColor: 'yellow.500' }}
          >
            Sign Up
          </Button>
          <Box textAlign='center' color='blue.500'>
            <Link
              href='/signin'
              color='blue.500'
              onClick={() => router.push('/signin')}
            >
              Already registered? Login here
            </Link>
          </Box>
        </Stack>
      </form>
    </Box>
  );
};

export default SignUp;
