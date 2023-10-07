import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./styles/JobDetails.css";

import React, {useEffect, useState} from "react";
// import Jobs from "../Components/Jobs";
// import data from "../jobs-mock.json";
import { Container, Button } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import { MOCK_JOBDETAILS_RESP } from "../utilities/constants";
import axios, { AxiosError } from "axios";

// interface SearchFormState {
//   searchkey: string;
//   salary: string;
// }

// interface IJob {
//   "id": null,
//   "companyId": 1,
//   "companyName": "NUS",
//   "jobTitle": "Lecturer",
//   "jobSummary": "The National University of Singapore (NUS) is seeking a dynamic and dedicated individual to join our esteemed academic community as a Lecturer. As a Lecturer at NUS, you will play a pivotal role in shaping the future of education and fostering intellectual growth within our diverse and vibrant student body.",
//   "jobCategory": "Education",
//   "level": "Mid-Level",
//   "skills": [
//       "Teaching",
//       "Research"
//   ],
//   "employmentType": "Full-Time",
//   "location": "New York",
//   "workHours": "40 hours per week",
//   "minSalary": 75000.00,
//   "maxSalary": 100000.00,
//   "postedDate": "2023-09-23T00:00:00.000+00:00",
//   "closingDate": "2023-10-23T00:00:00.000+00:00",
//   "version": 1,
//   "lastUpdatedBy": "Admin",
//   "lastUpdatedTime": "2023-09-23T12:00:00.000+00:00",
//   "createdBy": "Admin",
//   "createdTime": "2023-09-23T12:00:00.000+00:00"
// }

const Home: React.FC = () => {
  // const blankJob = {
  //   "id": 0,
  //   "companyId": 1,
  //   "companyName": "NUS",
  //   "jobTitle": "test",
  //   "jobSummary": "The National University of Singapore (NUS) is seeking a dynamic and dedicated individual to join our esteemed academic community as a Lecturer. As a Lecturer at NUS, you will play a pivotal role in shaping the future of education and fostering intellectual growth within our diverse and vibrant student body.",
  //   "jobCategory": "Education",
  //   "level": "Mid-Level",
  //   "skills": [
  //       "Teaching",
  //       "Research"
  //   ],
  //   "employmentType": "Full-Time",
  //   "location": "New York",
  //   "workHours": "40 hours per week",
  //   "minSalary": 75000.00,
  //   "maxSalary": 100000.00,
  //   "postedDate": "2023-09-23T00:00:00.000+00:00",
  //   "closingDate": "2023-10-23T00:00:00.000+00:00",
  //   "version": 1,
  //   "lastUpdatedBy": "Admin",
  //   "lastUpdatedTime": "2023-09-23T12:00:00.000+00:00",
  //   "createdBy": "Admin",
  //   "createdTime": "2023-09-23T12:00:00.000+00:00"
  // }
  const [data, setData] = useState(MOCK_JOBDETAILS_RESP);
  const { jobId } = useParams();
  console.log("jobId",jobId);
  // const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = event.target;
  //   setFormData({ ...formData, [name]: value });
  //   // console.log("formData ", formData.salary, formData.searchkey);
  // };

  // const addFilterKeywords = (data: any) => {
  //   if (!filterKeywords.includes(data)) {
  //     setfilterKeywords([...filterKeywords, data]);
  //   }
  // };

  //   const deleteKeyword = (data: any) => {
  //     const newKeywords = filterKeywords.filter((key) => key !== data);
  //     setfilterKeywords(newKeywords);
  //   };

  //   const clearAll = () => {
  //     setfilterKeywords([]);
  //   };

  // let date : Date


  useEffect(() => {
      let url = `${process.env.REACT_APP_SHIOK_JOBS_BFF_JOBMS_URL}/${jobId}`;
      console.log(`calling ${url}`);
      axios
        .get(
          url,
          {
            // headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          console.log("api response ", res.data);
          // data = res.data;
          setData(res.data);
        })
        .catch((err) => {

          const error = err as AxiosError;
          console.error("error when calling API", error);
          // setData(MOCK_JOBDETAILS_RESP);
        });

  }, [jobId]);

  return (
    
    <div className="container-main job-details pt-5">

      <Container className="job-details-card bg-white p-4 pb-5 custom-shadow">
        <div className="job-details-part1 d-flex p-3  pb-4">
          <div className="flex-grow-1 ">
            <h1>{data.jobTitle}</h1>
            <div className="">
              <div className="">Company: {data.companyName}</div>
              <div className="">Industry: {data.jobCategory}</div>
              <div className="">Experience: {data.level}</div>
              <div className="">Employment: {data.employmentType}</div>
            </div>
            <div>Skills:</div>
            <div className="part2">
              {data && data.skills.map((key, id) => (
                <span key={id}>{key}</span>
              ))}
            </div>
          </div>
          <div className="salary text-end p-2">
              <div className="">From <span className="fw-bold">${data.minSalary}</span></div>
              <div className="">To <span className="fw-bold">${data.maxSalary}</span></div>
              <div className="">yearly </div>
          </div>
        </div>
        <div className="p-3 pt-4">
          <div>{data.jobSummary}</div>
          <div className="pt-4 custom-turqoise">Posted on {(new Date(data.postedDate)).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}</div>
        </div>

        <div className="d-flex justify-content-end align-items-end mt-4 px-3">
          <Button variant="primary" type="submit" className="btn-search">
            Apply
          </Button>
        </div>
      </Container>
    </div>
    
  );
};

export default Home;
