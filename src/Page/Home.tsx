import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Button, Form, Row, Col } from "react-bootstrap";
import "./styles/Home.css";
import Cookies from "js-cookie";
import { ACCESS_TOKEN, ID_TOKEN, REFRESH_TOKEN } from "../utilities/constants";
import axios, { AxiosResponse } from "axios";
// import Jobs from "../Components/Jobs";
// import data from "../jobs-mock.json";

interface AuthResponse {
  id_token: string;
  access_token: string;
  refresh_token: string;
  expires_in: string;
  token_type: string;
}

interface AuthRequest {
  code: string;
  grant_type: string;
  client_id: string;
  client_secret: string;
  redirect_uri: string;
}

interface SearchFormState {
  searchkey: string;
  salary: string;
}

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
  // const [filterKeywords, setfilterKeywords] = useState<any[]>([]);
  // let isMock: boolean = true;
  // let jobListing: IJob[] = [];

  // if (isMock) jobListing = data as IJob[];

  

  const navigate = useNavigate();

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
    const queryParameters = new URLSearchParams(window.location.search);
    const authCode = queryParameters.get("code") as string;
    // console.log(`authorization code=${authCode}`);

    let request: AuthRequest = {
      code: authCode,
      grant_type: "authorization_code",
      client_id: process.env.REACT_APP_COGNITO_CLIENT_ID as string,
      client_secret: process.env.REACT_APP_COGNITO_CLIENT_SECRET as string,
      redirect_uri: process.env.REACT_APP_COGNITO_LOGIN_REDIRECT_URL as string
    };

    // const token = Cookies.get(ACCESS_TOKEN);
    // TO DO: discuss where to verify token
    if (authCode) {
      getAuthToken();
    }

    async function getAuthToken() {
      try {
        const response: AxiosResponse = await axios.post(
          process.env.REACT_APP_COGNITO_AUTH_TOKEN_URL as string,
          request,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        console.log("successfully retrieved token");
        navigate("/");
        const authResponse = response?.data as AuthResponse;
        
        // console.log("auth response", authResponse);
        Cookies.set(ACCESS_TOKEN, authResponse.access_token, { path: "/" });
        Cookies.set(ID_TOKEN, authResponse.id_token, { path: "/" });
        Cookies.set(REFRESH_TOKEN, authResponse.refresh_token, { path: "/" });
      } catch (error) {
        console.log("error in getting auth token: ", error);
        Cookies.remove(ACCESS_TOKEN);
        Cookies.remove(ID_TOKEN);
        Cookies.remove(REFRESH_TOKEN);
      }
    }
  }, [navigate]);

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
