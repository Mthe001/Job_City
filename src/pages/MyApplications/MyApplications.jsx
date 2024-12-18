import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';

const MyApplications = () => {
    const { user } = useAuth();
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/job-application?email=${user.email}`)
            .then((response) => response.json())
            .then((data) => setJobs(data));
    }, [user.email]);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold text-center mb-6">
                My Applications: {jobs.length}
            </h1>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* Table Header */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Job Title</th>
                            <th>Company</th>
                            <th>View Application</th>
                        </tr>
                    </thead>
                    {/* Table Body */}
                    <tbody>
                        {jobs.length > 0 ? (
                            jobs.map((job, index) => (
                                <tr key={index} className="hover:bg-slate-100">
                                    <th>
                                        <label>
                                            <input type="checkbox" className="checkbox" />
                                        </label>
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={job.company_logo || 'https://via.placeholder.com/50'}
                                                        alt={`${job.company} Logo`}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{job.title}</div>
                                                <div className="text-sm text-gray-500">{job.location}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="text-sm">{job.company}</div>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-outline btn-sm"
                                            onClick={() => alert(`Viewing application for ${job.title}`)}
                                        >
                                            View Application
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center text-gray-500">
                                    No applications found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyApplications;
