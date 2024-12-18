import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
const JobApply = () => {

    const { id } = useParams();
    const { user } = useAuth();
    // console.log(id, user);

    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1); // Navigate to the previous page
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        const name = e.target.name.value;
        const github = e.target.github.value;
        const linkedin = e.target.linkedin.value;
        const resume = e.target.resume.value;

        const jobApplication = {
            job_id: id, // Ensure `id` is defined in your component
            name,
            github,
            linkedin,
            resume,
            applicant_email: user.email,// Use the `user` object to get the email
        };

        fetch('http://localhost:5000/job-applications', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jobApplication),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.insertedId) {
                    // Show success alert
                    Swal.fire({
                        title: 'Success!',
                        text: 'Your application has been submitted successfully.',
                        icon: 'success',
                        confirmButtonText: 'OK',

                    });
                    navigate('/my_applications')
                } else {
                    // Handle any errors
                    Swal.fire({
                        title: 'Error',
                        text: 'There was an issue submitting your application.',
                        icon: 'error',
                        confirmButtonText: 'Try Again',
                    });
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                Swal.fire({
                    title: 'Error',
                    text: 'Something went wrong. Please try again later.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            });
    };





    return (
        <div className="max-w-md mx-auto p-6 border border-slate-700 rounded-lg shadow-md bg-slate-800">
            {/* Back Button */}
            <button
                onClick={handleBackClick}
                className="flex items-center mb-4 text-gray-400 hover:text-gray-100 focus:outline-none"
            >
                <FaArrowLeft className="mr-2" />
                <span>Back</span>
            </button>

            <h1 className="text-2xl font-bold text-center mb-6 text-gray-100">Job Application</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Input */}
                <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-300 mb-2">
                        Full Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full px-4 py-2 border border-slate-600 rounded-lg focus:ring-2 focus:ring-slate-500 focus:outline-none bg-slate-900 text-gray-200 placeholder-slate-400"
                        placeholder="Enter your full name"
                    />
                </div>

                {/* GitHub URL Input */}
                <div>
                    <label htmlFor="github" className="block text-sm font-semibold text-gray-300 mb-2">
                        GitHub URL
                    </label>
                    <input
                        type="url"
                        id="github"
                        name="github"
                        required
                        className="w-full px-4 py-2 border border-slate-600 rounded-lg focus:ring-2 focus:ring-slate-500 focus:outline-none bg-slate-900 text-gray-200 placeholder-slate-400"
                        placeholder="Enter your GitHub profile URL"
                    />
                </div>

                {/* LinkedIn URL Input */}
                <div>
                    <label htmlFor="linkedin" className="block text-sm font-semibold text-gray-300 mb-2">
                        LinkedIn URL
                    </label>
                    <input
                        type="url"
                        id="linkedin"
                        name="linkedin"
                        required
                        className="w-full px-4 py-2 border border-slate-600 rounded-lg focus:ring-2 focus:ring-slate-500 focus:outline-none bg-slate-900 text-gray-200 placeholder-slate-400"
                        placeholder="Enter your LinkedIn profile URL"
                    />
                </div>

                {/* Resume URL Input */}
                <div>
                    <label htmlFor="resume" className="block text-sm font-semibold text-gray-300 mb-2">
                        Resume URL
                    </label>
                    <input
                        type="url"
                        id="resume"
                        name="resume"
                        required
                        className="w-full px-4 py-2 border border-slate-600 rounded-lg focus:ring-2 focus:ring-slate-500 focus:outline-none bg-slate-900 text-gray-200 placeholder-slate-400"
                        placeholder="Enter your Resume URL"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full py-3 px-6 bg-slate-700 text-gray-100 font-medium text-sm leading-tight uppercase rounded-lg shadow-md hover:bg-slate-600 focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50 focus:outline-none"
                >
                    Apply Now
                </button>
            </form>
        </div>
    );
};

export default JobApply;
