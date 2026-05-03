import { useEffect, useState } from 'react';
import API from '../utils/api';

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [members, setMembers] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [taskData, setTaskData] = useState({ title: '', description: '', assignedTo: '' });
    
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login'; 
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (user?.role === 'Admin') {
                    const statsRes = await API.get('/dashboard/stats');
                    setStats(statsRes.data);
                    const membersRes = await API.get('/auth/members'); 
                    setMembers(membersRes.data);
                    const tasksRes = await API.get('/tasks/all');
                    setTasks(tasksRes.data);
                } else {
                    const userId = user.id || user._id;
                    const tasksRes = await API.get(`/tasks/my-tasks/${userId}`);
                    setTasks(tasksRes.data);
                }
            } catch (err) {
                console.error("Data fetch error", err);
            }
        };
        fetchData();
    }, [user]);

    const handleCreateTask = async (e) => {
        e.preventDefault();
        try {
            await API.post('/tasks', taskData);
            alert("Task Created!");
            setShowModal(false);
            window.location.reload(); 
        } catch (err) {
            alert("Failed to create task.");
        }
    };

    const handleStatusUpdate = async (taskId) => {
        try {
            await API.put(`/tasks/${taskId}`, { status: 'Completed' });
            window.location.reload();
        } catch (err) {
            alert("Update failed");
        }
    };

    return (
        <div style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Welcome, {user?.name}</h1>
                <button onClick={handleLogout} style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>Logout</button>
            </div>
            
            <p>Role: <strong>{user?.role}</strong></p>

            {user?.role === 'Admin' ? (
                <div className="admin-section">
                    <h2>Admin Overview</h2>
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                        <div style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px' }}>Total Tasks: {stats?.totalTasks || 0}</div>
                        <div style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px' }}>Overdue: {stats?.overdueTasks || 0}</div>
                    </div>
                    
                    <button onClick={() => setShowModal(true)} style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>+ Create New Task</button>

                    <h2 style={{ marginTop: '2rem' }}>All System Tasks</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
                        {tasks.map(task => (
                            <div key={task._id} style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px', background: '#f0f0f0' }}>
                                <h3>{task.title}</h3>
                                <p>Assigned to: <strong>{task.assignedTo?.name || 'Unknown'}</strong></p>
                                <p>Status: <strong>{task.status}</strong></p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="member-section">
                    <h2>Your Assigned Tasks</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
                        {tasks.map(task => (
                            <div key={task._id} style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px' }}>
                                <h3>{task.title}</h3>
                                <p>{task.description}</p>
                                <p>Status: <strong>{task.status}</strong></p>
                                {task.status !== 'Completed' && (
                                    <button onClick={() => handleStatusUpdate(task._id)} style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px' }}>Mark Done</button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {showModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ background: 'white', padding: '2rem', borderRadius: '10px', width: '400px' }}>
                        <h3>Create New Task</h3>
                        <form onSubmit={handleCreateTask} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <input type="text" placeholder="Title" required onChange={(e) => setTaskData({...taskData, title: e.target.value})} />
                            <textarea placeholder="Description" onChange={(e) => setTaskData({...taskData, description: e.target.value})} />
                            <select required onChange={(e) => setTaskData({...taskData, assignedTo: e.target.value})}>
                                <option value="">Assign to Member</option>
                                {members.map(m => <option key={m._id} value={m._id}>{m.name}</option>)}
                            </select>
                            <button type="submit" style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '10px' }}>Confirm</button>
                            <button type="button" onClick={() => setShowModal(false)} style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '10px' }}>Cancel</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;