import axios from 'axios';

export const login = async (email:any, password:any ) => {
    const response = await axios.post('http://localhost:8081/auth/login', {
        email,
        password
    });
    return response.data;
};