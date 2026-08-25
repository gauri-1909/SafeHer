
# SafeHer - Real-Time Personal Safety App

SafeHer is a full-stack safety app where you can save emergency contacts, hit an SOS button that shares your live location, and link up with people you trust so they can see when you're in trouble — in real time.

The idea was to go beyond a simple SOS button and get the underlying fundamentals right: proper authentication, strict per-user data ownership (not just login checks), and a real-time alert system instead of a toy feature.

## What it does

- Sign up and log in with hashed passwords (bcrypt) and a JWT session that expires after 7 days
- Add and remove emergency contacts
- Tap an SOS button to capture your live location (fresh GPS read, not cached) with a "view on map" link
- See a full history of your SOS events and mark them as resolved
- Link your account with someone you trust using a one-time, 15-minute pairing code
- Get an instant, live alert when a linked person triggers an SOS — pushed via WebSocket, no refresh or polling needed
- View a linked person's SOS history and location (read-only, access enforced server-side)

## Tech Stack

- Frontend — React (Vite), Tailwind CSS, React Router
- Backend — Node.js and Express
- Database — MongoDB with Mongoose
- Real-time — Socket.IO (JWT-authenticated, per-user private rooms)
- Deployed on Vercel (frontend) and Render (backend)

## How to run locally

You'll need Node.js and a MongoDB Atlas account.

**Backend:**
```bash
cd backend
npm install
```
Create a `.env` file inside backend:
```
MONGO_URI=your_mongodb_connection_string
PORT=5001
JWT_SECRET=any_long_random_string
CLIENT_ORIGIN=http://localhost:5173
```
Start the server:
```bash
npm run dev
```

**Frontend:**
```bash
cd frontend
npm install
```
Create a `.env` file inside frontend:
```
VITE_API_URL=http://localhost:5001/api
VITE_SOCKET_URL=http://localhost:5001
```
Then run it:
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

## Challenges & What I Learned

- Auth state would silently desync on token expiry — fixed by syncing a custom browser event between the axios interceptor and React's auth context
- A middleware file (`Auth.js` vs `auth.js`) worked locally on macOS but broke on Render's Linux servers due to case sensitivity
- Learned WebSockets from scratch to build the real-time alert system, using per-user rooms instead of polling
- Debugged a silent port conflict caused by macOS AirPlay intercepting port 5000 with no clear error

## Note

Location and alert data in this app is only shared with accounts you've explicitly linked, and every request is checked server-side against the logged-in user — not just gated by the UI. This was built as a personal/college project to practice production-grade auth and real-time systems, not as a substitute for real emergency services.

## Live Link

[safeher-beta.vercel.app](https://safeher-beta.vercel.app/login)
