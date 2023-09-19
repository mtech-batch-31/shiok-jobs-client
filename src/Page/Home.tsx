import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import React, { useState } from "react";
import "./styles/Home.css";
import Jobs from "../Components/Jobs";
import data from '../jobs-mock.json';
import { Button, Container } from "react-bootstrap";


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
    let isMock : boolean = true;
    let jobListing : IJob[] = [];

    if (isMock)
        jobListing = data as IJob[];
     

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

        <Jobs
            keywords={filterKeywords}
            data={jobListing}
            setKeywords={addFilterKeywords} />
    </div>
  );
};

export default Home;
