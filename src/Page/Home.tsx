import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import React, { useState } from "react";
import {  Link } from "react-router-dom";
import { Container, Button, Form, Row, Col } from "react-bootstrap";
import "./styles/Home.css";

interface SearchFormState {
  searchkey: string;
  salary: string;
}


const Home: React.FC = () => {

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

  return (
    <div className="container-main home">
      <Container className="searchbox vw-80 d-flex">
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
              <Link className="mx-2 button" to="/job" onClick={() => {console.log("search clicked")} }
                  state={{searchKey: formData.searchkey, salary: formData.salary}}>
              <Button variant="primary" type="submit" className="btn-search">
                Search
              </Button>
                </Link>
            </Col>
          </Row>
        </Form>
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
