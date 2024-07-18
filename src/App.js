import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import Signup from './component/signup-login/signup';
import Login from './component/signup-login/login';
import Chat from './component/chat-form.jsx/chat';
import VerifyToken from './component/auth/verifyToken';
import Chatt from './component/chat-form.jsx/chatt';

function App() {
  console.log('Base URL:', process.env.REACT_APP_BASE_URL);

  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
        <Route path="/chat" element={<Chat/>} />

        <Route path="/chatt" element={<VerifyToken><Chatt/></VerifyToken>} />

      </Routes>
    </>
  );
}

export default App;
