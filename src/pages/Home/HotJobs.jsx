import React, { useEffect } from 'react';
import HotJobCard from './HotJobCard';

const HotJobs = () => {
    const [jobs, setJobs] = React.useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/jobs')
            .then((response) => response.json())
            .then((data) => setJobs(data));
    }, []);

    return (
        <div className="p-10 m-5">
            <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-10">
                {jobs.map((job) => (
                    <HotJobCard key={job._id} job={job} />
                ))}
            </div>
        </div>
    );
};

export default HotJobs;
