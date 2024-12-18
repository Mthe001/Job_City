import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';

const ViewApplications = () => {
    const applications = useLoaderData();

    // State to manage the status for each application
    const [statuses, setStatuses] = useState(
        applications.reduce((acc, app) => {
            acc[app._id] = 'Under Review'; // Default status
            return acc;
        }, {})
    );

    // Handle status change
    const handleStatusChange = async (id, newStatus) => {
        // Confirmation Alert
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: `You are about to change the status to "${newStatus}"`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, change it!',
        });

        if (result.isConfirmed) {
            try {
                const response = await fetch(`http://localhost:5000/job-applications/${id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ status: newStatus }),
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log(`Application ${id} status updated to: ${newStatus}`, data);

                    // Update the local state
                    setStatuses((prevStatuses) => ({
                        ...prevStatuses,
                        [id]: newStatus,
                    }));

                    // Success Alert
                    Swal.fire(
                        'Updated!',
                        `The status has been changed to "${newStatus}".`,
                        'success'
                    );
                } else {
                    throw new Error('Failed to update status');
                }
            } catch (error) {
                console.error(`Error updating status for application ${id}:`, error);

                // Error Alert
                Swal.fire('Error', 'There was a problem updating the status. Please try again.', 'error');
            }
        }
    };

    return (
        <div className="p-6 max-w-5xl mx-auto bg-zinc-800 rounded-lg shadow-lg">
            <h1 className="text-2xl font-semibold mb-6 text-gray-100">
                View Applications: {applications.length}
            </h1>
            {applications.length === 0 ? (
                <p className="text-gray-300">No applications found for this job.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full text-gray-100">
                        <thead>
                            <tr className="bg-zinc-700">
                                <th>#</th>
                                <th>Applicant Email</th>
                                <th>LinkedIn</th>
                                <th>Resume</th>
                                <th>GitHub</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.map((app, index) => (
                                <tr key={app._id} className="hover:bg-zinc-600">
                                    <th>{index + 1}</th>
                                    <td>{app.applicant_email}</td>
                                    <td>
                                        <a
                                            href={app.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-400 underline"
                                        >
                                            LinkedIn Profile
                                        </a>
                                    </td>
                                    <td>
                                        <a
                                            href={app.resume}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-400 underline"
                                        >
                                            View Resume
                                        </a>
                                    </td>
                                    <td>
                                        <a
                                            href={app.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-400 underline"
                                        >
                                            GitHub Profile
                                        </a>
                                    </td>
                                    <td>
                                        <select
                                            className="select select-bordered bg-zinc-700 text-gray-100"
                                            value={statuses[app._id]}
                                            onChange={(e) => handleStatusChange(app._id, e.target.value)}
                                        >
                                            <option disabled>Change Status</option>
                                            <option value="Under Review">Under Review</option>
                                            <option value="Set Interview">Set Interview</option>
                                            <option value="Hired">Hired</option>
                                            <option value="Reject">Reject</option>
                                        </select>
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

export default ViewApplications;
