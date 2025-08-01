import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch} from 'react-redux';
import { setUser } from '../redux/authSlice';
const backendUrl=import.meta.env.VITE_BACKEND_API_URL;


export const useLogin = () => {
    const dispatch=useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (email: string, password: string) => {
        try {
        const res = await axios.post(`${backendUrl}/auth/signin`, { email, password });
        const { token, user } = res.data;

        localStorage.setItem('token', token);
        dispatch(setUser(user));

        if (user.role === 'admin') {
            navigate('/admin/dashboard');
        } else {
            navigate('/');
        }
        } catch (err) {
        alert('Invalid credentials');
        }
    };

    return { handleLogin };
};
