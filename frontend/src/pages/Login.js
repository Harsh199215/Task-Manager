import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Added Link here
import API from '../utils/api';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await API.post('/auth/login', { email, password });
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            navigate('/dashboard');
        } catch (err) {
            alert("Invalid Credentials");
        }
    };

    return (
        <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
            <h2>Login</h2>
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input 
                    type="email" 
                    placeholder="Email" 
                    required 
                    onChange={(e) => setEmail(e.target.value)} 
                    style={{ padding: '10px' }}
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    required 
                    onChange={(e) => setPassword(e.target.value)} 
                    style={{ padding: '10px' }}
                />
                <button type="submit" style={{ padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    Login
                </button>
            </form>

            {/* This is the new link section */}
            <p style={{ marginTop: '1.5rem' }}>
                Don't have an account? <Link to="/signup" style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}>Sign Up here</Link>
            </p>
        </div>
    );
};

export default Login;