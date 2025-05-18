# Blog Editor

A modern blog editor with auto-save, draft/publish workflow, authentication, and a clean UI.

## Features

- **User Authentication:** Signup, login, JWT-based session
- **Create, Edit, Auto-save, Publish, and Delete Blogs**
- **Draft & Published Blog Separation:** Tab navigation for easy switching
- **Tag Support:** Add tags, pill-style display
- **Only Owner Can Edit/Delete:** Edit/delete buttons only for your own blogs
- **Draft Privacy:** Only you can see and edit your drafts
- **Responsive, Modern UI:** Built with Tailwind CSS
- **Toast Notifications:** For all actions
- **MongoDB Backend:** RESTful API

## Tech Stack

- **Frontend:** React, Tailwind CSS, Axios, React Router, React Toastify
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Other:** dotenv, CORS, JWT

## Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/Krushna-WebDev/blog-editor.git
cd blog-editor
```

### 2. Backend Setup

```bash
cd backend
npm install
# Set up your MongoDB connection in .env
echo "MONGO_URI=mongodb://localhost:27017/blog-editor" > .env
npm start
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
# Set up API URL in .env
echo "VITE_API_URL=http://localhost:5000/api" > .env
npm run dev
```

### 4. Usage

- Open [http://localhost:5173](http://localhost:5173) in your browser.
- Sign up or log in to create, edit, and manage your blogs!
- Only you can edit/delete your own blogs and see your drafts.

## Folder Structure

```
backend/
  controller/
  models/
  routes/
  index.js
frontend/
  src/
    components/
    pages/
    App.jsx
  .env
```

## License

MIT