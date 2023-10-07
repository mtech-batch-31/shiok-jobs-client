interface IJob {
    id: number;
    company: string;
    logo: string;
    new: boolean;
    jobTitle: string;
    salaryRange: string;
    level: string;
    postedAt: string;
    employeeType: string;
    location: string;
    skills: string[];
  }

export default IJob;