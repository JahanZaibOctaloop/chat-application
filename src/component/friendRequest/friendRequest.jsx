import React, { useEffect, useState } from 'react';
import './friendRequest.css';
import axios from 'axios';
import Header from '../header';

function FriendRequest() {
    const [friendRequests, setFriendRequests] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFriendRequests = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/friend-requests`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                console.log(response);
                setFriendRequests(response.data.friendRequests || []);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchFriendRequests();
    }, []);

    const handleAccept = async (requestId) => {
        try {
            await axios.post(`${process.env.REACT_APP_BASE_URL}/api/friend-requests/${requestId}/accept`,{ recipientId: requestId }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setFriendRequests(friendRequests.filter(req => req._id !== requestId));
            alert('Friend request accepted');
        } catch (err) {
            setError(err.message);
        }
    };

    const handleReject = async (requestId) => {
        try {
            await axios.post(`${process.env.REACT_APP_BASE_URL}/api/friend-requests/${requestId}/reject`, {}, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setFriendRequests(friendRequests.filter(req => req._id !== requestId));
            alert('Friend request rejected');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <>
        <Header/>
        <div className="friend-request-container mt-3">
            <h2>Login User: {localStorage.getItem('userName')}</h2>
            {friendRequests.length === 0 ? (
                <p>No friend requests</p>
            ) : (
                <ul>
                    {friendRequests.map(request => (
                        <li key={request._id}>
                            <span>{request.from.name}</span>
                            <div>
                                <button onClick={() => handleAccept(request._id)}>Accept</button>
                                <button className="reject" onClick={() => handleReject(request._id)}>Reject</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
        </>
    );
}

export default FriendRequest;
