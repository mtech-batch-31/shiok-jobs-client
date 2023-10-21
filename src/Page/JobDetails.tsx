import "./styles/JobDetails.css";

import React, {useEffect, useState} from "react";
import { Container, Button } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import { API_URL, MOCK_JOBDETAILS_RESP } from "../utilities/constants";
import { AxiosError } from "axios";
import axiosInstance from "../utilities/axiosInstance";
import { useAuth } from '../Auth/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const [data, setData] = useState(MOCK_JOBDETAILS_RESP);
  const { jobId } = useParams();
  console.log("jobId:",jobId);
  const navigate = useNavigate();

  const { isLoggedIn } = useAuth();
  const location = useLocation();
  const onApply = () => {
    if (!isLoggedIn){
      const redirectUrl = `/login?redirect=${location.pathname}`;
      console.log("redirect to:",redirectUrl)
      navigate(redirectUrl);
      return;
    }
    console.log(`applying for job, jobId: ${jobId}`);
    let url = `${API_URL.JOBS}/apply`;
    console.log(`calling ${url}`);
    axiosInstance
      .post(
        url,
        jobId,
        {
          headers: {
            'Content-Type': 'text/plain',
        }}
      )
      .then((res) => {
        console.log("api response ", res.data);
        // data = res.data;
        // setData(res.data);
      })
      .catch((err) => {

        const error = err as AxiosError;
        console.error("error when calling API", error);
      });
  }

  useEffect(() => {
      let url = `${API_URL.JOBS}/${jobId}`;
      console.log(`calling ${url}`);
      axiosInstance
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
          <Button variant="primary" type="submit" className="btn-search" onClick={onApply}>
            Apply
          </Button>
        </div>
      </Container>
    </div>
    
  );
};

export default Home;
