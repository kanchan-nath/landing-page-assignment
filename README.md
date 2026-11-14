# Landing Page — Full Stack Auth App


https://github.com/user-attachments/assets/41a55225-f71d-44d5-841b-34b86e5a99d3


A clean, production-ready full-stack web application with email OTP verification, JWT authentication, and a leads pipeline dashboard. Built with the **Landing Page ** design palette — dark, precise, and trustworthy.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, React Router v6 |
| Styling | Pure CSS Modules (no Tailwind) |
| Backend | Node.js, Express (ES Modules) |
| Database | MongoDB + Mongoose |
| Auth | JWT (jsonwebtoken) + bcryptjs |
| Email | Nodemailer (Gmail) |
| Deployment | Netlify (frontend) + Vercel (backend) |

---

## Features

- **Register** — name, email, password with real-time validation
- **OTP Verification** — 6-digit code sent via email, expires in 10 minutes
- **Login** — email + password, blocked until email is verified
- **JWT Auth** — 7-day tokens, stored in localStorage
- **Protected Routes** — dashboard is inaccessible without a valid token
- **Logout** — clears token and redirects to login
- **Dashboard** — leads pipeline with full CRUD (create, read, update, delete)
- **Responsive** — works on mobile, tablet, and desktop
- **Toast notifications** — slide-in feedback for every action
- **Loading indicators** — spinners on all async operations

---

## Project Structure

```
project/
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Auth.module.css
│   │   │   └── Dashboard.module.css
│   │   ├── components/
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── Toast.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── backend/
    ├── config/
    │   ├── db.js
    │   └── mailer.js
    ├── middleware/
    │   └── authMiddleware.js
    ├── models/
    │   ├── User.js
    │   └── Lead.js
    ├── routes/
    │   ├── auth.js
    │   └── leads.js
    ├── server.js
    └── package.json
```

---

## Running Locally

### Prerequisites

- Node.js v18+
- MongoDB Atlas account (free tier works fine)
- Gmail account with an App Password enabled

### 1. Clone the repo

```bash
git https://github.com/kanchan-nath/landing-page-assignment
cd Landing_Page 
```

### 2. Set up the backend

```bash
cd backend
npm install
cp .env.example .env
```

Open `.env` and fill in your values:

```env
PORT=5000
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/slatedb
JWT_SECRET=any_long_random_string
EMAIL_USER=youremail@gmail.com
EMAIL_PASS=your_gmail_app_password
CLIENT_URL=http://localhost:5173
```

> **Gmail App Password**: Go to your Google Account → Security → 2-Step Verification → App passwords. Generate one for "Mail".

Start the backend:

```bash
npm run dev
```

The API will be running at `http://localhost:5000`.

### 3. Set up the frontend

```bash
cd ../frontend
npm install
cp .env.example .env
```

The default `.env` points to `http://localhost:4000/api` via the Vite proxy, so no changes needed for local development.

Start the frontend:

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## API Endpoints

### Auth

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register user, send OTP |
| POST | `/api/auth/verify-otp` | Verify OTP, activate account |
| POST | `/api/auth/login` | Login, receive JWT |

### Leads (protected — requires Bearer token)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/leads` | Get all leads for logged-in user |
| POST | `/api/leads` | Create a new lead |
| PUT | `/api/leads/:id` | Update a lead |
| DELETE | `/api/leads/:id` | Delete a lead |

---

## Deployment

### Frontend → Netlify

1. Push `frontend/` to GitHub
2. Import the repo on [netlify.com](https://netlify.com)
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Add environment variable: `VITE_API_URL=https://your-backend.vercel.app/api`

### Backend → Vercel

1. Push `backend/` to GitHub
2. Import on [vercel.com](https://vercel.com)
3. Add all environment variables from `.env.example`
4. Deploy — Vercel auto-detects Node.js

---

## Design System

Colors used throughout the app:

| Name | Hex |
|------|-----|
| Deep Navy (background) | `#0F172A` |
| Slate Card | `#1E293B` |
| Emerald Accent | `#10B981` |

Font: **DM Sans** (body) + **DM Mono** (code/numbers)

---

## License

MIT — free to use and modify.

<!-- AUTHOR_START -->
---

## 👨‍💻 Author & Maintainer

### **Kanchan Nath**
Full-Stack Engineer & AI Builder | Founder @ [StudeQ](https://studeq.onrender.com) | Creator @ [The Rover Kanchan](https://www.youtube.com/channel/UCAwncfqYOJwAY8yAnF5_hMQ)

> Hey, I'm Kanchan. I run [The Rover Kanchan](https://www.youtube.com/channel/UCAwncfqYOJwAY8yAnF5_hMQ), where I talk about AI and tech in English — the kind of stuff I wish someone had explained to me when I started: how LLMs actually work under the hood, practical dev tutorials, and the real (often messy) lessons from building things in production.
> 
> By day, I'm a full stack engineer, and I'm the solo founder behind [StudeQ](https://studeq.onrender.com), an AI-powered study platform with notes, quizzes, flashcards, and PDF chat that I built from scratch, start to finish. I'm doing all this while still in college, pursuing my B.Tech in Biotechnology at NIT Durgapur. I also spend some time training and evaluating AI models part time at Outlier AI.
> 
> For business stuff, reach me at [kanchannath.webdev@gmail.com](mailto:kanchannath.webdev@gmail.com).

### 🌐 Connect With Me

[![YouTube](https://img.shields.io/badge/YouTube-The_Rover_Kanchan-FF0000?style=flat&logo=youtube&logoColor=white)](https://www.youtube.com/channel/UCAwncfqYOJwAY8yAnF5_hMQ)
[![Portfolio](https://img.shields.io/badge/Portfolio-kanchan--nath.github.io-blue?style=flat&logo=Google-Chrome&logoColor=white)](https://kanchan-nath.github.io/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-kanchan--nath-blue?style=flat&logo=linkedin)](https://www.linkedin.com/in/kanchan-nath/)
[![GitHub](https://img.shields.io/badge/GitHub-kanchan--nath-181717?style=flat&logo=github)](https://github.com/kanchan-nath)
[![X (Twitter)](https://img.shields.io/badge/X-@KanchanNathDev-black?style=flat&logo=x)](https://x.com/KanchanNathDev)
[![Instagram](https://img.shields.io/badge/Instagram-@hey.kanchan05-E4405F?style=flat&logo=instagram&logoColor=white)](https://www.instagram.com/hey.kanchan05/)
[![Blog](https://img.shields.io/badge/Hashnode-kanchannath-2962FF?style=flat&logo=hashnode)](https://kanchannath.hashnode.dev/)
[![LeetCode](https://img.shields.io/badge/LeetCode-kanchan--nath-FFA116?style=flat&logo=leetcode)](https://leetcode.com/u/kanchan-nath/)

<!-- AUTHOR_END -->
