import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/',
    // withCredentials: true, // Send cookies with requests
});

// Helper function to get a specific cookie
const getCookie = (name) => {
    const cookieString = document.cookie
        .split(';')
        .map(cookie => cookie.trim())
        .find(cookie => cookie.startsWith(`${name}=`));
    return cookieString ? cookieString.split('=')[1] : null;
};

api.interceptors.request.use((req) => {
    const token = getCookie('token'); // Get token from cookies
    console.log('Token:', token); // Debugging log

    if (token && token !== 'undefined') { // Ensure valid token
        req.headers.authorization = `Bearer ${token}`;
    }
    return req;
});

export default api;
