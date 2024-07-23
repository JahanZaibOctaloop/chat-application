import {jwtDecode} from 'jwt-decode';

const verifyToken = () => {
    const token = localStorage.getItem('token');
    console.log(token);
    if (!token) {
        return false;
    }
    try {
        
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            localStorage.removeItem('userName');
            return false;
        }
        return true;
    } catch (error) {
        console.error('Token verification error:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        return false;
    }
};

export default verifyToken;
