import React, { useState } from 'react';
import './signup-login.css';
import Swal from 'sweetalert2';
import {Link} from 'react-router-dom'

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.base_url}/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Signup successful!',
                });
                setName('');
                setEmail('');
                setPassword('');
            } else {
                const data = await response.json();
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: data.msg || 'Something went wrong!',
                });
            }
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Server error. Please try again later.',
            });
        }
    };

    return (
        <div className="container ">
            <div className="row ">
                <h3 className='text-center m-3'>RealTime Chat Application</h3>
                <div className="col-sm-6 offset-sm-3">
                    <div className="card signup">
                        <h5 className='ms-3 mt-2'>Signup</h5>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className='form-control mt-2'
                                    placeholder='Enter the Name'
                                />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className='form-control mt-2'
                                    placeholder='Enter the Email'
                                />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="current-password"
                                    className='form-control mt-2'
                                    placeholder='Enter the Password'
                                />
                                <button type='submit' className='btn btn-primary mt-2'>SignUp</button>
                                
                            </form>
                            <Link className='mr-4' to="/login">If Have Already account </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
