import request from 'supertest';
import { createServer, IncomingMessage, ServerResponse } from 'http';
import { parse } from 'url'; // Import the 'parse' function from the 'url' module
import handler from '@/pages/api/jobs'; // Import your API route handler
import singleJobApiHandler from '@/pages/api/jobs/[jobid]';

const testServer = createServer(
  async (req: IncomingMessage, res: ServerResponse) => {
    const { pathname, query } = parse(req.url || '', true); // Parse the URL to get the pathname and query

    // Mock the request method
    req.method = req.method || 'GET';

    // Mock request and response objects
    const mockReq: any = {
      ...req,
      url: pathname,
      query,
    };

    const mockRes: any = {
      ...res,
      json: (data: any) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(data));
      },
      status: (statusCode: number) => {
        res.statusCode = statusCode;
        return mockRes;
      },
    };

    // Call your API route handler with the mock request and response objects
    await handler(mockReq, mockRes);
  }
);

describe('Job API Endpoint', () => {
  it('should return a list of jobs', async () => {
    const response = await request(testServer).get('/api/jobs');

    expect(response.status).toBe(200);
    // Add your assertions for the list of jobs if needed
  });

  it('should return a single job', async () => {
    const jobId = '1'; // Replace with the desired job ID
    const response = await request(testServer).get(`/api/jobs/${jobId}`);

    expect(response.status).toBe(200);
    // Add your assertions for the specific job data
  });

  it('should create a list of jobs', async () => {
    // Define the job data to be posted
    const jobData = [{ title: 'Job 3' }, { title: 'Job 4' }];

    // Make a POST request to create the jobs
    const response = await request(testServer).post('/api/jobs').send(jobData);

    expect(response.status).toBe(201);
    // Add your assertions for the newly created jobs if needed
  });

  it('should update a specific job', async () => {
    // Make a PUT request to update a specific job (e.g., job with ID 1)
    const response = await request(testServer).put('/api/jobs/1');

    expect(response.status).toBe(200);
    // Add your assertions for the updated job data if needed
  });

  it('should delete a specific job', async () => {
    // Make a DELETE request to delete a specific job (e.g., job with ID 1)
    const response = await request(testServer).delete('/api/jobs/1');

    expect(response.status).toBe(204);
  });
});
