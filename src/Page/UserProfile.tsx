import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./styles/UserProfile.css";

import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { API_URL, MOCK_USERDETAILS_RESP } from "../utilities/constants";
import { AxiosError } from "axios";
import axiosInstance from "../utilities/axiosInstance";

const Home: React.FC = () => {
  const [data, setData] = useState(MOCK_USERDETAILS_RESP);
  const [workExperience, setWork] = useState(MOCK_USERDETAILS_RESP.workExperience);
  const [education, setEducation] = useState(MOCK_USERDETAILS_RESP.education);
  useEffect(() => {

    let url = API_URL.USER_PROFILE
    console.log(`calling ${url}`);
    axiosInstance
      .get(
        url
      )
      .then((res) => {
        console.log("api response ", res.data);
        // data = res.data;
        setData(res.data);
        setWork(res.data.workExperience);
        setEducation(res.data.education);
      })
      .catch((err) => {

        const error = err as AxiosError;
        console.error("error when calling API", error);
        // setData(MOCK_JOBDETAILS_RESP);
      });

  }, []);

  const WorkExperience = () => {
    return (
      <div>
        <h2>Working Experience</h2>
        {workExperience != null ? ( workExperience.map((experience) => (
          <div key={experience.id}>
            <div className="job-details-part1 d-flex p-3  pb-4"></div><br />
            <Row className="">
              <Col xs="auto" className="logo">
                <img src={experience.logo} alt="" width="70px" />
              </Col>
              <Col>
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
              </Col>
            </Row>
          </div>
        ))) :(<h4>No work experience</h4>)}
      </div>
    );
  };

  const Education = () => {
    return (
      <div>
        <h2>Educational Experience</h2>
        {/* <ul> */}
        {education != null ? (education.map((experience) => (
          <div key={experience.id}>
            <div className="job-details-part1 d-flex p-3  pb-4"></div><br />
            <Row className="">
              <Col xs="auto" className="logo">
                <img src={experience.logo} alt="" width="70px" />
              </Col>
              <Col>
                <div className="d-flex pb-4">
                  <div className="flex-grow-1 ">
                    <div className=""><h4>{experience.school}</h4></div>
                  </div>
                  <div className="salary text-end p-2">
                    <div className=" fw-bold">{experience.yearStart} - {experience.yearEnd}</div>
                  </div>
                </div>
                <p>{experience.description}</p>
              </Col>
            </Row>
          </div>
        ))) : (<h4>Education not filled</h4>)}
        {/* </ul> */}
      </div>
    );
  };


  // const [isSeeking] = useState(false);
  const handleSeekingStatusChange = () => {
    const newIsSeeking = !data.seeking;
    const config = {
      method: 'PUT',
      url: API_URL.UPDATE_PROFILE,
      headers: {
        'Content-Type': 'application/json',
        'user-id': '06396421-0159-42cf-a6a6-64aac15cc4b1',
        // Add any other headers as needed
      },
      data: {
        seekingJob: newIsSeeking, // Toggle the seeking status
      },
    };

    // Make the Axios request
    axiosInstance(config)
      .then((response) => {
        if (response.status === 200) {
          setData(response.data);
          // setIsSeeking(!isSeeking); // Update the state after a successful PUT
        } else {
          console.error('Failed to update seeking status');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (

    <div className="container-main job-details pt-5">
      <Container className="job-details-card bg-white p-4 pb-5 custom-shadow">
        <p className="flex-grow-1 ">
          <Row className="">
            <Col xs="auto" className="logo">
              <img src={data.image} alt="" width="70px" />
            </Col>
            <Col>
              <h1>{data.name}</h1>
              <p className="">
                <p className="salary fw-bold">{data.seeking ? "Open to Jobs" : "Not Open to Jobs"}</p>
                <p className="">{data.jobTitle}</p>
                <p className="">{data.about}</p>
                <p className="d-flex justify-content-end align-items-end mt-4 px-3">
                  <div className="part2 mx-2">
                    <span onClick={handleSeekingStatusChange}>{data.seeking ? "Stop looking for jobs" : "Restart job search"}</span>
                  </div>
                </p>
              </p>
            </Col>
          </Row>
        </p>
      </Container><br />
      <Container className="job-details-card bg-white p-4 pb-5 custom-shadow">
        <div>
          <WorkExperience />
        </div>
      </Container><br />
      <Container className="job-details-card bg-white p-4 pb-5 custom-shadow">
        <div>
          <Education />
        </div>
      </Container><br />

    </div>

  );
};

export default Home;
