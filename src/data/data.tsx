import { FaBlackTie, FaPizzaSlice, FaCloudMoonRain } from 'react-icons/fa';

// Users data

export const usersData = [
  {
    userId: '1',
    password: 'password1', // Store hashed passwords
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    role: 'admin',
    status: 'active',
    organization: 'Company A',
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: '', // id
    updatedBy: '', // id
  },
  {
    userId: '2',
    password: 'password1', // Store hashed passwords
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    role: 'admin',
    status: 'active',
    organization: 'Company A',
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: '', // id
    updatedBy: '', // id
  },
  {
    userId: '3',
    password: '123', // Store hashed passwords
    firstName: 'John',
    lastName: 'Doe',
    email: 'test@test.com',
    role: 'admin',
    status: 'active',
    organization: 'Company A',
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: '', // id
    updatedBy: '', // id
  },
];

// Analytics data
export const analyticsData = {
  totalJobs: 50,
  totalUsers: 100,
  totalApplications: 200,
};

// data/jobsData.ts

export const jobsData = [
  {
    jobId: '1',
    title: 'JS Deve',
    organization: 'Netyourself Inc',
    descriptions:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi odit repellat dolorum laborum quod quasi excepturi consequatur voluptate harum magni beatae accusamus non maxime velit, debitis soluta ullam similique eius. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum officiis iure commodi saepe at deserunt deleniti. Expedita assumenda corporis doloremque incidunt quis rem voluptatem illum magni a atque, nostrum maxime?Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum alias voluptate, corporis expedita delectus dolor similique dolore ullam quae aliquam error sapiente eos esse impedit sit. Nam dolore ducimus laudantium.lorem Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo dignissimos voluptas totam, nulla error sunt quo architecto. Modi asperiores, ipsum expedita sit, aut ipsam non atque obcaecati, a vitae dolore.',
    location: 'Juba',
    postingdate: new Date(),
    deadline: new Date(),
    contracttype: 'full-time',
    domainarea: 'Healthcare',
    postedby: 'Grace',
    requirements: [
      'Diploma in IT / CS / Information managment',
      '2 Years Experience',
      'Troubleshooting skills',
      'Communications skills',
      'Customer care and personel management',
    ],
    howtoapply: 'info@example.com',
  },
  {
    id: '2',
    title: 'Logistic Officer',
    organization: 'Netyourself Inc',
    descriptions:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi odit repellat dolorum laborum quod quasi excepturi consequatur voluptate harum magni beatae accusamus non maxime velit, debitis soluta ullam similique eius. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum officiis iure commodi saepe at deserunt deleniti. Expedita assumenda corporis doloremque incidunt quis rem voluptatem illum magni a atque, nostrum maxime?Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum alias voluptate, corporis expedita delectus dolor similique dolore ullam quae aliquam error sapiente eos esse impedit sit. Nam dolore ducimus laudantium.lorem Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo dignissimos voluptas totam, nulla error sunt quo architecto. Modi asperiores, ipsum expedita sit, aut ipsam non atque obcaecati, a vitae dolore.',
    location: 'Yambio',
    postingdate: new Date(),
    deadline: new Date(),
    contracttype: 'full-time',
    domainarea: 'Business',
    postedby: 'Grace',
    requirements: [
      'Diploma in IT / CS / Information managment',
      '2 Years Experience',
      'Troubleshooting skills',
      'Communications skills',
      'Customer care and personel management',
    ],
    howtoapply: 'info@example.com',
  },
  {
    id: '3',
    title: 'Makerting Officer',
    organization: 'Netyourself Inc',
    descriptions:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi odit repellat dolorum laborum quod quasi excepturi consequatur voluptate harum magni beatae accusamus non maxime velit, debitis soluta ullam similique eius. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum officiis iure commodi saepe at deserunt deleniti. Expedita assumenda corporis doloremque incidunt quis rem voluptatem illum magni a atque, nostrum maxime?Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum alias voluptate, corporis expedita delectus dolor similique dolore ullam quae aliquam error sapiente eos esse impedit sit. Nam dolore ducimus laudantium.lorem Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo dignissimos voluptas totam, nulla error sunt quo architecto. Modi asperiores, ipsum expedita sit, aut ipsam non atque obcaecati, a vitae dolore.',
    location: 'Wau',
    postingdate: new Date(),
    deadline: new Date(),
    contracttype: 'full-time',
    domainarea: 'Marketing',
    postedby: 'Grace',
    requirements: [
      'Diploma in IT / CS / Information managment',
      '2 Years Experience',
      'Troubleshooting skills',
      'Communications skills',
      'Customer care and personel management',
    ],
    howtoapply: 'info@example.com',
  },
  {
    id: '4',
    title: 'IT Officer',
    organization: 'Netyourself Inc',
    descriptions:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi odit repellat dolorum laborum quod quasi excepturi consequatur voluptate harum magni beatae accusamus non maxime velit, debitis soluta ullam similique eius. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum officiis iure commodi saepe at deserunt deleniti. Expedita assumenda corporis doloremque incidunt quis rem voluptatem illum magni a atque, nostrum maxime?Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum alias voluptate, corporis expedita delectus dolor similique dolore ullam quae aliquam error sapiente eos esse impedit sit. Nam dolore ducimus laudantium.lorem Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo dignissimos voluptas totam, nulla error sunt quo architecto. Modi asperiores, ipsum expedita sit, aut ipsam non atque obcaecati, a vitae dolore.',
    location: 'Wau',
    postingdate: new Date(),
    deadline: new Date(),
    contracttype: 'Part-time',
    domainarea: 'education',
    postedby: 'Grace',
    requirements: [
      'Diploma in IT / CS / Information managment',
      '2 Years Experience',
      'Troubleshooting skills',
      'Communications skills',
      'Customer care and personel management',
    ],
    howtoapply: 'info@example.com',
  },
  {
    id: '5',
    title: 'IT Officer',
    organization: 'Netyourself Inc',
    descriptions:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi odit repellat dolorum laborum quod quasi excepturi consequatur voluptate harum magni beatae accusamus non maxime velit, debitis soluta ullam similique eius. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum officiis iure commodi saepe at deserunt deleniti. Expedita assumenda corporis doloremque incidunt quis rem voluptatem illum magni a atque, nostrum maxime?Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum alias voluptate, corporis expedita delectus dolor similique dolore ullam quae aliquam error sapiente eos esse impedit sit. Nam dolore ducimus laudantium.lorem Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo dignissimos voluptas totam, nulla error sunt quo architecto. Modi asperiores, ipsum expedita sit, aut ipsam non atque obcaecati, a vitae dolore.',
    location: 'Wau',
    postingdate: new Date(),
    deadline: new Date(),
    contracttype: 'full-time',
    domainarea: 'education',
    postedby: 'Grace',
    requirements: [
      'Diploma in IT / CS / Information managment',
      '2 Years Experience',
      'Troubleshooting skills',
      'Communications skills',
      'Customer care and personel management',
    ],
    howtoapply: 'info@example.com',
  },
  {
    id: '6',
    title: 'IT Officer',
    organization: 'Netyourself Inc',
    descriptions:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi odit repellat dolorum laborum quod quasi excepturi consequatur voluptate harum magni beatae accusamus non maxime velit, debitis soluta ullam similique eius. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum officiis iure commodi saepe at deserunt deleniti. Expedita assumenda corporis doloremque incidunt quis rem voluptatem illum magni a atque, nostrum maxime?Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum alias voluptate, corporis expedita delectus dolor similique dolore ullam quae aliquam error sapiente eos esse impedit sit. Nam dolore ducimus laudantium.lorem Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo dignissimos voluptas totam, nulla error sunt quo architecto. Modi asperiores, ipsum expedita sit, aut ipsam non atque obcaecati, a vitae dolore.',
    location: 'Wau',
    postingdate: new Date(),
    deadline: new Date(),
    contracttype: 'full-time',
    domainarea: 'education',
    postedby: 'Grace',
    requirements: [
      'Diploma in IT / CS / Information managment',
      '2 Years Experience',
      'Troubleshooting skills',
      'Communications skills',
      'Customer care and personel management',
    ],
    howtoapply: 'info@example.com',
  },
  {
    id: '7',
    title: 'IT Specialist',
    organization: 'Netyourself Inc',
    descriptions:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi odit repellat dolorum laborum quod quasi excepturi consequatur voluptate harum magni beatae accusamus non maxime velit, debitis soluta ullam similique eius. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum officiis iure commodi saepe at deserunt deleniti. Expedita assumenda corporis doloremque incidunt quis rem voluptatem illum magni a atque, nostrum maxime?Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum alias voluptate, corporis expedita delectus dolor similique dolore ullam quae aliquam error sapiente eos esse impedit sit. Nam dolore ducimus laudantium.lorem Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo dignissimos voluptas totam, nulla error sunt quo architecto. Modi asperiores, ipsum expedita sit, aut ipsam non atque obcaecati, a vitae dolore.',
    location: 'Wau',
    postingdate: new Date(),
    deadline: new Date(),
    contracttype: 'full-time',
    domainarea: 'technology',
    postedby: 'Grace',
    requirements: [
      'Diploma in IT / CS / Information managment',
      '2 Years Experience',
      'Troubleshooting skills',
      'Communications skills',
      'Customer care and personel management',
    ],
    howtoapply: 'info@example.com',
  },

  // Add more sample job data here
];

// filters options
export const locationOptions = [
  'awiel',
  'Abyei',
  'Terekeka',
  'Juba',
  'Wau',
  'Renk',
  'Kajokeji',
  'Torit',
  'Yambio',
  'Lire',
  'Raja',
  'Rombur',
  'Gurei',
  'Limi',
  'Mere',
  'Wudu',
  'Rumbek',
  'Ruweng',
];
export const contractOptions = [
  'full-time',
  'Part-Time',
  'Contract',
  'Fix-Term',
  'Consultancy',
];
export const domainAreaOptions = [
  'technology',
  'Finance',
  'Healthcare',
  'Marketing',
  'Logistics',
  'Education',
  'Agriculture',
  'Business',
];
