# Landing Page — Full Stack Auth App

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
git clone https://github.com/yourusername/slate-emerald.git
cd Landing Page 
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

The default `.env` points to `http://localhost:5000/api` via the Vite proxy, so no changes needed for local development.

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
