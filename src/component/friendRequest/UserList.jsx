import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserList.css'; 
import Header from '../header';

function UserList() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/users`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setUsers(response.data.users || []);
            } catch (err) {
                setError('Failed to fetch users. Please try again later.');
                console.error('Error fetching users:', err); 
            }
        };

        fetchUsers();
    }, []);

    const sendFriendRequest = async (userId) => {
        try {
            await axios.post(`${process.env.REACT_APP_BASE_URL}/api/friend-requests/send`, { recipientId: userId }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            alert('Friend request sent successfully!');
            setSuccessMessage('Friend request sent successfully!');
            setError(null); 
        } catch (err) {
            setError('Failed to send friend request. Please try again.');
            console.error('Error sending friend request:', err); // Log full error details for debugging
        }
    };

    return (
        <>
        <Header/>
        <div className="user-list-container">
            <h2>Logged in User: {localStorage.getItem('userName')}</h2>
            {error && <p className="error">{error}</p>}
            {successMessage && <p className="success">{successMessage}</p>}
            <table className="user-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>
                                <button 
                                    className="btn btn-primary" 
                                    onClick={() => sendFriendRequest(user._id)}
                                >
                                    Send Friend Request
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    );
}

export default UserList;
