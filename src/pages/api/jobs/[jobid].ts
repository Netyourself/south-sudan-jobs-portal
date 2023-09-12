import { NextApiRequest, NextApiResponse } from 'next';
import { authenticateJWT } from '@/api/middlewares/authMiddleware';
import { db } from '@/db/dbconfig'; // Import your PostgreSQL database configuration
import { addJob, deleteJob, editJob, getJob } from '@/api/controllers/jobs';
import { jobsData } from '@/data/data';
import { Job } from '@/types/job';
export default async function singleJobApiHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { jobid } = req.query;
  if (req.method === 'GET' && jobid) {
    // Retrieve the job with the specified ID from the database
    const job = await getJob(String(jobid));
    if (!job) return res.status(404).json({ error: 'Job not found' });
    res.status(200).json(job);
  } else if (['PUT', 'DELETE'].includes(req.method as string)) {
    // Apply JWT authentication middleware to protect these routes
    authenticateJWT(req, res, async () => {
      // User is authenticated, you can proceed with your CRUD operations here
      if (req.method === 'PUT' || req.method === 'DELETE') {
        // Retrieve the job to check ownership (assuming you have a creatorId field in the jobs table)

        // get that single job to edit or delete
        const job = await getJob(String(jobid));

        if (!job) {
          return res.status(404).json({ error: 'Job not found' });
        }

        // Check if the user is an admin, the job creator, or belongs to the same organization
        if (
          req.user.role === 'admin' ||
          job?.postedby === req.user.userid || // Job creator id(postedby) is same as the login user
          job?.organization === req.user.organization_id // user belongs to the same organization as the job created owner
        ) {
          if (req.method === 'PUT') {
            // update data
            const {
              title,
              organization,
              location,
              deadline,
              contracttype,
              domainarea,
              descriptions,
              requirements,
              howtoapply,
            } = req.body;
            const data: Job = {
              title,
              organization,
              location,
              postingdate: job.postingdate,
              deadline, // TODO use date from user but transform it into date string to store in db
              postedby: '',
              updatedby: req.user.userid,
              updatedon: new Date(),
              contracttype,
              domainarea,
              descriptions,
              requirements,
              howtoapply,
            }; // data to update
            editJob(String(jobid), data);
            res.status(200).json({ ...data });
          } else if (req.method === 'DELETE') {
            // delete data
            deleteJob(String(jobid));
            res.status(200).json({ data: 'Deleted job', jobid });
          }
        } else {
          return res.status(403).json({ error: 'Forbidden' });
        }
      } else {
        return res.status(405).json({ error: 'Method Not Allowed' });
      }
    });
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
