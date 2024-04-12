import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import React, { useState, useEffect } from "react";
import {  Link } from "react-router-dom";
import { Container, Button, Form, Row, Col } from "react-bootstrap";
import "./styles/Home.css";
import { Auth } from '@aws-amplify/auth';
import { ACCESS_TOKEN } from "../utilities/constants";
import { ID_TOKEN, REFRESH_TOKEN } from "../utilities/constants";
import Cookies from "js-cookie";
import { useAuth } from '../Auth/AuthContext';
import { Hub } from '@aws-amplify/core';
import { getToken } from '../utilities/auth';

interface SearchFormState {
  searchkey: string;
  salary: string;
}

Hub.listen('auth', ({ payload: { event } }) => {
  switch (event) {
    case 'signIn':
      console.log('user signed in from app ' + event);
      Home(event);
      break;
  }
});

const Home: React.FC = (event: any) => {
  const queryParams = new URLSearchParams(location.search);
  const redirectUrl = queryParams.get('redirect') || '/profile';
  if (event == 'signIn') {
    try {
      //console.log(`What is the current user: ${JSON.stringify(currentUser)}`);
      Auth.currentSession().then((res) => {
        Cookies.set(ACCESS_TOKEN, JSON.stringify(res.getAccessToken().getJwtToken()), {
          path: '/',
        });
        Cookies.set(REFRESH_TOKEN, JSON.stringify(res.getRefreshToken().getToken()), {
          path: '/',
        });
        Cookies.set(ID_TOKEN, JSON.stringify(res.getIdToken().getJwtToken()), { path: '/' });
        window.location.href = `${window.location.origin}${redirectUrl}`;
      });
    } catch (error) {
      console.error(error);
      console.log('Not signed in');
    }
  }

  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState(null);
  const { login } = useAuth();

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
  useEffect(() => {
    const token = getToken();
    if (token !== undefined) {
      login();
    }
  }, []);

  return (
    <div className="container-main bgimage">
      <Container className="searchbox vw-80 d-flex">
        <Form className="w-100" onSubmit={(e) => console.log(e)}>
          <Row className="">
            <Col sm={6} xs={12} className="py-2">
              <Form.Group controlId="searchkey" className="shadow">
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
              <Form.Group controlId="salary" className="shadow">
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
              <Link className="button" to="/job" onClick={() => {console.log("search clicked")} }
                  state={{searchKey: formData.searchkey, salary: formData.salary}}>
              <Button variant="primary" type="submit" className="btn-search shadow">
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
