import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import React from "react";
import { Container, Button } from "react-bootstrap";
import "./styles/Home.css";



const Home: React.FC = () => {
  

  return (
    <div className="container-main home border">
        <Container className="searchbox vw-80 d-flex ">
            <div className="border bg-white px-5">
              <p>Job title, company, or keywords...</p>
            </div>
            <div className="border  bg-white ms-3 px-5">
              <p>Min Salary</p>
            </div>
            <div className="ms-auto">
              <Button variant="primary" type="submit" className="ms-auto">Search</Button>
            </div>

        </Container>
    </div>
  );
};

export default Home;
