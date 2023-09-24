import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./styles/JobSearch.css";

import React, { useState} from "react";
import { Container, Button, Form, Row, Col } from "react-bootstrap";
import Jobs from "../Components/Jobs";
import data from "../jobs-mock.json";


interface SearchFormState {
  searchkey: string;
  salary: string;
}

interface IJob {
  id: number;
  company: string;
  logo: string;
  new: boolean;
  jobTitle: string;
  salaryRange: string;
  level: string;
  postedAt: string;
  employeeType: string;
  location: string;
  skills: string[];
}

const Home: React.FC = () => {
  const [filterKeywords, setfilterKeywords] = useState<any[]>([]);
  let isMock: boolean = true;
  let jobListing: IJob[] = [];

  if (isMock) jobListing = data as IJob[];

  const initialFormData: SearchFormState = {
    searchkey: "",
    salary: "",
  };
  const [formData, setFormData] = useState<SearchFormState>(initialFormData);

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

  //   const deleteKeyword = (data: any) => {
  //     const newKeywords = filterKeywords.filter((key) => key !== data);
  //     setfilterKeywords(newKeywords);
  //   };

  //   const clearAll = () => {
  //     setfilterKeywords([]);
  //   };

  return (
    <div className="container-main jobsearch">
      <Container className="jobsearch-searchbox vw-80 d-flex pt-5">
        <Form className="w-100" onSubmit={(e) => console.log(e)}>
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
          keywords={filterKeywords}
          data={jobListing}
          setKeywords={addFilterKeywords}
        />
      </Container>
    </div>
  );
};

export default Home;
