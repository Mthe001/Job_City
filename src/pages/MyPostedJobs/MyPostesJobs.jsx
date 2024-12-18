import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import useAuth from '../../hooks/useAuth';

const MyPostedJobs = () => {
    const [jobs, setJobs] = useState([]);
    const { user } = useAuth();
    const navigate = useNavigate(); // Initialize useNavigate for redirection

    useEffect(() => {
        fetch(`http://localhost:5000/jobs?email=${user.email}`)
            .then(response => response.json())
            .then(data => setJobs(data))
            .catch(error => console.error('Error fetching jobs:', error));
    }, [user.email]);

    // Function to handle "View Applications" click
    const handleViewApplications = (jobId) => {
        navigate(`/applications/${jobId}`); // Navigate to a route with the job ID
    };

    return (
        <div className="p-6 max-w-5xl mx-auto bg-zinc-800 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 text-gray-100">My Posted Jobs: {jobs.length}</h2>
            {jobs.length === 0 ? (
                <p className="text-gray-300">You haven't posted any jobs yet.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full text-gray-100">
                        <thead>
                            <tr className="bg-zinc-700">
                                <th>#</th>
                                <th>Job Title</th>
                                <th>Location</th>
                                <th>Job Type</th>
                                <th>Category</th>
                                <th>Application Count</th>
                                <th>Salary Range</th>
                                <th>Application Deadline</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobs.map((job, index) => (
                                <tr key={job._id} className="hover:bg-zinc-600">
                                    <th>{index + 1}</th>
                                    <td>{job.title}</td>
                                    <td>{job.location}</td>
                                    <td>{job.jobType}</td>
                                    <td>{job.category}</td>
                                    <td>{job.applicationCount}</td>
                                    <td>
                                        {job.salaryRange?.min} - {job.salaryRange?.max} {job.currency}
                                    </td>
                                    <td>{new Date(job.applicationDeadline).toLocaleDateString()}</td>
                                    <td>
                                        <button
                                            onClick={() => handleViewApplications(job._id)}
                                            className="btn btn-sm btn-primary text-gray-100"
                                        >
                                            View Applications
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyPostedJobs;
