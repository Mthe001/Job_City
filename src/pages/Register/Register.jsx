import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext/AuthContext';

const Register = () => {
    const navigate = useNavigate(); // Initialize useNavigate hook

    const { createUser } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmPassword.value;

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }


        createUser(email, password)
            .then(result => {
                console.log(result.user)
            })
            .catch(error => {
                console.log(error.message)
            })


        console.log('Form Data Submitted:', { email, password });


        // Navigate to the sign-in page after successful registration
        navigate('/');
    };

    return (
        <div className="max-w-md mx-auto p-4 border border-gray-300 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="input input-bordered w-full"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium mb-1">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        required
                        className="input input-bordered w-full"
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        required
                        className="input input-bordered w-full"
                    />
                </div>
                <div className="text-right">
                    <a href="/forgot-password" className="text-sm text-blue-500 hover:underline">Forgot Password?</a>
                </div>
                <button type="submit" className="btn btn-primary w-full">Register</button>
            </form>
            <div className="text-center mt-4">
                <span className="text-sm">Already have an account? </span>
                <button
                    onClick={() => navigate('/signIn')}
                    className="text-sm text-blue-500 hover:underline"
                >
                    Sign In
                </button>
            </div>
        </div>
    );
};

export default Register;
