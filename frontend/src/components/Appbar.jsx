import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export function Appbar({ firstName }) {
    const isAuthenticated = localStorage.getItem('token');
    let navigate=useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/signin');
    };

    return (
        <nav className="bg-gray-200 shadow-md">
            <div className="container mx-auto flex items-center justify-between p-4">
                <Link className="text-2xl font-bold text-blue-500" to="">
                    Paypal
                </Link>
                <div className="flex items-center space-x-4">
                    {isAuthenticated ? (
                        <p
                            className="text-blue-500 hover:text-blue-700 transition duration-300"
                            onClick={handleLogout}
                        >
                            Logout
                        </p>
                    ) : (
                        <Link
                            className="text-blue-500 hover:text-blue-700 transition duration-300"
                            to="/signin"
                        >
                            Sign In
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}
