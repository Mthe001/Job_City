// import React, { useEffect } from 'react';
// import HotJobCard from './HotJobCard';

// const HotJobs = () => {
//     const [jobs, setJobs] = React.useState([]);

//     useEffect(() => {
//         fetch('http://localhost:5000/jobs')
//             .then((response) => response.json())
//             .then((data) => setJobs(data));
//     }, []);

//     return (
//         <div className="p-10 m-5">
//             <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-10">
//                 {jobs.map((job) => (
//                     <HotJobCard key={job._id} job={job} />
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default HotJobs;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HotJobCard from './HotJobCard';

const HotJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get('http://localhost:5000/jobs', {
                    withCredentials: true, // Send cookies for authentication
                });
                setJobs(response.data); // Update state with fetched jobs
            } catch (err) {
                console.error('Error fetching jobs:', err);
                setError('Failed to load jobs. Please try again later.');
            }
        };

        fetchJobs();
    }, []);

    return (
        <div className="p-10 m-5">
            {error && <p className="text-red-500">{error}</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {jobs.map((job) => (
                    <HotJobCard key={job._id} job={job} />
                ))}
            </div>
        </div>
    );
};

export default HotJobs;
