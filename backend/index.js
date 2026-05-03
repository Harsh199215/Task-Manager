import dns from 'node:dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/dashboard', dashboardRoutes);
const PORT = process.env.PORT || 8080;

const mongo_url = process.env.CONN;
mongoose.connect(mongo_url)
    .then(() => {
        console.log("MongoDB Connected....");
    }).catch((err) => {
        console.log("MongoDB error", err);
    })
app.get('/ping', (req, res) => {
    res.send('PONG');
})

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
