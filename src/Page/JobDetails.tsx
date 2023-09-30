import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./styles/JobDetails.css";

import React, {useEffect} from "react";
// import Jobs from "../Components/Jobs";
// import data from "../jobs-mock.json";
import { Container, Button } from "react-bootstrap";

import { MOCK_JOBDETAILS_RESP } from "../utilities/constants";
import axios from "axios";

// interface SearchFormState {
//   searchkey: string;
//   salary: string;
// }

// interface IJob {
//   id: number;
//   company: string;
//   logo: string;
//   new: boolean;
//   jobTitle: string;
//   salaryRange: string;
//   level: string;
//   postedAt: string;
//   employeeType: string;
//   location: string;
//   skills: string[];
// }

const Home: React.FC = () => {
  let data = MOCK_JOBDETAILS_RESP;
  // const [filterKeywords, setfilterKeywords] = useState<any[]>([]);
  // let isMock: boolean = true;
  // let jobListing: IJob[] = [];

  // if (isMock) jobListing = data as IJob[];

  // const initialFormData: SearchFormState = {
  //   searchkey: "",
  //   salary: "",
  // };
  // const [formData, setFormData] = useState<SearchFormState>(initialFormData);

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
      let url = `${process.env.REACT_APP_SHIOK_JOBS_MS_JOBS_URL}/api/v1/jobs/${data.id}`;
      console.log(`calling ${url}`);
      axios
        .get(
          url,
          {
            // headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          console.log("api response", res.data);
          data = res.data;
        })
        .catch((err) => {
          console.error("error when calling API", err);
        });

  }, []);

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
              {data.skills.map((key, id) => (
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
      {/* <Container className="jobs-wrapper">
        <Jobs
          keywords={filterKeywords}
          data={jobListing}
          setKeywords={addFilterKeywords}
        />
      </Container> */}
    </div>
  );
};

export default Home;
