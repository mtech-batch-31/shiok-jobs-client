import React from "react";
import Job from "./Job";
import './Jobs.css'
import IJob from "../Model/Job";

interface JobsProps {
    data: IJob[];
    setKeywords: any;
}

const Jobs: React.FC<JobsProps> = ({ data, setKeywords }) => {
    //console.log('props data:',data);
   // const [filteredData, setfilteredData] = useState<any[]>(data);

    // useEffect(() => {
    //     const modifiedData = () => {
    //         if (keywords) {
    //             const newData = data.filter((d: { role: any; level: any; languages: string | any[]; tools: string | any[]; id: any; }) => {
    //                 return keywords.every((key: any) => {
    //                     return (
    //                         d.role === key ||
    //                         d.level === key ||
    //                         d.languages.includes(key) ||
    //                         d.tools.includes(key)
    //                     );
    //                 });
    //             });
    //             setfilteredData(newData);
    //         } else {
    //             setfilteredData(data);
    //         }
    //     };

    //     modifiedData();
    // }, [keywords, data]);

    return (
        <div className="jobs">
            {data.map((d: IJob) => {
                return <Job key={d.id} data={d} setKeywords={setKeywords} />;
            })}
        </div>
    );
};

export default Jobs;
