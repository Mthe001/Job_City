import React from 'react';
import Swal from 'sweetalert2'; // Import SweetAlert
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const AddJob = () => {
    const { user } = useAuth(); // Get logged-in user details
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const initialData = {};

        // Loop through the FormData entries
        for (let [key, value] of formData.entries()) {
            if (key === 'requirements' || key === 'responsibilities') {
                // Split by newlines and remove extra spaces
                initialData[key] = value.split('\n').map(item => item.trim());
            } else if (key === 'salaryMin' || key === 'salaryMax') {
                // Create a salaryRange object to hold min and max salary
                if (!initialData.salaryRange) {
                    initialData.salaryRange = {};
                }
                initialData.salaryRange[key === 'salaryMin' ? 'min' : 'max'] = Number(value); // Convert to number
            } else {
                initialData[key] = value;
            }
        }

        // Add the logged-in user's email as hr_email and hr_name
        initialData.hr_email = user?.email || 'default@example.com';
        initialData.hr_name = formData.get('hr_name'); // Get the HR name value

        console.log(initialData);

        // API Call Simulation
        fetch('http://localhost:5000/jobs', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(initialData),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                // Success alert
                Swal.fire({
                    title: 'Job Posted!',
                    text: 'Your job posting was successfully submitted.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                }).then(() => {
                    form.reset(); // Reset the form after successful submission
                    navigate('/'); // Navigate to the jobs page
                });
            })
            .catch(error => {
                console.error('Error:', error);
                // Error alert
                Swal.fire({
                    title: 'Error',
                    text: 'There was an error posting the job.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            });
    };

    return (
        <div className="p-6 max-w-4xl mx-auto bg-slate-100 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-6">Post a New Job</h2>
            <form onSubmit={handleSubmit}>
                {/* Job Title */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Job Title</label>
                    <input
                        type="text"
                        name="title"
                        className="input input-bordered w-full"
                        placeholder="Enter job title"
                        required
                    />
                </div>

                {/* Location */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Location</label>
                    <input
                        type="text"
                        name="location"
                        className="input input-bordered w-full"
                        placeholder="Enter location"
                        required
                    />
                </div>

                {/* Job Type */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Job Type</label>
                    <select
                        name="jobType"
                        className="select select-bordered w-full"
                        required
                    >
                        <option value="" disabled>Select job type</option>
                        <option value="Full-Time">Full-Time</option>
                        <option value="Part-Time">Part-Time</option>
                        <option value="Intern">Intern</option>
                    </select>
                </div>

                {/* Category */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <input
                        type="text"
                        name="category"
                        className="input input-bordered w-full"
                        placeholder="Enter job category"
                        required
                    />
                </div>

                {/* Application Deadline */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Application Deadline</label>
                    <input
                        type="date"
                        name="applicationDeadline"
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                {/* Salary Range */}
                <div className="mb-4 grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Min Salary</label>
                        <input
                            type="number"
                            name="salaryMin"
                            className="input input-bordered w-full"
                            placeholder="Min salary"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Max Salary</label>
                        <input
                            type="number"
                            name="salaryMax"
                            className="input input-bordered w-full"
                            placeholder="Max salary"
                            required
                        />
                    </div>
                </div>

                {/* Currency */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Currency</label>
                    <select
                        name="currency"
                        className="select select-bordered w-full"
                        required
                    >
                        <option value="USD">USD - United States Dollar</option>
                        <option value="EUR">EUR - Euro</option>
                        <option value="GBP">GBP - British Pound</option>
                        <option value="INR">INR - Indian Rupee</option>
                        <option value="JPY">JPY - Japanese Yen</option>
                    </select>
                </div>

                {/* Description */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea
                        name="description"
                        className="textarea textarea-bordered w-full"
                        placeholder="Enter job description"
                        required
                    ></textarea>
                </div>

                {/* Requirements */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Requirements</label>
                    <textarea
                        name="requirements"
                        className="textarea textarea-bordered w-full"
                        placeholder="Enter requirements (one per line)"
                        required
                    ></textarea>
                    <small className="block text-gray-500 mt-1">
                        Separate each requirement with a new line.
                    </small>
                </div>

                {/* Responsibilities */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Responsibilities</label>
                    <textarea
                        name="responsibilities"
                        className="textarea textarea-bordered w-full"
                        placeholder="Enter responsibilities (one per line)"
                        required
                    ></textarea>
                    <small className="block text-gray-500 mt-1">
                        Separate each responsibility with a new line.
                    </small>
                </div>

                {/* HR Name */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">HR Name</label>
                    <input
                        type="text"
                        name="hr_name"
                        className="input input-bordered w-full"
                        placeholder="Enter HR name"
                        required
                    />
                </div>

                {/* Company Name */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Company Name</label>
                    <input
                        type="text"
                        name="company"
                        className="input input-bordered w-full"
                        placeholder="Enter company name"
                        required
                    />
                </div>

                {/* Company Logo */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Company Logo (URL)</label>
                    <input
                        type="text"
                        name="company_logo"
                        className="input input-bordered w-full"
                        placeholder="Enter logo URL"
                    />
                </div>

                {/* HR Logo */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">HR Logo (URL)</label>
                    <input
                        type="text"
                        name="hr_logo"
                        className="input input-bordered w-full"
                        placeholder="Enter HR logo URL"
                    />
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary w-full">
                    Post Job
                </button>
            </form>
        </div>
    );
};

export default AddJob;
