import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./styles/UserProfile.css";

import React, {useEffect, useState} from "react";
import { Container } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import { API_URL, MOCK_USERDETAILS_RESP } from "../utilities/constants";
import { AxiosError } from "axios";
import axiosInstance from "../utilities/axiosInstance";

const Home: React.FC = () => {
  const [data, setData] = useState(MOCK_USERDETAILS_RESP);
  const [workingExperience, setWork] = useState(MOCK_USERDETAILS_RESP.workingExperience);
  const [educationalExperience, setEducation] = useState(MOCK_USERDETAILS_RESP.educationalExperience);
  const { userId } = useParams();
  console.log("userId",userId);

  useEffect(() => {
      let url = API_URL.USER_PROFILE
      console.log(`calling ${url}`);
      axiosInstance
        .get(
          url,
          {
            headers: { 'user-id': '06396421-0159-42cf-a6a6-64aac15cc4b1' },
          }
        )
        .then((res) => {
          console.log("api response ", res.data);
          // data = res.data;
          setData(res.data);
          setWork(res.data.workingExperience);
          setEducation(res.data.educationalExperience);
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
          {workingExperience.map((experience) => (
            <div key={experience.id}>
              <div className="job-details-part1 d-flex p-3  pb-4"></div><br/>
            <h3>{experience.company}</h3>
            <div className="d-flex pb-4">
              <div className="flex-grow-1 ">
                  <div className="">{experience.jobTitle}</div>
              </div>
              <div className="salary text-end p-2">
                  <div className=" fw-bold">{experience.yearStart} - {experience.yearEnd}</div>
              </div>
              </div>
              <p>{experience.experience}</p>
              
            </div>
          ))}
      </div>
    );
  };

  const EducationalExperience = () => {
    return (
      <div>
        <h2>Educational Experience</h2>
        {/* <ul> */}
          {educationalExperience.map((experience) => (
            <div key={experience.id}>
              <div className="job-details-part1 d-flex p-3  pb-4"></div><br/>
              <div className="d-flex pb-4">
              <div className="flex-grow-1 ">
                  <div className=""><h4>{experience.school}</h4></div>
              </div>
              <div className="salary text-end p-2">
                  <div className=" fw-bold">{experience.yearStart} - {experience.yearEnd}</div>
              </div>
              </div>
              <p>{experience.description}</p>
             </div>
          ))}
        {/* </ul> */}
      </div>
    );
  };

  return (
    
    <div className="container-main job-details pt-5">
      <Container className="job-details-card bg-white p-4 pb-5 custom-shadow">
        {/* <div className="job-details-part1 d-flex p-3  pb-4"> */}
          <p className="flex-grow-1 ">
            <p><h1>{data.name}</h1></p>
            <p className="">
            <p className="salary fw-bold">{data.seeking ? "Open to Jobs" : "Not Open to Jobs"}</p>
              <p className="">{data.jobTitle}</p>
              <p className="">{data.about}</p>
              <p className="d-flex justify-content-end align-items-end mt-4 px-3">
              <div className="part2 mx-2">
                <span>Switch job seeking status</span>
              </div>
            </p>
          </p>
        </p>
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
