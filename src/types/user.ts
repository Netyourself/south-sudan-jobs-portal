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
