🧠Second Brain

A full-stack Second Brain application to save, organize, and revisit important content from across the internet (YouTube, Twitter, etc.) — all in one place.

Built with React, TypeScript, Node.js, Express, MongoDB, and JWT authentication.

✨ Features

🔐 Authentication

Signup & Signin with JWT

Protected dashboard routes

📌 Content Management

Add content (YouTube, Twitter)

View all saved content

Delete content

🧩 Dynamic Rendering

YouTube videos rendered via iframe

Twitter posts rendered using react-tweet

🧠 Second Brain Concept

Centralized place for learning resources & ideas

🎨 Modern UI

Reusable components

Modal-based content creation

⚡ Optimistic UI

Instant UI updates on delete

🛡️ Secure Backend

Token verification middleware

User-specific content access

🏗️ Tech Stack
Frontend

React + TypeScript

React Router

Axios

Zustand (state management)

Tailwind CSS

Backend

Node.js

Express

MongoDB + Mongoose

Zod (input validation)

bcrypt (password hashing)

JSON Web Tokens (JWT)

📁 Project Structure
second-brain/
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── routes/
│   │   ├── store/
│   │   ├── lib/
│   │   └── pages/
│   └── main.tsx
│
├── backend/
│   ├── db.ts
│   ├── middleware.ts
│   ├── index.ts
│   └── secret.ts
│
└── README.md

🔑 Authentication Flow

User signs up / signs in

Backend issues a JWT

JWT is stored on frontend

Protected routes require token

Backend middleware verifies token for every request

🔒 Protected Routes

/dashboard is protected

Users without a valid token are redirected to /signin

Backend also blocks unauthorized API access

📦 API Endpoints
Auth

POST /api/v1/signup

POST /api/v1/signin

Content

POST /api/v1/content → Add content

GET /api/v1/content → Get all content

DELETE /api/v1/content/:id → Delete content

🧪 Example Content Object
{
  "_id": "694ea69f16d0de870ebdb595",
  "title": "Project ideas",
  "link": "https://youtu.be/7WBZ_-2TZtE",
  "type": "youtube",
  "userId": "694d471fec00f4717649d54b"
}

🚀 Getting Started
1️⃣ Clone the repo
git clone https://github.com/your-username/second-brain.git
cd second-brain

2️⃣ Backend setup
cd backend
npm install


Create secret.ts:

export const mongoPasswd = "your_mongodb_uri";
export const JWT_PASSWORD = "your_jwt_secret";


Run backend:

npm run dev

3️⃣ Frontend setup
cd frontend
npm install
npm run dev


Frontend runs on:

http://localhost:5173


Backend runs on:

http://localhost:3000

🧠 Key Learnings from this Project

Full authentication flow with JWT

Secure route protection (frontend + backend)

React component architecture

Zustand for global state

REST API design

MongoDB schema relationships

Optimistic UI updates

Real-world CORS handling

🔮 Future Improvements

🔐 HTTP-only cookie authentication

✏️ Edit content

🏷️ Tags & search

📤 Shareable public brain link

📱 Mobile-first UI

🔔 Toast notifications
