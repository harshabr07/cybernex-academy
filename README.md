# CYBERNEX ACADEMY — Starter Full-Stack Project

A beginner-friendly full-stack MVP for an ethical-hacking and programming learning platform.

## Features in this starter
- React + Vite frontend
- Express backend API
- Sign up / login with bcrypt password hashing and JWT
- Course catalogue and beginner roadmaps
- Mark lessons complete and save progress in a local JSON database
- Responsive dark UI (black + neon green)
- Ethical-hacking content focuses on legal, authorized learning

> This is a learning/demo starter, not a production-ready platform. Before a public launch, use PostgreSQL, HTTPS, secure cookie-based sessions or carefully configured tokens, rate limiting, email verification/password reset, input validation, backups, and a security review. Do not store real user data in the demo JSON database.

## Requirements
- Node.js LTS (20 or newer recommended)
- VS Code

## 1. Start the backend
Open a terminal in this folder:

```bash
cd server
npm install
npm run dev
```

The API runs at `http://localhost:5000`.

## 2. Start the frontend
Open a second terminal:

```bash
cd client
npm install
npm run dev
```

Open the local URL Vite prints (usually `http://localhost:5173`).

## Demo notes
- User accounts are stored in `server/data/db.json`.
- Passwords are hashed using bcryptjs; plaintext passwords are not stored.
- The JWT secret in `.env.example` is only a development placeholder. Create a strong secret before use.
- Progress is saved per user in the JSON database.
- Courses and lessons are sample starter content. Add your own original explanations, videos, quizzes, and practical labs.

## Project structure
```text
cybernex-academy/
  client/
    src/
      App.jsx
      main.jsx
      styles.css
    index.html
    package.json
    vite.config.js
  server/
    data/db.json
    src/
      index.js
      store.js
      courses.js
      auth.js
    package.json
    .env.example
```
