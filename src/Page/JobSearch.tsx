import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./styles/JobSearch.css";

import React, { useEffect, useState} from "react";
import { Container, Button, Form, Row, Col } from "react-bootstrap";
import Jobs from "../Components/Jobs";
import data from "../jobs-mock.json";
import { useLocation } from "react-router";
import axios from "axios";
import IJob from "../Model/Job";

interface SearchFormState {
  searchkey: string;
  salary: string;
}

const Home: React.FC = () => {
  const [filterKeywords, setfilterKeywords] = useState<any[]>([]);
  let isMock: boolean = false;
  let jobListing: IJob[] = [];

  if (isMock)
  {
     jobListing = data as IJob[];
  }
  const {state}= useLocation();
  
  const initialFormData:SearchFormState  = {
     searchkey: state?.searchKey ?? "",
     salary: state?.salary ?? "",
   };

const [formData, setFormData] = useState<SearchFormState>(initialFormData);
const [joblist, setJobList] = useState<IJob[]>(jobListing);

  useEffect(()=>{
    searchJob();
  }, []);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    // console.log("formData ", formData.salary, formData.searchkey);
  };

  const addFilterKeywords = (data: any) => {
    if (!filterKeywords.includes(data)) {
      setfilterKeywords([...filterKeywords, data]);
    }
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    searchJob();
  }
  const searchJob = () => {
    //console.log('Calling Api:', `${process.env.REACT_APP_SHIOK_JOBS_BFF_JOBMS_URL}`);
    let url = `${process.env.REACT_APP_SHIOK_JOBS_BFF_JOBMS_URL}`;
    if(formData.searchkey.length > 0)
      url = url + `?keywords=${formData.searchkey}`;
    if(formData.salary.length > 0)
      url = url + `?minimumSalary=${formData.salary}`;
    axios
      .get(url)
      .then((res) => {
        //console.log('response: ', res);
        setJobList(res.data.data);
      })
      .catch((err)=> {
        console.error("error when calling job api", err);
      });
  }

  return (
    <div className="container-main jobsearch">
      <Container className="jobsearch-searchbox vw-80 d-flex pt-5">
        <Form className="w-100" onSubmit={handleFormSubmit}>
          <Row className="">
            <Col sm={6} xs={12} className="py-2">
              <Form.Group controlId="searchkey">
                <Form.Control
                  type="text"
                  placeholder="Keywords, e.g. Job Title, Company..."
                  name="searchkey"
                  value={formData.searchkey}
                  onChange={onChangeHandler}
                />
              </Form.Group>
            </Col>
            <Col sm={4} xs={12} className="py-2">
              <Form.Group controlId="salary">
                <Form.Control
                  type="text"
                  placeholder="Min Salary"
                  name="salary"
                  value={formData.salary}
                  onChange={onChangeHandler}
                />
              </Form.Group>
            </Col>
            <Col sm={2} xs={12} className="py-2">
              <Button variant="primary" type="submit" className="btn-search">
                Search
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
      <Container className="jobs-wrapper">
        <Jobs
          data={joblist}
          setKeywords={addFilterKeywords}
        />
      </Container>
    </div>
  );
};

export default Home;
