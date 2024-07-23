import React, { useState } from 'react';
import './signup-login.css';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
      const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            console.log(data.token)

            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('userId', data.data._id);
                localStorage.setItem('userName', data.data.name);

                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Login successful!',
                });
                setEmail('');
                setPassword('');
                navigate('/chat');  

            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: data.msg || 'Invalid credentials',
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
        <>
            <div className="container">
                <div className="row">
                    <h3 className='text-center m-3'>RealTime Chat Application</h3>
                    <div className="col-sm-6 offset-sm-3">
                        <div className="card signup">
                            <h5 className='ms-3 mt-2'>Login</h5>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
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
                                    <button type='submit' className='btn btn-primary mt-2'>Login</button>
                                </form>
                                <Link to="/signup">If Have not Account</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
