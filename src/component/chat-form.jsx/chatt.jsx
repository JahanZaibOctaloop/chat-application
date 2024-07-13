// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';

// // const socket = io('http://localhost:4000');

// const Chatt = () => {
//     const [message, setMessage] = useState('');
//     const [messages, setMessages] = useState([]);
//     const [userId, setUserId] = useState('');
//     const [receiverId, setReceiverId] = useState('');

//     useEffect(() => {
//         socket.on('yourId', (id) => {
//             setUserId(id);
//             console.log(id)
//         });

//         socket.on('receiveMessage', (data) => {
//             setMessages((prevMessages) => [...prevMessages, data]);
//             console.log(message)
//         });

//         return () => {
//             socket.disconnect();
//         };
//     }, []);

//     const sendMessage = () => {
//         socket.emit('sendMessage', { senderId: userId, receiverId, message });
//         setMessage('');
//     };

//     return (
//         <div>
//             <h2>Chat</h2>
//             <div id="messages">
//                 {messages.map((msg, index) => (
//                     <p key={index}><strong>{msg.senderId}:</strong> {msg.message}</p>
//                 ))}
//             </div>
//             <input
//                 type="text"
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 placeholder="Type a message..."
//             />
//             <input
//                 type="text"
//                 value={receiverId}
//                 onChange={(e) => setReceiverId(e.target.value)}
//                 placeholder="Enter receiver ID..."
//             />
//             <button onClick={sendMessage}>Send</button>
//         </div>
//     );
// };

// export default Chatt;
