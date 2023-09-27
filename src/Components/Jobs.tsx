import React, { useEffect, useState } from "react";
import Job from "./Job";
import './Jobs.css'

interface JobsProps {
    data: any;
    setKeywords: any;
    keywords: any;
}

const Jobs: React.FC<JobsProps> = ({ data, setKeywords, keywords }) => {
    const [filteredData, setfilteredData] = useState<any[]>([]);

    useEffect(() => {
        const modifiedData = () => {
            if (keywords) {
                const newData = data.filter((d: { role: any; level: any; languages: string | any[]; tools: string | any[]; id: any; }) => {
                    return keywords.every((key: any) => {
                        return (
                            d.role === key ||
                            d.level === key ||
                            d.languages.includes(key) ||
                            d.tools.includes(key)
                        );
                    });
                });
                setfilteredData(newData);
            } else {
                setfilteredData(data);
            }
        };

        modifiedData();
    }, [keywords, data]);

    return (
        <div className="jobs">
            {filteredData.map((d) => {
                return <Job key={d.id} data={d} setKeywords={setKeywords} />;
            })}
        </div>
    );
};

export default Jobs;
