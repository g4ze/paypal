import { Heading } from '../components/Heading.jsx';
import { Field } from '../components/Field.jsx';
import { Button } from '../components/Button.jsx';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
export function Signup() {
    const navigate=useNavigate();
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    return (
        <div className='flex justify-center items-center h-screen '>
            <div className='max-w-md w-full mx-auto'>
                <div className='bg-white rounded-lg shadow-lg p-8'>
                <nav className="pb-3">
            <div className="container mx-auto flex items-center justify-between">
                <Link className="text-4xl font-bold text-blue-500" to="/" style={{ textShadow: '2px 2px 4px rgba(10, 0, 0, 0.3)' }}>
                    Paypal
                </Link>
            </div>
        </nav>
                    <form>
                        <Heading label="Sign Up" />
                        <Field label="First Name" type="text" placeholder="John" onChange={
                            (e) => {
                                setFirstName(e.target.value)}
                        } />
                        <Field label="Last Name" type="text" placeholder="Doe" onChange={
                            (e) => {
                                setLastName(e.target.value)}
                        } />
                        <Field label="Username" type="text" placeholder="doe67" onChange={
                            (e) => {
                                setUsername(e.target.value)}
                        } />
                        <Field label="Password" 
                        type="password" placeholder="********" onChange={(e) => {
                            setPassword(e.target.value)
                        }
                        } />
                        <div className='flex items-center justify-between'>
                            <Button label={"Sign Up"} type='button' onClick={
                                async ()=>{try {
                                    const response = await fetch('http://localhost:3000/api/v1/user/signup', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({
                                            firstName: firstName,
                                            lastName: lastName,
                                            username: username,
                                            password: password
                                        })
                                    });
                                    if (response.status === 200) {
                                        console.log("User created successfully");
                                        localStorage.setItem('token', response.json().token);
                                        navigate('/signin');
                                    } else {
                                        alert(response.data);
                                    }
                                } catch (error) {
                                    console.error("An error occurred during signup:", error);
                                }
                                }
                            }/>
                        </div>
                    </form>
                    <div className="text-center mt-4">
            <Link to="/signin" className="text-blue-500 hover:text-blue-700 transition duration-300">
              Already have an account? Sign In
            </Link>
            </div>
                </div>
            </div>
        </div>
    );
}
