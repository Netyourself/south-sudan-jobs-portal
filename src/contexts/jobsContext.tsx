import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { jobsData } from '@/data/data';
import { Job } from '@/types/job';

interface JobsProviderProps {
  children: ReactNode;
}
// Define the shape of your context
interface JobsContextType {
  jobs: Job[];
  addJob: (job: Job) => void;
  editJob: (job: Job[]) => void;
  deleteJob: (jobId: string) => void;
  //setJobs: React.Dispatch<React.SetStateAction<Job[]>>;
}

const JobsContext = createContext<JobsContextType | undefined>(undefined);
// Define your context provider component (JobsProvider)
export const JobsProvider: React.FC<JobsProviderProps> = ({ children }) => {
  const [jobs, setJobs] = useState<Job[]>(jobsData);

  // Function to add a new job
  const addJob = (newJob: Job) => {
    const newData = { ...newJob, id: uuidv4() }; // TODO remove temporary id in dev, ID to be generated on the server
    setJobs([...jobs, newData]);
  };
  // Function to update an existing job
  const editJob = (editedJob: Job[]) => {
    setJobs(editedJob);
  };

  // Function to delete a job
  const deleteJob = (jobId: string) => {
    const updatedJobs = jobs.filter((job) => job.id !== jobId);
    setJobs(updatedJobs);
  };

  return (
    <JobsContext.Provider
      value={{
        jobs,
        addJob,
        editJob,
        deleteJob,
      }}
    >
      {children}
    </JobsContext.Provider>
  );
};

export const useJobs = (): JobsContextType => {
  const context = useContext(JobsContext);
  if (!context) {
    throw new Error('useJobs must be used within a JobsProvider');
  }
  return context;
};
