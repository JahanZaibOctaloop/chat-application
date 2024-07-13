import React, { useEffect, useState } from 'react';
import './chat.css';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');

function Chat() {
    const [currentChat, setCurrentChat] = useState(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const userId = localStorage.getItem('userId');

        if (userId) {
            socket.emit('add-user', userId);
        }

        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:4000/fetch_user', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}` // Prefix with Bearer

                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setUsers(data.data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchData();

        socket.on('msg-receive', (msg) => {
            setMessages((prevMessages) => [...prevMessages, { from: 'Other', content: msg }]);
        });

        return () => {
            socket.off('msg-receive');
        };
    }, []);

    const selectUser = async (user) => {
        setCurrentChat(user);
        try {
            const response = await fetch(`http://localhost:4000/api/messages/${user._id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
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
                from: userId, // Ensure the 'from' field is the userId
                content: message,
                type: 'text',
            };
            setMessages((prevMessages) => [...prevMessages, { from: 'You', content: message }]);
            socket.emit('send-msg', { msg: message, to: currentChat._id, from: userId });
            setMessage('');
        }
    };

    return (
        <div className="container chat-container border">
            <div className="row">
                <div className="col-md-4 users-list">
                    <h4>Current Users: {localStorage.getItem('userName')}</h4>
                    <ul className="list-group">
                        {users && users.map(user => (
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
