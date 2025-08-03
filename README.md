# Chatty

A full-stack real-time chat application built with Node.js, Express, MongoDB, and React.

## Features

- User authentication (JWT-based)
- Real-time messaging
- User-to-user chat
- File and image sharing
- Protected routes (middleware)
- Responsive UI

## Tech Stack

- **Frontend:** React, Axios
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Authentication:** JWT, Cookies
- **Other:** Multer (file uploads), dotenv, Cloudinary

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn
- MongoDB

### Installation

#### 1. Clone the repository

```bash
git clone https://github.com/yourusername/chatty.git
cd chatty
```

#### 2. Install dependencies

```bash
# For backend
cd backend
npm install

# For frontend
cd ../frontend
npm install
```

#### 3. Set up environment variables

**Backend:**  
Create a `.env` file in the `backend/src` directory:

```
MONGODB_URL=your_mongodb_connection_string
PORT=5001

JWT_SECRET=your_jwt_secret

NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

> **Note:**  
> The `.env` file must be placed inside the `backend/src` folder, not the root or backend folder.

**Frontend:**  
Create a `.env` file in the `frontend` directory:

```
VITE_API_URI=http://localhost:5001
```

> **Note:**  
> This variable is used by the frontend to connect to the backend API.

#### 4. Start the servers

```bash
# In one terminal, start backend
cd backend
npm run dev

# In another terminal, start frontend
cd ../frontend
npm start
```

## Usage

- Register a new user or log in.
- Start chatting with other users.
- Send text messages and files.

## Project Structure

```
chatty/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── .env
│   │   └── ...
│   └── ...
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   └── ...
│   ├── .env
│   └── ...
└── README.md
```

## API Endpoints

### Auth

- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login

### Messages

- `GET /api/messages/users` — Get all users (protected)
- `GET /api/messages/:userId` — Get messages with a user (protected)
- `POST /api/messages/send/:userId` — Send a message (protected)

## Environment Variables

**Backend:**
- `MONGODB_URL` — MongoDB connection string
- `PORT` — Server port
- `JWT_SECRET` — Secret for JWT signing
- `NODE_ENV` — Node environment (development/production)
- `CORS_ORIGIN` — Allowed frontend origin for CORS
- `CLOUDINARY_CLOUD_NAME` — Cloudinary cloud name
- `CLOUDINARY_API_KEY` — Cloudinary API key
- `CLOUDINARY_API_SECRET` — Cloudinary API secret

**Frontend:**
- `VITE_API_URI` — Backend API base URL

