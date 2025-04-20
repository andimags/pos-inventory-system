import axios from 'axios';

interface IPayload {
    email: string,
    password: string
}

async function login(payload: IPayload){
    try {
        const response = await axios.post('http://localhost:5000/auth/login', payload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });        
        
        return response;
    } catch (error) {
        throw error;
    }
}

export default { login };