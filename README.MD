# 🚀 Blog Editor

A full-stack blog editor with auto-save drafts, user authentication, and clean UI.
Built as a Proof of Concept for the RevoltronX Full Stack Internship Assignment.

** Live Demo:** [https://blog-editorlive.netlify.app](https://blog-editorlive.netlify.app)

---

##  Features

*  **User Authentication**: Signup/Login using JWT
*  **Blog Editor**:

  * Title, Content (textarea), Tags (comma-separated)
  * Save as Draft / Publish options
  * Auto-save drafts (every 30s or after 5s of inactivity)
*  **Draft vs Published Views**:

  * Separate tabs for Drafts and Published blogs
  * Only the blog owner can see/edit drafts
*  **Edit/Delete Permissions**:

  * Only the owner can edit/delete their blogs
*  **Tag Support**: Clean pill-style tag display
*  **Responsive UI**: Styled with Tailwind CSS
*  **Notifications**: Toast alerts for every action

---

## 🛠 Tech Stack

### Frontend:

* React
* React Router
* Axios
* Tailwind CSS
* React Toastify

### Backend:

* Node.js
* Express.js
* MongoDB + Mongoose
* JSON Web Tokens (JWT)
* CORS, dotenv

---

##  Getting Started (For Local Setup)

### 1. Clone the Repository

```bash
git clone https://github.com/Krushna-WebDev/blog-editor.git
cd blog-editor
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

> Create a `.env` file and add your MongoDB URI & JWT secret:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

```bash
npm start
```

---

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

> Create a `.env` file with your API base URL:

```env
VITE_API_URL=http://localhost:5000/api
```

```bash
npm run dev
```

---

### 4. Run the App

Open your browser at: [http://localhost:5173](http://localhost:5173)

You can now:

* Sign up / Login
* Create blogs, auto-save drafts
* Edit, publish, delete your posts
* View all published blogs from other users

---

## Live Deployment

* **Frontend:** [Netlify](https://blog-editorlive.netlify.app)
* **Backend:** Hosted on Render

> Test Credentials are pre-filled on the Login Page

---

##  Folder Structure

```
blog-editor/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── index.js
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   └── App.jsx
    └── .env
```

---

##  License

MIT

---

## Submission Info (for RevoltronX)

* GitHub Repo: [https://github.com/Krushna-WebDev/blog-editor](https://github.com/Krushna-WebDev/blog-editor)
* Live Site: [https://blog-editorlive.netlify.app](https://blog-editorlive.netlify.app)

---
