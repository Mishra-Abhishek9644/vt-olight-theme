💍 Ring Builder – MERN Stack Project












A full-stack Ring Builder Web Application where users can design their perfect engagement ring by selecting a diamond and a ring setting, using filters, real-time updates, and Redux Toolkit for global state.

This project helped me level up my MERN skills, routing, state management, and backend API design.

📸 Demo (optional)

Add screenshots or GIFs here later.

🚀 Features
💎 Diamond Selection

Choose from multiple diamonds

Filter by carat, color, clarity, cut, polish, symmetry, fluorescence, depth, L/W ratio & price

View diamond details with SKU routing

💍 Ring Setting Selection

Browse multiple ring styles

Filter settings

View single setting using dynamic routes

🎯 Builder Logic

Must select 1 diamond + 1 setting

Cannot open Complete page until both are selected

Real-time updates powered by Redux

🧰 Tech Stack
Frontend

⚛️ React.js

🟣 Redux Toolkit

🌐 React Router

🎨 Tailwind CSS

🎚️ rc-slider

Backend

🟩 Node.js

⚡ Express.js

🍃 MongoDB (dummy dataset for now)

🔌 REST API Architecture

🧭 Routing Structure
Route	Description
/diamond	All diamonds listing
/diamond/:sku	Single diamond details
/setting	All ring settings
/setting/:sku	Single setting details
/complete	Final ring overview (protected route)
🗂️ State Management – Redux Toolkit
1️⃣ diamondFiltersSlice

Stores all diamond filter values:
Carat, Color, Clarity, Cut, Polish, Symmetry, Fluorescence, Depth, L/W Ratio, Price.

Used by API: POST /api/diamonds/filter

2️⃣ cartSlice

Stores:

Selected diamond

Selected setting

Controls:

Only 1 diamond + 1 setting

Unlocks complete page only when both selected

3️⃣ tooltipSlice

Handles tooltip visibility globally.

🌐 Backend API Endpoints
💎 Diamond APIs
Purpose	Method	Endpoint
Fetch all diamonds	GET	/api/diamonds
Filter diamonds	POST	/api/diamonds/filter
Get single diamond by SKU	GET	/api/diamonds/:sku
Get single diamond by ID	GET	/api/diamonds/id/:id
💍 Setting APIs
Purpose	Method	Endpoint
Fetch all settings	GET	/api/settings
Filter settings	POST	/api/settings/filter
Get single setting by SKU	GET	/api/settings/:sku
Get single setting by ID	GET	/api/settings/id/:id
🔍 How Filtering Works (Frontend → Backend → UI)

User adjusts filters (sliders/dropdowns).

Values stored in diamondFiltersSlice.

A POST request is sent to /api/diamonds/filter.

Backend filters from dummy data.

Results update instantly in the UI.

This flow simulates real e-commerce filtering logic.

🎨 UI / UX Learnings

Responsive Tailwind components

Hover effects, modals, card layouts

Clean table UI for data-heavy pages

Protected routes & guided user flow

Smooth transitions + real-time updates

🧠 What I Learned
✔ MERN Stack in practice

Connecting React → Redux → API → Database

✔ Redux Toolkit

Slices

Global store

Dispatching filter actions

Managing selections

✔ Backend Development

REST API patterns

Filtering logic

Dynamic routes (/diamond/:sku, /setting/:sku)

Request validation

✔ React Router

Protected routing

Dynamic navigation

UI state synced with URL

✔ Better Architecture

Clean folder structure

Reusable components

Realistic e-commerce logic

📌 Folder Structure
ring-builder/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── data/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   │   ├── slices/
│   │   │   ├── store.js
│   │   ├── assets/
│   │   └── App.jsx
│   └── package.json
│
└── README.md

⚙️ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/Mishra-Abhishek9644/ring-builder.git
cd ring-builder

2️⃣ Install Backend Dependencies
cd backend
npm install
npm start


Backend starts on: https://server-alpha-ecru.vercel.app

3️⃣ Install Frontend Dependencies
cd ../frontend
npm install
npm run dev


Frontend starts on: http://localhost:5173
 (Vite)

📌 Future Improvements

Add real MongoDB database

Add authentication (JWT)

Save user ring builds

Admin panel for managing diamonds & settings

Pagination for large datasets

Deployment (Vercel / Render / Railway)

🏁 Conclusion

This Ring Builder project gave me hands-on MERN experience and helped me understand:

Clean architecture

API design

Redux logic

UI/UX patterns

Real-world e-commerce filter systems

It represents a complete journey of learning and applying full-stack engineering best practices.
