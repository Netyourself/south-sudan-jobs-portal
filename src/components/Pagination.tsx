import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, HStack, Heading, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { jobsData } from '../data/data';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const [jobsPerPage] = useState(10);
  const topRef = useRef<HTMLDivElement | null>(null);

  const jobs = jobsData;
  const router = useRouter();

  const handlePageChange = (page: number) => {
    onPageChange(page);
    topRef.current?.scrollIntoView({ behavior: 'auto' });
  };

  return (
    <Box bg='white' p='4' maxWidth={{ base: '95%', md: '1000px' }} mx='auto'>
      <HStack spacing={2} mt={4}>
        <Button
          size='sm'
          variant='outline'
          colorScheme='blue'
          isDisabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </Button>
        {Array.from({ length: totalPages }).map((_, index) => (
          <Button
            key={index}
            size='sm'
            variant='outline'
            colorScheme='blue'
            isActive={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Button>
        ))}
        <Button
          size='sm'
          variant='outline'
          colorScheme='blue'
          isDisabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </Button>
      </HStack>
    </Box>
  );
};

export default Pagination;
