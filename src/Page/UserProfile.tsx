import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./styles/UserProfile.css";

import React, {useEffect, useState} from "react";
import { Container, Button } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import { API_URL, MOCK_USERDETAILS_RESP } from "../utilities/constants";
import { AxiosError } from "axios";
import axiosInstance from "../utilities/axiosInstance";

const Home: React.FC = () => {
  const [data, setData] = useState(MOCK_USERDETAILS_RESP);
  const [workingExperience] = useState(MOCK_USERDETAILS_RESP.workingExperience);
  const [educationalExperience] = useState(MOCK_USERDETAILS_RESP.educationalExperience);
  const { userId } = useParams();
  console.log("userId",userId);

  useEffect(() => {
      let url = API_URL.USER_PROFILE
      console.log(`calling ${url}`);
      axiosInstance
        .get(
          url,
          {
            headers: { userId: '06396421-0159-42cf-a6a6-64aac15cc4b1' },
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

  }, [userId]);

  const WorkingExperience = () => {
    return (
      <div>
        <h2>Working Experience</h2>
        <ul>
          {workingExperience.map((experience) => (
            <li key={experience.id}>
              <h3>{experience.company}</h3>
              <p>{experience.jobTitle}</p>
              <p>{experience.yearStart} - {experience.yearEnd}</p>
              <p>{experience.experience}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const EducationalExperience = () => {
    return (
      <div>
        <h2>Educational Experience</h2>
        <ul>
          {educationalExperience.map((experience) => (
            <li key={experience.id}>
              <h3>{experience.school}</h3>
              <p>{experience.description}</p>
              <p>{experience.yearStart} - {experience.yearEnd}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    
    <div className="container-main job-details pt-5">

      <Container className="job-details-card bg-white p-4 pb-5 custom-shadow">
        <div className="job-details-part1 d-flex p-3  pb-4">
          <div className="flex-grow-1 ">
            <h1>{data.name}</h1>
            <div className="">
            <div className="">Seeking: {data.seeking ? "Open to Jobs" : "Not Open to Jobs"}</div>
              <div className="">Job Title: {data.jobTitle}</div>
              <div className="">About: {data.about}</div>
            </div>
            {/* <div>Educational History:</div> */}
            {/* <div className="part2">
              {data && data.skills.map((key, id) => (
                <span key={id}>{key}</span>
              ))}
            </div> */}
          </div>
          {/* <div className="salary text-end p-2">
              <div className="">From <span className="fw-bold">${data.minSalary}</span></div>
              <div className="">To <span className="fw-bold">${data.maxSalary}</span></div>
              <div className="">yearly </div>
          </div> */}
        </div>
        {/* <div className="p-3 pt-4">
          <div>{data.jobSummary}</div>
          <div className="pt-4 custom-turqoise">Posted on {(new Date(data.postedDate)).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}</div>
        </div> */}

        <div className="d-flex justify-content-end align-items-end mt-4 px-3">
          <Button variant="primary" type="submit" className="btn-search">
            Switch job seeking status
          </Button>
        </div>
      </Container><br/>
      <Container className="job-details-card bg-white p-4 pb-5 custom-shadow">
      <div>
      <WorkingExperience />
      </div>
      </Container><br/>
      <Container className="job-details-card bg-white p-4 pb-5 custom-shadow">
      <div>
      <EducationalExperience />
      </div>
      </Container><br/>
    </div>
    
  );
};

export default Home;
