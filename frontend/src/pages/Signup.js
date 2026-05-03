import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'Member'
    });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post('/auth/register', formData);
            alert("Signup successful! Please login.");
            navigate('/login');
        } catch (err) {
            alert(err.response?.data?.message || "Signup failed");
        }
    };

    return (
        <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto' }}>
            <h2>Create Account</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input 
                    type="text" 
                    placeholder="Full Name" 
                    required 
                    onChange={(e) => setFormData({...formData, name: e.target.value})} 
                />
                <input 
                    type="email" 
                    placeholder="Email" 
                    required 
                    onChange={(e) => setFormData({...formData, email: e.target.value})} 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    required 
                    onChange={(e) => setFormData({...formData, password: e.target.value})} 
                />
                <select 
                    value={formData.role} 
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    style={{ padding: '8px' }}
                >
                    <option value="Member">Member</option>
                    <option value="Admin">Admin</option>
                </select>
                <button type="submit" style={{ padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}>
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default Signup;