# Aromamor Candles (MERN)

Aromamor Candles is a MERN full-stack class project with role-based access control.

## Stack
- MongoDB + Mongoose
- Express + Node.js
- React + Vite + TypeScript

## App Roles
- `admin`: product/tag management, user/order visibility
- `user`: browse store and manage only their own review data

## Quick Start

### Backend
```bash
cd backend
cp .env.example .env
pnpm install
pnpm seed
pnpm dev
```

### Frontend
```bash
cd frontend
pnpm install
pnpm dev
```

Frontend: `http://localhost:5173`
Backend: `http://localhost:5000`

### If Port 5000 Is Busy
```bash
cd backend
PORT=5001 pnpm dev
```

Then run frontend with:
```bash
cd frontend
VITE_API_URL=http://localhost:5001 pnpm dev
```

## Assignment Coverage
- Login page is the first screen (`/login`)
- User registration supports unique usernames
- Two roles: Administrator and Standard User
- Role-based routing and API authorization
- Admin CRUD on products
- Standard user CRUD on owned reviews only
- 5+ entities: `users`, `products`, `tags`, `reviews`, `orders`, `favorites`
- Many-to-many relationship: `products <-> tags` (also `users <-> products` via favorites)

## Project Layout
```text
backend/
  .env.example
  package.json
  src/
    config/
    middleware/
    models/
    routes/
frontend/
  package.json
  src/
    components/
    pages/
    store/
```
