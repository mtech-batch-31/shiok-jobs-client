export const API_URL = {
    LOGIN : `${process.env.REACT_APP_SHIOK_JOBS_BFF_URL}/api/auth/login`,
    REGISTER: `${process.env.REACT_APP_SHIOK_JOBS_BFF_URL}/api/auth/register`,
    REFRESH_TOKEN: `${process.env.REACT_APP_SHIOK_JOBS_BFF_URL}/api/auth/refresh`,
    REG_CONFIRM: `${process.env.REACT_APP_SHIOK_JOBS_BFF_URL}/api/v1/user/registrationConfirm`,
    USER_PROFILE: `${process.env.REACT_APP_SHIOK_JOBS_BFF_URL}/api/user/api/v1/user/me`,
    JOBS: `${process.env.REACT_APP_SHIOK_JOBS_BFF_URL}/api/job/v1/jobs`,
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
    "name": "Andrew Tan",
    "seeking": "true",
    "jobTitle": "Production Support Engineer",
    "image": "url",
    "about": "Reduced the number of customer support tickets by 15% by developing a new knowledge base.",
    "workingExperience": [
        {
            "id": 1,
            "company": "SPTel",
            "yearStart": "2012",
            "yearEnd": "2015",
            "jobTitle": "Engineer",
            "experience": "Performed production support duties in multiple Greenfield Telco projects"
        },
        {
            "id": 2,
            "company": "Singtel",
            "yearStart": "2013",
            "yearEnd": "2015",
            "jobTitle": "Engineer",
            "experience": "Performed software development duties in multiple Telco projects"
        },
        {
            "id": 3,
            "company": "StarHub",
            "yearStart": "2014",
            "yearEnd": "2015",
            "jobTitle": "Engineer",
            "experience": "Performed software architecture duties in multiple Telco projects"
        }
    ],
    "educationalExperience": [
        {
            "id": 1,
            "school": "Hwa Chong Institution",
            "yearStart": "2000",
            "yearEnd": "2008",
            "description": "Integrated Programme"
        },
        {
            "id": 2,
            "school": "National University Singapore",
            "yearStart": "2001",
            "yearEnd": "2009",
            "description": "Bachelors"
        },
        {
            "id": 3,
            "school": "Singapore Institute Management",
            "yearStart": "2002",
            "yearEnd": "2010",
            "description": "Masters of Technology"
        }
    ]
}