import { useRouter } from 'next/router';
import {
  Box,
  Heading,
  Text,
  Button,
  OrderedList,
  ListItem,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import Layout from '@/components/Layout';
import JobDownloadPDF from '@/components/JobsDownloadPDF';
import { formatDate } from '@/utils/dateFormate';
import { Job } from '@/types/job';
import { useJobs } from '@/contexts/jobsContext';
import JobDetailsCard from '@/components/JobsDetailsCard';

const JobDetailsPage: React.FC<Job> = () => {
  // get data from context
  const { jobs } = useJobs();

  const router = useRouter();
  const { jobId } = router.query;
  // TODO get data from the route, and only search inthe jobs if the access was directly ie typing some id
  // Find the Job based on the jobId from the query

  const job = jobs.find((job) => job.id === jobId);
  useEffect(() => {
    // make api calls to search matching job by id
  }, []);

  if (!job) {
    // Render not found page component
    // TODO design a page not found component
    return <div>Job not found</div>;
  }
  return (
    <Layout>
      <JobDetailsCard job={job} />
    </Layout>
  );
};

export default JobDetailsPage;
