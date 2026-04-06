Aromamor Candles (MERN) - Grader Start Guide

1) Start the web server (Node/Express)
- Open a terminal at the project root.
- Run:
  cd backend
  cp .env.example .env
  pnpm install
  pnpm seed
  pnpm dev

2) Start the React application
- In a second terminal at project root, run:
  cd frontend
  pnpm install
  pnpm dev

3) Navigate to the application
- Frontend URL: http://localhost:5173
- Backend URL: http://localhost:5000
- Health endpoint: http://localhost:5000/health

4) If port 5000 is already in use
- Start backend on another port:
  cd backend
  PORT=5001 pnpm dev
- Start frontend with matching API URL:
  cd frontend
  VITE_API_URL=http://localhost:5001 pnpm dev

5) MongoDB collections needed
- users
- products
- tags
- reviews
- orders
- favorites

Notes
- The first screen is Login.
- Users can register as Standard User or Administrator.
- Duplicate usernames are blocked on registration.
- Role-based routing:
  - Admin: /admin
  - Standard User: /dashboard
- Admin can perform CRUD on products (Create/Read/Update/Delete).
- Standard users can CRUD only their own reviews; ownership checks are enforced in backend routes.
- Many-to-many relationship included:
  - Product <-> Tag via Product.tags (array of Tag IDs)
  - User <-> Product also exists via favorites
