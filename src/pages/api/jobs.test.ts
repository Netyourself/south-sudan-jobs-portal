// // src/tests/jobs.test.ts

// // import request from 'supertest'; // For making HTTP requests to your API
// // import app from '@/pages/api/jobs'; // Import your API route handler
// // import { Job } from '../../types/job'; // Import your job type
// // import { jobsData } from '@/data/data';

// // Using commonjs require because jest is causing error with es6 imports
// const request = require('supertest');
// const app = require('@/pages/api/jobs');
// const { Job } = require('@/types/job');
// const { jobsData } = require('@/data/data');
// // Example jobs data for testing
// const exampleJob = jobsData;

// describe('Job API Endpoints', () => {
//   // Test the "GET /api/jobs" endpoint
//   describe('GET /api/jobs', () => {
//     it('should get a list of jobs', async () => {
//       const response = await request(app).get('/api/jobs');
//       expect(response.status).toBe(200);
//       expect(response.body).toEqual(expect.arrayContaining(exampleJob));
//     });
//   });

//   // Test the "POST /api/jobs" endpoint
//   describe('POST /api/jobs', () => {
//     it('should create a new job', async () => {
//       const response = await request(app).post('/api/jobs').send(exampleJob);
//       expect(response.status).toBe(201);
//       expect(response.body).toEqual(exampleJob);
//     });
//   });

//   // Add more tests for other endpoints as needed
// });
