import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

const ErrorPage = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 text-white">
            <div className="text-center max-w-lg p-8 rounded-lg shadow-lg bg-zinc-800">
                <h1 className="text-6xl font-bold mb-4">Oops!</h1>
                <p className="text-xl mb-6">Something went wrong. We can't seem to find the page you're looking for.</p>
                <img
                    src="https://img.icons8.com/ios/452/404.png" // Use a 404 error image
                    alt="404"
                    className="mx-auto mb-6"
                    width="200"
                />
                <Link to="/" className="bg-blue-600 text-white py-2 px-6 rounded-md text-lg hover:bg-blue-700 transition-all duration-300">
                    Go Back to Home
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;
