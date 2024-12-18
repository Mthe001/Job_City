import React from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';  // Importing the back arrow icon from react-icons

const JobDetails = () => {
    const { _id, title, description, company, company_logo, location, jobType, salaryRange, applicationDeadline, requirements } = useLoaderData();
    const navigate = useNavigate();  // Hook to navigate back

    const handleBack = () => {
        navigate(-1);  // Goes back to the previous page
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-base-200 shadow-xl rounded-lg">
            {/* Back Button */}
            <button
                onClick={handleBack}
                className="flex items-center mb-6 text-blue-500 hover:text-blue-700 text-lg">
                <FaArrowLeft className="mr-2" /> Back to Listings
            </button>

            <div className="flex items-center mb-6">
                {/* Company Logo */}
                <img
                    src={company_logo || 'https://via.placeholder.com/100'}
                    alt={`${company} Logo`}
                    className="w-20 h-20 object-contain rounded-full border-2 border-gray-300 mr-4"
                />
                <div>
                    <h2 className="text-3xl font-semibold text-blue-600">{title}</h2>
                    <p className="text-sm text-gray-600">{company}</p>
                    <p className="text-sm text-gray-500">{jobType} | {location}</p>
                </div>
            </div>

            <div className="text-gray-700 text-lg mb-6">
                <h3 className="font-semibold text-xl mb-4">Job Description</h3>
                <p>{description}</p>
            </div>

            {/* Salary and Deadline Section */}
            <div className="flex justify-between text-sm text-gray-600 mb-4">
                <span className="text-green-600 font-medium">
                    Salary Range: ${salaryRange?.min || "N/A"} - ${salaryRange?.max || "N/A"}
                </span>
                <span className="text-red-500 font-medium">
                    Deadline: {applicationDeadline}
                </span>
            </div>

            {/* Requirements */}
            <div className="mt-6">
                <h3 className="font-medium text-xl mb-2">Requirements:</h3>
                <ul className="list-disc list-inside text-sm text-gray-600">
                    {requirements?.map((req, index) => (
                        <li key={index}>{req}</li>
                    ))}
                </ul>
            </div>

            {/* Apply Button */}
            <div className="card-actions justify-end mt-6">
                <Link to={`/jobApply/${_id}`}><button className="btn btn-primary btn-lg">Apply Now</button></Link>
            </div>
        </div>
    );
};

export default JobDetails;
