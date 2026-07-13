# ILA's Tuition

A full-stack tuition/coaching management platform built with the **MERN stack** (MongoDB, Express, React, Node.js). The project is split into three deployed services: a student-facing web app, an admin dashboard, and a backend REST API.

## Live Links

| App | URL | Description |
|---|---|---|
| **Main App** | [ila-tuition.vercel.app](https://ilas-tuition.onrender.com) | Student/parent-facing website |
| **Admin Panel** | [tution-app-admin-nine.vercel.app](https://ilas-tuition-admin.onrender.com) | Dashboard for managing content, users, and classes |
| **Backend API** | [tution-app-backend-two.vercel.app](https://ilas-tuition-backend.onrender.com) | REST API powering both frontends |

## Project Structure

This project is organized as multiple repositories/apps, deployed independently on Vercel:

```
ila-tuition/          # Main frontend (React/Next.js)
tution-app-admin/     # Admin dashboard (React/Next.js)
tution-app-backend/   # Backend API (Node.js + Express + MongoDB)
```

> Update this section with your actual repo/folder names if the project lives in a monorepo instead.

## Features

<!-- Fill in the actual features of your app. Example placeholders below: -->

- Student/parent registration and login
- Course/class listings and enrollment
- Admin dashboard for managing students, teachers, and classes
- Secure authentication (JWT-based)
- Responsive UI for mobile and desktop

## Tech Stack

- **Frontend (Main App & Admin):** React.js / Next.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Deployment:** Vercel
- **Authentication:** JWT *(update if different)*

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- npm or yarn
- MongoDB Atlas account (or local MongoDB instance)

### Backend Setup

```bash
git clone <backend-repo-url>
cd tution-app-backend
npm install
```

Create a `.env` file in the root of the backend project:

```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Run the server:

```bash
npm run dev
```

### Frontend Setup (Main App)

```bash
git clone <main-app-repo-url>
cd ila-tuition
npm install
```

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=https://tution-app-backend-two.vercel.app
```

Run the app:

```bash
npm run dev
```

### Admin Panel Setup

```bash
git clone <admin-repo-url>
cd tution-app-admin
npm install
```

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=https://tution-app-backend-two.vercel.app
```

Run the app:

```bash
npm run dev
```

## 📡 API Overview

The backend exposes REST endpoints consumed by both the main app and the admin panel.

<!-- Update this table with your actual routes -->

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/register` | User registration |
| GET | `/api/students` | Fetch all students |
| GET | `/api/classes` | Fetch all classes |

##  Deployment

All three apps are deployed on **Vercel**:

- Push to the `main` branch of each repo to trigger an automatic deployment.
- Environment variables must be configured separately in each Vercel project's dashboard.

##  Contributing

Contributions, issues, and feature requests are welcome. Feel free to open a pull request or issue.

## 📄 License

This project is licensed under the MIT License.
