export const API_PATH = {
    LOGIN : "/api/auth/login",
    REGISTER: "/api/auth/register",
    REFRESH_TOKEN: "/api/auth/refresh",
    PRICE : "/api/v1/request/price",
    REG_CONFIRM: "/api/v1/user/registrationConfirm",
    RETRIEVE : "/api/v1/request/retrieve",
}

export const TABLE_DATA = [
    {"category":"plastic","quantity":1,"units":"kg"},
    {"category":"plastic","quantity":1,"units":"kg"},

]

export const ACCESS_TOKEN = "accessToken";
export const ID_TOKEN = "idToken";
export const REFRESH_TOKEN = "refreshToken";
// export const CATEGORY_DATA = [
//     {"category":"Plastic","units":"kg"},
//     {"category":"Paper","units":"kg"},
//     {"category":"Metal","units":"kg"},
//     {"category":"Textile","units":"kg"}
// ]

export const CATEGORY_DATA = [
    {
        "category": "Glass",
        "price": 200,
        "quantity": 0.0,
        "unitOfMeasurement": "ton"
    },
    {
        "category": "Electronics",
        "price": 700,
        "quantity": 0.0,
        "unitOfMeasurement": "item"
    },
    {
        "category": "Plastic",
        "price": 100,
        "quantity": 0.0,
        "unitOfMeasurement": "g"
    },
    {
        "category": "Paper",
        "price": 50,
        "quantity": 0.0,
        "unitOfMeasurement": "ton"
    },
    {
        "category": "Battery",
        "price": 500,
        "quantity": 0.0,
        "unitOfMeasurement": "kg"
    },
    {
        "category": "Clothes",
        "price": 300,
        "quantity": 0.0,
        "unitOfMeasurement": "g"
    }
];


export const MOCK_PRICING_RESP = {
    "returnCode": "00",
    "message": "The request has been successfully processed",
    "totalPrice": 800,
    "items": [
        {
            "name": "Plastic",
            "quantity": 1,
            "price": 100,
            "totalPrice": 100
        },
        {
            "name": "Electronics",
            "quantity": 1,
            "price": 700,
            "totalPrice": 700
        }
    ]
}

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

