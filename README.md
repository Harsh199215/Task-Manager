# 📝 Task Manager API & Client

A full-stack MERN (MongoDB, Express, React, Node) application for managing projects and tasks, featuring secure JWT authentication.

## 🚀 Live Links
- **Frontend:** [task-manager-production-4446.up.railway.app](https://task-manager16244.up.railway.app/login)
- **Backend API:** [task-manager-production-4446.up.railway.app](https://task-manager-production-4446.up.railway.app)

## 🛠 Features
- **User Authentication:** Secure Signup/Login with JWT stored in LocalStorage.
- **Task Management:** Create, view, and organize tasks within specific projects.
- **Responsive UI:** Built with React for a smooth user experience.
- **Cloud Database:** Data persisted on MongoDB Atlas.

## ⚙️ Environment Setup

### Backend (Railway Variables)
- `MONGO_URI`: Your MongoDB connection string.
- `JWT_SECRET`: Your private key for token generation.
- `PORT`: 8080 (standard for this setup).

### Frontend (Railway Variables)
- `REACT_APP_API_URL`: Set this to `https://task-manager-production-4446.up.railway.app/api`

## 📁 Structure
- `/backend`: Node/Express server using ES Modules.
- `/frontend`: React client using Axios for API communication.

## 🔧 Local Development
1. Clone the repo.
2. Run `npm install` in both the `frontend` and `backend` folders.
3. Start the backend with `npm start` (on port 8080).
4. Start the frontend with `npm start` (on port 3000).
