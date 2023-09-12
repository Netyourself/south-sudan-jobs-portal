export interface User {
  id?: string;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  organization: string;
  createdby?: string;
  createdon?: Date;
}

export interface UserAPI {
  userId: string;
  password: string; // Store hashed passwords
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  status: string;
  organization: string;
  createdAt: Date;
  updatedAt?: Date;
  createdBy: string; // id
  updatedBy?: string; // id
}
