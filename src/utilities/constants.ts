export const API_URL = {
    LOGIN : `${process.env.REACT_APP_SHIOK_JOBS_BFF_URL}/api/auth/login`,
    REGISTER: `${process.env.REACT_APP_SHIOK_JOBS_BFF_URL}/api/auth/register`,
    REFRESH_TOKEN: `${process.env.REACT_APP_SHIOK_JOBS_BFF_URL}/api/auth/refresh`,
    REG_CONFIRM: `${process.env.REACT_APP_SHIOK_JOBS_BFF_URL}/api/v1/user/registrationConfirm`,
    USER_PROFILE: `${process.env.REACT_APP_SHIOK_JOBS_BFF_URL}/api/user/api/v1/user/me`,
    UPDATE_PROFILE: `${process.env.REACT_APP_SHIOK_JOBS_BFF_USERMS_URL}/api/v1/user`,
    JOBS: `${process.env.REACT_APP_SHIOK_JOBS_BFF_URL}/api/job/v1/jobs`
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
    "image": "https://shiok-jobs-profile-images.s3.ap-southeast-1.amazonaws.com/images/face.png",
    "about": "Senior Analyst with a demonstrated history of working in the information technology and services industry. Skilled in Quality Assurance, System Integration Testing, System Testing, Testing, SQL. Strong IT professional with a Bachelor's degree focused in Electrical and Electronic Engineering from National University of Singapore.",
    "workingExperience": [
        {
            "id": 1,
            "company": "SPTel Pte Ltd",
            "yearStart": "June 2022",
            "yearEnd": "Present",
            "jobTitle": "Senior Analyst, OSS",
            "logo": "https://shiok-jobs-profile-images.s3.ap-southeast-1.amazonaws.com/images/sptel.png",
            "experience": "Level 1 and Level 2 support for OSS, BSS and Billing production incidents. Responsibilities include \"Keep the lights on\" for platform & application services. IT Service Management (ITSM) under Product and Business IT (BizIT) team"
        },
        {
            "id": 2,
            "company": "StarHub Ltd",
            "yearStart": "May 2022",
            "yearEnd": "June 2022",
            "jobTitle": "System Analyst, Test",
            "logo": "https://shiok-jobs-profile-images.s3.ap-southeast-1.amazonaws.com/images/starhub.png",
            "experience": "Provided Test Services ST, SIT, UAT, ORT to greenfield telco (Project Symphony). Created, reviewed, executed test cases during SIT and UAT phase of the project. Liaised closely with business, development, solutioning and project management for systems including OSS, CRM and Billing for Assurance and Fulfillment"
        },
        {
            "id": 3,
            "company": "Singtel",
            "yearStart": "May 2017",
            "yearEnd": "Sep 2019",
            "jobTitle": "Test Analyst",
            "logo": "https://shiok-jobs-profile-images.s3.ap-southeast-1.amazonaws.com/images/singtel.png",
            "experience": "Test Designer, SIT Project SPOC, UAT Project SPOC for major telco. System Integration Testing systems include Unix, Weblogic, Java, Windows, iOS, Android. User Acceptance Testing domains include Product, Finance Billing, CRM, Retail Applications"
        }
    ],
    "educationalExperience": [
        {
            "id": 1,
            "school": "Hwa Chong Institution",
            "yearStart": "2000",
            "yearEnd": "2005",
            "logo": "https://shiok-jobs-profile-images.s3.ap-southeast-1.amazonaws.com/images/hci.jpeg",
            "description": "A Levels, Physics, Chemistry, Mathematics, Biology"
        },
        {
            "id": 2,
            "school": "National University Singapore",
            "yearStart": "2008",
            "yearEnd": "2012",
            "logo": "https://shiok-jobs-profile-images.s3.ap-southeast-1.amazonaws.com/images/nus.jpeg",
            "description": "B.Eng. in Electrical and Electronic Engineering"
        }
    ]
}