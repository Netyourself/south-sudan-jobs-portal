export interface Job {
  id?: string;
  title: string;
  organization: string;
  location: string;
  postingdate: Date;
  deadline: Date;
  postedby: string;
  updatedby?: string;
  updatedon?: Date;
  contracttype: string;
  domainarea: string;
  descriptions: string;
  requirements: string[];
  howtoapply: string;
}
