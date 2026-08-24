# SafeHer — Personal Safety Dashboard

A small safety app where you can save emergency contacts, hit an SOS button that shares your live location, and link up with people you trust so they can see when you're in trouble — in real time.

---

## Live Demo

Not deployed yet — this runs locally right now. See the "Getting Started" section below to run it on your own machine.

*(Once I deploy it, the link and a screenshot will go here.)*

---

## Why I Built This

I wanted a project that would actually teach me the stuff that shows up in real interviews — login and passwords done properly, making sure one user can never see another user's data, and a live real-time feature that isn't just a toy. So I picked something simple on the surface (an SOS button) but made sure the parts underneath were solid.

---

## Features

- Sign up and log in, with passwords hashed and a login token (JWT) that expires after 7 days
- Add and remove emergency contacts
- Tap an SOS button to save your current location, with a link to view it on Google Maps
- See a history of every SOS you've triggered, and mark them as resolved
- Link your account with someone you trust using a one-time code (like pairing two devices)
- If you're linked with someone and they trigger an SOS, you get a live alert on your screen right away — no need to refresh the page
- You can also open a linked person's profile and see their past SOS events and where they were

---

## Tech Stack

**Frontend:** React (Vite), Tailwind CSS, React Router  
**Backend:** Node.js, Express, MongoDB (via Mongoose)  
**Real-time:** Socket.IO  
**Auth:** JWT + bcrypt for password hashing  
**Database hosting:** MongoDB Atlas

---

## How It Works

A few decisions worth explaining, since they're the actual point of the project:

**Every piece of data belongs to one user, and the backend always checks that.**
When you ask for your contacts or your SOS history, the server doesn't just check "are you logged in" — it checks "does this specific piece of data actually belong to you." So even if someone tried to guess another person's contact ID and ask for it directly, they'd get nothing back. This is the part I was most careful about, since it's a really common mistake to get wrong.

**Linking two accounts works like a pairing code.**
One person generates a short code that expires in 15 minutes. The other person types it in, and now the two accounts are connected. Either person can remove the link at any time.

**The real-time alert uses WebSockets, not constant polling.**
Instead of the app checking the server every few seconds asking "did anything happen yet?", each logged-in user keeps one open connection to the server. When someone linked to you triggers an SOS, the server pushes that event straight to your browser, instantly. I used a library called Socket.IO to handle this, since it takes care of a lot of the messy parts (reconnecting if the connection drops, etc.) for me.

**Tokens expire on purpose.**
Your login stays valid for 7 days, not forever. This isn't an accident — a login token can't be "cancelled" the way a session in a database can, so giving it an expiry date limits the damage if it ever leaked.

---

## Getting Started

You'll need Node.js installed and a MongoDB database (either running locally or a free MongoDB Atlas account).

**1. Clone the repo**
```bash
git clone https://github.com/you/safeher.git
cd safeher
```

**2. Set up the backend**
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` folder with:
```
MONGO_URI=your_mongodb_connection_string
PORT=5001
JWT_SECRET=any_long_random_string
CLIENT_ORIGIN=http://localhost:5173
```
Then run it:
```bash
npm run dev
```

**3. Set up the frontend**
Open a new terminal:
```bash
cd frontend
npm install
```
Create a `.env` file in the `frontend` folder with:
```
VITE_API_URL=http://localhost:5001/api
VITE_SOCKET_URL=http://localhost:5001
```
Then run it:
```bash
npm run dev
```

Open `http://localhost:5173` in your browser and you're good to go.

---

## Challenges & What I Learned

- I originally had one long-lived login token with no way to check whether it was still valid on the frontend. If the token went stale, the app would just quietly break instead of logging the person out. I had to add a way for a failed request to actually tell the rest of the app "hey, this person isn't logged in anymore," so it could redirect them properly.
- Getting real-time alerts working meant learning WebSockets for the first time. The idea that a connection could just stay open and the server could push something to you whenever it wanted, instead of you asking for it, took a bit to wrap my head around — but once it clicked, it made a lot of other "live" features I'd used as a user (chat apps, live sports scores) make a lot more sense too.
- I ran into a classic Mac issue where port 5000 is secretly used by Apple's AirPlay feature, which silently blocked my server with no clear error message. Small thing, but a good reminder that "it's not connecting" can have very unexpected causes.
- I also learned the hard way why keeping your project folder structure clean matters — I ended up with duplicate files in the wrong folders more than once, which caused confusing bugs that had nothing to do with the actual code.

---

## What's Not Included (On Purpose)

To keep the project focused, I deliberately left a few things out:
- No real SMS or email alerts — the "notification" is only inside the app, live, while it's open
- No live location tracking — it only captures your location at the moment you hit SOS, not continuously
- No maps built into the app — "View on map" just opens Google Maps in a new tab

---

## Roadmap

Things I'd add if I kept building this:
- Swap the single login token for a short-lived token + refresh token, so a leaked token matters a lot less
- Real push notifications, so you get alerted even if the app isn't open
- Basic tests for the ownership-checking logic, since that's the part I'd want to be extra sure never breaks

---

## Contact

[Your Name](https://linkedin.com/in/you) · [Portfolio](https://yoursite.com)