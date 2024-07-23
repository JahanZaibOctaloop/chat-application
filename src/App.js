import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import Signup from './component/signup-login/signup';
import Login from './component/signup-login/login';
import Chat from './component/chat-form.jsx/chat';
import FriendRequest from './component/friendRequest/friendRequest';
import UserList from './component/friendRequest/UserList';

function App() {
  console.log('Base URL:', process.env.REACT_APP_BASE_URL);

  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
        <Route path="/chat" element={<Chat/>} />
        <Route path="/friend_request" element={<FriendRequest/>} />
        <Route path="/user_list" element={<UserList/>} />


      </Routes>
    </>
  );
}

export default App;
