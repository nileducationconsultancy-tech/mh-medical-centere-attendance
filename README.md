# MH Medical Centre — Attendance & Management System

An enterprise-grade, full-stack attendance, document, and automated payroll management platform engineered for **MH Medical Centre**.

---

## 🌟 System Architecture & Overview

- **Frontend (Web):** React 19 + Vite + Tailwind CSS + Lucide Icons + Zustand + Axios
- **Backend (API):** Node.js + Express 5 + Mongoose + JWT + Nodemailer + PDFKit
- **Mobile (App):** React Native + Expo Router + SecureStore + Expo Location
- **Database:** MongoDB (MongoDB Atlas / Self-hosted instance)
- **Document & File Storage:** Supabase Storage (with fallback to local storage)

---

## 🎨 Official Brand Identity & Assets

- **Brand Name:** MH Medical Centre
- **Primary Color:** Navy Blue (`#002D62` / `#0A2540`)
- **Accent Color:** Warm Medical Gold (`#C5A059` / `#D4AF37`)
- **Backgrounds:** Pure White (`#FFFFFF`) & Slate (`#F8FAFC`, `#F1F5F9`)
- **Brand Logo Asset Locations:**
  - Backend: `Backend/src/assets/logo.png`
  - Frontend: `Frontend/src/assets/logo.png`, `Frontend/public/logo.png`, `Frontend/public/favicon.png`
  - Mobile: `mobile/assets/icon.png`, `mobile/assets/splash-icon.png`, `mobile/assets/splash.png`

---

## 🚀 Quick Start & Local Development Setup

### 1. Prerequisites
- **Node.js:** v18 or higher recommended
- **MongoDB:** A fresh MongoDB database connection URI
- **Package Manager:** `npm`, `yarn`, or `pnpm`

### 2. Backend Setup & Startup

```bash
cd Backend
npm install
npm run dev
```
The Backend API server will start on `http://localhost:5000`.

### 3. Frontend Web Application Setup & Startup

```bash
cd Frontend
npm install
npm run dev
```
The Frontend web portal will start on `http://localhost:5173`.

### 4. Mobile Application Setup & Startup

```bash
cd mobile
npm install
npx expo start
```

---

## ⚙️ Environment Configuration

### Backend Configuration (`Backend/.env`)

Copy `Backend/.env.example` to `Backend/.env` and supply your credentials:

| Variable | Description | Example / Default |
| :--- | :--- | :--- |
| `PORT` | Backend server port | `5000` |
| `NODE_ENV` | Environment mode | `development` / `production` |
| `MONGODB_URI` | New MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/mh_medical_db` |
| `JWT_SECRET` | Secret key for JWT token signing | `your-secure-jwt-secret-key` |
| `SUPER_ADMIN_EMAIL` | Email for bootstrap Super Admin account | `admin@mhmedicalcentre.com` |
| `SUPER_ADMIN_PASSWORD` | Secure password for Super Admin | `YourAdminPassword123!` |
| `ADMIN_NAME` | Super Admin display name | `Dr. Feroz` |
| `EMPLOYEE_ID_PREFIX` | Prefix for automatic sequential employee IDs | `MH-EMP-` |
| `TIMEZONE` | Authoritative timezone | `Asia/Kolkata` |
| `OFFICE_IPS` | Permitted IP whitelist for check-ins | `127.0.0.1,::1` |
| `CLIENT_URL` | Allowed CORS origins for Frontend | `http://localhost:5173` |
| `FRONTEND_URL` | Deployed Frontend production URL | `https://your-frontend-domain.com` |
| `GMAIL_USER` | Gmail address for system alerts & recovery | `your-email@gmail.com` |
| `GMAIL_APP_PASSWORD` | 16-character Google App Password | `xxxx xxxx xxxx xxxx` |
| `GEOAPIFY_API_KEY` | Optional Geolocation reverse lookup key | `your-geoapify-key` |
| `SUPABASE_URL` | Optional Supabase project URL | `https://your-project.supabase.co` |
| `SUPABASE_KEY` | Optional Supabase API key | `your-supabase-key` |
| `SUPABASE_BUCKET_NAME` | Supabase storage bucket | `Employee-document` |

### Frontend Configuration (`Frontend/.env.production` / `.env`)

| Variable | Description | Example |
| :--- | :--- | :--- |
| `VITE_API_URL` | Remote Backend API URL for production | `https://api.your-domain.com` (leave blank for local Vite proxy) |

### Mobile Configuration (`mobile/.env`)

| Variable | Description | Example |
| :--- | :--- | :--- |
| `EXPO_PUBLIC_API_URL` | Backend API URL reachable by mobile devices | `http://10.0.2.2:5000` or `https://api.your-domain.com` |

---

## 🔐 Super Admin Bootstrap Mechanism

When the backend initializes:
1. It reads `SUPER_ADMIN_EMAIL` and `SUPER_ADMIN_PASSWORD` from `Backend/.env`.
2. It verifies whether an administrator account with `SUPER_ADMIN_EMAIL` exists in the database.
3. If not found, it creates the Super Admin account with `ADMIN` role and hashed credentials.
4. If already present, it synchronizes credentials and ensures administrative access.

To change Super Admin credentials at any time:
- Update `SUPER_ADMIN_EMAIL` and `SUPER_ADMIN_PASSWORD` in `Backend/.env` and restart the backend.

---

## 📧 Email & Gmail Service Setup

For password resets and notification emails:
1. Enable **2-Step Verification** on your Google Account.
2. Navigate to **Google Account Security → 2-Step Verification → App Passwords**.
3. Generate a new App Password (select App: `Mail`, Device: `Other`).
4. Set `GMAIL_USER` and `GMAIL_APP_PASSWORD` in `Backend/.env`.

---

## 📦 Production Deployment Guide

### Deploying the Backend
1. Deploy to your hosting provider of choice (Vercel, Render, Railway, DigitalOcean, AWS).
2. Configure all environment variables from `Backend/.env.example`.
3. Set Build Command: `npm install` and Start Command: `npm start`.

### Deploying the Frontend
1. Deploy to Vercel, Netlify, Cloudflare Pages, or AWS S3/CloudFront.
2. Set Build Command: `npm run build` and Output Directory: `dist`.
3. Set `VITE_API_URL` environment variable pointing to your deployed Backend API.

---

## 🛡️ License & Copyright

© 2026 MH Medical Centre. All rights reserved.
