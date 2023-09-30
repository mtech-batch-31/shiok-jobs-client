import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './Job.css'

interface JobProps {
    data: any;
    setKeywords: any;
    key: number;
}

const Job: React.FC<JobProps> = ({ data, setKeywords }) => {


    const {
        id,
        company,
        employeeType,
        skills,
        level,
        location,
        logo,
        jobTitle,
        postedAt,
    } = data;

    let keywords = [level, ...skills];

    const [SvgComponent, setSvgComponent] = useState<any>();

    useEffect(() => {
        const loadSvg = async () => {
            try {
                const { default: Svg } = await import(/* webpackChunkName: "svg" */ `${logo}`);
                setSvgComponent(Svg);
            } catch (error) {
                console.error('Error loading SVG:', error);
            }
        };

        loadSvg();
    }, [logo]);

    return (
      <Link to={`/job/${id}`} className="link-container">
        <div
            className="job-container">
            
            <div className="logo">
                <img src={SvgComponent} alt="" />
            </div>
            <div className="part1">
                <div className="company">
                    <span className="cname">{company}</span>
                    {data.new && <span className="new">new!</span>}
                </div>

                <div className="position">{jobTitle}</div>

                <div className="details">
                    <span>{postedAt}</span>
                    <span>&nbsp;•&nbsp;</span>
                    <span>{employeeType}</span>
                    <span>&nbsp;•&nbsp;</span>
                    <span>{location}</span>
                </div>
            </div>

            <div className="part2">
                {keywords.map((key, id) => (
                    <span onClick={() => setKeywords(key)} key={id}>
                        {key}
                    </span>
                ))}
            </div>
            
        </div>
        </Link>
    );
};

export default Job;
