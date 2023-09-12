import type { NextApiRequest, NextApiResponse } from 'next';
import { Job } from '@/types/job';
import { jobsData } from '@/data/data'; // jobsData sample in memory data // TODO replace with db data
import { v4 as uuid } from 'uuid';
import { sanitizeData } from '@/utils/sanitizeInputs';
// Get all jobs
const getJobs = async () => {
  return jobsData;
};

// Get single job
const getJob = async (jobId: string) => {
  // Array
  const job = await jobsData.find((job) => job.id === jobId);
  if (!job) return null;
  return job;

  // database

  // try {
  //   const job = await db.oneOrNone('SELECT * FROM jobs WHERE id = $1', jobid);

  //   if (job) {
  //     res.status(200).json(job);
  //   } else {
  //     res.status(404).json({ error: 'Job not found' });
  //   }
  // } catch (error) {
  //   console.error('Error retrieving job:', error);
  //   res.status(500).json({ error: 'Internal Server Error' });
  // }
};

// Search Jobs based on criteria

const searchJobs = async (
  criteria: {
    location?: string;
    domainarea?: string;
    contractType?: string;
    title?: string;
  }
  //jobsData: Job[]
) => {
  const { location, domainarea, contractType, title } = criteria;

  return jobsData.filter((job) => {
    const titleMatch =
      title && sanitizeData(job?.title).includes(sanitizeData(title)); // Partial match for title

    const locationMatch =
      location && sanitizeData(job?.location) === sanitizeData(location);

    const contractMatch =
      contractType &&
      sanitizeData(job?.contracttype) === sanitizeData(contractType);

    const departmentMatch =
      domainarea && sanitizeData(job?.domainarea) === sanitizeData(domainarea);

    return titleMatch || locationMatch || contractMatch || departmentMatch;
  });
};
// Create new job
const addJob = async (job: Job) => {
  // validate data before posting to db
  //const newJob = { ...job, id: (jobsData.length + 1).toString() }; // Generate a new ID
  const newJob = { ...job, id: uuid() }; // Generate a new ID

  await jobsData.push(newJob);
  return newJob;

  // database
  // try {
  //   const createdJob = await db.one(
  //     'INSERT INTO jobs (title) VALUES ($1) RETURNING *',
  //     [newData.title]
  //   );
  //   res.status(201).json(createdJob);
  // } catch (error) {
  //   console.error('Error creating job:', error);
  //   res.status(500).json({ error: 'Internal Server Error' });
  // }
};

// Edit or update a job
const editJob = async (jobId: string, updatedJob: Job) => {
  // Array
  const index = jobsData.findIndex((job) => job.id === jobId);
  if (index === -1) {
    throw new Error('Job not found');
  }
  jobsData[index] = { ...updatedJob, id: jobId };
  return jobsData[index];

  // Database
  // try {
  //   await db.none('UPDATE jobs SET title = $1 WHERE id = $2', [
  //     updatedData.title,
  //     jobid,
  //   ]);
  //   res.status(200).json({ message: 'Data updated successfully' });
  // } catch (error) {
  //   console.error('Error updating job:', error);
  //   res.status(500).json({ error: 'Internal Server Error' });
  // }
};

// Delete job
const deleteJob = async (jobId: string) => {
  // Array
  const index = jobsData.findIndex((job) => job.id === jobId);
  if (index === -1) {
    throw new Error('Job not found');
  }
  jobsData.splice(index, 1);

  // Database
  // try {
  //   await db.none('DELETE FROM jobs WHERE id = $1', jobid);
  //   res.status(204).end();
  // } catch (error) {
  //   console.error('Error deleting job:', error);
  //   res.status(500).json({ error: 'Internal Server Error' });
  // }
};

export { getJobs, getJob, searchJobs, addJob, editJob, deleteJob };
