import React from 'react';
import { FaMapMarkerAlt, FaRegClock, FaDollarSign } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const HotJobCard = ({ job }) => {
    const {
        title,
        location,
        jobType,
        category,
        applicationDeadline,
        salaryRange,
        company,
        requirements,
        company_logo,
        _id
    } = job;

    return (
        <div className="card bg-base-100 shadow-xl border border-gray-300 rounded-lg p-4 max-w-xs min-w-[300px] h-[430px] mx-auto mb-6 ">
            {/* Logo and Title Section */}
            <div className="flex items-center mb-4">
                <img
                    src={company_logo || 'https://via.placeholder.com/100'}
                    alt={`${company} Logo`}
                    className="w-14 h-14 object-contain rounded-full border-2 border-gray-300 mr-4"
                />
                <div>
                    <h2 className="text-lg font-semibold text-blue-600">{title}</h2>
                    <p className="text-sm text-gray-600">{company} - {category}</p>
                </div>
            </div>

            {/* Location and Job Type */}
            <div className="flex justify-between items-center text-sm text-gray-600 my-4">
                <span className="flex items-center">
                    <FaMapMarkerAlt className="text-blue-500 mr-2" /> {location}
                </span>
                <span className="badge badge-outline">{jobType}</span>
            </div>

            {/* Salary and Deadline */}
            <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                <span className="flex items-center">
                    <FaDollarSign className="text-green-500 mr-2" /> ${salaryRange?.min || "N/A"} - ${salaryRange?.max || "N/A"}
                </span>
                <span className="flex items-center text-red-500 text-xs">
                    <FaRegClock className="mr-1" /> Deadline: {applicationDeadline}
                </span>
            </div>

            {/* Requirements */}
            <div className='text-start'>
                <h3 className="font-medium mb-2 text-gray-700">Requirements:</h3>
                <ul className="list-disc list-inside text-sm text-gray-600">
                    {requirements.slice(0, 4).map((req, index) => (
                        <li key={index}>{req}</li>
                    ))}
                </ul>
            </div>

            {/* Apply Button */}
            <div className="card-actions justify-end mt-4">
                <Link to={`jobs/${_id}`}>
                    <button className="btn btn-primary btn-sm">Apply Now</button>
                </Link>
            </div>
        </div>
    );
};

export default HotJobCard;
