import { addJob, getJob, getJobs, searchJobs } from '@/api/controllers/jobs';
import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuid } from 'uuid';
import { authenticateJWT } from '@/api/middlewares/authMiddleware';
import { UserAPI } from '@/types/user';
import { Job } from '@/types/job';
import { jobsData, usersData } from '@/data/data';
export default async function apiHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // No authentication required for GET jobs route
  const { title, location, domainarea, contracttype } = req.query;

  if (
    req.method === 'GET' &&
    (title || location || domainarea || contracttype)
  ) {
    // Handle job search based on criteria (location, domainarea, contractType)
    const { title, location, domainarea, contractType } = req.query;
    const criteria = {
      title: title as string,
      location: location as string,
      domainarea: domainarea as string,
      contractType: contractType as string,
    };
    const filteredJobs = await searchJobs(criteria);

    res.status(200).json(filteredJobs);
  } else if (req.method === 'GET') {
    // Retrieve all jobs
    const jobs = await getJobs();
    res.status(200).json(jobs);
  } else if (req.method === 'POST') {
    // Apply JWT authentication middleware to protect Job creations route
    authenticateJWT(req, res, async () => {
      // User is authenticated, you can proceed with your CRUD operations here
      if (req.method === 'POST') {
        // Check if the user is an admin
        if (req.user.role === 'admin') {
          // get data from req
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
          }: Job = req.body;
          // do some validations
          // post to db
          const data = {
            id: uuid(),
            title,
            organization,
            location,
            postingdate: new Date(),
            deadline, // TODO use date from user but transform it into date string to store in db
            postedby: req.user.userid,
            contracttype,
            domainarea,
            descriptions,
            requirements,
            howtoapply,
          };
          addJob(data);
          res.status(201).json(jobsData.reverse());
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
