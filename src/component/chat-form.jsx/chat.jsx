import React, { useEffect, useState } from 'react';
import './chat.css';
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import verifyToken from '../auth/verifyToken';

const socket = io(process.env.REACT_APP_BASE_URL)


function Chat() {
    const [currentChat, setCurrentChat] = useState(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const isAdmin = verifyToken();
        setIsAuthenticated(isAdmin);
        if (!isAdmin) {
            navigate('/');
            return;
        }

        const userId = localStorage.getItem('userId');
        if (userId) {
            socket.emit('add-user', userId);
        } else {
            navigate('/');
        }

        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BASE_URL}/fetch_user`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                // Debug: Check if the data is an array
                if (Array.isArray(data.data)) {
                    setUsers(data.data);
                } else {
                    console.error('API response is not an array:', data);
                    setUsers([]); // Set to an empty array if the response is not an array
                }
            } catch (error) {
                setError(error.message);
                navigate('/');
            }
        };

        fetchData();

        socket.on('connect_error', (err) => {
            console.error('Socket connect_error: ', err);
        });
        socket.on('connect_failed', (err) => {
            console.error('Socket connect_failed: ', err);
        });
        

        socket.on('msg-receive', (msg) => {
            setMessages((prevMessages) => [...prevMessages, { from: 'Other', content: msg }]);
        });

        return () => {
            socket.off('msg-receive');
        };
    }, [navigate]);

    const selectUser = async (user) => {
        setCurrentChat(user);
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/messages/${user._id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setMessages(data.messages);
        } catch (error) {
            setError(error.message);
        }
    };

    const sendMessage = () => {
        const userId = localStorage.getItem('userId');
        if (message.trim() && currentChat) {
            const newMessage = {
                from: userId,
                content: message,
                type: 'text',
            };
            setMessages((prevMessages) => [...prevMessages, { from: 'You', content: message }]);
            socket.emit('send-msg', { msg: message, to: currentChat._id, from: userId });
            setMessage('');
        }
    };

    if (isAuthenticated === null) {
        // Return null or a loading spinner while authentication status is being determined
        return null;
    }

    return (
        <div className="container chat-container border">
            <div className="row">
                <div className="col-md-4 users-list">
                    <h4>Current Users: {localStorage.getItem('userName')}</h4>
                    <ul className="list-group">
                        {Array.isArray(users) && users.map(user => (
                            <li key={user._id} className="list-group-item" onClick={() => selectUser(user)}>
                                {user.name}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="col-md-8 chat-screen">
                    {currentChat ? (
                        <>
                            <h4>Chat with {currentChat.name}</h4>
                            <div className="messages">
                                {messages.map((msg, index) => (
                                    <div key={index} className={`message ${msg.from === 'You' ? 'sent' : 'received'}`}>
                                        {msg.content}
                                    </div>
                                ))}
                            </div>
                            <div className="message-input">
                                <input
                                    type="text"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="form-control"
                                    placeholder="Type a message"
                                />
                                <button onClick={sendMessage} className="btn btn-primary">Send</button>
                            </div>
                        </>
                    ) : (
                        <div className="no-chat-selected">
                            <h4>Select a user to start chatting</h4>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Chat;
