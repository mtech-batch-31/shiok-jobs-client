export const API_URL = {
    LOGIN : `${process.env.REACT_APP_SHIOK_JOBS_BFF_URL}/api/auth/login`,
    REGISTER: `${process.env.REACT_APP_SHIOK_JOBS_BFF_URL}/api/auth/register`,
    REFRESH_TOKEN: `${process.env.REACT_APP_SHIOK_JOBS_BFF_URL}/api/auth/refresh`,
    REG_CONFIRM: `${process.env.REACT_APP_SHIOK_JOBS_BFF_URL}/api/v1/user/registrationConfirm`,
    USER_PROFILE: `${process.env.REACT_APP_SHIOK_JOBS_BFF_URL}/api/user/v1/user/me`,
    UPDATE_PROFILE: `${process.env.REACT_APP_SHIOK_JOBS_BFF_URL}/api/user/v1/user`,
    JOBS: `${process.env.REACT_APP_SHIOK_JOBS_BFF_URL}/api/job/v1/jobs`
}

export const AUTH = {
    ACCESS_TOKEN: "accessToken",
    ID_TOKEN: "idToken",
    REFRESH_TOKEN: "refreshToken"
}
export const ACCESS_TOKEN = "accessToken";
export const ID_TOKEN = "idToken";
export const REFRESH_TOKEN = "refreshToken";


export const MOCK_JOBDETAILS_RESP = {
    "id": 1,
    "companyId": 1,
    "companyName": "NUS",
    "jobTitle": "Lecturer",
    "jobSummary": "The National University of Singapore (NUS) is seeking a dynamic and dedicated individual to join our esteemed academic community as a Lecturer. As a Lecturer at NUS, you will play a pivotal role in shaping the future of education and fostering intellectual growth within our diverse and vibrant student body.",
    "jobCategory": "Education",
    "level": "Mid-Level",
    "skills": [
        "Teaching",
        "Research"
    ],
    "employmentType": "Full-Time",
    "location": "New York",
    "workHours": "40 hours per week",
    "minSalary": 75000.00,
    "maxSalary": 100000.00,
    "postedDate": "2023-09-23T00:00:00.000+00:00",
    "closingDate": "2023-10-23T00:00:00.000+00:00",
    "version": 1,
    "lastUpdatedBy": "Admin",
    "lastUpdatedTime": "2023-09-23T12:00:00.000+00:00",
    "createdBy": "Admin",
    "createdTime": "2023-09-23T12:00:00.000+00:00"
}

export const MOCK_USERDETAILS_RESP = 
{
    "id": 1,
    "accountUuid": "06396421-0159-42cf-a6a6-64aac15cc4b1",
    "name": "Name",
    "seeking": false,
    "jobTitle": "Job Title",
    "image": "https://shiok-jobs-profile-images.s3.ap-southeast-1.amazonaws.com/images/generic.jpeg",
    "about": "About",
    "workingExperience": [
        {
            "id": 1,
            "company": "Company",
            "yearStart": "Start",
            "yearEnd": "End",
            "jobTitle": "Job Title",
            "logo": "https://shiok-jobs-profile-images.s3.ap-southeast-1.amazonaws.com/images/generic.jpeg",
            "experience": "Experience"
        }
    ],
    "educationalExperience": [
        {
            "id": 1,
            "school": "School",
            "yearStart": "Start",
            "yearEnd": "End",
            "logo": "https://shiok-jobs-profile-images.s3.ap-southeast-1.amazonaws.com/images/generic.jpeg",
            "description": "Description"
        }
    ]
}