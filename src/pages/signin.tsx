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
  email: string;
  password: string;
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
    console.log(data);
    // Redirect to user dashboard page
    router.push('/dashboard');
  });

  return (
    <Box p='4' maxWidth='400px' mx='auto'>
      <Heading size='lg' mb='4' textAlign='center' color='blue.500'>
        Sign In
      </Heading>
      <form onSubmit={onSubmit}>
        <Stack spacing='4'>
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
          <Button
            type='submit'
            size='md'
            colorScheme='blue'
            bgColor='blue.500'
            color='white'
            _hover={{ bgColor: 'yellow.500' }}
          >
            Sign In
          </Button>
          <Box textAlign='center' color='blue.500'>
            <Link
              href='/signin'
              color='blue.500'
              onClick={() => router.push('/signup')}
            >
              Don`t have an Account? Sign up here
            </Link>
          </Box>
        </Stack>
      </form>
    </Box>
  );
};

export default SignUp;
