# TaskFlow

A simple and clean personal task manager built with React and Node.js. Users can create, view, update, and delete tasks with due dates, descriptions, and status filters.

## Live Demo

- Frontend: https://taskflow-ad2xumofo-kamini.vercel.app
- Backend: https://taskflow-api-md16.onrender.com

## Tech Stack

| Part | Technology | Why |
|------|-----------|-----|
| Frontend | React + Vite | Fast, simple, component-based |
| Backend | Node.js + Express | Lightweight REST API |
| Storage | JSON file (tasks.json) | Simple persistence, no DB needed |
| Deployment | Vercel + Render | Free, easy GitHub integration |

## How to Run Locally

```bash
# Clone the repo
git clone https://github.com/Kamini78/taskflow.git
cd taskflow

# Start backend
cd server
npm install
node index.js

# Start frontend (new terminal)
cd client
npm install
npm run dev
```

Open http://localhost:5173

## API Documentation

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /tasks | Get all tasks |
| POST | /tasks | Create new task |
| PATCH | /tasks/:id/toggle | Toggle complete/incomplete |
| PUT | /tasks/:id | Edit task |
| DELETE | /tasks/:id | Delete task |

## Project Structure